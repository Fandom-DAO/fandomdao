import { React, useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import MarketABI from '../utils/Marketabi.json';
import NFTABI from '../utils/NFTabi.json';

const Editprofile = ({ acc }) => {
  const NFT_CONTRACT_ADDRESS = '0x9F4F42725dD6a2B4f554A2555Ec032AB6De0e9D9';
  const MARKET_CONTRACT_ADDRESS = '0xF03614BF7FeC9f77aa0CF4F85D344Ce8A80524cD';

  const [nFTContract, setNFTContract] = useState();
  const [marketContract, setMarketContract] = useState();

  const client = create('https://ipfs.infura.io:5001/api/v0');

  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [category, setCategory] = useState();

  async function onChangePhoto(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setProfilePic(url);
    } catch (err) {
      console.log(err);
    }
  }

  async function createItem() {
    if (profilePic && category && username) {
      let transaction = await marketContract.addArtist(
        acc,
        username,
        profilePic,
        category
      );
      let tx = await transaction.wait();
      transaction = await marketContract.getArtistInfo(acc);
      // tx = await transaction.wait();
      console.log('Artist', transaction);
    }
  }

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

  return (
    <div className='flex justify-around bg-[#0a111a]'>
      <div className='flex flex-col  p-4 justify-center'>
        <h1 className='text-[#fff] text-5xl font-semibold pb-4'>
          Edit Profile
        </h1>
        <h2 className='text-[#fff] text-lg font-semibold pb-4'>
          Customize you username and profile picture
        </h2>
        <label class='block border-b-2 mb-10 text-[#ffffff]'>
          <input
            type='text'
            value={username}
            placeholder='User Name'
            className='block bg-[#0a111a] w-full h-7 shadow-sm'
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>

        <label class='block border-b-2 mb-10 text-[#ffffff]'>
          <input
            type='text'
            value={email}
            placeholder='Email'
            className='block bg-[#0a111a] w-full h-7 shadow-sm'
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='mb-10 block w-full bg-gray-200 text-gray-700 py-3 px-2 rounded focus:outline-none focus:bg-white focus:border-gray-500'
        >
          <option value='' selected>
            Category
          </option>
          <option value={'Music'}>Music</option>
          <option value={'Comic'}>Comic</option>
          <option value={'Youtuber'}>Youtuber</option>
        </select>
        <button
          onClick={createItem}
          class='bg-[#7138bb] hover:bg-[#9477b8] text-white font-bold py-2 rounded-full'
        >
          Update Profile
        </button>
      </div>

      <div className='flex flex-col  justify-center items-center place-self-center align-middle'>
        <img className='rounded-[50%] w-40 h-40' src={profilePic} alt='' />
        <input
          className='w-[88px] h-7 text-black  bg-white'
          type='file'
          accept='image/*'
          multiple={false}
          id='profilePhoto'
          onChange={onChangePhoto}
        />
      </div>
    </div>
  );
};

export default Editprofile;
