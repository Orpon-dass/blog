import React,{useState,useRef,useEffect} from 'react'
const jwt = require("jsonwebtoken");
export default function Message({message,showMsg,saveChatMsg,messageToggle,FriendName}) {
    const userId = localStorage.getItem("token")
    const user_Id = jwt.verify(userId,process.env.REACT_APP_SECRET_KEY);
    const [chatMessage, setChatMessage] = useState("");
    const handleMsg =()=>{
      messageToggle();  
    }
    const handleChatMessage =()=>{
      saveChatMsg(chatMessage);
      setChatMessage("");
    }
    const scrollref=useRef();
    // const outScrollref =useRef();
    useEffect(() => {
      if(message.length>0){
        scrollref.current.scrollIntoView({behavior:"smooth"})
      }
    },[message])
    return (
        <div className="w-4/5  mb-3 md:w-80 h-96 bg-pink-50  shadow-lg ring-2 ring-indigo-600 sticky bottom-0 left-full z-10 rounded-sm transition-all  ease-in duration-700 " >
            <div className="bg-indigo-500 flex justify-between" >
                <div className="p-2 text-pink-50 text-lg font-serif">
                  {FriendName}
               </div>
               <div className="p-2" onClick={handleMsg}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-50 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
               </div>
            </div>
            <div className="h-60 overflow-y-auto">
              { message.map((msg)=>
              <div ref={scrollref}  key={msg._id} className="w-full flex flex-col">
                {msg.senderId===user_Id.id  ?
                <div className="w-9/12 bg-indigo-500 self-end  px-2 py-1 text-base font-serif text-white m-2 rounded-md text-justify">{msg.messageBody}</div>
                  : 
                <div className="w-9/12 bg-indigo-500 px-2 py-1 text-base font-serif text-white m-2 rounded-md text-justify">{msg.messageBody}</div>}
              </div>
                )
              }
            </div>
            <div className="flex justify-center items-center absolute w-full bottom-0 mb-2"> 
                <div className="flex-grow mb-2 ml-2 mr-2">
                    <input onChange={(e)=>setChatMessage(e.target.value)} value={chatMessage} className="w-full h-20 rounded-lg focus:ring-indigo-700 focus:ring-2" type="text" />
                </div>
                <div className="mb-2 mr-2 ">
                      <button onClick={handleChatMessage} className="bg-indigo-600 hover:bg-indigo-700 py-1 px-2 text-white font-serif rounded-lg">Send</button>
                </div>
            </div>
        </div>
    )
}
