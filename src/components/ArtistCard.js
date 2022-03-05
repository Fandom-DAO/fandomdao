import React from "react";

function ArtistCard({artistName, artistImage, artistCategory}){
    return (
        <div className='flex flex-col rounded my-8 hover:grid-cols-3 bg-[#1E2342]'>
            <div style={{backgroundImage: `url(${artistImage})`}}
                className="w-100 rounded-t h-96 bg-contain bg-transparent bg-no-repeat bg-center" 
            />
            <div className="p-5">
                <div className="text-xl font-semibold flex justify-between">
                    <span>{artistName}</span>
                </div>

                <div className="text-lg my-2 flex justify-between">
                    <span>{artistCategory}</span>
                </div>
                {/* <div className="text-slate-500">
                    {description}
                </div> */}
                <hr className="my-2" />
                <a href=""><button className="p-3 rounded w-full m-auto font-bold bg-gradient-to-r from-[#df3f86] to-[#6218a8]">See all NFTs</button></a>
            </div>
        </div>
    );
}

export default ArtistCard;