import { reader } from '../../../outils';
import * as path from 'path';

const stringHasRepeats = (toCheck: string): boolean => /(.).*\1/.test(toCheck);

const getMarker = (dataStream: string, sizeOfMarker: number): number => {
  const bufferLetters = dataStream.split('');
  let processedCharactersIndex = 0;
  let startOfXMarker = ''; // if sizeOfMarker is 4 -> X = packet; else X = message

  for (
    ;
    processedCharactersIndex < bufferLetters.length;
    processedCharactersIndex++
  ) {
    if (startOfXMarker.length === sizeOfMarker) {
      startOfXMarker = startOfXMarker.substring(1);
    }

    startOfXMarker += bufferLetters[processedCharactersIndex];

    if (
      startOfXMarker.length === sizeOfMarker &&
      !stringHasRepeats(startOfXMarker)
    ) {
      ++processedCharactersIndex; // because of 0 index, but we need the sum of processed chars
      break;
    }
  }

  return processedCharactersIndex;
};

const task1 = (elveDatastreamBuffer: string): void => {
  console.log(getMarker(elveDatastreamBuffer, 4));
};

const task2 = (elveDatastreamBuffer: string): void => {
  console.log(getMarker(elveDatastreamBuffer, 14));
};

const main = (): void => {
  const elveDatastreamBuffer = reader(path.join(__dirname, '../input/_6.txt'));

  task1(elveDatastreamBuffer);
  task2(elveDatastreamBuffer);
};

main();
