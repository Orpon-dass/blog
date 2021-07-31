import React,{useEffect,useState} from 'react'
import menImg from '../img/download.png'
import Message from './Message'

export default function Allmessage({friendId}) {
   const [friendDetails, setfriendDetails] = useState({});
  const [msgClick, setmsgClick] = useState(false);
   const showMessage =()=>{
    setmsgClick(!msgClick);
  }
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
     const messageHandler = (e)=>{
         showMessage();
         console.log(e.target.value)
         let senderId = e.target.value;
         let userId= localStorage.getItem("token");


     }
    return (
          <>
             <div className="flex bg-gray-100 h-16">
                <div className="flex items-center ml-3">
                  {friendDetails.avatar !=="" &&
                  <button onClick={messageHandler} value={friendDetails.userId} className="cursor-pointer" >
                    <img src={`http://localhost:8000/image/${friendDetails.avatar}`} className="object-cover object-center h-12 w-12 rounded-full" alt="userProfilePicture"/>
                  </button>
                  }
                  {friendDetails.avatar ==="" &&
                  <button onClick={messageHandler} value={friendDetails.userId}>
                    <img src={menImg} className="object-cover object-center h-12 w-12 rounded-full" alt="userProfilePicture"/>
                  </button>
                  }
                </div>
                <div  className="mt-1 flex-grow  ml-3">
                  <button onClick={messageHandler} value={friendDetails.userId} className="cursor-pointer font-serif font-semibold text-gray-700 text-lg" >{friendDetails.username}</button>
                  <div className="text-sm font-normal">hi,how are you?</div>
                </div>
                <div className="p-2 justify-self-end ml-3 text-sm">2 min ago</div>
             </div>
              {msgClick ? <Message showMsg ={showMessage} /> :null }
             </>

    )
}
