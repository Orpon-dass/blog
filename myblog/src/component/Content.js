import React,{useEffect, useState} from 'react'
import moment from 'moment'; 
import menImg from '../img/download.png'
export default function Content({buttonName,threeDot,body,studentClass,address,salary,postDate,postEditHandler,postId,deletePost,isLogin,user,setFriendIdForChatId,userId,messageToggle,isApiMessage}) {
    const [postAction, setpostAction] = useState(false);
    const [userinformation, setuserinformation] = useState(null)
    useEffect(() => {
      const collectUserInformation = async ()=>{
      let userId = localStorage.getItem("token");
      const info = await fetch("http://localhost:8000/api/showuserdetils",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({userId})
    });
      const infoResponse = await info.json();
      setuserinformation(infoResponse)
      }
      collectUserInformation()  
    }, [])
    const postActionControll =()=>{
        setpostAction(!postAction);
      }
      const messageHandler=(e)=>{
           if(userinformation.status==="400"){
                isApiMessage("please update your information before message")
           }else{
            setFriendIdForChatId(e.target.value);
            messageToggle();
           }          
      }
    return (
        <div>
         <div className="bg-gray-100 mt-5 ml-2 mr-2 mb-2 rounded-lg shadow-sm transition-all duration-700 ease-in">
            <div className="flex">
                <div className="flex justify-center">
                    { user.avatar!=="" &&
                        <img className="p-2 object-cover object-center h-20 w-20 rounded-full" src={`http://localhost:8000/image/${user.avatar}`} alt="userImage"/>
                    }
                    { user.avatar=== "" &&
                        <img className="p-2 object-cover object-center h-20 w-20 rounded-full" src={menImg} alt="userImage"/>
                    }

                </div>
                <div className="flex-grow">
                    <div className="pt-3 pl-3 text-sm md:text-xl font-semibold text-gray-600 font-serif subpixel-antialiased">{user.username}</div>
                    <div className="pl-3 text-indigo-700 text-sm" >{moment(postDate).fromNow()}</div>
                </div>
                <div>
                    {buttonName &&
                        <div> 
                           {isLogin && <button onClick={messageHandler} value={userId} className="text-sm md:text-lg font-bold font-serif mt-3 mr-3 pl-1 pr-2 pt-1 pb-1 ring-1 ring-indigo-700 text-opacity-100 text-gray-800 hover:bg-indigo-600 hover:text-white">message</button>}
                        </div>
                    }
                    {
                        threeDot && <div  className="flex cursor-pointer flex-col items-end mr-2 text-gray-800 text-xxl">
                         <div onClick={postActionControll} >   
                            <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </div>
                        {postAction &&
                        <div className="flex items-start flex-col">
                           <button onClick={()=>{postEditHandler({postId,body,studentClass,address,salary})}} className="font-serif text-gray-800 text-sm font-semibold" >Edit</button>
                           <button onClick={()=>{deletePost(postId)}} className="font-serif text-gray-800 text-sm font-semibold" >Delete</button> 
                        </div>
                      }
                        </div>
                    }
                </div>
            </div>
            <p className="pl-3 pb-3 pr-3 text-justify text-gray-800 font-serif text-base md:text-lg subpixel-antialiased tracking-tight leading-relaxed">
                {body}
            </p>
            <div className="pb-1">
                <div className="flex pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                    <div className="pl-3 text-gray-800 text-sm font-serif">class : {studentClass}</div>
                </div>
             </div>
             <div className="pb-1">
                 <div className="flex pl-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    <div className="pl-3 text-gray-800 text-sm">{salary} .Tk</div>
                 </div>
             </div>
             
             <div className="pb-1">
                 <div className="flex pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="pl-3 text-gray-800 text-sm font-serif">{address}</div>
                 </div>
             </div>

             
         </div>

        </div>
    )
}