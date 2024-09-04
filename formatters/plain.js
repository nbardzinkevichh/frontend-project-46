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
      if (object.type === 'added') {
        return `Property '${path}${object.key}' was added with value: ${getComplexValue(object.value)}`;
      }
      if (object.type === 'deleted') {
        return `Property '${path}${object.key}' was removed`;
      }
      if (object.type === 'changed') {
        return `Property '${path}${object.key}' was updated. From ${getComplexValue(object.firstValue)} to ${getComplexValue(object.secondValue)}`;
      }
      if (object.type === 'hasChild') {
        return formatter(object.value, `${path}${object.key}.`);
      }
    });
    return [
      ...styledData,
    ].filter((value) => value !== undefined).join('\n');
  };
  return formatter(data, '');
};

export default plain;
