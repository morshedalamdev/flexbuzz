import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePostStore } from '@/store/post-store';
import type { PostType } from '@/types/post';

interface EditPostDialogProps {
  post: PostType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditPostDialog({ post, open, onOpenChange }: EditPostDialogProps) {
  const [content, setContent] = useState<string>('');
  const updatePost = usePostStore((state) => state.updatePost);
  const prevPostIdRef = useRef<string | null>(null);

  // Sync post content when dialog opens with a different post
  useEffect(() => {
    if (open && post && post.id !== prevPostIdRef.current) {
      prevPostIdRef.current = post.id;
      setContent(post.content);
    }
  }, [open, post]);

  const handleSave = () => {
    if (!post || !content.trim()) return;
    updatePost(post.id, content.trim());
    onOpenChange(false);
  };

  if (!post || !open) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-30"
          autoFocus
        />
        <div className="flex gap-2 mt-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave} disabled={!content.trim()}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
