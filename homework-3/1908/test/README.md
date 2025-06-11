测试步骤：
1. 初始 num=0
2. 代理合约 callAddOne，传入逻辑合约地址 0x2020A1...
3. num 成功加 1，多次调用可累加
4. 过程和结果截图如下：
![](https://github.com/ljjathena/2025-17-solidity-on-polkadot/raw/main/homework-3/1908/test/%E5%90%88%E7%BA%A6%E9%83%A8%E7%BD%B2%E6%88%90%E5%8A%9F.png)
- LogicContract、ProxyContract 已成功部署，合约地址如下：
   - LogicContract: 0x2020A1987ce8873C7281F63f05AE515295a2438C
   - ProxyContract: 0xC8Ec4e3b600d02d58a88399Ef87a1E968aE56a2F
