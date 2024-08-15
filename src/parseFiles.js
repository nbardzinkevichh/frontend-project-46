import { parse as yamlParse, stringify } from 'yaml';

const parseFiles = (file1Data, file2Data, ext) => {
  if (ext === '.json') {
    const parsedFile1Data = JSON.parse(file1Data);
    const parsedFile2Data = JSON.parse(file2Data);
    return [parsedFile1Data, parsedFile2Data];
  } if (ext === '.yaml') {
    const parsedFile1Data = yamlParse(file1Data);
    const parsedFile2Data = yamlParse(file2Data);
    return [parsedFile1Data, parsedFile2Data];
  }
};
export default parseFiles;
