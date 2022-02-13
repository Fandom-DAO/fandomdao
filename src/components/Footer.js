import React from 'react';

const Footer = () => {
  return (
    <div className='flex w-full justify-around  text-left mt-16 p-12 border-t-2 border-darkgray'>
      <div className='flex items-center justify-center  flex-col text-left'>
        <h3 className='capitalize text-lg font-extrabold tracking-widest'>
          FANDOMDAO
        </h3>
        <p className='text-white mt-4'>
          We help artists and fans connect better. Mint your artist's NFTs and
          get exclusive discounts on their shows and events.
        </p>
      </div>
    </div>
  );
};

export default Footer;
