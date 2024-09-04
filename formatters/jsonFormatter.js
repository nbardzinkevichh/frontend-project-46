import _ from 'lodash';

const stringify = (object) => {
  if (!_.isObject(object)) {
    return object;
  }
  const lines = Object
    .entries(object)
    .map(([key, value]) => ({ [key]: stringify(value) }));
  return _.merge(...lines);
};

const jsonFormatter = (data) => {
  const formatter = (tree, groupName) => {
    const styledData = tree.map((object) => {
      switch (object.type) {
        case 'added':
          return { added: { [object.key]: stringify(object.value) } };
        case 'deleted':
          return { deleted: { [object.key]: stringify(object.value) } };
        case 'changed':
          return {
            changed: {
              from: { [object.key]: stringify(object.firstValue) },
              to: { [object.key]: stringify(object.secondValue) },
            },
          };
        case 'unchanged':
          return { unchanged: { [object.key]: stringify(object.value) } };
        default:
          return formatter(object.value, object.key);
      }
    });
    return _.merge(...styledData);
  };

  return formatter(data, '');
};

export default jsonFormatter;
