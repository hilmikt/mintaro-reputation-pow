import { uploadReviewJSON } from '../utils/ipfs';
import { getContract } from '../utils/contract';
import { ethers } from 'ethers';

export default function Home() {
  const handleMint = async () => {
    // Example review
    const review = {
      rating: 5,
      review: "Solid smart contract work. Fast delivery.",
      timestamp: Date.now(),
    };

    const uri = await uploadReviewJSON(review);

    // Connect to MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    const freelancerAddress = "0xFreelancerAddressHere"; // replace/test

    const tx = await contract.mintBadge(freelancerAddress, review.rating, uri);
    await tx.wait();

    alert("Badge minted successfully!");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mintaro Badge Minter</h1>
      <button
        onClick={handleMint}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Upload + Mint Badge
      </button>
    </div>
  );
}
