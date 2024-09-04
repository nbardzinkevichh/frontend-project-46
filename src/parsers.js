import yaml from 'js-yaml';

const parseFiles = (fileData, ext) => {
  if (ext === '.json') {
    return JSON.parse(fileData);
  }
  if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(fileData);
  }
};
export default parseFiles;
