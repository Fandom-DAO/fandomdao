import { React, useEffect, useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";

import etheriumLogo from '../assets/etheriumLogo.svg'
import shareIcon from '../assets/shareIcon.svg'
import fallbackBanner from '../assets/fallbackBanner.jpg'
import Cards from '../components/Cards'
import { artistData } from '../assets/data'
import {useNavigate} from 'react-router-dom';

const Profile = () => {
  
  const {user, setUserData, isAuthenticated} = useMoralis();
  const {saveFile, isUploading} = useMoralisFile();

  const [username, setUsername] = useState();
  const [isShown, setIsShown] = useState(false);
  const [photoFile, setPhotoFile] = useState();
  const [photoFileName, setPhotoFileName] = useState();
  const [profileBanner, setProfileBanner] = useState();
  const [profilePic, setProfilePic] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfileBanner(user.attributes?.banner?._url);
      setProfilePic(user.attributes?.profilePic?._url);
      setUsername(user.attributes.username);
    }
  }, [user]);

  if (user){
    var acc = ''+ user.attributes.accounts;
  }

  const onChangePhoto = (e) => {
    setPhotoFile(e.target.files[0]);
    setPhotoFileName(e.target.files[0].name);
  };

  const onSubmitPhoto = async (e) => {
    const file = photoFile;
    const name = photoFileName;
    let fileIpfs = await saveFile(name, file, { saveIPFS: true });
    user.set("banner", fileIpfs);
    await user.save();
    setProfileBanner(user.attributes.banner._url);
};

  return (
    <div className="grid bg-[#0a111a] pt-2">
      <div className="grid mx-12 h-80">
      <img
          className=" rounded-lg bg-white w-full h-80 object-cover place-self-center"
          src={isAuthenticated ? (user.attributes.banner) ? profileBanner:require('../assets/fallbackBanner.jpg') : ''}
          alt="profileBanner"
        />
        <img
          className="rounded-[50%] bg-white w-32 h-32 object-cover place-self-center -mt-16"
          src={isAuthenticated ? (user.attributes.profilePic) ? profilePic:require('../assets/fandomDAO.png') : ''}
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
         {!isUploading && (<button onClick={() => {setIsShown(false);}} class="bg-[#8164a4] hover:bg-[#7138bb] text-white font-bold py-2 px-4 rounded-full">
             Close
         </button>)}
        </div>
      )}
        <h1 className="text-xl place-self-center text-white mt-2">
          {username}
        </h1>
      </div>
      <div className="flex gap-1.5 rounded-lg text-xs bg-otherGray w-36 h-7 mt-28 text-lightGray place-self-center">
        <img className="ml-1" src={etheriumLogo} />
        <p className="mt-1.5 truncate text-white">{acc}</p>
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
      <Cards />
    </div>
  )
}
export default Profile