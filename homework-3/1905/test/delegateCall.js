const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Logic", function () {
  let logic, owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    const Logic = await ethers.getContractFactory("Logic");
    logic = await Logic.deploy();
    await logic.waitForDeployment();
  });

  it("should start with num 0", async () => {
    expect(await logic.num()).to.equal(0);
  });

  it("should increment num", async () => {
    await logic.increment();
    expect(await logic.num()).to.equal(1);
  });
});

describe("Proxy", function () {
  let logic, proxy, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const Logic = await ethers.getContractFactory("Logic");
    logic = await Logic.deploy();
    await logic.waitForDeployment();

    const Proxy = await ethers.getContractFactory("Proxy");
    proxy = await Proxy.deploy();
    await proxy.waitForDeployment();
  });

  it("should start with num 0", async () => {
    expect(await proxy.num()).to.equal(0);
  });

  it("should increment num via delegatecall", async () => {
    const tx = await proxy.delegateIncrement(await logic.getAddress());
    await expect(tx).to.emit(proxy, "DelegateResult").withArgs(true, "0x");
    expect(await proxy.num()).to.equal(1);
  });

  it("should not change Logic contract state", async () => {
    await proxy.delegateIncrement(await logic.getAddress());
    expect(await logic.num()).to.equal(0);
  });

it("should revert if delegatecall fails (zero address)", async () => {
  await expect(
    proxy.delegateIncrement(ethers.ZeroAddress)
  ).to.be.revertedWith("Invalid logic address"); 
});


  it("should emit DelegateResult event", async () => {
    await expect(proxy.delegateIncrement(await logic.getAddress()))
      .to.emit(proxy, "DelegateResult")
      .withArgs(true, "0x");
  });

  it("should handle multiple increments", async () => {
    await proxy.delegateIncrement(await logic.getAddress());
    await proxy.delegateIncrement(await logic.getAddress());
    expect(await proxy.num()).to.equal(2);
  });
});