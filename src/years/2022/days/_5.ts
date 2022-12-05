import { reader, Stack } from '../../../outils';
import * as path from 'path';

const interpretCommand = (cmd: string): [number, number, number] => {
  const splittedCmd = cmd.split(' ');
  return [+splittedCmd[1], +splittedCmd[3] - 1, +splittedCmd[5] - 1];
};

const task1 = (stacks: Stack<string>[], commands: string[]): void => {
  const topCrates: string[] = [];

  commands.forEach((cmd: string) => {
    const [quantity, fromStack, toStack] = interpretCommand(cmd);

    for (let i = 0; i < quantity; i++) {
      const item = stacks[fromStack].pop() ?? '';
      stacks[toStack].push(item);
    }
  });

  stacks.forEach((stack: Stack<string>) => topCrates.push(stack.peek() ?? ''));

  console.log(topCrates.join(''));
};

const task2 = (stacks: Stack<string>[], commands: string[]): void => {
  const topCrates: string[] = [];

  commands.forEach((cmd: string) => {
    const [quantity, fromStack, toStack] = interpretCommand(cmd);
    const itemsInOrder: string[] = [];

    for (let i = 0; i < quantity; i++) {
      const item = stacks[fromStack].pop() ?? '';
      if (quantity > 1) {
        itemsInOrder.push(item);
      } else {
        stacks[toStack].push(item);
      }
    }

    itemsInOrder
      .reverse()
      .forEach((item: string) => stacks[toStack].push(item));
  });

  stacks.forEach((stack: Stack<string>) => topCrates.push(stack.peek() ?? ''));

  console.log(topCrates.join(''));
};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_5.txt'));
  const [startStacks, commandLines] = file.split('\n\n');

  const stackArray = startStacks.split('\n').slice(0, -1);
  const stacks: Stack<string>[] = [];
  const clonedStacks: Stack<string>[] = [];

  for (let i = 0; i < 9; i++) {
    stacks.push(new Stack<string>());
    clonedStacks.push(new Stack<string>());
  }

  stackArray.reverse().forEach((stack: string) =>
    stack
      .match(/.{1,4}/g)
      ?.map((splittedStackLevel: string) => {
        let stackLevelLetter: string = splittedStackLevel;
        if (splittedStackLevel.charAt(splittedStackLevel.length - 1) === ' ') {
          stackLevelLetter = splittedStackLevel.slice(0, -1);
        }

        return stackLevelLetter[1];
      })
      .forEach((stackLevelLetter: string, idx: number) => {
        if (stackLevelLetter && stackLevelLetter !== ' ') {
          stacks[idx].push(stackLevelLetter);
          clonedStacks[idx].push(stackLevelLetter);
        }
      }),
  );

  const commands = commandLines.split('\n');
  task1(stacks, commands);
  task2(clonedStacks, commands);
};

main();
