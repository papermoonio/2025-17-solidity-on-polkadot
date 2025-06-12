import { Contract, ethers, Wallet } from "ethers"
import { ABI, BYTECODE } from "./erc20"

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const block = await provider.getBlockNumber()
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    const wallet = new Wallet(privateKey, provider)
    const address = wallet.address
    const balance = await provider.getBalance(address)
    const ethValue = ethers.formatEther(balance)
    const nonce = await provider.getTransactionCount(address)


    const transfer = {
        to: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", // 接收地址
        value: "1000000000" // 转账金额（Wei）
    }
    
    const tx = await wallet.sendTransaction(transfer) // 发送交易
    await tx.wait() // 等待交易被打包到区块中



    const factory = new  ethers.ContractFactory(ABI, BYTECODE, wallet);
    const contract = await factory.deploy("name",
        "symbol", 10, 1000000000)
    await contract.waitForDeployment();
    const contractAddress = contract.target.toString();
    console.log("Deployed at:", contractAddress);

    const deployedContract = new Contract(contractAddress, ABI, provider)
    const totalSupply = await deployedContract.totalSupply()


    const walletContract = new Contract(contractAddress, ABI, wallet)
    const tx2 = await walletContract.transfer("0x90F79bf6EB2c4f870365E785982E1f101E93b906", 1)
    await tx2.wait()

    const erc20Balance = await deployedContract.balanceOf("0x90F79bf6EB2c4f870365E785982E1f101E93b906")
    console.log(`ERC20 Balance is ${erc20Balance}`)

    
    // it is correct, but if it follows the tx. can't block and wait for event.
    // maybe sth wrong with anvil or hardhat node.
    provider.on("block", (blockNumber) => {
        console.log(`current block ${blockNumber}`)
        if (blockNumber > 55) {
            provider.off("block")
        }
    })

    const receipt = await provider.getTransactionReceipt(tx2.hash) // 获取交易收据
    const data = receipt?.fee ? ethers.formatEther(receipt.fee) : "0" // 获取交易费用并转换为 ETH

    console.log(`result is ${data} `) // 打印交易费用
    console.log(`Block number: ${block}, Address: ${address}, Balance: ${ethValue}, Nonce: ${nonce}, Total Supply: ${totalSupply}`)
}

main()

