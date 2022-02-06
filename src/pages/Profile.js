import { React, useEffect, useState } from "react";

import etheriumLogo from '../assets/etheriumLogo.svg'
import shareIcon from '../assets/shareIcon.svg'
import Cards from '../components/Cards'
import {useNavigate} from 'react-router-dom';

import { create, urlSource } from 'ipfs-http-client'

import CreateNFT from '../components/CreateNFT'

const Profile = () => {
  
  const [username, setUsername] = useState();
  const [isShown, setIsShown] = useState(false);
  const [photoFile, setPhotoFile] = useState();
  const [photoFileName, setPhotoFileName] = useState();
  const [profileBanner, setProfileBanner] = useState();
  const [profilePic, setProfilePic] = useState();

  const [open, setOpen] = useState(false)

  const navigate = useNavigate();

  const onChangePhoto = (e) => {
    setPhotoFile(e.target.files[0]);
    setPhotoFileName(e.target.files[0].name);
  };

  const onSubmitPhoto = async (e) => {
    const file = photoFile;
    const name = photoFileName;

};

  return (
    <div className="grid bg-[#0a111a] pt-2">
      <div className="grid mx-12 h-80">
      <img
          className=" rounded-lg bg-white w-full h-80 object-cover place-self-center"
          src=""
          alt="profileBanner"
        />
        <img
          className="rounded-[50%] bg-white w-32 h-32 object-cover place-self-center -mt-16"
          src=""
          alt="profilePic"
        />
        <button onClick={() => setIsShown(true)} className="justify-self-end w-28 -mt-28 mr-2 bg-[#3f313110] text-black text-xs h-10 rounded-lg border-2 border-black">
          Edit
        </button>
        {isShown && (
        <div className="flex flex-col bg-gray-400 w-1/2 h-80 absolute justify-center items-center self-center justify-self-center">
          <img className="w-2/3 h-40" src={profileBanner} alt="" />
          <input className="text-black  bg-white" type="file" accept="image/*" multiple={false} id="profilePhoto" onChange={onChangePhoto}/>
          <button onClick={() => {onSubmitPhoto()}} class="bg-[#8164a4] hover:bg-[#7138bb] text-white font-bold py-2 px-4 rounded-full">
             Update Banner
         </button>
         <button onClick={() => {setIsShown(false);}} class="bg-[#8164a4] hover:bg-[#7138bb] text-white font-bold py-2 px-4 rounded-full">
             Close
         </button>
        </div>
      )}
        <h1 className="text-xl place-self-center text-white mt-2">
          {username}
        </h1>
      </div>
      <div className="flex gap-1.5 rounded-lg text-xs bg-otherGray w-36 h-7 mt-28 text-lightGray place-self-center">
        <img className="ml-1" src={etheriumLogo} />
        <p className="mt-1.5 truncate text-white">acc</p>
      </div>
      <div className="flex gap-4 place-self-center mt-6">
        <button onClick={() => navigate("/editprofile")} className="w-32 h-10 border-solid border-2 border-otherGray text-xs text-white rounded-lg">
          Edit Profile
        </button>
        <button className="w-11 h-10 border-solid border-2 text-otherGray rounded-lg">
          <img className="ml-2.5" src={shareIcon} />
        </button>
      </div>
      <div className="border-solid border mt-8 mx-12 border-otherGray"></div>
      <div>
      <button className="w-32 h-10 border-solid border-2 bg-black border-black bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext text-xs text-white float-right rounded-lg mr-28 mt-8" onClick={() => setOpen(true)}>
          Create NFT
      </button>
      </div>
      <Cards />
      <CreateNFT open={open} setOpen={setOpen}/>
    </div>
  )
}
export default Profile