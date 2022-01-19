import fallbackAvatar from '../../assets/fallbackAvatar.svg'
import etheriumLogo from '../../assets/etheriumLogo.svg'
import shareIcon from '../../assets/shareIcon.svg'
import Cards from './Cards'
import { artistData } from '../../assets/data'
const Profile = () => {
  return (
    <div className="grid">
      <div className="bg-gray grid rounded-lg mx-12 h-80">
        <img
          className="rounded-full bg-white w-32 h-32 object-cover place-self-center mt-64"
          src={artistData.profileSrc}
          alt="user image"
          onError={(e) => {
            e.target.src = fallbackAvatar
          }}
        />
        <button className="justify-self-end w-28 -mt-28 mr-2 bg-black text-xs text-white h-10 rounded-lg">
          Add Cover
        </button>
        <h1 className="text-xl place-self-center text-white mt-2">
          {artistData.name}
        </h1>
      </div>
      <div className="flex gap-1.5 rounded-lg text-xs bg-otherGray w-36 h-7 mt-28 text-lightGray place-self-center">
        <img className="ml-1" src={etheriumLogo} />
        <p className="mt-1.5 truncate">{artistData.address}</p>
      </div>
      <div className="flex gap-4 place-self-center mt-6">
        <button className="w-32 h-10 border-solid border-2 border-otherGray text-xs text-white rounded-lg">
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
