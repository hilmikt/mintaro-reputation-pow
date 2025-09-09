// scripts/deploy.js  (ESM + ethers v6)
import hre from "hardhat";

async function main() {
  const MintaroReputation = await hre.ethers.getContractFactory("MintaroReputation");
  const contract = await MintaroReputation.deploy();

  // ethers v6: wait for deployment + read address
  await contract.waitForDeployment();
  console.log("Deployed to:", await contract.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
