import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './jsonFormatter.js';

const formatter = (data, format) => {
  switch (format) {
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(jsonFormatter(data), null, 2);
    default:
      return stylish(data);
  }
};

export default formatter;
