import { uploadJSONToIPFS } from '../utils/ipfs';

export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      rating: 5,
      review: "Great job!",
      timestamp: Date.now(),
    };
    const cid = await uploadJSONToIPFS(reviewData);
    alert(`Uploaded to IPFS: ${cid}`);
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Mintaro Reputation</h1>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload Review to IPFS
      </button>
    </main>
  );
}
