import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generateDifference from '../src/generateDifference.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import parseFiles from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('generate json difference', () => {
  const file1 = parseFiles(readFile('file1.json'), '.json');
  const file2 = parseFiles(readFile('file2.json'), '.json');
  const expectedDifferences = readFile('expectedDiff.txt');
  expect(stylish(generateDifference([file1, file2]))).toEqual(expectedDifferences);
});
test('generate yaml difference', () => {
  const file1 = parseFiles(readFile('file1.yml'), '.yml');
  const file2 = parseFiles(readFile('file2.yml'), '.yml');
  const expectedDifferences = readFile('expectedDiff.txt');
  expect(stylish(generateDifference([file1, file2]))).toEqual(expectedDifferences);
});
test('generate json difference with nested structure', () => {
  const file1 = parseFiles(readFile('file1nested.json'), '.json');
  const file2 = parseFiles(readFile('file2nested.json'), '.json');
  const expectedDifferences = readFile('expectedDiffNested.txt');
  const expectedDifferencesPlain = readFile('expectedDiffPlain.txt');
  expect(stylish(generateDifference([file1, file2]))).toEqual(expectedDifferences);
  expect(plain(generateDifference([file1, file2]))).toEqual(expectedDifferencesPlain);
});
