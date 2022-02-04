import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/Contactus';
import Profile from './pages/Profile';
import EditProfile from './pages/Editprofile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


import { Routes, Route } from 'react-router-dom';

export default function App() {
  
  return (
    <div className='m-0 p-0 box-border bg-[#0a111a]'>
      <Navbar/>
      <>
      <Routes>
        <Route path="/" exact element={
          <Home />
        }/>
        <Route path="/about" exact element={
          <About />
        }/>
        <Route path="/contactus" exact element={
          <ContactUs />
        }/>
        <Route path="/profile" exact element={
          <Profile />
        }/>
        <Route path="/editprofile" exact element={
          <EditProfile />
        }/>
      </Routes>
      </>
      <Footer/>
    </div>
  );
}
