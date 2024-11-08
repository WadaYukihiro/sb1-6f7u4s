import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface Props {
  onFileUpload: (file: File) => void;
}

export function FileUploader({ onFileUpload }: Props) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file?.type === "text/csv") {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <div className="space-y-6">
      <div 
        className={`bg-white rounded-lg shadow-md p-8 text-center border-2 border-dashed transition-colors
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex justify-center mb-4">
          <Upload className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-xl font-bold mb-4">販売店データのアップロード</h2>
        <p className="text-gray-600 mb-6">
          CSVファイルをドラッグ＆ドロップまたは選択してください
        </p>
        <label className="inline-block">
          <input
            type="file"
            accept=".csv"
            onChange={handleChange}
            className="hidden"
          />
          <span className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 cursor-pointer inline-block">
            CSVファイルを選択
          </span>
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">CSVファイル形式</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600 mb-2">以下の形式でCSVファイルを作成してください：</p>
          <code className="block whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded">
            "読売新聞","二瀬川（合）","上屋敷,和光3丁目,二瀬川,七日町,天王町"
          </code>
          <ul className="text-sm text-gray-600 mt-4 list-disc list-inside">
            <li>1行目: 媒体名,販売店名,担当エリア（カンマ区切り）</li>
            <li>担当エリアは複数の地域をカンマで区切って記述可能</li>
            <li>文字コードはUTF-8を推奨</li>
          </ul>
        </div>
      </div>
    </div>
  );
}