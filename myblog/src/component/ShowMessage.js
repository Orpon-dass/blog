import React from 'react'

export default function ShowMessage({apiMsg}) {
    return (
        <div className="bg-green-300 absolute z-10 w-full transition-all duration-700 ease-in-out h-10 flex justify-center items-center font-serif text-lg text-gray-800"> 
            {apiMsg}
        </div>
        
    )
}
