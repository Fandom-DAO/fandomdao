import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { ethers } from 'ethers';

function Navbar() {
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [acc, setAcc] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfUserIsOnCorrectNetwork();
  }, []);

  const checkIfUserIsOnCorrectNetwork = async () => {
    try {
      const { ethereum } = window;
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain ' + chainId);

      const rinkebyChainId = '0x4';
      if (chainId !== rinkebyChainId) {
        alert('You are not connected to the Rinkeby Test Network!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get Metamask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      setAcc(accounts[0].slice(0,6)+'....'+accounts[0].slice(-5));
      setIsAuthenticated(true);
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setIsAuthenticated(false);
        console.log('Make sure you have metamask!');
      } else {
        console.log('We have the ethereum object', ethereum);
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account', account);
          setIsAuthenticated(true);
          setAcc(account.slice(0,6)+'....'+account.slice(-5));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

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
      <nav class='flex sticky bg-[#0a111a] px-12 h-16 z-100 items-center justify-between text-[20px]'>
        <div className='flex items-center'>
          <Link to='/' onClick={closeMobileMenu}>
            <img
              className='rounded-md w-10 md:w-12'
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
              <Link to='/about' onClick={closeMobileMenu}>
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
          </ul>
        </div>

        {isAuthenticated ? (
          <div className='flex'>
            <img
              src={require('../assets/fandomDAO.png')}
              className='w-12 h-12 mr-2 rounded-full hidden md:flex cursor-pointer'
              alt='nft'
              onClick={() => {
                navigate('/profile');
              }}
            />
            <div className='rounded-md bg-gradient-to-r from-[#df3f86] to-[#6218a8]'>
              <button
                onClick={() => {
                  navigate('/');
                }}
                className='table text-white w-full p-2 md:px-2 md:py-2 text-center'
              >
                {acc}
              </button>
            </div>
          </div>
        ) : (
          <div className='flex text-white text-center'>
            <button
              onClick={() => {
                connectWalletAction();
                navigate('/editprofile');
              }}
              className='table rounded-md bg-gradient-to-r from-[#df3f86] to-[#6218a8] text-white w-full p-2 md:px-2 md:py-2 text-center'
            >
              Connect Wallet
            </button>
          </div>
        )}

        <div className='flex md:hidden text-blue-200' onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
  );
}

export default Navbar;
