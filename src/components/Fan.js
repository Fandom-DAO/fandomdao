import React from 'react';

const Fan = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center overflow-hidden mt-8'>
      <h1 className='font-extrabold text-4xl text-white'>
        How to Become a <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Fan</span>
      </h1>
      <div className='flex flex-col sm:flex-row justify-evenly gap-x-4 text-left p-8 gap-2'>
        <div className='bg-gray-900 flex rounded-lg flex-col sm:w-1/4 p-4 border-2 border-bluecolor'>
          <h1 className='font-extrabold text-4xl text-[#d53f86]'>01.</h1>
          <h2 className='text-white text-2xl font-bold mt-8'>Mint a NFT</h2>
          <p className='text-white mt-8'>
            Check out our list of artists and their NFTs. Become part of an
            exclusive fan community of your artist by holding their NFT.
          </p>
        </div>
        <div className='bg-gray-900 rounded-lg flex flex-col sm:w-1/4 p-4 border-2 border-bluecolor'>
          <h1 className='font-extrabold text-4xl text-[#d53f86]'>02.</h1>
          <h2 className='text-white text-2xl font-bold mt-8'>Join the community</h2>
          <p className='text-white mt-8'>
            Enter the community of like-minded people sharing your same fervour
            for your artist and get chances to interact with your artist.
          </p>
        </div>
        <div className='bg-gray-900  rounded-lg flex flex-col sm:w-1/4 p-4 border-2 border-bluecolor'>
          <h1 className='font-extrabold text-4xl text-[#d53f86]'>03.</h1>
          <h2 className='text-white text-2xl font-bold mt-8'>
            Access Exclusive Discounts
          </h2>
          <p className='text-white mt-8'>
            True fans deserve rewards. Get exclusive discounts to concerts and
            shows of your artists for holding their NFT. its a first draft, for
            the home page
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fan;
