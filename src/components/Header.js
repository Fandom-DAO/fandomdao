import React from 'react';

const Header = () => {
  return (
    <div className='flex justify-center py-10 text-lg'>
      <div className='fixed inset-x-0 top-0 bg-darkgray/80 backdrop-filter backdrop-blur w-full h-16 flex p-4 items-center justify-between z-40'>
        <div>
          <img
            src={require('../assets/fandomDAO.png')}
            alt='Logo'
            width={50}
            height={100}
            className='rounded-lg'
          />
        </div>
        
        <div className='text-white font-semibold rounded-lg p-2  bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext'>
          Comming Soon
        </div>
      </div>
    </div>
  );
};

export default Header;
