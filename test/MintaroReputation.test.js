// test/MintaroReputation.test.js
import { expect } from "chai";
import hre from "hardhat";            // ← default import
const { ethers } = hre;               // ← get ethers from hre

describe("MintaroReputation", () => {
  async function deploy() {
    const [owner, alice] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("MintaroReputation");
    const c = await Factory.deploy();
    await c.waitForDeployment();
    return { c, owner, alice };
  }

  it("sets deployer as owner (OZ v5 Ownable)", async () => {
    const { c, owner } = await deploy();
    expect(await c.owner()).to.equal(owner.address);
  });

  it("mints a badge, stores rating + URI", async () => {
    const { c, alice } = await deploy();
    const rating = 5;
    const uri = "ipfs://bafy.../review.json";

    const tx = await c.mintBadge(alice.address, rating, uri);
    await tx.wait();

    const id = (await c.badgeCounter()) - 1n;

    expect(await c.ownerOf(id)).to.equal(alice.address);
    expect(await c.tokenURI(id)).to.equal(uri);

    const b = await c.badgeDetails(id);
    expect(b.rating).to.equal(rating);
    expect(b.timestamp).to.be.gt(0);
  });

  it("reverts for out-of-range rating", async () => {
    const { c, alice } = await deploy();
    await expect(c.mintBadge(alice.address, 0, "ipfs://x")).to.be.revertedWith("Rating must be 1-5");
    await expect(c.mintBadge(alice.address, 6, "ipfs://x")).to.be.revertedWith("Rating must be 1-5");
  });

  it("only owner can mint", async () => {
    const { c, alice } = await deploy();
    await expect(c.connect(alice).mintBadge(alice.address, 5, "ipfs://x"))
      .to.be.revertedWithCustomError(c, "OwnableUnauthorizedAccount");
  });
});
