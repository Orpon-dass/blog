import React,{useEffect,useState} from 'react'
import FriendDetails from './FriendDetails';
import menImg from '../img/download.png'
export default function Allmessage({friendId,setFriendIdForChatId,setFriendName,messageToggle,onlineUser}) {
   const [friendDetails, setfriendDetails] = useState({});
   const [showFriendDetails, setShowFriendDetails] = useState(false);
   const [isOnline, setIsOnline] = useState(null)
   useEffect(() => {
    const onlineFriend = onlineUser.find((user)=>user.userid===friendDetails.userId);
    if(onlineFriend){
      setIsOnline(true)
    }else{
      setIsOnline(false)
    }
  })
     useEffect(() => {
      let userForConversation = async ()=>{
                  let user = await fetch("http://localhost:8000/api/userfindformessage",{
                      method:"POST",
                      headers:{
                          "Content-Type":"application/json",
                          "Accept":"application/json"
                      },
                      body:JSON.stringify({friendId})
                  })
                  let userResponse = await user.json();
                  setfriendDetails(userResponse)
             }
             userForConversation()
     },[friendId]);
     const messageHandler = (value)=>{
         setFriendIdForChatId(value);
         setFriendName(friendDetails.username);
         messageToggle();
     }
    return (
          <>
             <div className="flex bg-gray-100 h-16 relative">
                <div onClick={()=>{messageHandler(friendDetails.userId)}} className="flex items-center ml-3">
                  {friendDetails.avatar !==""  &&
                    <img src={`http://localhost:8000/image/${friendDetails.avatar}`} className="object-cover object-center h-12 w-12 rounded-full" alt="userProfilePicture"/>
                  }
                  {friendDetails.avatar ==="" &&
                    <img src={menImg} className="object-cover object-center h-12 w-12 rounded-full" alt="userProfilePicture"/>
                  }
                  {friendDetails.avatar ===null &&
                    <img src={menImg} className="object-cover object-center h-12 w-12 rounded-full" alt="userProfilePicture"/>
                  }
                </div>
                <div onClick={()=>{messageHandler(friendDetails.userId)}} className="mt-1 flex-grow  ml-3 cursor-pointer font-serif font-semibold text-gray-700 text-lg">
                  {friendDetails.username} 
                  <div className={isOnline ?"text-sm font-normal text-green-500":"text-sm font-normal"}>{isOnline ? "Online" : "Offline" }</div>
                </div>
                <div onClick={()=>setShowFriendDetails(true)} className="p-3 ursor-pointer justify-self-end ml-3 text-sm font-serif font-semibold text-indigo-500">View Details</div>
             </div>
              {showFriendDetails &&<FriendDetails friendDetails={friendDetails} setShowFriendDetails={setShowFriendDetails} />}
             </>

    )
}
