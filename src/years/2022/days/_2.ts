import path from 'path';
import { reader } from '../../../outils';

const rock = 1;
const paper = 2;
const scissors = 3;
const loss = 0;
const draw = 3;
const win = 6;

enum Moves {
  opponentRock = 'A',
  opponentPaper = 'B',
  opponentScissors = 'C',
  myRock = 'X',
  myPaper = 'Y',
  myScissors = 'Z',
}

const getPoints = (move: string): number => {
  if (move === Moves.myRock || move === Moves.opponentRock) return rock;
  if (move === Moves.myPaper || move === Moves.opponentPaper) return paper;
  return scissors;
};

const getMove = (opponent: string, needAWin: boolean): Moves => {
  if (needAWin) {
    if (opponent === Moves.opponentRock) return Moves.myPaper;

    if (opponent === Moves.opponentScissors) return Moves.myRock;

    return Moves.myScissors;
  }

  if (opponent === Moves.opponentRock) return Moves.myScissors;

  if (opponent === Moves.opponentPaper) return Moves.myRock;

  return Moves.myPaper;
};

const task1 = (input: string): void => {
  const moves = input.split('\n');

  const points = moves.reduce((sum: number, move: string) => {
    const [opponent, me] = move.split(' ');

    // win
    if (
      (opponent === Moves.opponentRock && me === Moves.myPaper) ||
      (opponent === Moves.opponentPaper && me === Moves.myScissors) ||
      (opponent === Moves.opponentScissors && me === Moves.myRock)
    ) {
      return sum + win + getPoints(me);
    }

    // loss
    if (
      (opponent === Moves.opponentRock && me === Moves.myScissors) ||
      (opponent === Moves.opponentPaper && me === Moves.myRock) ||
      (opponent === Moves.opponentScissors && me === Moves.myPaper)
    ) {
      return sum + loss + getPoints(me);
    }

    // draw
    return sum + draw + getPoints(me);
  }, 0);

  console.log(points);
};

const task2 = (input: string): void => {
  const lossMove = 'X';
  const winMove = 'Z';

  const moves = input.split('\n');

  const points = moves.reduce((sum: number, move: string) => {
    const [opponent, outcome] = move.split(' ');

    // loss
    if (outcome === lossMove) {
      return sum + loss + getPoints(getMove(opponent, false));
    }

    // win
    if (outcome === winMove) {
      return sum + win + getPoints(getMove(opponent, true));
    }

    // draw
    return sum + draw + getPoints(opponent);
  }, 0);

  console.log(points);
};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_2.txt'));

  task1(file);
  task2(file);
};

main();
