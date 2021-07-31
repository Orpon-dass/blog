import React,{useEffect,useState} from 'react'
import menImg from '../img/download.png'
export default function Allmessage({friendId,messageinfoCollect}) {
   const [friendDetails, setfriendDetails] = useState({});
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
        //  let senderId = e.target.value;
         messageinfoCollect(value)
     }
    return (
          <>
             <div className="flex bg-gray-100 h-16">
                <div onClick={()=>{messageHandler(friendDetails.userId)}} className="flex items-center ml-3">
                  {friendDetails.avatar !=="" &&
                    <img src={`http://localhost:8000/image/${friendDetails.avatar}`} className="object-cover object-center h-12 w-12 rounded-full" alt="userProfilePicture"/>
                  }
                  {friendDetails.avatar ==="" &&
                    <img src={menImg} className="object-cover object-center h-12 w-12 rounded-full" alt="userProfilePicture"/>
                  }
                </div>
                <div onClick={()=>{messageHandler(friendDetails.userId)}} className="mt-1 flex-grow  ml-3 cursor-pointer font-serif font-semibold text-gray-700 text-lg">
                  {friendDetails.username}
                  <div className="text-sm font-normal">hi,how are you?</div>
                </div>
                <div className="p-2 justify-self-end ml-3 text-sm">2 min ago</div>
             </div>
             </>

    )
}
