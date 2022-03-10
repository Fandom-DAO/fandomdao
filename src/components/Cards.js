import { artistData } from '../assets/data';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import MarketABI from '../utils/Marketabi.json';
import NFTABI from '../utils/NFTabi.json';

import { NFT_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS } from '../config.js';

export default function Cards({ acc }) {
  // const NFT_CONTRACT_ADDRESS = '0x05394C3AF50365183Acd6CEc9807EdFD66179e7C';
  // const MARKET_CONTRACT_ADDRESS = '0xCc0c005B2eB5F59A9a8323E00847413ff1895Ef1';

  const [nFTContract, setNFTContract] = useState();
  const [marketContract, setMarketContract] = useState();
  // const [tokenInfo, setTokenInfo] = useState([]);

  const [nfts, setNfts] = useState([]);

  const getNFTs = () => {
    console.log("Inside get NFTs", acc);
    
    marketContract.getNFTsOfArtist(acc).then(res => {
      console.log("Inside then", res);
      setNfts(res);
    })

    // console.log('Artist NFTs', artistNfts);
    // setNfts(artistNfts);
  };

  const getTokenInfo = async (tokenId) => {
    console.log('Inside gettokeninfo');
    const tokenUri = await nFTContract.uri(tokenId);
    console.log('tokenuri', tokenUri);
    const metadata = await fetch(tokenUri);
    const result = await metadata.json();
    console.log('Metadata', result);
    // setTokenInfo([...tokenInfo, result]);
    return result;
  };

  useEffect(() => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(
          NFT_CONTRACT_ADDRESS,
          NFTABI.abi,
          signer
        );

        const marketPlaceContract = new ethers.Contract(
          MARKET_CONTRACT_ADDRESS,
          MarketABI.abi,
          signer
        );

        setNFTContract(nftContract);
        setMarketContract(marketPlaceContract);
      }
    } catch (err) {
      console.log('In error: ' + err);
    }
  }, []);

  useEffect(() => {
    if (acc) getNFTs();
  }, [acc, marketContract]);

  return (
    <>
      {(nfts?.length > 0) ? (
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 z-0 text-fuchsia-400'>
          <div className='mt-6 grid grid-cols-1 gap-y-28 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-32'>
            {nfts.map((nft, index) => {
              {/* const tokenInfo = await getTokenInfo(nft.tokenId.toNumber()); */}
              return (
                <div key={index} className='group relative'>
                  <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none'>
                    <img
                      src={nft.tokenImage}
                      alt={nft.tokenName}
                      className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                    />
                  </div>
                  <div className='flex justify-between bg-darkgray h-28 rounded'>
                    <div>
                      <h3 className='text-sm  text-gray-700 ml-4 mt-4'>
                        <span aria-hidden='true' className='absolute inset-0' />
                        'name'
                      </h3>
                      <p className='mt-1 text-sm text-gray-500 ml-4'>
                         name
                      </p>
                      <p className='mt-1 text-sm text-gray-500 ml-4'>
                        Token Id: {nft.tokenId.toNumber()}
                      </p>
                    </div>
                    <p className='text-sm font-medium text-gray-900 mr-4 mt-2'>
                      {nft.tokenPrice.toNumber()} Matic
                    </p>
                  </div>

                  <div className='border-solid border -mt-8 mx-12 border-white'></div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className='block place-self-center text-center mt-14'>
          <p className='text-4xl text-center text-white'>No items found</p>
          <p className='text-sm mt-4 text-white w-96'>
            Come back soon! or try to browse something for you on our
            marketplace
          </p>
          <button className='text-white text-sm mt-8 mb-16 w-32 rounded p-2  bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext'>
            Browse NFTs
          </button>
        </div>
      )}
    </>
  );
}
