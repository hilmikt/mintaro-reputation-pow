import { ethers } from "ethers";
import ABI from "../../artifacts/contracts/MintaroReputation.sol/MintaroReputation.json";

// Replace with your deployed local or testnet address
const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";

export function getContract(signer) {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);
}
