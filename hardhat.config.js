require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    "base-mainnet": {
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIV_KEY], 
      gasPrice: 1000000000
    },
    "base-sepolia": {
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIV_KEY], 
      gasPrice: 1000000000
    },
    "base-local": {
      url: "http://localhost:8545",
      accounts: [process.env.PRIV_KEY], 
      gasPrice: 1000000000
    },
  },
  defaultNetwork: "hardhat",
};
