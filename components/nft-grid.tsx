"use client"

import { NftCard } from "@/components/nft-card"

// Sample NFT data - in a real app, this would come from an API or blockchain
const nfts = [
  {
    id: "1",
    name: "Cosmic Voyager #42",
    description: "A journey through the digital cosmos, captured in vibrant colors and abstract forms.",
    image: "/placeholder.svg?height=400&width=400",
    price: "0.85",
    owner: "0x1a2b...3c4d",
  },
  {
    id: "2",
    name: "Digital Genesis #007",
    description: "The birth of a new digital entity, representing the fusion of art and technology.",
    image: "/placeholder.svg?height=400&width=400",
    price: "1.2",
    owner: "0x5e6f...7g8h",
  },
  {
    id: "3",
    name: "Quantum Pixel #128",
    description: "A pixel-perfect representation of quantum mechanics in the digital realm.",
    image: "/placeholder.svg?height=400&width=400",
    price: "0.65",
    owner: "0x9i0j...1k2l",
  },
  {
    id: "4",
    name: "Neon Dreams #56",
    description: "A cyberpunk-inspired cityscape bathed in neon lights and digital rain.",
    image: "/placeholder.svg?height=400&width=400",
    price: "2.1",
    owner: "0x3m4n...5o6p",
  },
  {
    id: "5",
    name: "Metaverse Portal #99",
    description: "A gateway to new digital dimensions, where reality and virtuality merge.",
    image: "/placeholder.svg?height=400&width=400",
    price: "1.8",
    owner: "0x7q8r...9s0t",
  },
  {
    id: "6",
    name: "Blockchain Artifact #33",
    description: "An ancient relic from the early days of blockchain technology, preserved in digital amber.",
    image: "/placeholder.svg?height=400&width=400",
    price: "3.2",
    owner: "0x1u2v...3w4x",
  },
]

export function NftGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {nfts.map((nft) => (
        <NftCard key={nft.id} {...nft} />
      ))}
    </div>
  )
}
