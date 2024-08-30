import _ from 'lodash';

const generateDifference = (fileData) => {
  const [data1, data2] = fileData;
  const sortedUnicKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const resultObj = sortedUnicKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!Object.hasOwn(data1, key)) {
      return { key, value: value2, type: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: value1, type: 'deleted' };
    }
    if (_.isEqual(value1, value2)) {
      return { key, value: value2, type: 'unchanged' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, value: generateDifference([value1, value2]), type: 'hasChild' };
    }
    return {
      key,
      firstValue: value1,
      secondValue: value2,
      type: 'changed',
    };
  });
  return resultObj;
};

export default generateDifference;
