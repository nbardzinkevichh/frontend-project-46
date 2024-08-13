import { parse as yamlParse, stringify } from 'yaml';

const parseFiles = (file1, file2, ext) => {
  if (ext === '.json') {
    const parsedFile1Data = JSON.parse(file1);
    const parsedFile2Data = JSON.parse(file2);
    return [parsedFile1Data, parsedFile2Data];
  } else if (ext === '.yaml') {
    const parsedFile1Data = yamlParse(file1);
    const parsedFile2Data = yamlParse(file2);
    return [parsedFile1Data, parsedFile2Data];
  }
};
export default parseFiles;
