// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address, address, uint) external returns (bool);
    function transfer(address, uint) external returns (bool);
    function balanceOf(address) external view returns (uint);
}

contract MiniDEX {
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint public reserveA;
    uint public reserveB;

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    // 添加流动性
    function addLiquidity(uint amountA, uint amountB) external {
        require(amountA > 0 && amountB > 0, "invalid amount");
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);
        reserveA += amountA;
        reserveB += amountB;
    }

    // A -> B 兑换
    function swapAtoB(uint amountA) external {
        require(amountA > 0 && reserveA + amountA > 0, "invalid swap");
        uint amountB = (amountA * reserveB) / (reserveA + amountA);
        require(amountB > 0 && amountB <= reserveB, "insufficient liquidity");

        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transfer(msg.sender, amountB);

        reserveA += amountA;
        reserveB -= amountB;
    }

    // B -> A 兑换
    function swapBtoA(uint amountB) external {
        require(amountB > 0 && reserveB + amountB > 0, "invalid swap");
        uint amountA = (amountB * reserveA) / (reserveB + amountB);
        require(amountA > 0 && amountA <= reserveA, "insufficient liquidity");

        tokenB.transferFrom(msg.sender, address(this), amountB);
        tokenA.transfer(msg.sender, amountA);

        reserveB += amountB;
        reserveA -= amountA;
    }
}

