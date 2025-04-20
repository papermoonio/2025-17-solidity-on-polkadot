require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28", // Solidity 版本
  networks: {
    // 本地开发网络
    hardhat: {
      chainId: 31337,
    }
  },
  etherscan: {
    apiKey: "YOUR_ETHERSCAN_API_KEY", // 合约验证用
  },
  gasReporter: {
    enabled: true, // 测试时显示 Gas 消耗
    currency: "USD",
  }
};