import { reader } from '../../../outils';
import * as path from 'path';

enum EMoves {
  up = 'U',
  right = 'R',
  down = 'D',
  left = 'L',
}

type TMove = {
  readonly move: EMoves;
  readonly stepAmount: number;
};

type TPosition = {
  readonly x: number;
  readonly y: number;
};

const moveHead = (move: EMoves, headPos: TPosition): TPosition => {
  let newHeadPos: TPosition;

  switch (move) {
    case EMoves.up:
      newHeadPos = { ...headPos, y: headPos.y - 1 };
      break;

    case EMoves.right:
      newHeadPos = { ...headPos, x: headPos.x + 1 };
      break;

    case EMoves.down:
      newHeadPos = { ...headPos, y: headPos.y + 1 };
      break;

    default:
      newHeadPos = { ...headPos, x: headPos.x - 1 };
      break;
  }

  return newHeadPos;
};

const headAndTailTouch = (head: TPosition, tail: TPosition): boolean =>
  Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2;

const headTailSameRowOrCol = (head: TPosition, tail: TPosition): boolean =>
  head.x === tail.x || head.y === tail.y;

const moveTail = (
  move: EMoves,
  tailPos: TPosition,
  headPos: TPosition,
): TPosition => {
  // if head and tail are still touching, tail does not move
  if (headAndTailTouch(headPos, tailPos)) return tailPos;

  // if head and tail are on the same row or column, tail moves one position in the same direction
  if (headTailSameRowOrCol(headPos, tailPos)) {
    return moveHead(move, tailPos); // tail does the same move as head
  }

  let diagonalMove: EMoves;
  if (headPos.y - tailPos.y > 1) diagonalMove = EMoves.down;
  else if (tailPos.y - headPos.y > 1) diagonalMove = EMoves.up;
  else if (headPos.x - tailPos.x > 1) diagonalMove = EMoves.right;
  else diagonalMove = EMoves.left;

  let newTailPos: TPosition;
  // tail needs to move diagonally
  switch (diagonalMove) {
    case EMoves.down:
    case EMoves.up:
      if (headPos.x - tailPos.x > 0) {
        newTailPos = { ...moveHead(diagonalMove, tailPos), x: tailPos.x + 1 };
      } else {
        newTailPos = { ...moveHead(diagonalMove, tailPos), x: tailPos.x - 1 };
      }
      break;

    default:
      if (headPos.y - tailPos.y > 0) {
        newTailPos = { ...moveHead(diagonalMove, tailPos), y: tailPos.y + 1 };
      } else {
        newTailPos = { ...moveHead(diagonalMove, tailPos), y: tailPos.y - 1 };
      }
      break;
  }

  return newTailPos;
};

const checkIfTailIsAtNewPosition = (
  currentTailPos: TPosition,
  tailPositions: TPosition[],
): boolean =>
  tailPositions.filter(
    (position: TPosition) =>
      position.x === currentTailPos.x && position.y === currentTailPos.y,
  ).length === 0;

const task1 = (moves: TMove[]): void => {
  const tailVisitedPosition: TPosition[] = [{ x: 0, y: 0 }];
  let currentHeadPosition: TPosition = { x: 0, y: 0 };
  let currentTailPosition: TPosition = { x: 0, y: 0 };

  moves.forEach(({ move, stepAmount }: TMove) => {
    for (let i = 1; i <= stepAmount; i++) {
      currentHeadPosition = moveHead(move, currentHeadPosition);
      currentTailPosition = moveTail(
        move,
        currentTailPosition,
        currentHeadPosition,
      );
      if (
        checkIfTailIsAtNewPosition(currentTailPosition, tailVisitedPosition)
      ) {
        tailVisitedPosition.push(currentTailPosition);
      }
    }
  });

  console.log(tailVisitedPosition.length);
};

const task2 = (moves: TMove[]): void => {
  const tailVisitedPosition: TPosition[] = [{ x: 0, y: 0 }];
  const rope: TPosition[] = [...Array(10).keys()].map(
    () => ({ x: 0, y: 0 } as TPosition),
  );

  moves.forEach(({ move, stepAmount }: TMove) => {
    for (let i = 1; i <= stepAmount; i++) {
      rope[0] = moveHead(move, rope[0]);
      for (let knotIdx = 1; knotIdx < rope.length; knotIdx++) {
        rope[knotIdx] = moveTail(move, rope[knotIdx], rope[knotIdx - 1]);
      }

      const currentTailPosition = rope[rope.length - 1];
      if (
        checkIfTailIsAtNewPosition(currentTailPosition, tailVisitedPosition)
      ) {
        tailVisitedPosition.push(currentTailPosition);
      }
    }
    console.log(move, stepAmount);
    // console.log('Head', rope[0]);
    // console.log('4', rope[4]); // stimmt noch
    // console.log('8', rope[8]); // folgt nicht mehr -> wsl weil bei der ersten runde nicht alle sich bewegen ?? wo is der fehler
    console.log('Tail', tailVisitedPosition);
  });

  console.log(tailVisitedPosition.length);
};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_9.txt'));
  const movements = file.split('\n');
  const moves: TMove[] = movements.map((movement: string) => {
    const [move, stepAmount] = movement.split(' ');
    return {
      move: move as EMoves,
      stepAmount: +stepAmount,
    } as TMove;
  });

  task1(moves);
  task2(moves);
};

main();
