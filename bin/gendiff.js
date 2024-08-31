#!/usr/bin/env node

import { program } from 'commander';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'node:fs';

import generateDifference from '../src/generateDifference.js';
import parseFiles from '../src/parsers.js';
// import stylish from '../src/formatters.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFilesPath(filename), 'utf-8');

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    // add try catch to open files
    const file1Data = readFile(filepath1);
    const file2Data = readFile(filepath2);
    const ext = path.extname(filepath1);
    const parsedFiles = parseFiles(file1Data, file2Data, ext);
    switch (options.format) {
      case 'plain':
        console.log(plain(generateDifference(parsedFiles)));
        break;
      default:
        console.log(stylish(generateDifference(parsedFiles)));
    }
  })
  .parse();
