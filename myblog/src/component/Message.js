import React from 'react'

export default function Message(props) {
    return (
        <div className="w-4/5  md:w-80 h-96 bg-pink-50 shadow-lg ring-2 ring-indigo-500 sticky bottom-0 left-full z-10 rounded-sm transition-all  ease-in duration-700 " >
            <div className="bg-indigo-500 flex justify-between" >
                <div className="p-2 text-pink-50 text-lg font-serif">
                  Orpon dass
               </div>
               <div className="p-2" onClick={props.showMsg}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-50 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
               </div>
            </div>
            <div className="w-full flex flex-col">
               <div className="w-9/12 bg-indigo-600  px-2 py-1 text-base font-serif text-white m-2 rounded-md text-justify">that was applied at a smaller breakpoint</div>
               <div className="w-9/12 bg-indigo-600 self-end px-2 py-1 text-base font-serif text-white m-2 rounded-md text-justify">Hellow</div>
               <div className="w-9/12 bg-indigo-600  px-2 py-1 text-base serif text-white m-2 rounded-md">that was applied at a smaller breakpoint</div>
               <div className="w-9/12 bg-indigo-600 self-end px-2 py-1 text-base font-serif text-white m-2 rounded-md">Hellow</div>
            </div>
            <div className="flex justify-center items-center absolute w-full bottom-0 h-12 mb-2"> 
             <div className="flex-grow m-2">
                 <input className="w-full rounded-lg focus:ring-indigo-700 focus:ring-2" type="text" />
             </div>
             <div className="m-1 ">
                  <button className="bg-indigo-600 hover:bg-indigo-700 py-1 px-2 text-white font-serif rounded-lg">Send</button>
             </div>
            </div>
        </div>
    )
}
