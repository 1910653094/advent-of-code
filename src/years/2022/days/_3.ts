import { reader } from '../../../outils';
import * as path from 'path';

const calculateSum = (items: string[]): number =>
  items
    .map((item: string) => item.charCodeAt(0))
    .map((item: number) => {
      if (item >= 97 && item <= 122) return item - 96;
      return item - 38;
    })
    .reduce((sum: number, item: number) => sum + item, 0);

const task1 = (backpacks: string[]): void => {
  const backpackCompartments = backpacks.map((backpack: string) => {
    const halfLength = backpack.length / 2;
    return [backpack.substring(0, halfLength), backpack.substring(halfLength)];
  });
  const duplicatedItems: string[] = [];
  for (const backpack of backpackCompartments) {
    const [firstCompartment, secondCompartment] = backpack;

    for (const item of [...firstCompartment]) {
      if (secondCompartment.includes(item)) {
        duplicatedItems.push(item);
        break;
      }
    }
  }

  const itemsSum = calculateSum(duplicatedItems);
  console.log(itemsSum);
};

const task2 = (backpacks: string[]): void => {
  const groups: string[][] = [];

  backpacks.forEach((backpack: string, idx: number) => {
    if (idx % 3 === 0) groups.push([]);
    groups[groups.length - 1].push(backpack);
  });

  const groupItems: string[] = [];
  for (const backpack of groups) {
    const [firstElveItems, secondElveItems, thirdElveItems] = backpack;

    for (const item of [...firstElveItems]) {
      if (secondElveItems.includes(item) && thirdElveItems.includes(item)) {
        groupItems.push(item);
        break;
      }
    }
  }

  const itemsSum = calculateSum(groupItems);
  console.log(itemsSum);
};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_3.txt'));
  const backpacks = file.split('\n');

  task1(backpacks);
  task2(backpacks);
};

main();
