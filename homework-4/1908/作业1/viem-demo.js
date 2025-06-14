// deploy-viem.js
require("dotenv").config();

const { createPublicClient, createWalletClient, http, defineChain } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { localhost } = require("viem/chains");
const fs = require("fs");

// 明确指定 Hardhat 本地链参数（chainId 必须 31337！）
const hardhatChain = defineChain({
  id: 31337,
  name: "Hardhat",
  network: "hardhat",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
});

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(PRIVATE_KEY);

// 1. 读取ABI和bytecode
const artifact = JSON.parse(fs.readFileSync("./artifacts/contracts/storage.sol/Storage.json"));
const abi = artifact.abi;
const bytecode = artifact.bytecode;


// 2. 创建 client
const publicClient = createPublicClient({ chain: hardhatChain, transport: http() });
const walletClient = createWalletClient({ account, chain: hardhatChain, transport: http() });

async function main() {
  // 3. 部署合约
  const hash = await walletClient.deployContract({
    abi,
    bytecode,
    args: [],
  });
  console.log("Deploy tx hash:", hash);

  // 4. 等待部署确认
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  const contractAddress = receipt.contractAddress;
  console.log("Deployed at:", contractAddress);

  // 5. 随机设置新值
  const randomValue1 = Math.floor(Math.random() * 10000);
  const setHash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "set",
    args: [randomValue1],
  });
  await publicClient.waitForTransactionReceipt({ hash: setHash });
  console.log("Set value to", randomValue1);

  // 6. 读取当前值
  const val = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "get",
  });
  console.log("Get value:", val.toString());

  // 7. 监听事件（只要有新事件就会打印）
  const stop = publicClient.watchEvent({
    address: contractAddress,
    abi,
    eventName: "ValueChanged",
    onLogs: (logs) => {
      logs.forEach(log => {
        console.log("ValueChanged event", log.args);
      });
    },
  });

  // 8. 再设置新值，触发事件
  const randomValue2 = Math.floor(Math.random() * 10000);
  const setHash2 = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "set",
    args: [randomValue2],
  });
  await publicClient.waitForTransactionReceipt({ hash: setHash2 });
  console.log("Set value to", randomValue2);

  // 9. 等3秒观察事件，退出
  setTimeout(() => {
    stop();
    process.exit(0);
  }, 3000);
}
