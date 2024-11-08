import React from 'react';
import { Newspaper } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <Newspaper className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">新聞販売店検索</h1>
        </div>
      </div>
    </header>
  );
}