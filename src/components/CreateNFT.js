import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import MarketABI from '../utils/Marketabi.json';
import NFTABI from '../utils/NFTabi.json';
import { NFT_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS } from '../config.js';
const CreateNFT = ({ open, setOpen, acc }) => {
  // const NFT_CONTRACT_ADDRESS = '0x9F4F42725dD6a2B4f554A2555Ec032AB6De0e9D9';
  // const MARKET_CONTRACT_ADDRESS = '0xF03614BF7FeC9f77aa0CF4F85D344Ce8A80524cD';

  const [nFTContract, setNFTContract] = useState();
  const [marketContract, setMarketContract] = useState();

  // This is the tokenURI
  const [tokenURI, setTokenURI] = useState();
  const provider = useRef();

  const client = create('https://ipfs.infura.io:5001/api/v0');

  const defaultImage =
    'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640';
  const [nftName, setNftName] = useState();
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [imageURL, setImageURL] = useState();
  const [type, setType] = useState('Premium');
  const [artistAddress, setArtistAddress] = useState(acc);
  const cancelButtonRef = useRef(null);
  const setValuesToDefault = () => {
    setNftName('');
    setDescription('');
    setAmount(0);
    setImageURL('');
    setType('Premium');
    setPrice(0);
  };
  const handleimageUpload = async (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   const base64data = reader.result;
    //   setImageURL(base64data);
    // };

    const addFile = await client.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    const url = `https://ipfs.infura.io/ipfs/${addFile.path}`;
    setImageURL(url);
  };
  const handleCancel = () => {
    setOpen(false);
    setValuesToDefault();
  };

  async function publishNFT() {
    // e.preventDefault();
    if (nftName && description && amount && price && imageURL && type) {
      // Sending the meta-data to IPFS
      const nftObj = JSON.stringify({
        name: nftName,
        desription: description,
        image: imageURL,
        attributes: [
          {
            trait_type: 'level',
            value: type,
          },
        ],
      });
      try {
        const added = await client.add(nftObj);

        let tempURI = `https://ipfs.infura.io/ipfs/${added.path}`;
        console.log(' tempURI: ', tempURI);

        setTokenURI(tempURI);
        console.log(' TokenURI: ', tokenURI);

        await launchNFTHandler(tempURI);

        alert('NFTs Published Successfully !!!');
      } catch (err) {
        console.log('Error In: ', err);
      }
      setValuesToDefault();
      setOpen(false);
    } else {
      alert('Fill all the values in the form !!!');
    }
  }

  const launchNFTHandler = async (tokenURI) => {
    // Launch NFT Returns TokenInfo => tokenId, Price, Amount
    let transaction = await nFTContract.launchNFT(amount, tokenURI);
    let tx = await transaction.wait();
    console.log('tx', tx);
    let event = tx.events[0];
    // let value = event.args[2];
    // let tokenId = value.toNumber();
    let tokenId = event.args.id.toNumber();
    console.log('id', event.args.id.toNumber());
    // console.log('Value id', tokenId);

    console.log(
      acc,
      tokenId,
      amount,
      price,
      nftName,
      description,
      imageURL,
      type
    );

    //NFT is minted, now listing of NFT
    transaction = await marketContract.listNFT(
      NFT_CONTRACT_ADDRESS,
      acc,
      tokenId,
      amount,
      price,
      nftName,
      description,
      imageURL,
      type
    );
    transaction.gasLimit = 3000000;
    tx = await transaction.wait();
    console.log('Item listed');
  };

  useEffect(() => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        provider.current = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.current.getSigner();
        const nftContract = new ethers.Contract(
          NFT_CONTRACT_ADDRESS,
          NFTABI.abi,
          signer
        );

        const marketPlaceContract = new ethers.Contract(
          MARKET_CONTRACT_ADDRESS,
          MarketABI.abi,
          signer
        );

        setNFTContract(nftContract);
        setMarketContract(marketPlaceContract);
      }
    } catch (err) {
      console.log('In error: ' + err);
    }
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Create NFT
                    </Dialog.Title>
                    <div className='mt-2'>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            for='grid-first-name'
                          >
                            Artist Name
                          </label>
                          <input
                            value={nftName}
                            onChange={(e) => setNftName(e.target.value)}
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                            id='grid-name'
                            type='text'
                            placeholder='Artist Name'
                            required
                          />
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            for='grid-password'
                          >
                            Description
                          </label>
                          <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            id='grid-description'
                            type='text'
                            placeholder='Description'
                          />
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            for='grid-city'
                          >
                            Price
                          </label>
                          <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            id='grid-city'
                            type='number'
                            placeholder='Price in Matic'
                          />
                        </div>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            for='grid-state'
                          >
                            Type
                          </label>
                          <div className='relative'>
                            <select
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                              className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                              id='grid-state'
                            >
                              <option value={'Premium'}>Premium</option>
                              <option value={'General'}>General</option>
                            </select>
                            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                              <svg
                                className='fill-current h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                              >
                                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            for='grid-last-name'
                          >
                            Amount
                          </label>
                          <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            id='grid-last-name'
                            type='number'
                            placeholder='Total Amount'
                            required
                          />
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-2'>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                          <input
                            onChange={handleimageUpload}
                            className='form-control
                                                            mt-16
                                                            block
                                                            w-full
                                                            px-3
                                                            py-1.5
                                                            text-base
                                                            font-normal
                                                            text-gray-700
                                                            bg-white bg-clip-padding
                                                            border border-solid border-gray-300
                                                            rounded
                                                            transition
                                                            ease-in-out
                                                            m-0
                                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            type='file'
                            id='formFile'
                          />
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                          <img
                            src={imageURL} alt="uploadedImage"
                            className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-blue focus:outline-none bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={publishNFT}
                >
                  Publish NFTs
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => handleCancel()}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default CreateNFT;
