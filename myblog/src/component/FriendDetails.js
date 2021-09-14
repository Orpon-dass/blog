import React from 'react'
import menImg from '../img/download.png'
import {weburl} from '../Controller/UserController'

export default function FriendDetails({setShowFriendDetails,friendDetails}) {
    return (
        <div className="bg-indigo-100 fixed w-5/6 xl:w-2/5  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-md transition-all ease-in-out duration-700">
            <div className="flex justify-end">
                    <svg onClick={()=>setShowFriendDetails(false)} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mx-2  mt-1 cursor-pointer text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
            </div>
            <div className="w-full">
               <div className="flex  justify-center">
               <div className="">
                      {friendDetails.avatar ?
                       <img className="p-2 object-cover object-center w-44 h-44 rounded-full"  src={`${weburl}/image/${friendDetails.avatar}`} alt="userImage"/>
                     :
                       <img className="p-2 object-cover object-center w-44 h-44 rounded-full" src={menImg}  alt="userImage"/>
                      }
                  </div> 
               </div>
               <div className="mb-5 text-center text-xl font-serif font-semibold text-gray-700 ">
                        {friendDetails.username}
              </div>
              <div className="flex">
                <div className="pt-2 pl-4 pb-2 pr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-500 h-8 w-8 hover:text-indigo-700 transition-colors duration-700 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                </div>
                <div className="flex-grow p-3 text-gray-700 text-lg font-serif">{friendDetails.universityName}</div>
             </div>

             <div className="flex">
                <div className="pt-2 pl-4 pb-2 pr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-500 h-8 w-8 hover:text-indigo-700 transition-colors duration-700 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                </div>
                <div className="flex-grow p-3 text-gray-700 text-lg font-serif">{friendDetails.collegeName}</div>
             </div>
             <div className="flex">
                <div className="pt-2 pl-4 pb-2 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-500 h-8 w-8 hover:text-indigo-700 transition-colors duration-700 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div className="flex-grow p-3 text-gray-700 text-lg font-serif">Form {friendDetails.permanentAddress}</div>
            </div>
            <div className="flex">
                <div className="pt-2 pl-4 pb-2 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-500 h-8 w-8 hover:text-indigo-700 transition-colors duration-700 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <div className="flex-grow p-3 text-gray-700 text-lg font-serif">Lives in {friendDetails.permanentAddress}</div>
            </div>
            <div className="flex">
                <div className="pt-2 pl-4 pb-10 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-500 h-8 w-8 hover:text-indigo-700 transition-colors duration-700 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>
                <div className="flex-grow p-3 text-gray-700  text-lg proportional-nums">{friendDetails.phoneNumber}</div>
            </div>

            </div>
        </div>
    )
}
