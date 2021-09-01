import React from 'react'

export default function ErrorPage() {
    return (
        <div className="fixed w-full  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-md transition-all ease-in-out duration-700">
           <div className="text-2xl p-3 md:text-7xl text-center font-thin">Whoops, looks like something went wrong.</div> 
        </div>
    )
}
