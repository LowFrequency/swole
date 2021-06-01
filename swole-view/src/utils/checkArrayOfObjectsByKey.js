export const checkArrayOfObjectsByKey = ({ checkArray = [], key = null, value = null } = {}) => {
  const result = checkArray.find((element) => element[key] === value);
  return result;
}