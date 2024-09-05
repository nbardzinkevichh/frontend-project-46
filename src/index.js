import path from 'node:path';
import { readFileSync } from 'node:fs';

import parseFiles from './parsers.js';
import formatter from '../formatters/index.js';
import generateDifference from './generateDifference.js';

const gendiff = (filepath1, filepath2, format) => {
  // add try catch to open files
  // add support json and yml differences at the same time
  const readFile = (filename) => readFileSync(filename, 'utf-8');
  const ext = path.extname(filepath1);
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const parsedFiles = [parseFiles(data1, ext), parseFiles(data2, ext)];
  const difference = generateDifference(parsedFiles);
  const formattedDifference = formatter(difference, format);
  return formattedDifference;
};

export default gendiff;
