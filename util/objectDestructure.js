function objVal(value, arg) {
  return Object.values(value).map((objVal) => {
    return arg(objVal);
  });
}

module.exports = objVal;
