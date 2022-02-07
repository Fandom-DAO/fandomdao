import React from 'react';
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa';

const HeroContainer = () => {
  return (
    <div className='flex w-screen h-full justify-around mt-4 '>
      <div className='flex flex-col w-1/2 p-4 justify-center text-[#d53f86]'>
        <h1 className='font-extrabold text-5xl text-left '>
          Mint an NFT, Become a Fan, get exclusive discounts.
        </h1>
        <p className='mt-8  text-lg text-left'>
          We help artists and fans connect better. Mint your artist's NFTs and
          get exclusive discounts on their shows and events.
        </p>
        <button className='rounded p-2 shadow-md  shadow-indigo-500/40   w-1/3 mt-12 text-white text-lg font-semibold bg-gradient-to-r from-[#df3f86] to-[#6218a8]'>
          Become a Fan
        </button>
        <div className='flex w-1/3 justify-start p-4 '>
          <a href='https://discord.gg/tzmgUWKK'>
            <FaDiscord className='mr-2' />
          </a>
          <a href='https://twitter.com/fandomdao'>
            <FaTwitter className='mr-2' />
          </a>
          <a href='https://twitter.com/fandomdao'>
            <FaGithub className='mr-2' />
          </a>
        </div>
      </div>
      <div>
        <img
          src={require('../assets/NFT.jpg')}
          alt='NFT'
          width={300}
          height={500}
          className='border-2 border-pinktext rounded-md'
        />
      </div>
    </div>
  );
};

export default HeroContainer;
