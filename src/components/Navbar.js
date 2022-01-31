import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import {useMoralis} from 'react-moralis';
import {useNavigate,Link} from 'react-router-dom';


function Navbar() {
  
  const {authenticate, isAuthenticated, authError, user, logout} = useMoralis();
  
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  if (isAuthenticated){
    var acc = ''+ user.attributes.accounts;
    acc = acc.slice(0,6)+'....'+acc.slice(-5);
  }

  

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
      <IconContext.Provider value={{ color: '#d53f86' }}>
        <nav class="flex sticky bg-[#0a111a] px-12 h-16 z-100 items-center justify-between text-[20px]">
          <div className='flex items-center'>
            <Link to='/' onClick={closeMobileMenu}>
            <img className='rounded-md w-10 md:w-12' src={require('../assets/fandomDAO.png')} alt="Logo"/>
            </Link>
          </div>

          <div className='flex items-center h-16'>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='flex rounded-md text-[#d53f86] md:px-8 md:py-2 text-center md:no-underline md:items-center'>
                  <Link
                    to='/'
                    onClick={closeMobileMenu}
                  >
                    <p>Home</p>
                  </Link>
              </li>

              <li className='flex rounded-md text-[#d53f86] md:px-8 md:py-2 text-center md:no-underline md:items-center'>
                  <Link
                    to='/about'
                    onClick={closeMobileMenu}
                  >
                    <p>NFTs</p>
                  </Link>
              </li>

              <li className='flex rounded-md text-[#d53f86] md:px-8 md:py-2 text-center md:no-underline md:items-center'>
                  <Link
                    to='/about'
                    onClick={closeMobileMenu}
                  >
                    <p>About Us</p>
                  </Link>
              </li>

              <li className='flex rounded-md text-[#d53f86] md:px-8 md:py-2 text-center md:no-underline md:items-center'>
                  <Link
                    to='/contactus'
                    onClick={closeMobileMenu}
                  >
                    <p>Contact Us</p>
                  </Link>
              </li>
            </ul>
          </div>
          
          {
            isAuthenticated ? 
          <div className='flex'>
            <img 
              src={(user.attributes.profilePic) ? user.attributes.profilePic.url():require('../assets/fandomDAO.png')}
              className='w-12 h-12 mr-2 rounded-full hidden md:flex cursor-pointer'
                onClick={() => navigate(`/profile/${user.attributes.username}`)}
              />
            <div className='rounded-md bg-gradient-to-r from-[#df3f86] to-[#6218a8]'>
              <button onClick={() => {logout();navigate("/");}}
                className='table text-white w-full p-2 md:px-2 md:py-2 text-center'
              >
                {acc}
              </button>
            </div>
          </div> :
            <div className='flex text-white text-center'>
              <button onClick={() => {authenticate();navigate("/editprofile");}}
               className='table rounded-md bg-gradient-to-r from-[#df3f86] to-[#6218a8] text-white w-full p-2 md:px-2 md:py-2 text-center'
              >
              Connect Wallet
            </button>
          </div>
          }
          

          <div className='flex md:hidden' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
          </div>

        </nav>
      </IconContext.Provider>
  );
}

export default Navbar;