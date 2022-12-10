import { reader } from '../../../outils';
import * as path from 'path';

const isOnEdge = (currentIdx: number, length: number): boolean =>
  currentIdx === 0 || currentIdx === length - 1;

const isVisible = (
  tree: number,
  treeMap: number[][],
  treeRow: number,
  treeColumn: number,
): boolean => {
  let currentTopIdx = treeRow;
  let currentRightIdx = treeColumn;
  let currentBottomIdx = treeRow;
  let currentLeftIdx = treeColumn;

  let topIsVisible = true;
  let rightIsVisible = true;
  let bottomIsVisible = true;
  let leftIsVisible = true;

  do {
    --currentTopIdx;

    const top = treeMap[currentTopIdx][treeColumn];

    if (top >= tree) {
      topIsVisible = false;
      break;
    }
  } while (currentTopIdx > 0);

  do {
    ++currentRightIdx;

    const right = treeMap[treeRow][currentRightIdx];

    if (right >= tree) {
      rightIsVisible = false;
      break;
    }
  } while (currentRightIdx < treeMap[treeRow].length - 1);

  do {
    ++currentBottomIdx;

    const bottom = treeMap[currentBottomIdx][treeColumn];

    if (bottom >= tree) {
      bottomIsVisible = false;
      break;
    }
  } while (currentBottomIdx < treeMap.length - 1);

  do {
    --currentLeftIdx;

    const left = treeMap[treeRow][currentLeftIdx];

    if (left >= tree) {
      leftIsVisible = false;
      break;
    }
  } while (currentLeftIdx > 0);

  return topIsVisible || rightIsVisible || bottomIsVisible || leftIsVisible;
};

const task1 = (treeMap: number[][]): void => {
  let amountOfFreeTrees = 0;
  for (const [lineIdx, treeLine] of treeMap.entries()) {
    for (const [treeIdx, tree] of treeLine.entries()) {
      if (
        isOnEdge(lineIdx, treeMap.length) ||
        isOnEdge(treeIdx, treeLine.length)
      ) {
        ++amountOfFreeTrees;
        continue;
      }

      if (isVisible(tree, treeMap, lineIdx, treeIdx)) {
        ++amountOfFreeTrees;
      }
    }
  }

  console.log(amountOfFreeTrees);
};

const getScenicScore = (
  tree: number,
  treeMap: number[][],
  treeRow: number,
  treeColumn: number,
): number => {
  let currentTopIdx = treeRow;
  let currentRightIdx = treeColumn;
  let currentBottomIdx = treeRow;
  let currentLeftIdx = treeColumn;

  let topTreeAmount = 0;
  let rightTreeAmount = 0;
  let bottomTreeAmount = 0;
  let leftTreeAmount = 0;

  do {
    --currentTopIdx;
    ++topTreeAmount;

    const top = treeMap[currentTopIdx][treeColumn];

    if (top >= tree) {
      break;
    }
  } while (currentTopIdx > 0);

  do {
    ++currentRightIdx;
    ++rightTreeAmount;

    const right = treeMap[treeRow][currentRightIdx];

    if (right >= tree) {
      break;
    }
  } while (currentRightIdx < treeMap[treeRow].length - 1);

  do {
    ++currentBottomIdx;
    ++bottomTreeAmount;

    const bottom = treeMap[currentBottomIdx][treeColumn];

    if (bottom >= tree) {
      break;
    }
  } while (currentBottomIdx < treeMap.length - 1);

  do {
    --currentLeftIdx;
    ++leftTreeAmount;

    const left = treeMap[treeRow][currentLeftIdx];

    if (left >= tree) {
      break;
    }
  } while (currentLeftIdx > 0);

  return topTreeAmount * rightTreeAmount * bottomTreeAmount * leftTreeAmount;
};

const task2 = (treeMap: number[][]): void => {
  const scenicScores: number[] = [];
  for (const [lineIdx, treeLine] of treeMap.entries()) {
    for (const [treeIdx, tree] of treeLine.entries()) {
      if (
        isOnEdge(lineIdx, treeMap.length) ||
        isOnEdge(treeIdx, treeLine.length)
      ) {
        continue;
      }

      scenicScores.push(getScenicScore(tree, treeMap, lineIdx, treeIdx));
    }
  }

  const highestScenicScore = Math.max(...scenicScores);
  console.log(highestScenicScore);
};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_8.txt'));
  const treeLines = file.split('\n');
  const treeMap = treeLines.map((treeLine: string) =>
    treeLine.split('').map((tree: string) => +tree),
  );

  task1(treeMap);
  task2(treeMap);
};

main();
