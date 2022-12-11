import { reader } from '../../../outils';
import * as path from 'path';

type TCircleCommand = {
  readonly command: 'noop' | 'addx';
  readonly addx?: number;
};

const calculateSignalStrength = (round: number, x: number): number => {
  const rounds = [20, 60, 100, 140, 180, 220];

  if (rounds.includes(round)) {
    console.log(round, x);
    return round * x;
  }

  return 0;
};

const task1 = (commands: TCircleCommand[]): void => {
  let circleRound = 0;
  let x = 1;
  let signalStrength = 0;

  commands.forEach(({ addx }: TCircleCommand) => {
    ++circleRound;
    signalStrength += calculateSignalStrength(circleRound, x);

    if (addx) {
      ++circleRound;
      signalStrength += calculateSignalStrength(circleRound, x);

      x += addx;
    }
  });

  console.log(signalStrength);
};

// const task2 = (): void => {};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_10.txt'));
  const circleCommands = file.split('\n');
  const commands: TCircleCommand[] = circleCommands.map((command: string) => {
    if (command.includes(' ')) {
      const [cmd, xValue] = command.split(' ');
      return { command: cmd, addx: +xValue } as TCircleCommand;
    }

    return { command } as TCircleCommand;
  });

  task1(commands);
};

main();
