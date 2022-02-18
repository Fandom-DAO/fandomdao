import React from "react";

function NFTCard(props){
    return (
        <div className='flex flex-col rounded my-8 hover:grid-cols-3 bg-[#1E2342]'>
            <div style={{backgroundImage: `url('https://images.moneycontrol.com/static-mcnews/2021/08/Prateek-Kuhad-Photo-Prashin-Jagger-770x433.jpg')`}}
                className="w-100 rounded-t min-h-max h-96 bg-cover" 
            />
            <div className="p-5">
            <div className="text-xl font-semibold flex justify-between">
                <span>{props.artist}</span>
                <span>{props.nft[1].toNumber()} ETH</span>
            </div>

            <div className="text-lg my-2 flex justify-between">
                <span>Name of the NFT</span>
                <span>
                    {
                        props.nft[3] - props.nft[2]
                    } / {
                        props.nft[3]
                    } left
                </span>
            </div>
            <div className="text-slate-500">
                Loren ipsum dolor sit amte, consectetur aipiscing  elit, set do eiusmod tempor incidudnt ut latoro dolore amgna liqua.
            </div>
            <hr className="my-2" />
            <button onClick={async() => {await props.buyNFT(props.nft[0], props.nft[1].toNumber())}} className="p-3 rounded w-full m-auto font-bold bg-gradient-to-r from-[#df3f86] to-[#6218a8]">Buy Now</button>
            </div>
        </div>
    );
}

export default NFTCard;