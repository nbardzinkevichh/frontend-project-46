import yaml from 'js-yaml';

// eslint-disable-next-line consistent-return
const parseFiles = (fileData, ext) => {
  if (ext === '.json') {
    return JSON.parse(fileData);
  }
  if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(fileData);
  }
};
export default parseFiles;
