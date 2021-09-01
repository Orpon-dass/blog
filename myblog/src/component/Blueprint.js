import React,{useState,useEffect,useRef} from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header';
import Content from './Content';
import Message from './Message';
import UserProfile from './UserProfile';
import LoginRegister from './LoginRegister';
import Postfrom from './Postfrom';
import ShowMessage from './ShowMessage';
import ErrorPage from './ErrorPage';
import PostSkeleton from './PostSkeleton';
import AdminLonginForm from '../Admin/AdminLonginForm';
import { io } from "socket.io-client";
const  jwt = require("jsonwebtoken");

export default function Blueprint() {

  const [msgClick, setmsgClick] = useState(false);
  const [loginshowHide, setloginshowHide] = useState(false);
  const [togglPostForm , settogglPostForm] =useState(false);
  const [showApiMessage, setshowApiMessage] = useState(false);
  const [apiMessages, setapiMessages] = useState("")
  const [allpost, setallpost] = useState([]);
  const [isPostStateChange,setisPostStateChange] = useState(false);
  const [ispost, setispost] = useState(false);
  const [page, setpage] = useState(1);
  const [bottom, setbottom]  = useState(false);
  const [isLogin,setIsLogIn] = useState(false);
  const [chatMessage, setChatMessage] = useState([]);
  const [FriendIdForChatId, setFriendIdForChatId] = useState(null);
  const [FriendName, setFriendName] = useState("");
  const [isSaveMessage, setisSaveMessage] = useState(false);
  const [onlineUser, setOnlineUser] = useState([])
//socket code for real time chat message 
  const socket = useRef();
    useEffect(() => {
      socket.current=io("ws://localhost:8000");
      let user = localStorage.getItem("token");
      if(user){
        const user_id = jwt.verify(user,process.env.REACT_APP_SECRET_KEY);
        socket.current.emit("addUserId",user_id.id);
        socket.current.on("socketid",(arg)=>{
          setOnlineUser(arg)
        })
        socket.current.on("socketMessage",(msg)=>{
          setChatMessage((prev)=>[...prev,msg])
           })

      }
    }, []);

  //socket code 
   useEffect(() => {
     let userId = localStorage.getItem("token");
     if(userId!==null){
       setIsLogIn(true)
     }else{
      setIsLogIn(false)
     }
   },[isLogin]);

  //post api call 
  useEffect(() => {
  const postApiCall = async ()=>{
  let post = await fetch("http://localhost:8000/api/showallpost",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify({page})
  })
  let postResult = await post.json();
        if(postResult.post){
        if(page===1){
          setallpost(postResult.post)
          setispost(true)
        }else{
          setallpost((allpost)=>[...allpost,...postResult.post]);
          setispost(true)
        }
      }
      if(postResult.post.length===0){
            setbottom(true)
      }
}
    postApiCall();  
  },[page,isPostStateChange]);

  //set page number
  useEffect(()=>{
    function handleScroll() {
      const {scrollHeight,clientHeight,scrollTop}=document.documentElement;
      const ScTopCliheight=Math.round(scrollTop+clientHeight+2);
      if(ScTopCliheight>=scrollHeight){
        setpage(page+1)
      } 
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // message toggle
  const messageToggle =()=>{
    setmsgClick(!msgClick);
  }

  //show and hide message and fetching message
  useEffect(() => {
    const showMessage = async () =>{
      let userId = localStorage.getItem("token");
      if(FriendIdForChatId!==null){
        let message = await fetch("http://localhost:8000/api/chatMessage",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body:JSON.stringify({userId,FriendIdForChatId})
        });
        let messageResponse = await message.json();
        setChatMessage(messageResponse.chat)
      }
    }
    showMessage()
  }, [FriendIdForChatId,isSaveMessage ]);
// make unique id for message
function makeid(l)
{
var text = "";
var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
return text;
}
  //save user message
  const saveChatMsg =async (userMessage=null)=>{
    if(userMessage!==null){
      const chatMessage= userMessage;
      const receiverId = localStorage.getItem("token");
      const user_id = jwt.verify(receiverId,process.env.REACT_APP_SECRET_KEY)
      socket.current.emit("messagedetails",{_id:makeid(16),senderId:user_id.id,receiverId:FriendIdForChatId,messageBody:chatMessage})
     let saveMessage = await fetch("http://localhost:8000/api/messagesave",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body:JSON.stringify({receiverId,FriendIdForChatId,chatMessage})
      });
      let saveMessageResponse =await saveMessage.json();
      if(saveMessageResponse.message){
        setisSaveMessage(!isSaveMessage) 
      }
    }
   }

  const loginRegisterToggle =()=>{
    setloginshowHide(!loginshowHide);
  }

  const postFormToggle = ()=>{
    settogglPostForm(!togglPostForm);
  }

  const isApiMessage=(arg)=>{
    setapiMessages(arg);
    setshowApiMessage(true);
    setTimeout(()=>{
    setshowApiMessage(false);
    },2000);
  }

  //for post side effect
  const postChange = async ()=>{
    setisPostStateChange(!isPostStateChange)
    setpage(1);
  }

 //search by user 
 const collectSearchValue = async (searchValue)=>{
  let search = await fetch("http://localhost:8000/api/searchpost",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify({searchValue})
  });
  let searchResponse = await search.json();
    if(searchResponse.post){
      setallpost(searchResponse.post);
    }
    let len =searchValue.length;
    if(len === 0){
      postChange();
    }
 }

 
    return (
      <>
         <div className="w-full">
          <Header loginRegisterToggle={loginRegisterToggle}  isLogin={isLogin} showMsg ={messageToggle} collectSearchValue={collectSearchValue} /> 
            {showApiMessage && <ShowMessage apiMsg={apiMessages} />}
          <div  className="w-full lg:w-4/5 mx-auto">
             <Switch>
              <Route exact path="/">
                <div  className=""> 
                  {ispost ?
                    <Route exact path="/">
                      {
                        allpost.map((post)=>
                        
                        <Content key ={post._id}
                            messageToggle={messageToggle}
                            isLogin={isLogin}
                            userId={post.userId}
                            setFriendIdForChatId={setFriendIdForChatId}
                            body={post.postBody}
                            user ={post.userDetails[0]}
                            studentClass={post.Studentclass}
                            address={post.address}
                            salary={post.salary}
                            postDate={post.date} 
                            login_register_toggle={loginRegisterToggle}
                            buttonName="message"
                            isApiMessage={isApiMessage}
                            />
                        )
                      }
                    
                     </Route>
                   :
                   <div>
                   <PostSkeleton />
                   <PostSkeleton />
                   <PostSkeleton />
                   <PostSkeleton />
                   </div>
                   }
                     
                  {bottom &&
                    <div className="text-center mt-8 font-serif font-medium text-xl" >
                      No more post...
                    </div>
                  }
                </div>
                </Route>
             
         {isLogin &&
            <Route path="/userprofile">
              <UserProfile onlineUser={onlineUser} messageToggle={messageToggle}  setFriendName={setFriendName} setFriendIdForChatId={setFriendIdForChatId} setIsLogIn={setIsLogIn} isPostStateChange={isPostStateChange} postChange={postChange} isApiMessage={isApiMessage}  postFormToggle={postFormToggle}  />
            </Route>
         }
            
         {msgClick ? <Message FriendName={FriendName} saveChatMsg={saveChatMsg} message={chatMessage}  messageToggle={messageToggle} /> :null }
         {loginshowHide ? <LoginRegister setIsLogIn={setIsLogIn} loginRegisterToggle={loginRegisterToggle} /> :null}
         {togglPostForm ?  <Postfrom postChange={postChange} postFormToggle={postFormToggle} isApiMessage={isApiMessage} /> :null}
           
           <Route path="/adminlogin">
             <AdminLonginForm />
           </Route>
           <Route path="*">
                <ErrorPage />
           </Route>
         </Switch>
          </div>
         </div>
        </>
    )
}
