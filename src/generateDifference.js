import _ from 'lodash';

const generateDifference = (fileData) => {
  const dataKeysSorted = fileData.map((data) => _.pick(data, Object.keys(data).sort()));
  const [data1, data2] = dataKeysSorted;
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);
  const dataKeys = _.union(dataKeys1, dataKeys2);
  const differences = dataKeys.reduce((acc, current) => {
    let newAcc = acc;
    if (!Object.hasOwn(data1, current)) {
      newAcc += `  + ${current}: ${data2[current]}\n`;
    } else if (!Object.hasOwn(data2, current)) {
      newAcc += `  - ${current}: ${data1[current]}\n`;
    } else if (data1[current] !== data2[current]) {
      newAcc += `  - ${current}: ${data1[current]}\n`;
      newAcc += `  + ${current}: ${data2[current]}\n`;
    } else {
      newAcc += `    ${current}: ${data1[current]}\n`;
    }
    return newAcc;
  }, '{\n');

  return differences.concat('}');
};

export default generateDifference;
