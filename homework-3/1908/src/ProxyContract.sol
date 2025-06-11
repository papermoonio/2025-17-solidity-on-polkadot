// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProxyContract {
    
    uint256 public num;

   function callAddOne(address logicAddress) public {
       
        (bool success, ) = logicAddress.delegatecall(
            abi.encodeWithSignature("addOne()")
        );
        require(success, "Delegatecall failed");
    }
}
