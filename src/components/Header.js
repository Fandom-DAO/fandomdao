import React from 'react';

const Header = () => {
  return (
    <div className='py-10 text-lg'>
      <div className='fixed inset-x-0 top-0 bg-darkgray/80 backdrop-filter backdrop-blur w-full h-16 flex p-4 items-center justify-between z-40'>
        <div>
          <img
            src={require('../assets/fandomDAO.png')}
            alt='Logo'
            width={50}
            height={100}
          />
        </div>
        <div className='flex font-semibold justify-between gap-12'>
          <a href='#home'>Home</a>
          <a href='#nft'>NFTs</a>
          <a href='#about'>About</a>
          <a href='#contact'>Contact us</a>
        </div>
        <div>
          <button className='text-white font-semibold rounded p-2  bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext'>
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
