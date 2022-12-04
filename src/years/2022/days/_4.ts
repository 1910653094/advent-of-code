import { reader } from '../../../outils';
import * as path from 'path';

const task1 = (pairs: string[]): void => {
  let fullContained: number = 0;
  for (const pair of pairs) {
    const [firstElveSection, secondElveSection] = pair.split(',');
    let [firstSectionStart, firstSectionEnd] = firstElveSection.split('-');
    let [secondSectionStart, secondSectionEnd] = secondElveSection.split('-');

    if (
      (+firstSectionStart <= +secondSectionStart &&
        +firstSectionEnd >= +secondSectionEnd) ||
      (+firstSectionStart >= +secondSectionStart &&
        +firstSectionEnd <= +secondSectionEnd)
    ) {
      ++fullContained;
    }
  }

  console.log(fullContained);
};

const task2 = (pairs: string[]): void => {
  let fullContained: number = 0;
  for (const pair of pairs) {
    const [firstElveSection, secondElveSection] = pair.split(',');
    let [firstSectionStart, firstSectionEnd] = firstElveSection.split('-');
    let [secondSectionStart, secondSectionEnd] = secondElveSection.split('-');

    if (
      (+firstSectionStart <= +secondSectionEnd &&
        +firstSectionEnd >= +secondSectionStart) ||
      (+firstSectionStart >= +secondSectionEnd &&
        +firstSectionEnd <= +secondSectionStart)
    ) {
      ++fullContained;
    }
  }

  console.log(fullContained);
};

const main = (): void => {
  const file = reader(path.join(__dirname, '../input/_4.txt'));
  const pairs = file.split('\n');

  task1(pairs);
  task2(pairs);
};

main();
