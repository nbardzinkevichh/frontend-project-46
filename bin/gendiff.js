#!/usr/bin/env node

import { program } from 'commander';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import generateDifference from '../src/generateDifference.js';
import parseFiles from '../src/parsers.js';

// add try catch structure to deal with wrong file names
// change path normalization to use node.path instead
const normalizedPath = (filePath) => (filePath.startsWith('../') ? filePath.replace('../', '') : filePath);

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const file1Data = readFileSync(normalizedPath(filepath1));
    const file2Data = readFileSync(normalizedPath(filepath2));
    const ext = path.extname(filepath1);
    console.log(generateDifference(parseFiles(file1Data, file2Data, ext)));
  })
  .option('-f, --format [type]', 'output format')
  .parse();
