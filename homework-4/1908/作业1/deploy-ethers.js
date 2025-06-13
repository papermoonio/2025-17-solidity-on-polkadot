// deploy-ethers.js
const { ethers } = require("hardhat");

async function main() {
  // 1. 获取账号
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  // 2. 部署合约
  const Storage = await ethers.getContractFactory("Storage");
  const storage = await Storage.deploy();
  await storage.waitForDeployment();
  const contractAddress = await storage.getAddress();
  console.log("Contract deployed to:", contractAddress);

  // 3. 随机设置新值
  const randomValue1 = Math.floor(Math.random() * 10000);
  let tx = await storage.set(randomValue1);
  await tx.wait();
  console.log("Set value to", randomValue1);

  // 4. 读取当前值
  let value = await storage.get();
  console.log("Get value:", value.toString());

  // 5. 监听事件
  storage.on("ValueChanged", (newValue) => {
    console.log(`Event ValueChanged: new=${newValue}`);
  });

  // 6. 再写一次新值
  const randomValue2 = Math.floor(Math.random() * 10000);
  tx = await storage.set(randomValue2);
  await tx.wait();
  console.log("Set value to", randomValue2);

  // 7. 再等3秒，退出
  setTimeout(() => process.exit(0), 3000);
}

main();
