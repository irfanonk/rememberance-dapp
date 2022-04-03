const formatAddress = (address) => {
  return address.slice(0, 5) + "..." + address.slice(-4);
};

const formatBalance = (balance) => {
  return balance.slice(0, 5);
};

export { formatAddress, formatBalance };
