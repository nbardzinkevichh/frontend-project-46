import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './jsonFormatter.js';
import generateDifference from '../src/generateDifference.js';

const formatter = (option, parsedFiles) => {
  switch (option) {
    case 'plain':
      return plain(generateDifference(parsedFiles));
    case 'json':
      return JSON.stringify(jsonFormatter(generateDifference(parsedFiles)), null, 2);
    default:
      return stylish(generateDifference(parsedFiles));
  }
};

export default formatter;
