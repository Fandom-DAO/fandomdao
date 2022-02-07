import { React, useEffect, useState } from "react";
import { create } from 'ipfs-http-client'

function Editprofile() {

  const client = create('https://ipfs.infura.io:5001/api/v0')

  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  async function onChangePhoto(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setProfilePic(url);
    } catch (err) {
      console.log(err);
    }
  }

  async function createItem() {
    const user_data = JSON.stringify({
      username,
      email,
      profilePic,
    });
    try {
      const added = await client.add(user_data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
    } catch (err) {
      console.log(err);
    }
  }

  return (
      <div className="flex justify-around bg-[#0a111a]">
        <div className='flex flex-col  p-4 justify-center'>
          <h1 className="text-[#fff] text-5xl font-semibold pb-4">Edit Profile</h1>
          <h2 className="text-[#fff] text-lg font-semibold pb-4">Customize you username and profile picture</h2>
          <label class="block border-b-2 mb-10 text-[#ffffff]">
          <input type="text" value={username} placeholder="User Name" className='block bg-[#0a111a] w-full h-7 shadow-sm' 
          onChange={(event) => setUsername(event.currentTarget.value)}/>
          </label>

          <label class="block border-b-2 mb-10 text-[#ffffff]">
          <input type="text" value={email} placeholder="Email" className='block bg-[#0a111a] w-full h-7 shadow-sm' 
          onChange={(event) => setEmail(event.currentTarget.value)}/>
          </label>
            <button onClick={createItem} class="bg-[#7138bb] hover:bg-[#9477b8] text-white font-bold py-2 rounded-full">
              Update Profile
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