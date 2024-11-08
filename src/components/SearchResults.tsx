import React from 'react';
import type { Dealer } from '../types';

interface Props {
  results: Dealer[];
}

export function SearchResults({ results }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">検索結果</h3>
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((dealer, index) => (
            <div
              key={index}
              className="border-b last:border-b-0 pb-4 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-lg">{dealer.name}</p>
                  <p className="text-gray-600">{dealer.newspaper}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">
                <span className="font-medium">担当エリア:</span>{' '}
                {dealer.area.split(',').map(area => area.trim()).join('、')}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-4">
          該当する販売店が見つかりませんでした
        </p>
      )}
    </div>
  );
}