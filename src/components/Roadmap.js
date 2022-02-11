import React from 'react'
import './Roadmap.css';

import { GiFastForwardButton } from 'react-icons/gi';
import { BsCheckCircle } from 'react-icons/bs';

import { roadmapData } from '../assets/roadmapData'

function Roadmap() {
  return (
    <div class="flex flex-col">
        <p class="flex justify-center font-bold text-4xl text-[#d53f86] mt-10">
            Roadmap
        </p>
        <div class="flex overflow-x-scroll pb-10 mt-8 hide-scroll-bar">
            <div class="flex flex-nowrap ml-10 ">
                {roadmapData.map((data) => (
                    <div class="inline-block px-3">
                        <div class="flex flex-col w-64 h-72 max-w-xs text-white p-5 text-center overflow-hidden items-center rounded-lg shadow-md bg-[#1e2342] hover:shadow-xl hover:shadow-cyan-800 transition-shadow duration-300 ease-in-out">
                            <p className='text-xl font-extrabold'>{data.time}</p>
                            <p className='text-xl font-semibold mt-5 mb-2'> {data.heading} </p>
                            <p> {data.content} </p>
                            <div className='border-2 border-slate-400 w-full mt-6'></div>
                            <p className='flex items-center text-2xl py-1'> {data.completed? <><BsCheckCircle className='text-emerald-500 mr-4'/> Done</>: <><GiFastForwardButton  className='text-amber-300 mr-4'/> In Progress</>}  </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Roadmap