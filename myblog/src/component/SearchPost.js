import React from 'react'

export default function SearchPost({photo}) {
    return (
        <div>
        <div className="bg-gray-100 mt-5 ml-2 mr-2 mb-2 rounded-lg shadow-sm transition-all duration-700 ease-in">
           <div className="flex">
               <div className="flex justify-center">
                   { photo!==null &&
                       <img className="p-2 object-cover object-center h-20 w-20 rounded-full" src={`http://localhost:8000/image/${photo}`} alt="userImage"/>
                   }
                   { photo=== null &&
                       <img className="p-2 object-cover object-center h-20 w-20 rounded-full" src={menImg} alt="userImage"/>
                   }

               </div>
               <div className="flex-grow">
                   <div className="pt-3 pl-3 text-sm md:text-xl font-semibold text-gray-600 font-serif subpixel-antialiased">Orpon Chandro dass</div>
                   <div className="pl-3 text-indigo-700 text-sm" >9:00</div>
               </div>
           </div>
           <p className="pl-3 pb-3 pr-3 text-justify text-gray-800 font-serif text-base md:text-lg subpixel-antialiased tracking-tight leading-relaxed">
               Post body
           </p>
           <div className="p-1">
                   <div className="pl-3 text-gray-800 text-lg font-serif">class : Seven</div>
            </div>
            <div className="pb-1">
                <div className="flex pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
                   <div className="pl-3 text-gray-800 text-sm">3000 .Tk</div>
                </div>
            </div>
            
            <div className="pb-1">
                <div className="flex pl-3">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                   <div className="pl-3 text-gray-800 text-sm font-serif">address</div>
                </div>
            </div>

            
        </div>

       </div>
    )
}
