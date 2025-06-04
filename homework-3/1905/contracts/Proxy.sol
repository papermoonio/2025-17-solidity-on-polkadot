// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    uint256 public num;
    event DelegateResult(bool success, bytes data);

    function delegateIncrement(address logic) public returns (bool) {
        require(logic != address(0), "Invalid logic address");
        (bool success, bytes memory data) = logic.delegatecall(
            abi.encodeWithSignature("increment()")
        );
        emit DelegateResult(success, data);
        require(success, "delegatecall failed");
        return success;
    }
}