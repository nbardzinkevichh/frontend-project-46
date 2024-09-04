import _ from 'lodash';

const getComplexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'boolean' || value === null || typeof value === 'number') {
    return value;
  }
  return `'${value}'`;
};

const plain = (data) => {
  const formatter = (tree, path) => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const styledData = tree.flatMap((object) => {
      switch (object.type) {
        case 'added':
          return `Property '${path}${object.key}' was added with value: ${getComplexValue(object.value)}`;
        case 'deleted':
          return `Property '${path}${object.key}' was removed`;
        case 'changed':
          return `Property '${path}${object.key}' was updated. From ${getComplexValue(object.firstValue)} to ${getComplexValue(object.secondValue)}`;
        case 'hasChild':
          return formatter(object.value, `${path}${object.key}.`);
        default:
          break;
      }
    });
    return [
      ...styledData,
    ].filter((value) => value !== undefined).join('\n');
  };
  return formatter(data, '');
};

export default plain;
