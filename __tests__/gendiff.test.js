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
  const file1 = readFile('file1.json');
  const file2 = readFile('file2.json');
  const expectedDifferences = readFile('expectedDiff.txt');
  expect(stylish(generateDifference(parseFiles(file1, file2, '.json')))).toEqual(expectedDifferences);
});
test('generate yaml difference', () => {
  const file1 = readFile('file1.yml');
  const file2 = readFile('file2.yml');
  const expectedDifferences = readFile('expectedDiff.txt');
  expect(stylish(generateDifference(parseFiles(file1, file2, '.yml')))).toEqual(expectedDifferences);
});
test('generate json difference with nested structure', () => {
  const file1 = readFile('file1nested.json');
  const file2 = readFile('file2nested.json');
  const expectedDifferences = readFile('expectedDiffNested.txt');
  const expectedDifferencesPlain = readFile('expectedDiffPlain.txt');
  expect(stylish(generateDifference(parseFiles(file1, file2, '.json')))).toEqual(expectedDifferences);
  expect(plain(generateDifference(parseFiles(file1, file2, '.json')))).toEqual(expectedDifferencesPlain);
});
