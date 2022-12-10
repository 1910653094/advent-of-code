import { reader, Stack } from '../../../outils';
import * as path from 'path';

const isCdCmd = (line: string): boolean =>
  line.startsWith('$') && line.includes('cd');
const isNotADir = (line: string): boolean => !line.startsWith('dir');

const getCdCmd = (line: string): string => line.split(' ')[2];
const getFileSize = (line: string): number => +line.split(' ')[0];

// needed because two folders can have the same name (but never the same directory)
const getFolderDir = (dirs: Stack<string>, sliceIdx?: number): string =>
  dirs.toArray().slice(0, sliceIdx).join('>');

const getDirSum = (dirSize: Map<string, number>): number => {
  let dirSum = 0;
  dirSize.forEach((value: number) => {
    if (value <= 100_000) {
      dirSum += value;
    }
  });
  return dirSum;
};

const task1 = (commands: string[]): Map<string, number> => {
  const directories: Stack<string> = new Stack<string>();
  const dirSize: Map<string, number> = new Map();

  commands.forEach((cmd: string) => {
    if (isCdCmd(cmd)) {
      const dirName = getCdCmd(cmd);
      if (dirName === '..') {
        directories.pop();
      } else {
        directories.push(dirName);
        dirSize.set(getFolderDir(directories), 0);
      }
    } else if (!cmd.startsWith('$')) {
      if (isNotADir(cmd)) {
        const size = getFileSize(cmd);
        directories.iterate((_: string, idx: number) => {
          const directory = getFolderDir(directories, idx + 1);
          dirSize.set(directory, (dirSize.get(directory) || 0) + size);
        });
      }
    }
  });

  console.log(getDirSum(dirSize));

  return dirSize;
};

const task2 = (dirSizes: Map<string, number>) => {
  const outerMostFolderSize = dirSizes.get('/') ?? 0;

  const freeSpace = 70_000_000 - outerMostFolderSize;
  const neededSpace = 30_000_000 - freeSpace;

  let indexFromValueBiggerThanNeededSpace = 0;
  const sortedDirectorySizes = Array.from(dirSizes.values()).sort(
    (a: number, b: number) => a - b,
  );
  // find the index, from which the directory size is large enough for the minimum needed space
  for (const [idx, directorySize] of sortedDirectorySizes.entries()) {
    if (directorySize > neededSpace) {
      indexFromValueBiggerThanNeededSpace = idx;
      break;
    }
  }

  const smallestDirectoryNeeded = sortedDirectorySizes.slice(
    indexFromValueBiggerThanNeededSpace,
  )[0];

  console.log(smallestDirectoryNeeded);
};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_7.txt'));
  const commands = file.split('\n');

  const dirSizes = task1(commands);
  task2(dirSizes);
};

main();
