const { expect } = require("chai");

describe("Counter", function () {
  it("Should increment count", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.increment();
    expect(await counter.count()).to.equal(1);
  });
});