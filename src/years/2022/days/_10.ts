import { reader } from '../../../outils';
import * as path from 'path';

type TCircleCommand = {
  readonly command: 'noop' | 'addx';
  readonly addx?: number;
};

type TPixel = '#' | '.';

const calculateSignalStrength = (round: number, x: number): number => {
  const rounds = [20, 60, 100, 140, 180, 220];

  if (rounds.includes(round)) return round * x;

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

const drawPixel = (pixelPosition: number, x: number): TPixel => {
  if (Math.abs(pixelPosition - x) <= 1) return '#';

  return '.'; // to see the letters replace '.' by ' '
};

const task2 = (commands: TCircleCommand[]): void => {
  let circleRound = 0; // every 40 rounds new line
  let spritePosition = 1; // length of 3 so it goes from 0 to 2;
  let pixels: TPixel[][] = [];

  commands.forEach(({ addx }: TCircleCommand) => {
    ++circleRound;
    if (circleRound % 40 === 1) {
      circleRound = 1;
      pixels.push([]);
    }
    pixels[pixels.length - 1].push(drawPixel(circleRound - 1, spritePosition));

    if (addx) {
      ++circleRound;
      if (circleRound % 40 === 1) {
        circleRound = 1;
        pixels.push([]);
      }
      pixels[pixels.length - 1].push(
        drawPixel(circleRound - 1, spritePosition),
      );

      spritePosition += addx;
    }
  });

  pixels.forEach((pixelLine: TPixel[]) => console.log(pixelLine.join('')));
};

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
  task2(commands);
};

main();
