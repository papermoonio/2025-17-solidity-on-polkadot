// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IERC20 {
function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function transfer(address recipient, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract SimpleERC20 is IERC20{
string public name = "SimpleToken";
string public symbol = "STK";
uint8 public decimals = 18;
uint256 private _totalSupply;

mapping(address => uint256) private _balances;
mapping(address => mapping(address => uint256)) private _allowances;

constructor(uint256 initialSupply) {
_mint(msg.sender, initialSupply);
}

function totalSupply() public view override returns (uint256) {
return _totalSupply;
}

function balanceOf(address account) public view override returns (uint256) {
return _balances[account];
}

function transfer(address recipient, uint256 amount) public override returns (bool) {
_transfer(msg.sender, recipient, amount);
return true;
}

function allowance(address owner, address spender) public view override returns (uint256) {
return _allowances[owner][spender];
}

function approve(address spender, uint256 amount) public override returns (bool) {
_approve(msg.sender, spender, amount);
return true;
}

function transferFrom(
address sender,
address recipient,
uint256 amount
) public override returns (bool) {
require(_allowances[sender][msg.sender] >= amount, "Transfer amount exceeds allowance");
_transfer(sender, recipient, amount);
_approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);
return true;
}

function _transfer(
address sender,
address recipient,
uint256 amount
) internal {
require(sender != address(0), "Transfer from the zero address");
require(recipient != address(0), "Transfer to the zero address");
require(_balances[sender] >= amount, "Transfer amount exceeds balance");

_balances[sender] -= amount;
_balances[recipient] += amount;
emit Transfer(sender, recipient, amount);
}

function _mint(address account, uint256 amount) internal {
require(account != address(0), "Mint to the zero address");
_totalSupply += amount;
_balances[account] += amount;
emit Transfer(address(0), account, amount);
}

function _approve(
address owner,
address spender,
uint256 amount
) internal {
require(owner != address(0), "Approve from the zero address");
require(spender != address(0), "Approve to the zero address");

_allowances[owner][spender] = amount;
emit Approval(owner, spender, amount);
}
}
