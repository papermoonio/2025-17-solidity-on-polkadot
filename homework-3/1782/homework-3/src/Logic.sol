// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// 逻辑合约
contract Logic {

    // 计算逻辑：对入参数值加一
    function setNumber(uint256 _number) public {
        _number += _number;
    }

}
