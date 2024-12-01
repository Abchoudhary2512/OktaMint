import React, { useState, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import MyContractABI from './assets/abi.json';
import { ethers } from 'ethers';

const CreateNFT = ({ contractAddress, onBackClick, onAddNFT }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  // Memoize provider
  const provider = useMemo(() => new ethers.providers.Web3Provider(window.ethereum, 'any'), []);

  // Memoize contract
  useEffect(() => {
    if (contractAddress) {
      const newContract = new ethers.Contract(contractAddress, MyContractABI, provider.getSigner());
      setContract(newContract);
    }
  }, [contractAddress, provider]);

  // Get the connected account
  useEffect(() => {
    const loadAccount = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Failed to connect MetaMask', error);
        setError('Failed to connect MetaMask. Please try again.');
      }
    };

    loadAccount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account) {
      console.log('Please connect your wallet');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (contract && typeof contract.safeMint === 'function') {
        // Example minting parameters, adjust as per your contract's requirements
        const tx = await contract.safeMint(account, 1); // Pass recipient address and tokenId
        await tx.wait(); // Wait for transaction to be mined

        // Add the newly created NFT to the list
        onAddNFT({
          name,
          description,
          imageUrl,
          sellerName: 'You',
          sellerAvatar: '',
          itemsCount: '1 item'
        });

        // Redirect to the main page after successful minting
        onBackClick();
      } else {
        throw new Error('safeMint method not found in the contract ABI');
      }
    } catch (error) {
      console.error('Failed to mint NFT', error);
      setError('Failed to mint NFT. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 md:px-6 py-12">
      <Button variant="link" onClick={onBackClick} className="flex items-center">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back
      </Button>
      <h2 className="text-2xl font-bold mb-6">Create New NFT</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              NFT Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <Input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? 'Minting...' : 'Mint NFT'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNFT;
