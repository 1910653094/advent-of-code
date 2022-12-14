import { reader } from '../../../outils';
import * as path from 'path';

const task1 = (elvesSum: number[]): void => {
  const highestElve = Math.max(...elvesSum);
  console.log(highestElve);
};

const task2 = (elvesSum: number[]): void => {
  const sortedElves = elvesSum.sort((n1: number, n2: number) => n2 - n1);

  const calorieSum = sortedElves
    .slice(0, 3)
    .reduce((sum: number, elveSum: number) => elveSum + sum, 0);
  console.log(calorieSum);
};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_1.txt'));
  const elves = file.split('\n\n');
  const elvesSum = elves.map((elvePackage: string) =>
    elvePackage
      .split('\n')
      .map((packageCalories: string) => +packageCalories)
      .reduce(
        (sum: number, packageCalories: number) => packageCalories + sum,
        0,
      ),
  );

  task1(elvesSum);
  task2(elvesSum);
};

main();
