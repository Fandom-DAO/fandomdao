import { React, useEffect, useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import {useNavigate} from 'react-router-dom';

function Editprofile() {
  const {user, setUserData} = useMoralis();
  const {saveFile, isUploading} = useMoralisFile();

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()

  const [photoFile, setPhotoFile] = useState();
  const [photoFileName, setPhotoFileName] = useState();
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfilePic(user.attributes?.profilePic?._url);
      setUsername(user.attributes.username)
      setEmail(user.attributes.email)
    }
  }, [user]);

  const onChangePhoto = (e) => {
    setPhotoFile(e.target.files[0]);
    setPhotoFileName(e.target.files[0].name);
  };

  const onSubmitPhoto = async () => {
    if (photoFile){
      const file = photoFile;
      const name = photoFileName;
      let fileIpfs = await saveFile(name, file, { saveIPFS: true });
      user.set("profilePic", fileIpfs);
      await user.save();
      setProfilePic(user.attributes.profilePic._url);
      window.location.reload(false);
      navigate(`/profile/${username}`);
  }
};

    const handleSave = () => {
        setUserData(
            {
                username,
                email
            }
        )
        
    };


  return (
      <div className="flex justify-around bg-[#0a111a]">
        <div className='flex flex-col  p-4 justify-center'>
          <h1 className="text-[#fff] text-5xl font-semibold pb-4">Edit Profile</h1>
          <h2 className="text-[#fff] text-lg font-semibold pb-4">Customize you username and profile picture</h2>
          <label class="block border-b-2 mb-10 text-[#ffffff]">
          <input type="text" value={username} placeholder="User Name" className='block bg-[#0a111a] w-full h-7 shadow-sm' onChange={(event) => setUsername(event.currentTarget.value)}/>
          </label>

          <label class="block border-b-2 mb-10 text-[#ffffff]">
          <input type="text" value={email} placeholder="Email" className='block bg-[#0a111a] w-full h-7 shadow-sm' onChange={(event) => setEmail(event.currentTarget.value)}/>
          </label>
            <button onClick={() => {handleSave();onSubmitPhoto();}} class="bg-[#7138bb] hover:bg-[#9477b8] text-white font-bold py-2 rounded-full">
              {isUploading?"Wait":"Update Profile"}
            </button>
          
        </div>

        <div className='flex flex-col  justify-center items-center place-self-center align-middle'>
          <img className="rounded-[50%] w-40 h-40" src={profilePic} alt="" />
          <input className="w-[88px] h-7 text-black  bg-white" type="file" accept="image/*" multiple={false} id="profilePhoto" onChange={onChangePhoto}/>
        </div>
     </div>
  );
}

export default Editprofile;
