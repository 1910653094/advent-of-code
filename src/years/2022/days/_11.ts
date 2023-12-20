import { reader } from '../../../outils';
import * as path from 'path';

type TMonkey = {
  readonly holdingItems: number[];
  readonly operation: (oldValue: number) => number;
  readonly checkTest: (value: number) => boolean;
  readonly option1: number;
  readonly option2: number;
  inspectedAmount: number;
};

const monkeyGetsBored = (worryLevel: number): number =>
  Math.floor(worryLevel / 3);

const task1 = (monkeys: TMonkey[]): void => {
  for (let rounds = 0; rounds < 20; rounds++) {
    monkeys.forEach((monkey: TMonkey) => {
      monkey.holdingItems.forEach((item: number) => {
        let newWorryLevel = monkey.operation(item);
        newWorryLevel = monkeyGetsBored(newWorryLevel);

        const throwToMonkey = monkey.checkTest(newWorryLevel)
          ? monkey.option1
          : monkey.option2;

        monkeys[throwToMonkey].holdingItems.push(newWorryLevel);

        ++monkey.inspectedAmount;
      });

      while (monkey.holdingItems.length > 0) monkey.holdingItems.pop();
    });
  }

  const inspectedAmounts = monkeys.map(
    (monkey: TMonkey) => monkey.inspectedAmount,
  );

  const monkeyBusiness = inspectedAmounts
    .sort((a: number, b: number) => b - a)
    .slice(0, 2)
    .reduce((sum: number, amount: number) => sum * amount, 1);

  console.log(monkeyBusiness);
};

const task2 = (monkeys: TMonkey[]): void => {
  for (let rounds = 0; rounds < 20; rounds++) {
    monkeys.forEach((monkey: TMonkey) => {
      monkey.holdingItems.forEach((item: number) => {
        let newWorryLevel = monkey.operation(item);
        // newWorryLevel = monkeyGetsBored(newWorryLevel);

        const throwToMonkey = monkey.checkTest(newWorryLevel)
          ? monkey.option1
          : monkey.option2;

        monkeys[throwToMonkey].holdingItems.push(newWorryLevel);

        ++monkey.inspectedAmount;
      });

      while (monkey.holdingItems.length > 0) monkey.holdingItems.pop();
    });

    const inspectedAmount = monkeys.map(
      (monkey: TMonkey) => monkey.inspectedAmount,
    );
    console.log(inspectedAmount);
  }

  const inspectedAmounts = monkeys.map(
    (monkey: TMonkey) => monkey.inspectedAmount,
  );

  //   console.log(inspectedAmounts);

  const monkeyBusiness = inspectedAmounts
    .sort((a: number, b: number) => b - a)
    .slice(0, 2)
    .reduce((sum: number, amount: number) => sum * amount, 1);

  console.log(monkeyBusiness);
};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_11.txt'));
  const duplicatedMonkeys: TMonkey[] = [];
  const monkeys: TMonkey[] = file.split('\n\n').map((monkeyObject: string) => {
    const object = monkeyObject.split('\n');

    const startingItems = object[1].split('Starting items: ')[1];
    let items: number[] = [];

    if (startingItems.includes(',')) {
      items.push(...startingItems.split(', ').map((item: string) => +item));
    } else items.push(+startingItems);

    const operations = object[2].split('new = old ')[1].split(' ');
    const operationSymbol = operations[0];
    const secondValue = +operations[1] || operations[1];

    const operation = (oldValue: number): number => {
      let newValue = 0;
      const secondOperationValue: number =
        typeof secondValue === 'string' ? oldValue : secondValue;

      switch (operationSymbol) {
        case '*':
          newValue = oldValue * secondOperationValue;
          break;

        case '+':
          newValue = oldValue + secondOperationValue;
          break;
        case '-':
          newValue = oldValue - secondOperationValue;
          break;
        default:
          newValue = oldValue / secondOperationValue;
          break;
      }

      return newValue;
    };

    const divisible = +object[3].split('divisible by ')[1];
    const checker = (value: number) => value % divisible === 0;

    const option1 = +object[4].split('throw to monkey ')[1];
    const option2 = +object[5].split('throw to monkey ')[1];

    duplicatedMonkeys.push({
      holdingItems: [...items],
      operation,
      checkTest: checker,
      option1,
      option2,
      inspectedAmount: 0,
    } as TMonkey);

    return {
      holdingItems: items,
      operation,
      checkTest: checker,
      option1,
      option2,
      inspectedAmount: 0,
    } as TMonkey;
  });

  task1(monkeys);
  task2(duplicatedMonkeys);
};

main();
