import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/Contactus';
import Profile from './pages/Profile';
import EditProfile from './pages/Editprofile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import React, { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

export default function App() {
  const [acc, setAcc] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);

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
      setAcc(accounts[0]);
      setIsAuthenticated(true);
    } catch (e) {
      console.log(e);
    }
  }

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
          setAcc(account);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfUserIsOnCorrectNetwork();
  }, []);

  

  return (
    <div>
      {width>800 ?  (
        <div className='m-0 p-0 box-border bg-[#0a111a] overflow-hidden'>
          <Navbar acc={acc} isAuthenticated={isAuthenticated} connectWalletAction={connectWalletAction}/>
          <>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/about' exact element={<About />} />
              <Route path='/contactus' exact element={<ContactUs />} />
              <Route path='/profile' exact element={<Profile acc={acc}/>} />
              <Route path='/editprofile' exact element={<EditProfile acc={acc}/>} /> 
            </Routes>
          </>
          <Footer/>
        </div>      ):
        (
        <div className='flex bg-black text-white h-screen items-center p-4 text-xl font-semibold'>
          Oops, looks like our devs are too caught up in building out an amazing product. Use your PC to unveil the experience.
        </div>  
        )
      }
    </div>
    
  );
}
