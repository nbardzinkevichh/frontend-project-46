#!/usr/bin/env node

import { program } from 'commander';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { readFileSync } from 'node:fs';

import generateDifference from '../src/generateDifference.js';
import parseFiles from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const normalizedPath = (filename) => path.join(__dirname, '..', 'mock_data', filename);

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
