import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router'
import Content from './Content'
import Userinfo from './Userinfo'
import menImg from '../img/download.png'
import UserDetails from './UserDetails'
import UserdetailsEdit from './UserdetailsEdit'
import {fetchUserPost,userInfo} from '../Controller/UserController'
import PostEditForm from './PostEditForm'
import ProfilePicture from './ProfilePicture';
import Allmessage from './Allmessage'
export default function UserProfile({postFormToggle,isApiMessage,postChange,isPostStateChange,setIsLogIn,setFriendIdForChatId,setFriendName,messageToggle}) {
    const [profileNavigation, setprofileNavigation] = useState(1)
    const [userDetailsEdit,setuserDetailsEdit]= useState(false)
    const [userpost, setuserpost] = useState([])
    const [isPost, setisPost] = useState(false)
    const [toggleUserdetails, settoggleUserdetails] = useState(false);
    const [userErrorMsg, setuserErrorMsg] = useState("");
    const [isUesrinfo, setisUesrinfo] = useState(false);
    const [userDetails, setuserDetails] = useState({});
    const [postEditToggle, setpostEditToggle] = useState(false);
    const [postId, setpostId] = useState("")
    const [posterrorMsg, setposterrorMsg] = useState("");
    const [profilePicToggle,setprofilePicToggle]=useState(false);
    const [postEditPreValue,setpostEditPreValue]=useState({});
    const [isProfilecange, setisProfilecange] = useState(false);
    const [allFriendId, setAllFriendId] = useState([]);
    const [isMessage, setisMessage] = useState(false)
    const history = useHistory();
    const fetchUserInfo = async () =>{
    let userInformation = await userInfo("http://localhost:8000/api/showuserdetils");
    if(userInformation.info){
        setuserDetails(userInformation.info);
        setisUesrinfo(true);
    }
    if(userInformation.status===400){
        setisUesrinfo(false);
    } 
}
    useEffect(() => {
            fetchUserInfo();
    },[isProfilecange]);

    const handeUserinfo = ()=>{
        setprofileNavigation(2);
    }
//toggle user details edit form
  const toggleUserEditDetailsFun = ()=>{
    setuserDetailsEdit(!userDetailsEdit);
  }
//   toggle user details form
const toggleUserDetailsControll =()=>{
    settoggleUserdetails(!toggleUserdetails);
  }
//fetch user post
const fetchPost = async () =>
{
    let singlePostResponse =await fetchUserPost("http://localhost:8000/api/usersinglepost");
    if(singlePostResponse){
        setuserpost(singlePostResponse);
        setisPost(true)
    }else{
        setisPost(false)
    }
}
useEffect(() => {
    fetchPost();
},[isPostStateChange]);
//save userdetails in database
const collectUserDetails = async (data) =>{
let savedUserDetails = await fetch("http://localhost:8000/api/userdetails",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/josn"
    },
    body:JSON.stringify(data)
});
let userDetailsResponse = await savedUserDetails.json();
if(userDetailsResponse.username){
    setuserErrorMsg(userDetailsResponse.username)
}else if(userDetailsResponse.collegeName){
   setuserErrorMsg(userDetailsResponse.collegeName); 
}else if(userDetailsResponse.permanentAddress){
   setuserErrorMsg(userDetailsResponse.permanentAddress); 
}else if(userDetailsResponse.presentAddress){
   setuserErrorMsg(userDetailsResponse.presentAddress); 
}else if(userDetailsResponse.phoneNumber){
   setuserErrorMsg(userDetailsResponse.phoneNumber); 
}else{
   setuserErrorMsg(""); 
   isApiMessage(userDetailsResponse.message);
   setuserDetails(userDetailsResponse.userDetails);
   setisUesrinfo(true);
   toggleUserDetailsControll();
}
}
//save user edit data
const editDataCollection = async (data)=>{
    let savedUserDetails = await fetch("http://localhost:8000/api/updateusdetails",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/josn"
        },
        body:JSON.stringify(data)
    });
    let userDetailsResponse = await savedUserDetails.json();
    if(userDetailsResponse.collegeName){
       setuserErrorMsg(userDetailsResponse.collegeName); 
    }else if(userDetailsResponse.permanentAddress){
       setuserErrorMsg(userDetailsResponse.permanentAddress); 
    }else if(userDetailsResponse.presentAddress){
       setuserErrorMsg(userDetailsResponse.presentAddress); 
    }else if(userDetailsResponse.phoneNumber){
       setuserErrorMsg(userDetailsResponse.phoneNumber); 
    }else{
       setuserErrorMsg(""); 
       isApiMessage(userDetailsResponse.message);
       setuserDetails(userDetailsResponse.userDetails);
       setisUesrinfo(true);
       toggleUserEditDetailsFun();
    }
}
//post edit code
const postEditFormToggle=()=>{
    setpostEditToggle(!postEditToggle);
}
const postEditHandler =(e)=>{
    setpostEditToggle(!postEditToggle);
    setpostId(e.postId);
    setpostEditPreValue(e);
    
} 
const collectPostEditData =async (arg)=>{
 let finalEditPostData = {...arg,postId}
 let postSave = await fetch("http://localhost:8000/api/updatepost",{
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "Accept":"application/json"
           },
           body:JSON.stringify(finalEditPostData)
        });
        let postResponse =await postSave.json();
        if(postResponse.postBody){
            setposterrorMsg(postResponse.postBody);
        }else if(postResponse.Studentclass){
            setposterrorMsg(postResponse.Studentclass);
        }else if(postResponse.address){
            setposterrorMsg(postResponse.address);
        }else if(postResponse.salary){
            setposterrorMsg(postResponse.salary);
        }else{
            isApiMessage(postResponse.message)
             postChange();
            setpostEditToggle(!postEditToggle);

        }
}
//delete user post by id
const deleteUserPost = async (postDeleteId)=>{
 let deletePost = await fetch("http://localhost:8000/api/deleteuserpost",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body:JSON.stringify({postDeleteId})
 });
 let deletePostResponse = await deletePost.json();
 if(deletePostResponse.message){
    isApiMessage(deletePostResponse.message);
    postChange();
 }
}
const profileToggle =()=>{
    setprofilePicToggle(!profilePicToggle)
}

const profileChange =()=>{
  setisProfilecange(!isProfilecange);
  postChange();
}
//log out user
const logOutUser = async ()=>{
    //let userlogout = await fetch("http://localhost:8000/api/validroute/");
    //let userlogoutResponse = await userlogout.json();
    localStorage.removeItem("token");
    history.push("/");
    setIsLogIn(false);
}

//fetch user message
let userMessage = async ()=>{
    let userId = localStorage.getItem("token");
    let message = await fetch("http://localhost:8000/api/messageshow",{
        method:"POST",
        headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
        },
      body:JSON.stringify({userId})
    });
    let messageResponse = await message.json();
     let msgResLen = messageResponse.length;
     if(msgResLen > 0){
        let DuplicateFriendId = messageResponse.map((e)=>{ return e.senderId});
        let uniqueFriendId = [...new Set(DuplicateFriendId)]
         setAllFriendId(uniqueFriendId);
         setisMessage(true);
     }else{
        setisMessage(false)
     }
}
useEffect(() => {
    userMessage(); 
},[]);
    return (
        <>
        <div className="">
          <div className="flex flex-col justify-center items-center mt-4">
              <div className="relative">
                  <div className="">
                      {userDetails.avatar ?
                       <img className="p-2 object-cover object-center w-44 h-44 rounded-full"  src={`http://localhost:8000/image/${userDetails.avatar}`} alt="userImage"/>
                     :
                       <img className="p-2 object-cover object-center w-44 h-44 rounded-full" src={menImg}  alt="userImage"/>
                      }
                  </div>
                <div onClick={profileToggle} className="absolute right-6 bottom-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
              </div>

            <div className="flex">
            {isUesrinfo ?
             <div onClick={postFormToggle} className="bg-indigo-500 hover:bg-indigo-700 cursor-pointer transition-colors duration-700 ease-in-out mt-2 mb-2 mr-1 font-serif text-sm px-2 py-1 rounded-md text-white">post</div>
             :
              <div onClick={()=>isApiMessage("please update your details first..")} className="bg-indigo-500 hover:bg-indigo-700 cursor-pointer transition-colors duration-700 ease-in-out mt-2 mb-2 mr-1 font-serif text-sm px-2 py-1 rounded-md text-white">post</div>
            }
           { isUesrinfo ?
             <div onClick={toggleUserEditDetailsFun} className="bg-indigo-500 hover:bg-indigo-700 cursor-pointer transition-colors duration-700 ease-in-out mt-2 mb-2 ml-1 font-serif text-sm px-2 py-1 rounded-md text-white">edit</div>
             :
             <div onClick={toggleUserDetailsControll} className="bg-indigo-500 hover:bg-indigo-700 cursor-pointer transition-colors duration-700 ease-in-out mt-2 mb-2 ml-1 font-serif text-sm px-2 py-1 rounded-md text-white">update</div>
           }
            </div>
          </div>
          <div className="mb-5 text-center text-xl font-serif font-semibold text-gray-700 ">
             {userDetails.username}
          </div>
          <div className="w-full xl:w-7/12 mx-auto bg-gray-100  h-14 flex justify-around items-center rounded">
              <div onClick={()=>setprofileNavigation(1)} className="px-2 py-1 rounded-md ml-1  text-gray-700 hover:text-white font-serif hover:bg-indigo-800 transition-colors duration-1000 ease-in-out cursor-pointer">Post </div>
              <div onClick={handeUserinfo} className="px-2 py-1 rounded-md text-gray-700 hover:text-white font-serif hover:bg-indigo-800 transition-colors duration-1000 ease-in-out cursor-pointer">About</div>
              <div onClick={()=>setprofileNavigation(3)} className="px-2 py-1 rounded-md mr-1 text-gray-700 hover:text-white font-serif hover:bg-indigo-800 transition-colors duration-1000 ease-in-out cursor-pointer">Message</div>
              <div onClick={logOutUser} className="px-2 py-1 rounded-md  text-gray-700 hover:text-white font-serif hover:bg-indigo-800 transition-colors duration-1000 ease-in-out cursor-pointer">Logout</div>
          </div>
          {
              profileNavigation===1 ?
          <div className="w-full xl:w-7/12 mx-auto mt-4 mb-5">
              { isPost &&
                  userpost.map((post)=>
                      <Content 
                      postEditHandler={postEditHandler}
                      deletePost ={deleteUserPost}
                      postId ={post._id}
                      user ={userDetails}
                      photo={post.avatar}
                      postDate={post.date} 
                      studentClass={post.Studentclass}
                      address={post.address}
                      salary={post.salary} 
                      body={post.postBody}
                      key={post._id} 
                      threeDot ={"..."}
                      />
                      )}
            {isPost ? null : <div className="text-center m-3 font-serif font-semibold text-red-500">
              post not found
             </div>}
          </div>
          : null
          }

          {
              profileNavigation===2  ?
              
          <div className="w-full xl:w-7/12 mx-auto mt-4">
             
             {isUesrinfo ? <Userinfo  savedResponse={userDetails} /> : <div className="text-center m-3 font-serif font-semibold text-red-500">
                   please update your information
                </div>
             }
          </div>
          :null
          }
         {profileNavigation===3 ?
            <div className="w-full xl:w-7/12 mx-auto mt-4 rounded-md mb-6 p-5">
               {isMessage && 
                <div>
                    {allFriendId.map((e)=>
                        <Allmessage messageToggle={messageToggle} setFriendName={setFriendName} setFriendIdForChatId={setFriendIdForChatId}  key={e} friendId={e} />
                    )}
                    
                </div>
               }
            </div>
          :
          null
        }

        </div>

        {/* check */}
        {userDetailsEdit ? <UserdetailsEdit message={userErrorMsg} originalData={userDetails} collectEditdata={editDataCollection}  isApiMessage={isApiMessage} toggleUserEditDetails={toggleUserEditDetailsFun}  /> : null }
        {toggleUserdetails ? <UserDetails message={userErrorMsg} collectdata={collectUserDetails} toggleUserDetailsControll={toggleUserDetailsControll} isApiMessage={isApiMessage} /> :null} 
        {postEditToggle && < PostEditForm postEditPreValue={postEditPreValue} posterrorMsg={posterrorMsg} postEditData={collectPostEditData}  postEditFormToggle={postEditFormToggle} />}
         {profilePicToggle && <ProfilePicture profileChange={profileChange} isApiMessage={isApiMessage} profileToggle={profileToggle} />}
        </>
    )
}
