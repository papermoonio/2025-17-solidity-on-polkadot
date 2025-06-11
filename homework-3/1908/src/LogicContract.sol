// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LogicContract {
    // 逻辑合约里必须有一个和代理合约一致的 storage 变量布局！
    uint256 public num;

    // 一个简单的函数，每次调用 num+1
    function addOne() public {
        num += 1;
    }
}
