import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import MarketABI from '../utils/Marketabi.json';
import NFTABI from '../utils/NFTabi.json';
import {NFT_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS} from '../config.js'

const Marketplace = () => {
    const [showNFT, setShowNFT] = useState(true);
    const [marketContract, setMarketContract] = useState();

    // These are Array of arrays
    const [allNFTs, setAllNFTs] = useState([]);
    const [allArtists, setAllArtists] = useState([]);

    const getAllNFTs = async() => {
        let res = await marketContract.getAllNFTs();
        setAllNFTs(res);
        // console.log(res[0]);
    }

    const getAllArtists = async() => {
        let res = await marketContract.getAllArtists();
        setAllArtists(res);
        // console.log(res[0]);
    }

    useEffect(() => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const marketPlaceContract = new ethers.Contract(
                    MARKET_CONTRACT_ADDRESS,
                    MarketABI.abi,
                    signer
                );

                setMarketContract(marketPlaceContract);
                getAllNFTs();
                getAllArtists();
            }
        } catch (err) {
            console.log('In error: ' + err);
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

            Each Artist have 4 attributes- which are used using their indices:
            0: Wallet Address - String Address
            1: Name of the Artist - String
            2: Artist Image URI - String
            3: Category of the Artist - String
        
        */
        <div style={{color: 'white'}}>
            <button style={{padding: '1em', backgroundColor:'purple'}} onClick={() => setShowNFT(!showNFT)}>
                {
                    showNFT?
                    "Show Artists":
                    "Show NFTs"
                }
            </button>
            {   
                (showNFT)?
                (
                    allNFTs.map((nft, idx) => {
                    return (
                        <div key={nft[0]}>
                            {
                                nft[3] - nft[2]
                            } / {
                                nft[3]
                            } NFTs left
                        </div>
                    )
                })
                ):(
                    allArtists.map((artist, idx) => {
                    return (
                        <div key={artist[0]}>
                            Name: {artist[1]}<br />Category: {artist[3]}
                        </div>
                    )
                }))
            }
        </div>
    );
}

export default Marketplace;