import { useEffect, useMemo, useRef, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { usePostStore } from '@/store/post-store';
import { Spinner } from '../ui/spinner';
import { MAX_LENGTH } from '@/lib/constant';
import { api } from '@/lib/api';
import type { HashtagType } from '@/types/post';

interface PostComposerProps {
  onSuccess?: () => void;
  autoFocus?: boolean;
}

type HashtagCreateResponse = {
  created: HashtagType[];
  existing: HashtagType[];
  total: HashtagType[];
};

type ResolvedHashtags = {
  hashtagIds: string[];
  existingHashtagIds: string[];
};

const HASHTAG_PATTERN = /#(\w+)/g;
const ACTIVE_HASHTAG_PATTERN = /(?:^|\s)#([\w]*)$/;

const extractHashtagTags = (content: string) => {
  return Array.from(
    new Set(
      (content.match(HASHTAG_PATTERN) ?? []).map((tag) => tag.slice(1).toLowerCase()),
    ),
  );
};

const getActiveHashtagFragment = (content: string, cursorStart: number) => {
  const beforeCursor = content.slice(0, cursorStart);
  const match = beforeCursor.match(ACTIVE_HASHTAG_PATTERN);

  if (!match) {
    return null;
  }

  const start = (match.index ?? 0) + (match[0].startsWith(' ') ? 1 : 0);

  return {
    query: match[1].toLowerCase(),
    start,
    end: cursorStart,
  };
};

const mergeHashtags = (current: HashtagType[], incoming: HashtagType[]) => {
  const existingIds = new Set(current.map((item) => item.id));
  return [...incoming.filter((item) => !existingIds.has(item.id)), ...current];
};


export default function PostComposer({ onSuccess, autoFocus }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [existingHashtags, setExistingHashtags] = useState<string[]>([]);
  const [availableHashtags, setAvailableHashtags] = useState<HashtagType[]>([]);
  const [isResolvingHashtags, setIsResolvingHashtags] = useState(false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pendingSelectionRef = useRef<{ start: number; end: number } | null>(null);
  const { isLoading, createPost } = usePostStore();

  const remaining = MAX_LENGTH - content.length;
  const isOverLimit = remaining < 0;
  const activeHashtagFragment = useMemo(
    () => getActiveHashtagFragment(content, selection.start),
    [content, selection.start],
  );

  const hashtagSuggestions = useMemo(() => {
    if (!activeHashtagFragment) {
      return [];
    }

    const query = activeHashtagFragment.query;

    return [...availableHashtags]
      .filter((tag) => {
        if (!query) {
          return true;
        }

        return tag.tag.toLowerCase().includes(query);
      })
      .sort((left, right) => {
        if (!query) {
          return right.count - left.count;
        }

        const leftStarts = left.tag.toLowerCase().startsWith(query);
        const rightStarts = right.tag.toLowerCase().startsWith(query);

        if (leftStarts !== rightStarts) {
          return leftStarts ? -1 : 1;
        }

        return right.count - left.count;
      })
      .slice(0, 6);
  }, [activeHashtagFragment, availableHashtags]);

  const showCreateOption = Boolean(
    activeHashtagFragment &&
    activeHashtagFragment.query.length > 0 &&
    !availableHashtags.some(
      (tag) => tag.tag.toLowerCase() === activeHashtagFragment.query,
    ),
  );

  useEffect(() => {
    let isMounted = true;

    const loadHashtags = async () => {
      const { fetcher } = api<HashtagType[]>(`/hashtag`);
      const res = await fetcher();

      if (!isMounted || !res.success || !Array.isArray(res.data)) {
        return;
      }

      setAvailableHashtags(res.data);
    };

    loadHashtags();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const pendingSelection = pendingSelectionRef.current;

    if (!pendingSelection) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const textarea = textareaRef.current;

      if (!textarea) {
        return;
      }

      textarea.focus();
      textarea.setSelectionRange(pendingSelection.start, pendingSelection.end);
      pendingSelectionRef.current = null;
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [content]);

  const syncHashtagsFromContent = (nextContent: string, nextSelectionStart: number) => {
    const extractedTags = extractHashtagTags(nextContent);
    const resolvedIds = availableHashtags
      .filter((tag) => extractedTags.includes(tag.tag.toLowerCase()))
      .map((tag) => tag.id);

    setHashtags(resolvedIds);
    setExistingHashtags(resolvedIds);
    setSelection({ start: nextSelectionStart, end: nextSelectionStart });
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextContent = event.target.value;
    const nextSelectionStart = event.target.selectionStart ?? nextContent.length;

    setContent(nextContent);
    syncHashtagsFromContent(nextContent, nextSelectionStart);
  };

  const handleSelectionChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    const nextSelectionStart = event.currentTarget.selectionStart ?? content.length;
    const nextSelectionEnd = event.currentTarget.selectionEnd ?? nextSelectionStart;

    setSelection({ start: nextSelectionStart, end: nextSelectionEnd });
  };

  const applyHashtagToContent = (tag: HashtagType, isExisting = true) => {
    const fragment = activeHashtagFragment ?? getActiveHashtagFragment(content, selection.start);

    if (!fragment) {
      return;
    }

    const nextContent = `${content.slice(0, fragment.start)}#${tag.tag} ${content.slice(selection.end)}`;
    const nextCursor = fragment.start + tag.tag.length + 2;

    pendingSelectionRef.current = {
      start: nextCursor,
      end: nextCursor,
    };
    setContent(nextContent);
    setHashtags((current) => Array.from(new Set([...current, tag.id])));
    if (isExisting) {
      setExistingHashtags((current) => Array.from(new Set([...current, tag.id])));
    }
    setSelection({ start: nextCursor, end: nextCursor });
  };

  const resolveHashtags = async (nextContent: string): Promise<ResolvedHashtags> => {
    const tags = extractHashtagTags(nextContent);

    if (tags.length === 0) {
      return { hashtagIds: [], existingHashtagIds: [] };
    }

    const { fetcher } = api<HashtagCreateResponse>(`/hashtag`);
    const res = await fetcher({
      method: 'POST',
      payload: { tags },
    });

    if (!res.success || !res.data) {
      return { hashtagIds: [], existingHashtagIds: [] };
    }

    const { existing, total } = res.data;

    setAvailableHashtags((current) => mergeHashtags(current, total));
    return {
      hashtagIds: total.map((tag) => tag.id),
      existingHashtagIds: existing.map((tag) => tag.id),
    };
  };

  const handleSubmit = async () => {
    if (!content.trim() || isOverLimit || isResolvingHashtags) return;

    setIsResolvingHashtags(true);

    try {
      const resolvedHashtags = await resolveHashtags(content.trim());
      const finalHashtagIds = Array.from(new Set([...hashtags, ...resolvedHashtags.hashtagIds]));
      const finalExistingHashtagIds = Array.from(
        new Set([...existingHashtags, ...resolvedHashtags.existingHashtagIds]),
      );

      await createPost(content.trim(), finalHashtagIds, finalExistingHashtagIds);
      setContent('');
      setHashtags([]);
      setExistingHashtags([]);
      setSelection({ start: 0, end: 0 });
      onSuccess?.();
    } finally {
      setIsResolvingHashtags(false);
    }
  };

  const handleCreateHashtag = async () => {
    const query = activeHashtagFragment?.query;

    if (!query) {
      return;
    }

    const { fetcher } = api<HashtagCreateResponse>(`/hashtag`);
    const res = await fetcher({
      method: 'POST',
      payload: { tags: [query] },
    });

    if (!res.success || !res.data?.total?.length) {
      return;
    }

    const createdHashtag = res.data.total[0];
    setAvailableHashtags((current) => mergeHashtags(current, [createdHashtag]));
    applyHashtagToContent(createdHashtag, false);
  };

  const handleSuggestionSelect = (tag: HashtagType) => {
    applyHashtagToContent(tag);
  };

  return (
    <div className="flex gap-3 p-4">
      <div className="flex-1 flex flex-col gap-3">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            placeholder="What's on your mind?"
            value={content}
            onChange={handleContentChange}
            onSelect={handleSelectionChange}
            onClick={handleSelectionChange}
            autoFocus={autoFocus}
            className="min-h-30 text-base rounded-none border-0 bg-transparent focus:ring-0 p-0 resize-none placeholder:text-gray-300"
          />

          {activeHashtagFragment && hashtagSuggestions.length > 0 ? (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
              <div className="max-h-52 overflow-auto p-2">
                {hashtagSuggestions.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSuggestionSelect(tag)}
                  >
                    <span>#{tag.tag}</span>
                    <span className="text-xs text-gray-400">{tag.count}</span>
                  </button>
                ))}

                {showCreateOption ? (
                  <button
                    type="button"
                    className="mt-1 flex w-full items-center justify-between rounded-xl border border-dashed border-blue-200 px-3 py-2 text-left text-sm text-blue-600 transition-colors hover:bg-blue-50"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={handleCreateHashtag}
                  >
                    <span>Create #{activeHashtagFragment.query}</span>
                    <span className="text-xs text-blue-400">new</span>
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span
            className={`text-xs font-medium ${isOverLimit
              ? 'text-red-500'
              : remaining <= 20
                ? 'text-yellow-500'
                : 'text-gray-300'
              }`}
          >
            {remaining}
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isOverLimit || isLoading || isResolvingHashtags}
            size="sm"
            className="rounded-full px-5"
          >
            {isLoading || isResolvingHashtags ? <Spinner /> : null}
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
