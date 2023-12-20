import { reader } from '../../../outils';
import * as path from 'path';

const singleDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const singleDigitsAsWord = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const findFirstNumber = (calibration: string) => {
  let numberInString = '';
  for (let char of calibration) {
    if (singleDigits.includes(char)) {
      numberInString = char;
      break;
    }
  }

  return numberInString;
};

const findFirstNumberOrString = (
  calibration: string,
  digitsAsString: string[],
) => {
  let match = '';
  for (let charIdx = 0; charIdx < calibration.length; charIdx++) {
    const currSubString = calibration.substring(0, charIdx + 1);
    const singleDigitAsString = digitsAsString.find((digitAsString) =>
      currSubString.includes(digitAsString),
    );
    if (singleDigitAsString) {
      match = (digitsAsString.indexOf(singleDigitAsString) + 1).toString();
      break;
    }

    const singleDigit = singleDigits.find((digit) =>
      currSubString.includes(digit),
    );
    if (singleDigit) {
      match = singleDigit;
      break;
    }
  }

  return match;
};

const task1 = (calibrations: string[]) =>
  calibrations
    .map((calibration) => {
      const first = findFirstNumber(calibration);
      const last = findFirstNumber(calibration.split('').reverse().join(''));
      return +`${first}${last}`;
    })
    .reduce((prev, curr) => prev + curr, 0);

const task2 = (calibrations: string[]) =>
  calibrations
    .map((calibration) => {
      const first = findFirstNumberOrString(calibration, singleDigitsAsWord);
      const last = findFirstNumberOrString(
        calibration.split('').reverse().join(''),
        singleDigitsAsWord.map((word) => word.split('').reverse().join('')),
      );
      return +`${first}${last}`;
    })
    .reduce((prev, curr) => prev + curr, 0);

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_1.txt'));
  const calibrations = file.split('\n');

  console.log(task1(calibrations));
  console.log(task2(calibrations));
};

main();
