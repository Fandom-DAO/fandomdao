import React from 'react';
import { memberData } from '../assets/memberData'

import { FaGithub, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';

function About() {
  return (
    <div class="mb-4">
      <div class="container flex justify-center mx-auto pt-16">
        <h1 class="xl:text-5xl text-3xl text-center text-[#df3f86] font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">Talented People Behind the Scenes of the DAO</h1>
      </div>
      <div class="w-full px-10 pt-10">
        <div class="container mx-auto">
          <div class="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">

          {memberData.members.map((member) => (
            <div class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
              <div class="rounded overflow-hidden shadow-md bg-white">
                <div class="absolute -mt-20 w-full flex justify-center">
                  <div class="h-32 w-32">
                      <img src={member.imageSrc} class="rounded-full object-cover h-full w-full shadow-md" />
                  </div>
                </div>
                <div class="px-6 mt-16">
                  <h1 class="font-bold text-3xl text-center mb-1">{member.name}</h1>
                  <p class="text-gray-800 text-sm text-center">{member.contribution}</p>
                  <div class="w-full flex justify-center pt-5 pb-5">
                              {member.portfolio ? 
                                <a href={member.portfolio} class="mx-5 text-2xl">
                                <GiWorld/>
                                </a>
                                :''
                              }
                              {member.github ? 
                                <a href={member.github} class="mx-5 text-2xl">
                                  <FaGithub/>
                                </a>
                                :''
                              }

                              {member.twitter ? 
                                <a href={member.twitter} class="mx-5 text-2xl">
                                <FaTwitter/>
                                </a>
                                :''
                              }

                              {member.linkedin ? 
                                <a href={member.linkedin} class="mx-5 text-2xl">
                                <FaLinkedinIn/>
                                </a>
                                :''
                              }

                              {member.instagram ? 
                                <a href={member.instagram} class="mx-5 text-2xl">
                                <FaInstagram/>
                                </a>
                                :''
                              }                 
                        </div>
                    </div>
                </div>
            </div>
                      
          ))}

            </div>
          </div>
        </div>
    </div>
  );
}

export default About;