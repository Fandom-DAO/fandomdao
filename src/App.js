import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import HeroContainer from './components/HeroContainer';
import Sidebar from './components/Sidebar';
import Fan from './components/Fan';
import Reachout from './components/Reachout';
import Footer from './components/Footer';
import Discord from './components/Discord';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div id = "home" className=' bg-bgcolor max-w-screen overflow-hidden min-h-screen text-pinktext'>
      <Header/>
          <HeroContainer/>
          <Reachout/>
          <Footer/>
      <>
        <Routes>
          <Route path='/discord' exact element={<Discord/>}/>
        </Routes>
      </>
    </div>
  );
}

export default App;
