import React,{useState} from 'react'

export default function PostEditForm({postEditFormToggle,postEditData,posterrorMsg,postEditPreValue}) {
    let userId = localStorage.getItem("token");
    const [post, setpost] = useState({
        userId,
        postBody:postEditPreValue.body,
        Studentclass:postEditPreValue.studentClass,
        address:postEditPreValue.address,
        salary:postEditPreValue.salary});
    const posthandler = (arg)=>{
        setpost({...post,[arg.target.name]:arg.target.value});
}
    const submitPost =()=>{
        postEditData(post);
    }
    return (
        <div className="bg-indigo-100 fixed w-5/6 xl:w-2/5  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-md transition-all ease-in-out duration-700">
        <div className="flex justify-between">
           <div className="m-1 pl-3 pt-2 font-serif font-semibold text-gray-800 text-lg">Write post here</div>
           <div className="m-1">
                <svg onClick={postEditFormToggle}  xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mx-2  mt-1 cursor-pointer text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
           </div>
        </div>
        <div className="m-4">
           <div className="m-1 font-serif text-center p-1 text-red-700">{posterrorMsg}</div>
           <textarea onChange={posthandler} value={post.postBody}      name="postBody" className=" w-full h-20 rounded-md focus:ring-indigo-600" />
           <input onChange={posthandler}    value={post.Studentclass}   name="Studentclass"  className="w-full mt-3 h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700" placeholder="Class name..." />
           <input onChange={posthandler}    value={post.address}        name="address"  className="w-full mt-4 h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700" placeholder="Your address..." />
           <input onChange={posthandler}    value={post.salary}         name="salary"  className="w-full mt-4 h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700" placeholder="estimated salary..." />
        <button onClick={submitPost} className="h-12 mt-3 w-full bg-indigo-500 text-white font-serif font-semibold rounded-md text-xl focus:bg-indigo-700 hover:bg-indigo-700 text-center transition-colors duration-700 ease-in-out">post</button>
        </div>
    </div>
    )
}
