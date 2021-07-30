import React from 'react'
import menImg from '../img/men2.png'
export default function Featured() {
    return (
        <div className="mt-5 mx-3 bg-indigo-100 p-2 rounded-md hover:bg-indigo-300 transition-colors ease-in-out duration-1000">
            <div className="flex justify-center">
               <img className="p-2 object-cover object-center h-20 w-20 rounded-full" src={menImg} alt="userImage"/>
            </div>
            <div className="text-center text-xs antialiased font-bold font-serif text-gray-700">
                Teacher
            </div>
            <div className="text-center text-sm antialiased font-serif font-semibold  text-gray-700 pb-2">
              Kabir Ahamed
            </div>
        </div>
    )
}
