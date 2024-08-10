#!/usr/bin/env node

import { program } from 'commander';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import parseFiles from '../src/parseFiles.js';

const normalizedPath = (filePath) => (filePath.startsWith('../') ? filePath.replace('../', '') : filePath);
const defineFormat = (file) => {
  const fileExt = path.parse(file).ext;
  return fileExt;
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const file1Data = readFileSync(normalizedPath(filepath1));
    const file2Data = readFileSync(normalizedPath(filepath2));
    const fileExt = defineFormat(filepath1);
    parseFiles(file1Data, file2Data, fileExt);
  })
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
