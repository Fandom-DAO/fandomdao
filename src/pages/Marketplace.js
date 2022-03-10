import { React, useEffect, useState, useRef } from "react";
import { ethers } from "ethers";

import MarketABI from "../utils/Marketabi.json";
import { NFT_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS } from "../config.js";
import NFTCard from "../components/NFTCard";

import { FiBox, FiDollarSign, FiUsers } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import ArtistCard from "../components/ArtistCard";

const Marketplace = ({acc}) => {
  const marketContract = useRef('');

  const buttonStyles =
    "text-white px-5 py-2 rounded-lg border mr-8 border-slate-400 flex items-center justify-evenly";

  const [showNFT, setShowNFT] = useState(true);

  let artists;

  const [currentAddress, setCurrentAddress] = useState("");
  const [allNFTs, setAllNFTs] = useState([]);
  const [allArtists, setAllArtists] = useState([]);

  // Artist Address => Index in allArtist Array
  let artistMap = new Map();
  const [nftToArtist, setNftToArtist] = useState(new Map());

  const getAllNFTs = async () => {
    const res = await marketContract.current.getAllNFTs();
    console.log("res", res)
    const tempMap = new Map();

    res.forEach((nft) => {
      tempMap.set(nft[0], artists[artistMap.get(nft[5])][1]);
    });

    setNftToArtist(tempMap);
    setAllNFTs(res);
  };

  const getAllArtists = async () => {
    const res = await marketContract.current.getAllArtists();
    artists = res;
    // console.log(res[0]);

    res.forEach((artist, idx) => {
      artistMap.set(artist[0], idx);
    });
    setAllArtists(res);
  };

  const buyNFT = async (tokenId, price) => {
    console.log(currentAddress, tokenId, price);

    const options = {
      value: ethers.utils.parseEther(price.toString()),
      gasLimit: ethers.utils.hexlify(1000000), // 100000
    };

    const tn = await marketContract.current.buyNFTs(
      NFT_CONTRACT_ADDRESS,
      tokenId,
      options
    );
    const tx = await tn.wait();
    alert("You have successfully bought the NFT !!\nHere is your txn hash", tx);
  };

  

  useEffect( () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // const accounts = await ethereum.request({ method: "eth_accounts" });

        // if (accounts.length !== 0) {
        //   const account = accounts[0];
        //   setCurrentAddress(account);
        // }

        marketContract.current = new ethers.Contract(
          MARKET_CONTRACT_ADDRESS,
          MarketABI.abi,
          signer
        );

        getAllArtists();
        getAllNFTs();
        // setAllNFTsToArtists();
      }
    } catch (err) {
      console.log("In error: " + err);
    }
  }, []);

  return (
    /* Each NFT have 6 attributes- which are used using its indices:
            0: tokenId - Big Number
            1: tokenPrice - Big Number
            2: soldCount - Number
            3: totalCount - Number
            4: currentOwner - String (Address)
            5: creator - String (Address) == Artist Wallet Address
            6: Name of the NFT - String
            7. Desc - String
            8. Image - String
            9. type(Prem, General) - String
            +++
            10. Event date and time

            Each Artist have 4 attributes- which are used using their indices:
            0: Wallet Address - String Address
            1: Name of the Artist - String
            2: Artist Image URI - String
            3: Category of the Artist - String
        
        */
    <div className="mx-28 mt-14">
      <div className="text-[#ffffff] text-5xl font-bold mb-8">
        <div>
          Explore All{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            NFTs
          </span>
        </div>
        <div></div>
      </div>
      <div className="flex ">
        <button onClick={() => setShowNFT(false)} className={buttonStyles}>
          <FiUsers size="1.5em" />
          &nbsp;Artists
        </button>
        <button onClick={() => setShowNFT(true)} className={buttonStyles}>
          <FiBox size="1.5em" />
          &nbsp;NFTs
        </button>
        <button onClick={() => {}} className={buttonStyles}>
          <FiDollarSign size="1.5em" />
          &nbsp;Price Range
        </button>
        <button
          onClick={() => {}}
          className={buttonStyles + " w-48 row-start-9"}
        >
          <IoFilter size="1.5em" />
          &nbsp; Recently Added
        </button>
      </div>
      <div className="text-[#ffffff] grid grid-cols-3 gap-x-16">
        {showNFT
          ? allNFTs.map((nft, idx) => {
              return (
                <NFTCard
                  key={idx}
                  tokenId={nft[0]}
                  artist={nftToArtist.get(nft[0])}
                  price={nft[1].toNumber()}
                  soldCount={nft[2]}
                  totalCount={nft[3]}
                  nftName={nft[6]}
                  description={nft[7]}
                  imageURI={nft[8]}
                  nftType={nft[9]}
                  buyNFT={buyNFT}
                />
              );
            })
          : allArtists.map((artist, idx) => {
              return (
                <ArtistCard 
                  key={idx}
                  artistName={artist[1]}
                  artistImage={artist[2]}
                  artistCategory={artist[3]}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Marketplace;
