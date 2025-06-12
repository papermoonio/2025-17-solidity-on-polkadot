测试步骤：
1. 初始 num=0
2. 代理合约 callAddOne，传入逻辑合约地址 0x2020A1987ce8873C7281F63f05AE515295a2438C
3. num 成功加 1，多次调用可累加
4. 过程和结果截图如下：
![](https://github.com/ljjathena/2025-17-solidity-on-polkadot/raw/main/homework-3/1908/test/%E5%90%88%E7%BA%A6%E9%83%A8%E7%BD%B2%E6%88%90%E5%8A%9F.png)
- LogicContract、ProxyContract 已成功部署，合约地址如下：
   - LogicContract: 0x2020A1987ce8873C7281F63f05AE515295a2438C
   - ProxyContract: 0xC8Ec4e3b600d02d58a88399Ef87a1E968aE56a2F
![](https://github.com/ljjathena/2025-17-solidity-on-polkadot/raw/main/homework-3/1908/test/%E4%BB%A3%E7%90%86%E5%90%88%E7%BA%A6%E5%88%9D%E5%A7%8Bnum%E5%80%BC%E4%B8%BA0.png)
- 代理合约初始 num 值为 0

## 通过代理合约调用逻辑合约的 addOne 操作流程

- 在 ProxyContract 的 callAddOne 输入 LogicContract 地址，点击 transact：

   ![](https://github.com/ljjathena/2025-17-solidity-on-polkadot/raw/main/homework-3/1908/test/%E9%80%9A%E8%BF%87%E4%BB%A3%E7%90%86%E5%90%88%E7%BA%A6%E8%B0%83%E7%94%A8%E9%80%BB%E8%BE%91%E5%90%88%E7%BA%A6%E7%9A%84addOne%EF%BC%8C%E8%BE%93%E5%85%A5%E5%9C%B0%E5%9D%80%E5%B9%B6%E7%82%B9%E5%87%BBtransact.png)

- 操作完成后，再次读取 num，可以看到已经从 0 变为 1：

  ![](https://github.com/ljjathena/2025-17-solidity-on-polkadot/raw/main/homework-3/1908/test/%E6%93%8D%E4%BD%9C%E5%AE%8C%E6%88%90%E5%90%8E%EF%BC%8C%E5%86%8D%E6%AC%A1%E8%AF%BB%E5%8F%96num%EF%BC%8C%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E5%B7%B2%E7%BB%8F%E4%BB%8E0%E5%8F%98%E4%B8%BA1.png)
