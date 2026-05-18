import { useEffect, useState } from 'react';
import { Search, TrendingUp, X } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCount } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import type { HashtagType } from '@/types/post';
import { usePostStore } from '@/store/post-store';

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [trendingHashtags, setTrendingHashtags] = useState<HashtagType[]>([]);
  const [searchResults, setSearchResults] = useState<HashtagType[]>([]);
  const { searchHashtags, getAllHashtags } = usePostStore();

  // Load trending hashtags on mount
  useEffect(() => {
    const loadTrendingHashtags = async () => {
      const hashtags = await getAllHashtags();
      setTrendingHashtags(hashtags);
    };

    loadTrendingHashtags();
  }, [getAllHashtags]);

  // Search hashtags when query changes
  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length === 0) {
        setSearchResults([]);
        return;
      }

      const results = await searchHashtags(query.trim());
      setSearchResults(results);
    };

    const debounceTimer = window.setTimeout(handleSearch, 300);
    return () => window.clearTimeout(debounceTimer);
  }, [query, searchHashtags]);

  const showResults = query.trim().length > 0;
  const displayedResults = showResults ? searchResults : [];

  return (
    <MobileShell>
      <TopBar title="Discover" />

      {/* Search bar */}
      <div className="bg-white px-4 pb-3 pt-2 sticky top-14 z-20 border-b border-gray-100">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search posts, users, hashtags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {query && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setQuery('')}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 p-3 space-y-4">
        {showResults ? (
          <>
            <p className="text-xs font-medium text-gray-400 px-1">
              {displayedResults.length} result{displayedResults.length !== 1 ? 's' : ''} for "{query}"
            </p>
            {displayedResults.length === 0 ? (
              <div className="py-12 text-center">
                <Search size={36} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">No hashtags found</p>
                <p className="text-gray-300 text-sm">Try different keywords</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                {displayedResults.map((hashtag) => (
                  <button
                    key={hashtag.id}
                    onClick={() => navigate(`/hashtag/${hashtag.tag}`)}
                    className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">#{hashtag.tag}</p>
                      <p className="text-xs text-gray-400">{formatCount(hashtag.count)} posts</p>
                    </div>
                    <Badge variant="hashtag">Hashtag</Badge>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <TrendingUp size={16} className="text-blue-500" />
                <h2 className="text-sm font-bold text-gray-900">Trending Hashtags</h2>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                {trendingHashtags
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
                  .map((hashtag, index) => (
                    <button
                      key={hashtag.id}
                      onClick={() => navigate(`/hashtag/${hashtag.tag}`)}
                      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-300 w-4 text-left">
                          {index + 1}
                        </span>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-gray-900">#{hashtag.tag}</p>
                          <p className="text-xs text-gray-400">{formatCount(hashtag.count)} posts</p>
                        </div>
                      </div>
                      <Badge variant="hashtag">Trending</Badge>
                    </button>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Dialogs removed - Search now shows hashtags only */}
    </MobileShell>
  );
}
