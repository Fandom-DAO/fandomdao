import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa';

const Navbar = ({ acc, isAuthenticated, connectWalletAction }) => {
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  
  var account = acc.slice(0,6)+'....'+acc.slice(-5);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
  }, []);

  return (
    <div>
    <div className={click?"fixed h-screen w-screen overflow-hidden":"fixed w-screen overflow-hidden"}>
      <nav className='bg-darkgray backdrop-filter backdrop-blur h-16 flex items-center justify-between px-4 sm:pr-8 z-50'>
      <div>
        <Link to='/' onClick={closeMobileMenu}>
          <img
            className='rounded-lg'
            width={50}
            height={100}
            src={require('../assets/fandomDAO.png')}
            alt='Logo'
          />
        </Link>
      </div>

      <div className='flex items-center h-16'>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='flex rounded-md text-[#d53f86] md:px-8 md:py-2 text-center md:no-underline md:items-center'>
            <Link to='/' onClick={closeMobileMenu}>
              <p>Home</p>
            </Link>
          </li>

          <li className='flex rounded-md text-[#d53f86] md:px-8 md:py-2 text-center md:no-underline md:items-center'>
            <Link to='/marketplace' onClick={closeMobileMenu}>
              <p>NFTs</p>
            </Link>
          </li>

          <li className='flex rounded-md text-[#d53f86] md:px-8 md:py-2 text-center md:no-underline md:items-center'>
            <Link to='/about' onClick={closeMobileMenu}>
              <p>About Us</p>
            </Link>
          </li>

          <li className='flex rounded-md text-[#d53f86] md:px-8 md:py-2 text-center md:no-underline md:items-center'>
            <Link to='/contactus' onClick={closeMobileMenu}>
              <p>Contact Us</p>
            </Link>
          </li>
          <li className='flex sm:hidden rounded-md text-[#d53f86] md:px-8 md:py-2 text-center md:no-underline md:items-center'>
            <Link to='/contactus' onClick={closeMobileMenu}>
              <FaDiscord />
            </Link>
          </li>
        </ul>
      </div>

      {isAuthenticated ? (
        <div className='flex'>
          <img
            src={require('../assets/fandomDAO.png')}
            className='w-12 h-12 mr-2 rounded-full hidden md:flex cursor-pointer'
            alt='profilepic'
            onClick={() => {
              navigate('/profile');
            }}
          />
          <div className='rounded-md bg-gradient-to-r from-[#df3f86] to-[#6218a8]'>
            <button
              onClick={() => {
                navigate('/profile');
              }}
              className='table text-white p-2 md:px-2 md:py-2 text-center'
            >
              {account}
            </button>
          </div>
        </div>
      ) : (
        <div className='flex text-white text-center'>
          <button
            onClick={() => {
              connectWalletAction();
              
            }}
            className='table rounded-md bg-gradient-to-r from-[#df3f86] to-[#6218a8] text-white sm:w-full p-2 md:px-2 md:py-2 text-center'
          >
            Connect Wallet
          </button>
        </div>
      )}

      <div className='flex md:hidden text-blue-200' onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
    


    <div class="sm:flex flex-col bg-transarent text-[#d53f86] text-4xl -mt-16 h-screen justify-end z-50 fixed hidden gap-5">
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
    <div className='h-16'></div>
    </div>
  );
};

export default Navbar;
