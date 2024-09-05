import _ from 'lodash';

const countIndentSize = (depth, replacer = ' ', spacesCount = 4) => {
  const indentSize = (depth * spacesCount) - 2;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount + 2);
  return [currentIndent, bracketIndent];
};

const stringify = (object, depth) => {
  if (!_.isObject(object)) {
    return `${object}`;
  }
  const [currentIndent, bracketIndent] = countIndentSize(depth);
  const lines = Object
    .entries(object)
    .map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data) => {
  const formatter = (tree, depth) => {
    const [currentIndent, bracketIndent] = countIndentSize(depth);
    const styledData = tree.flatMap((object) => {
      switch (object.type) {
        case 'added':
          return `${currentIndent}+ ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent}- ${object.key}: ${stringify(object.firstValue, depth + 1)}`,
            `${currentIndent}+ ${object.key}: ${stringify(object.secondValue, depth + 1)}`,
          ];
        default:
          return `${currentIndent}  ${object.key}: ${formatter(object.value, depth + 1)}`;
      }
    });
    return [
      '{',
      ...styledData,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return formatter(data, 1);
};

export default stylish;
