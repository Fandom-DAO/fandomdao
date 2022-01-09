import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
    <>
      <IconContext.Provider value={{ color: '#d53f86' }}>
        <nav class="flex sticky bg-[#0a111a] h-20 top-0 z-100 items-center justify-items-center text-[20px]">
          <div class="flex justify-between h-20 z-[1] w-full max-w-screen-xl mx-auto px-[50px]">
            <Link to='/' class="flex cursor-pointer items-center left-0 -ml-10" onClick={closeMobileMenu}>
            <img src={require('./fandomDAO.png')} alt="Logo" width={50} height={100}/>
            </Link>
            <div className='menu-icon py-1' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item rounded-md bg-gradient-to-r from-[#df3f86] to-[#6218a8]'>
                <Link
                  to='/contact'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Coming Soon
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Header;