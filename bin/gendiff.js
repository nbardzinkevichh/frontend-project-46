#!/usr/bin/env node

import { program } from 'commander';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import parseFiles from '../src/parseFiles.js';
import _ from 'lodash';

const normalizedPath = (filePath) => (filePath.startsWith('../') ? filePath.replace('../', '') : filePath);
const defineFormat = (file) => path.parse(file).ext;
const genDiff = (fileData) => {
  const dataKeysSorted = fileData.map((data) => _.pick(data, Object.keys(data).sort()));
  const [data1, data2] = dataKeysSorted;
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);
  const dataKeys = _.union(dataKeys1, dataKeys2);
  let differences = '{\n';
  for (const key of dataKeys) {
      if (!Object.hasOwn(data1, key)) {
        differences += `  + ${key}: ${data2[key]}\n`;
      } else if (!Object.hasOwn(data2, key)) {
        differences += `  - ${key}: ${data1[key]}\n`;
      } else if (data1[key] !== data2[key]) {
        differences += `  - ${key}: ${data1[key]}\n`;
        differences += `  + ${key}: ${data2[key]}\n`;
      } else {
        differences += `    ${key}: ${data1[key]}\n`;
      }
  }
  differences = differences.trim() + '\n}';
  return differences;
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
    console.log(genDiff(parseFiles(file1Data, file2Data, fileExt)));
  })
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
