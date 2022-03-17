import { artistData } from '../../assets/data'
export default function Cards() {
  return (
    <>
      {artistData?.nfts?.length > 1 ? (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 z-0">
          <div className="mt-6 grid grid-cols-1 gap-y-28 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-32">
            {artistData.nfts.map((nft, index) => (
              <div key={index} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
                  <img
                    src={nft.imageSrc}
                    alt={nft.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="flex justify-between bg-darkgray h-28 rounded">
                  <div>
                    <h3 className="text-sm text-white text-gray-700 ml-4 mt-4">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {artistData.name}
                    </h3>
                    <p className="mt-1 text-white text-sm text-gray-500 ml-4">
                      {nft.name}
                    </p>
                  </div>
                  <p className="text-sm text-white font-medium text-gray-900 mr-4 mt-2">
                    {nft.price}
                  </p>
                </div>
                <div className="border-solid border -mt-8 mx-12 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="block place-self-center text-center mt-14">
          <p className="text-4xl text-center text-white">No items found</p>
          <p className="text-sm mt-4 text-white w-96">
            Come back soon! or try to browse something for you on our
            marketplace
          </p>
          <button className="text-white text-sm mt-8 mb-16 w-32 rounded p-2  bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext">
            Browse NFTs
          </button>
        </div>
      )}
    </>
  )
}
