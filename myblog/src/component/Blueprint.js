import React,{useState,useEffect} from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import UserProfile from './UserProfile'
import LoginRegister from './LoginRegister'
import Postfrom from './Postfrom'
import ShowMessage from './ShowMessage'
export default function Blueprint() {

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
  // const [mount, setmount] = useState(true)
   useEffect(() => {
     let userId = localStorage.getItem("token");
     if(userId!==null){
       setIsLogIn(true)
     }else{
      setIsLogIn(false)
     }
   },[isLogin])
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
      if(postResult.status===400){
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
      console.log("no seach value")
      postChange();
    }
 }
    return (
      <>
         <div className="w-full">
            <Header loginRegisterToggle={loginRegisterToggle}  isLogin={isLogin} collectSearchValue={collectSearchValue} /> 
           {showApiMessage && <ShowMessage apiMsg={apiMessages} />}

            <div className="flex w-full xl:w-11/12 mx-auto">
              <div className="w-1/5 hidden mr-5 lg:block">
                  <Route exact path="/">
                    <Sidebar />
                  </Route>
              </div>
              
                <div  className="w-full lg:w-4/5"> 
                  {ispost &&
                    <Route exact path="/">
                      {
                        allpost.map((post)=>
                        
                        <Content key ={post._id}
                            isLogin={isLogin}
                            body={post.postBody}
                            user ={post.userDetails[0]}
                            photo={post.avatar}
                            studentClass={post.Studentclass}
                            address={post.address}
                            salary={post.salary}
                            postDate={post.date} 
                            login_register_toggle={loginRegisterToggle}
                            buttonName={"proposal"}
                            />
                        )
                      }
                    
                    </Route>
                    }
                  {bottom &&
                    <div className="text-center mt-8 font-serif font-medium text-xl" >
                      No more post...
                    </div>
                  }
                </div>

             
            </div>
         </div>
         
         {isLogin &&
         <Switch>
            <Route path="/userprofile">
              <UserProfile setIsLogIn={setIsLogIn} isPostStateChange={isPostStateChange} postChange={postChange} isApiMessage={isApiMessage}  postFormToggle={postFormToggle}  />
            </Route>
         </Switch>
         }

         {loginshowHide ? <LoginRegister setIsLogIn={setIsLogIn} loginRegisterToggle={loginRegisterToggle} /> :null}
         {togglPostForm ?  <Postfrom postChange={postChange} postFormToggle={postFormToggle} isApiMessage={isApiMessage} /> :null}
        </>
    )
}
