import yaml from 'js-yaml';

const parseFiles = (file1Data, file2Data, ext) => {
  // factory ???
  // if (ext === '.json') {
  //   return [JSON.parse(file1Data), JSON.parse(file2Data)];
  // } if (ext === '.yml') {
  //   return [yaml.load(file1Data), yaml.load(file2Data)];
  // }
  let parsedFile1Data;
  let parsedFile2Data;
  switch (ext) {
    case '.json':
      parsedFile1Data = JSON.parse(file1Data);
      parsedFile2Data = JSON.parse(file2Data);
      break;
    case ('.yml' || '.yaml'):
      parsedFile1Data = yaml.load(file1Data);
      parsedFile2Data = yaml.load(file2Data);
      break;
    default:
      break;
  }
  return [parsedFile1Data, parsedFile2Data];
};
export default parseFiles;
