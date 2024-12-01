import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Wallet } from './Wallet';
import CreateNFT from './CreateNFT';
import Explore from './Explore';

const DiamondIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
  </svg>
);

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <div className="flex items-center cursor-pointer">
        <DiamondIcon className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold text-primary">OktaMint</span>
      </div>
      <Wallet /> 
    </header>
  );
};

const Landing = ({ contractAddress }) => {
  const [showCreateNFT, setShowCreateNFT] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [featuredNFTs, setFeaturedNFTs] = useState([
    {
      name: 'Crypto Punks',
      description: 'Iconic collection of 10,000 unique digital characters.',
      imageUrl: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
      sellerName: 'Crypto Punks',
      sellerAvatar: 'https://beebom.com/wp-content/uploads/2022/02/Featured.jpg?w=750&quality=75',
      itemsCount: '10,000 items'
    }
  ]);

  const handleCreateNFTClick = () => {
    setShowCreateNFT(true);
  };

  const handleExploreClick = () => {
    setShowExplore(true);
  };

  const handleBackClick = () => {
    setShowExplore(false);
  };

  const addFeaturedNFT = (newNFT) => {
    setFeaturedNFTs([...featuredNFTs, newNFT]);
    setShowCreateNFT(false); // Hide the CreateNFT form after adding the NFT
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        {!showExplore && !showCreateNFT && (
          <>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-primary/80">
              <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 text-center md:text-left">
                  <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl">
                    Discover, Collect, and Trade Rare NFTs
                  </h1>
                  <p className="max-w-[600px] text-lg text-primary-foreground">
                    Explore a vast collection of unique digital assets and build your own NFT portfolio. Join our vibrant
                    community and be a part of the future of digital ownership.
                  </p>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center md:justify-start">
                    <Button onClick={handleExploreClick}>Explore Marketplace</Button>
                    <Button variant="secondary" onClick={handleCreateNFTClick}>
                      Create NFT
                    </Button>
                  </div>
                </div>
                <img
                  src="https://theblockchainland.com/wp-content/uploads/2022/09/NFT-Marketplace.jpeg"
                  width="550"
                  height="550"
                  alt="Hero"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My NFT Collections</h2>
                  </div>
                </div>
                <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12">
                  {featuredNFTs.map((nft, index) => (
                    <Card key={index} className="bg-background shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <img
                          src={nft.imageUrl}
                          width="300"
                          height="300"
                          alt="NFT Collection"
                          className="w-full h-48 object-cover rounded-t-lg"
                          style={{ aspectRatio: "300/300", objectFit: "cover" }}
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-bold">{nft.name}</h3>
                        <p className="text-muted-foreground">{nft.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center p-4">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={nft.sellerAvatar} />
                            <AvatarFallback>{nft.sellerName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{nft.sellerName}</div>
                            <div className="text-xs text-muted-foreground">{nft.itemsCount}</div>
                          </div>
                        </div>
                        <Button variant="link">Explore</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Top Sellers</h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Check out the top-selling NFT artists and creators on our platform.
        </p>
      </div>
    </div>
    <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 py-12">
      <Card className="bg-background shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://d3e0luujhwn38u.cloudfront.net/resized/LPfTxuqaoyAM5aT8THuD7GNKv44p2oLd7D_bGqgWJgU/s:400/plain/s3://typefully-user-avatars/1514941772224466947/0ee6fbfd854272fa027519cc2b7d98f8c75269cb" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-bold">John Doe</h3>
          <p className="text-muted-foreground">10,000 items sold</p>
        </CardContent>
      </Card>

      {/* Repeat the Card component for each seller */}
      
      <Card className="bg-background shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://th.bing.com/th/id/OIP.oN7-SJGHZorG8SfhQC5D7gHaFj?w=273&h=205&c=7&r=0&o=5&pid=1.7" />
            <AvatarFallback>Alex </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-bold">Alex</h3>
          <p className="text-muted-foreground">2000 items sold</p>
        </CardContent>
      </Card>

      <Card className="bg-background shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://www2.deloitte.com/content/dam/insights/primary/full-bleed/Banner-US175620.png/jcr:content/renditions/cq5dam.web.1200.627.jpeg" />
            <AvatarFallback>Neon Dev</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-bold">Neon Dev</h3>
          <p className="text-muted-foreground">1000 items sold</p>
        </CardContent>
      </Card>

      
    </div>
  </div>
</section>

          </>
        )}
        {showCreateNFT && <CreateNFT contractAddress={contractAddress} onBackClick={handleBackClick} onAddNFT={addFeaturedNFT} />}
        {showExplore && <Explore />}
      </main>
    </div>
  );
};

export default Landing;
