import React,{useState} from 'react'
import {Link} from 'react-router-dom'

export default function Header(props) {
  const [searchIcon, setsearchIcon] = useState(false);
  // const [searchvalue, setsearchvalue] = useState(null);
  // const searchHandler =()=>{
  //    props.collectSearchValue(searchvalue);
  // }
    return (
        <>
          <div className="  
          inline-flex
          nav-bar
        bg-gray-800 h-16
          w-full
        "
          >
             <div className="w-2/4 md:w-1/3 text-gray-200 flex items-center text-lg pl-4 serif">
                <Link to="/">
                 BrandName
                </Link>
             </div>
             <div className="w-2/3 pt-1 relative hidden md:block" >
                 <div className="absolute w-full">
                   <input onChange={(e)=>props.collectSearchValue(e.target.value)} className="w-full rounded-lg h-14 focus:ring-indigo-700 focus:ring-2 serif" type="text" placeholder="Search job.." />
                 </div>
                 <div className="absolute right-0 pt-2 pr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-black" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                 </div>
             </div>
             <div className="w-2/4 md:w-1/3 flex justify-end items-center">
                <div className="pr-2 block md:hidden" onClick={()=>{setsearchIcon(!searchIcon)}}>
                    <svg  xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-gray-200 hover:text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
              {props.isLogin &&
              <div className="pr-2" onClick={props.showMsg}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-gray-200 hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>                
              </div>
              }
              {props.isLogin &&
                <Link to="/userprofile">
                  <div className="pr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200 hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </Link>
               }
               {props.isLogin ===false  &&
               <div onClick={props.loginRegisterToggle} className="pr-6 flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200 hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="text-gray-100 font-serif font-bold text-lg mt-2 ml-2 cursor-pointer">Login</span>
               </div>
               }
             </div>
         </div> 
        { searchIcon ?
        <div className="w-full mt-1 pl-2 pr-2 block md:hidden transition ease-in duration-500 absolute z-10">
          <input onChange={(e)=>props.collectSearchValue(e.target.value)} className="w-full rounded-lg h-14 focus:ring-indigo-700 focus:ring-2 font-serif" type="text" placeholder="Search job.." />
        </div>
        :null
        }
        </>
    )
}
