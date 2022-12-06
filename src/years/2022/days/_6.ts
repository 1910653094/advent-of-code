import { reader } from '../../../outils';
import * as path from 'path';

const stringHasRepeats = (toCheck: string): boolean => /(.).*\1/.test(toCheck);

const task1 = (elveDatastreamBuffer: string): void => {
  const bufferLetters = elveDatastreamBuffer.split('');
  let processedCharactersIndex = 0;
  let startOfPacketMarker = '';

  for (
    ;
    processedCharactersIndex < bufferLetters.length;
    processedCharactersIndex++
  ) {
    if (startOfPacketMarker.length === 4) {
      startOfPacketMarker = startOfPacketMarker.substring(1);
    }

    startOfPacketMarker += bufferLetters[processedCharactersIndex];

    if (
      startOfPacketMarker.length === 4 &&
      !stringHasRepeats(startOfPacketMarker)
    ) {
      ++processedCharactersIndex; // because of 0 index, but we need the sum of processed chars
      break;
    }
  }

  console.log(processedCharactersIndex);
};

const task2 = (elveDatastreamBuffer: string): void => {};

const main = (): void => {
  const elveDatastreamBuffer = reader(path.join(__dirname, '../input/_6.txt'));

  task1(elveDatastreamBuffer);
  task2(elveDatastreamBuffer);
};

main();
