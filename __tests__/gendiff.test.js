import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generateDifference from '../src/generateDifference.js';
import parseFiles from '../src/parseFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('generate difference', () => {
  const file1 = readFile('file1.json');
  const file2 = readFile('file2.json');
  const expectedDifferences = readFile('expectedDiff.txt');
  expect(generateDifference(parseFiles(file1, file2, '.json'))).toEqual(expectedDifferences);
});
