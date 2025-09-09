// frontend/utils/ipfs.js
import { NFTStorage } from 'nft.storage'

function makeStorageClient() {
  const token = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY
  if (!token) throw new Error('NEXT_PUBLIC_NFT_STORAGE_KEY not set')
  return new NFTStorage({ token })
}

export async function uploadJSONToIPFS(jsonData) {
  const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' })
  const cid = await makeStorageClient().storeBlob(blob)
  return `ipfs://${cid}`
}
