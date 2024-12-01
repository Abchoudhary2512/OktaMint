
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog"
import { SearchIcon, StarIcon } from "lucide-react"

const nfts = [
  {
    id: 1,
    name: "Cosmic Dreamer #42",
    description: "A mesmerizing journey through the cosmos, captured in vibrant digital brushstrokes.",
    image: "https://th.bing.com/th/id/OIP.ob4jqnDxhhNoltRJTixRRwHaHa?w=183&h=183&c=7&r=0&o=5&pid=1.7",
    price: 0.5,
    rating: 4.5,
    reviews: 120,
    artist: "StellarArtist",
    created: "2023-05-15",
    edition: "1 of 1",
    blockchain: "Ethereum",
    tags: ["Rare", "Animated", "Space"]
  },
  {
    id: 2,
    name: "Neon Samurai",
    description: "A futuristic warrior bathed in the glow of a cyberpunk cityscape.",
    image: "https://pics.craiyon.com/2023-11-17/XYC-mHZuRemQQVeAMszuHg.webp",
    price: 0.8,
    rating: 4.7,
    reviews: 95,
    artist: "CyberBrush",
    created: "2023-06-02",
    edition: "3 of 10",
    blockchain: "Ethereum",
    tags: ["Limited Edition", "Cyberpunk", "Character"]
  },
  {
    id: 3,
    name: "Ethereal Whisper",
    description: "An abstract representation of sound waves, visualizing the unseen beauty of music.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kWY2kVQaIijQsljCTum2LpHJR_NV67KcHQ&s",
    price: 0.3,
    rating: 4.3,
    reviews: 78,
    artist: "SonicVision",
    created: "2023-04-30",
    edition: "5 of 50",
    blockchain: "Ethereum",
    tags: ["Abstract", "Music", "Animated"]
  },
  {
    id: 4,
    name: "Pixel Punk Prodigy",
    description: "A retro-inspired pixelated portrait celebrating the early days of digital art.",
    image:"data:image/jpeg;base64,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",
    price: 0.6,
    rating: 4.6,
    reviews: 112,
    artist: "RetroPixelMaster",
    created: "2023-05-20",
    edition: "7 of 100",
    blockchain: "Ethereum",
    tags: ["Pixel Art", "Retro", "Portrait"]
  },
  {
    id: 5,
    name: "Quantum Quasar Queen",
    description: "A regal figure emerging from the swirling energies of a distant quasar.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_dccZ_i0qxBtcFEAo75Ey8sW7imPjksjh3DiwKQJ1NQijoXYuXzUoOkIKA&s",
    price: 1.2,
    rating: 4.9,
    reviews: 150,
    artist: "GalacticPainter",
    created: "2023-06-10",
    edition: "1 of 1",
    blockchain: "Ethereum",
    tags: ["Rare", "Space", "Portrait"]
  },
  {
    id: 6,
    name: "Cybernetic Serendipity",
    description: "An intricate blend of organic forms and mechanical precision, exploring the fusion of nature and technology.",
    image: "https://th.bing.com/th/id/OIP.U25Y2JHih7BlxC-6JiixUQAAAA?w=240&h=180&c=7&r=0&o=5&pid=1.7",
    price: 0.9,
    rating: 4.8,
    reviews: 88,
    artist: "TechnoNaturalist",
    created: "2023-05-05",
    edition: "2 of 5",
    blockchain: "Ethereum",
    tags: ["Surreal", "Technology", "Nature"]
  }
]

export default function Explore() {
  const [selectedNFT, setSelectedNFT] = useState(null)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button onClick={() => window.history.back()} className="text-blue-500 hover:text-blue-700">
          &larr; Back
        </Button>
      </div>
  
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore NFT Marketplace</h1>
        <div className="flex gap-4 items-center">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="pl-8"
              placeholder="Search NFTs"
              type="search"
            />
          </div>
          <Button>Search</Button>
        </div>
      </header>
  
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All NFTs</TabsTrigger>
          <TabsTrigger value="art">Digital Art</TabsTrigger>
          <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="virtual-worlds">Virtual Worlds</TabsTrigger>
        </TabsList>
      </Tabs>
  
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {nfts.map((nft) => (
          <Card key={nft.id}>
            <CardHeader>
              <img
                src={nft.image}
                alt={`NFT artwork: ${nft.name}`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl mb-2">{nft.name}</CardTitle>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {nft.description}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">{nft.rating.toFixed(1)}</span>
                <span className="text-gray-500">({nft.reviews} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>#{nft.id.toString().padStart(4, '0')}</Badge>
                {nft.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-2xl font-bold">{nft.price.toFixed(2)} ETH</span>
              <Button onClick={() => setSelectedNFT(nft)}>View NFT</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
  
      <Dialog open={selectedNFT !== null} onOpenChange={() => setSelectedNFT(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex justify-between items-center mb-4">
            <DialogHeader>
              <DialogTitle>{selectedNFT?.name}</DialogTitle>
              <DialogDescription>
                Created by {selectedNFT?.artist} on {selectedNFT?.created}
              </DialogDescription>
            </DialogHeader>
            {/* <Button onClick={() => setSelectedNFT(null)} className="text-gray-600">
              Back
            </Button> */}
          </div>
          <div className="grid gap-4 py-4">
            <img
              src={selectedNFT?.image}
              alt={selectedNFT?.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-gray-700">{selectedNFT?.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Price</h4>
                <p>{selectedNFT?.price.toFixed(2)} ETH</p>
              </div>
              <div>
                <h4 className="font-semibold">Edition</h4>
                <p>{selectedNFT?.edition}</p>
              </div>
              <div>
                <h4 className="font-semibold">Blockchain</h4>
                <p>{selectedNFT?.blockchain}</p>
              </div>
              <div>
                <h4 className="font-semibold">Rating</h4>
                <p>{selectedNFT?.rating.toFixed(1)} ({selectedNFT?.reviews} reviews)</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedNFT?.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
          {/* <DialogClose asChild>
            <Button className="w-full">Close</Button>
          </DialogClose> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}  