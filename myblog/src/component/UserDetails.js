import React,{useState} from 'react'

export default function UserDetails({toggleUserDetailsControll,isApiMessage,collectdata,message}) {
    //redux code
     let userId =localStorage.getItem("token");
     const [userDetails, setuserDetails] = useState({
        userId:userId,
        yourName:"",
        universityName:"",
        collegeName:"",
        permanentAddress:"",
        presentAddress:"",
        phoneNumber:""
    });
    const userDetailsHandeler=(arg)=>{
        setuserDetails({...userDetails,[arg.target.name]:arg.target.value}); 
    }
    const submitUserDetails= async ()=>{
        collectdata(userDetails);
         
    }
    return (
        <div className="bg-indigo-100 fixed w-5/6 xl:w-2/5   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-md transition-all ease-in-out duration-700">
            <div className="flex justify-between">
               <div className="m-1 pl-3 pt-2 font-serif font-semibold text-gray-800 text-lg">Update your details</div>
               <div className="m-1">
                    <svg onClick={toggleUserDetailsControll}  xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mx-2  mt-1 cursor-pointer text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
               </div>
            </div>
            <div className="m-2 font-serif text-center p-1 text-red-700">{message}</div>
            <div className="m-3">
                <input onChange={userDetailsHandeler} value={userDetails.yourName}   name="yourName"                className="w-full mt-1 h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="your name" />
                <input onChange={userDetailsHandeler} value={userDetails.universityName}   name="universityName"    className="w-full mt-3 h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="University name" />
                <input onChange={userDetailsHandeler} value={userDetails.collegeName}      name="collegeName"       className="w-full mt-3 h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="College name" />
                <input onChange={userDetailsHandeler} value={userDetails.permanentAddress} name="permanentAddress"  className="w-full mt-3 h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="Permanent address" />
                <input onChange={userDetailsHandeler} value={userDetails.presentAddress}   name="presentAddress"    className="w-full mt-3 h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="Present address" />
                <input onChange={userDetailsHandeler} value={userDetails.phoneNumber}      name="phoneNumber"       className="w-full mt-3 h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700" placeholder="Phone number" />
            </div>
            <div className="m-4">
               <button onClick={submitUserDetails} className="h-12 w-full bg-indigo-500 text-white font-serif font-semibold rounded-md text-xl focus:bg-indigo-700 hover:bg-indigo-700 text-center transition-colors duration-700 ease-in-out">Update</button>
            </div> 
        </div>
    )
}
