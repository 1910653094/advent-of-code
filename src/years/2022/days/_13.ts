import { reader, Stack } from '../../../outils';
import * as path from 'path';

type TPackage = TPackage[] | number[] | number;

type TPair = {
  readonly leftPackage: number[];
  readonly rightPackage: number[];
};

const task1 = (pairs: TPair[]): void => {};

// const task2 = (): void => {};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_13.txt'));
  const pairs = file.split('\n\n');
  const parsedPairs: TPair[] = pairs.map((pair: string) => {
    const [left, right] = pair.split('\n');
    const leftPackage: TPackage = [];
    const indexes: Stack<number> = new Stack();
    for (const [idx, packageLetter] of [...left].entries()) {
      switch (packageLetter) {
        case '[':
          leftPackage[indexes.peek() || leftPackage.length - 1].push([]);
          break;

        case ']':
          indexes.pop();
          break;

        default:
          leftPackage.push(+packageLetter);
          break;
      }
      // if (packageLetter === '[' || packageLetter === ']')
    }

    return leftPackage;
  });

  task1(parsedPairs);
  //   task2();
};

main();
