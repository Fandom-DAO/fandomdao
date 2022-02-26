import React from 'react';
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa';

const HeroContainer = () => {
  return (
    <div className="m-auto max-w-6xl px-12 text-pinktext">
      <div className="flex flex-col justify-center items-center sm:flex-row">
          <div className="sm:w-1/2 max-w-md flex flex-col justify-center">
            <div className="text-5xl font-black">Mint an NFT, Become a Fan, Get exclusive discounts.</div>
            <div className="text-lg mt-4">We help creators and fans connect better. Mint creators's NFTs and get exclusive discounts on their shows and events.</div>
            <div className="my-5 h-fit">
                <a href='https://discord.gg/ag7tnjNd6R'>
                <div className='rounded text-center max-w-10 p-2 shadow-md shadow-indigo-500/40 sm:w-1/2 text-white text-lg font-semibold bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext'>
                  Become a Fan
                </div></a> 
            </div>
          </div>
          <div className="flex justify-center sm:justify-end w-full sm:w-1/2 -mt-5">
              
                <div className="shadow-2xl max-w-md rounded-full mt-6 ml-4">
                  <img
                src={require('../assets/NFT.jpg')}
                alt='NFT'
                className='w-[300px] h-[500px] border-2 flex border-pinktext rounded-md z-[-999]'
              />
            </div>
          </div>
      </div>
    </div>
  );
};

export default HeroContainer;