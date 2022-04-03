import { BigNumber, utils } from "ethers";

const fromBNtoEth = (value) => {
  return utils.formatEther(value);
};
const parseEther = (value) => {
  return utils.parseEther(value);
};
const parseUnits = (value, decimals) => {
  return utils.parseUnits(value, decimals);
};

//from BN to string
const formatUntis = (value, decimals) => {
  return utils.formatUnits(value, decimals);
};
const toBigNumber = (value) => {
  return BigNumber.from(value);
};

const fromBNtoString = (value) => {
  return value.toString();
};
const addBN = (value, add) => {
  return value.add(add);
};
const multiplyBN = (value, multiply) => {
  return value.mul(multiply);
};
const isGraterThanBN = (value, compare) => {
  return value.gt(compare);
};
const isGreatOrEqualThanBN = (value, compare) => {
  return value.gte(compare);
};
const hexlify = (value) => {
  return utils.hexlify(value);
};
export {
  fromBNtoEth,
  parseEther,
  parseUnits,
  toBigNumber,
  addBN,
  multiplyBN,
  isGraterThanBN,
  isGreatOrEqualThanBN,
  hexlify,
  fromBNtoString,
  formatUntis,
};
