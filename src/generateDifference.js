import _ from 'lodash';

const generateDifference = (fileData) => {
  const dataKeysSorted = fileData.map((data) => _.pick(data, Object.keys(data).sort()));
  const [data1, data2] = dataKeysSorted;
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);
  const dataKeys = _.union(dataKeys1, dataKeys2);
  // change 'for' to reduce method
  let differences = '{\n';
  for (const key of dataKeys) {
    if (!Object.hasOwn(data1, key)) {
      differences += `  + ${key}: ${data2[key]}\n`;
    } else if (!Object.hasOwn(data2, key)) {
      differences += `  - ${key}: ${data1[key]}\n`;
    } else if (data1[key] !== data2[key]) {
      differences += `  - ${key}: ${data1[key]}\n`;
      differences += `  + ${key}: ${data2[key]}\n`;
    } else {
      differences += `    ${key}: ${data1[key]}\n`;
    }
  }
  differences = `${differences.trim()}\n}`;
  return differences;
};

export default generateDifference;
