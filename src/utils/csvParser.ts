import type { Dealer } from '../types';

export function parseCSV(csvText: string): Dealer[] {
  const lines = csvText.split('\n');
  const dealers: Dealer[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // CSVのパース（ダブルクォートと複数行に対応）
    const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
    if (!matches || matches.length < 3) continue;

    const newspaper = matches[0].replace(/^,|"|"/g, '').trim();
    const name = matches[1].replace(/^,|"|"/g, '').trim();
    const area = matches[2].replace(/^,|"|"/g, '').trim();
    
    if (newspaper && name && area) {
      dealers.push({ newspaper, name, area });
    }
  }

  return dealers;
}