import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { SearchResults } from './SearchResults';
import type { Dealer } from '../types';

interface Props {
  dealers: Dealer[];
  isLoading: boolean;
}

export function DealerFinder({ dealers, isLoading }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Dealer[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim();
    const results = dealers.filter(dealer => {
      const areas = dealer.area.split(',').map(area => area.trim());
      return areas.some(area => query.includes(area));
    });
    
    setSearchResults(results);
    setHasSearched(true);
  }, [dealers, searchQuery]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="住所を入力してください（例：静岡県掛川市和光3丁目）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>検索</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      ) : hasSearched && (
        <SearchResults results={searchResults} />
      )}
    </div>
  );
}