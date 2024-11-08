import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { DealerFinder } from './components/DealerFinder';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { parseCSV } from './utils/csvParser';
import type { Dealer } from './types';

function App() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsedDealers = parseCSV(text);
      setDealers(parsedDealers);
      setIsLoading(false);
    };

    reader.readAsText(file);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {dealers.length === 0 ? (
          <FileUploader onFileUpload={handleFileUpload} />
        ) : (
          <DealerFinder dealers={dealers} isLoading={isLoading} />
        )}
      </main>
    </div>
  );
}

export default App;