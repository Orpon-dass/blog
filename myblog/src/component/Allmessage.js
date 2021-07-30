import React from 'react'
import menImg from '../img/men.jpeg'

export default function Allmessage({friendName}) {
    return (
             <div className="flex bg-gray-100 h-16">
                <div className="flex items-center ml-3">
                   <img src={menImg} className="object-cover object-center h-12 w-12 rounded-full" alt="userProfilePicture"/>
                </div>
                <div className="mt-1 flex-grow font-serif ml-3 font-semibold text-gray-700 text-lg">
                  {friendName}
                  <div className="text-sm font-normal">hi,how are you?</div>
                </div>
                <div className="p-2 justify-self-end ml-3 text-sm">2 min ago</div>
             </div>
    )
}
