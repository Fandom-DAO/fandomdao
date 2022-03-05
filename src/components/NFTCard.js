import React from "react";

function NFTCard({tokenId, price, soldCount, totalCount, nftName, description, imageURI, nftType, artist, buyNFT}){
    return (
        <div className='flex flex-col rounded my-8 hover:grid-cols-3 bg-[#1E2342]'>
            <div style={{backgroundImage: `url('https://images.moneycontrol.com/static-mcnews/2021/08/Prateek-Kuhad-Photo-Prashin-Jagger-770x433.jpg')`}}
                className="w-100 rounded-t min-h-max h-96 bg-cover" 
            />
            <div className="p-5">
            <div className="text-xl font-semibold flex justify-between">
                <span>{artist}</span>
                <span>{price} ETH</span>
            </div>

            <div className="text-lg my-2 flex justify-between">
                <span>{nftName}</span>
                <span>
                    {
                        totalCount - soldCount
                    } / {
                        totalCount
                    } left
                </span>
            </div>
            <div className="text-slate-500">
                {description}
            </div>
            <hr className="my-2" />
            <button onClick={async() => {await buyNFT(tokenId, price)}} className="p-3 rounded w-full m-auto font-bold bg-gradient-to-r from-[#df3f86] to-[#6218a8]">Buy Now</button>
            </div>
        </div>
    );
}

export default NFTCard;