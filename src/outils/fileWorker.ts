import { readFileSync } from 'fs';

export const reader = (filePath: string): string => {
  const file = readFileSync(filePath, 'utf-8');

  return file;
};
