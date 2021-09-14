 import React,{useState} from 'react'
import {weburl} from '../Controller/UserController'
 export default function LoginRegister({loginRegisterToggle,setIsLogIn}) {
     const [showloginRegister, setshowloginRegister] = useState(1)
     const [saveRegister, setsaveRegister] = useState({name:"",email:"",password:""});
     const [emailErrorMsg, setemailErrorMsg] = useState("");
     const [passwordErrorMsg, setpasswordErrorMsg] = useState("");
     const [logInInfrormation, setlogInInfrormation] = useState({email:"",password:""});
     const [loginMsg, setloginMsg] = useState("");
    
     //collecting user registration data
     const userRegisterData =(e)=>{
        setsaveRegister({...saveRegister,[e.target.name]:e.target.value});
     }
     const userLogindata =(e)=>{
        setlogInInfrormation({...logInInfrormation,[e.target.name]:e.target.value}) 
     }
     //send user data to database
     const sendRegisterdata = async ()=>{
        let userResponse = await fetch(`${weburl}/api/createuser`,{
             method :"POST",
             headers:{
                 "Content-Type":"application/json",
                 "Accept":      "application/json"
             },
             body:JSON.stringify(saveRegister)
         });
         let commit = await userResponse.json();
           if(commit.errormessage){
            setemailErrorMsg(commit.errormessage.email);
            setpasswordErrorMsg(commit.errormessage.password);
           }
           if(commit.token){
              loginRegisterToggle();
              localStorage.setItem("token",commit.token);
              setIsLogIn(true);
           }

        }
        const sendLoginInformation= async ()=>{
            let userLogin = await fetch(`${weburl}/api/loginuser`,{
                 method:"POST",
                 headers:{
                     "Content-Type":"application/json",
                     "Accept":"application/json"
                 },
                 body:JSON.stringify(logInInfrormation)
            });
            let userLoginInfo = await userLogin.json();
             if(userLoginInfo.message){
                setloginMsg(userLoginInfo.message) 
             }
             if(userLoginInfo.token){
                loginRegisterToggle();
                localStorage.setItem("token",userLoginInfo.token);
                setIsLogIn(true);
             }
            
        }
     return (
         <div className="bg-indigo-100 fixed w-5/6 xl:w-2/5  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-md transition-all ease-in-out duration-700">
             {/* login form */}
        {showloginRegister===1 ?
             <div>
                 <div className="flex justify-end">
                    <svg onClick={loginRegisterToggle} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mx-2  mt-1 cursor-pointer text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </div>
                <div className="bg-gray-50 flex m-4 h-12 rounded-xl justify-around items-center">
                    <button onClick={()=>setshowloginRegister(1)} className="hover:bg-indigo-600 focus:bg-indigo-600 focus:text-gray-50 hover:text-gray-50 px-3 py-1 rounded-md font-serif text-xl text-gray-700 font-semibold">Login</button>
                    <button onClick={()=>setshowloginRegister(2)} className="hover:bg-indigo-600 focus:bg-indigo-600 focus:text-gray-50 hover:text-gray-50 px-3 py-1 rounded-md font-serif text-xl text-gray-700 font-semibold">Register</button> 
                </div>
                
                    <div className="m-2 font-serif text-center p-1 text-red-700">{loginMsg}</div>
                    <div className="m-4">
                        <input onChange={userLogindata} name="email" className="w-full h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="sample@gmail.com" />
                    </div>
                    <div className="m-4">
                        <input onChange={userLogindata} name="password" type="password" className="w-full h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700" placeholder="password" />
                    </div>
                    <div className="m-4">
                        <button onClick={sendLoginInformation} className="h-12 w-full bg-indigo-500 text-white font-serif font-semibold rounded-md text-xl focus:bg-indigo-700 hover:bg-indigo-700 text-center transition-colors duration-700 ease-in-out">Login</button>
                    </div>
               
             </div>
        :null}
             {/* register form */}
            {showloginRegister===2 ?
            <div>
                <div className="flex justify-end">
                 <svg onClick={loginRegisterToggle} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mx-2  mt-1 cursor-pointer text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                 </div>
                <div className="bg-gray-50 flex m-4 h-12 rounded-xl justify-around items-center">
                  <button onClick={()=>setshowloginRegister(1)} className="hover:bg-indigo-600 focus:bg-indigo-600 focus:text-gray-50 hover:text-gray-50 px-3 py-1 rounded-md font-serif text-xl text-gray-700 font-semibold">Login</button>
                 <button onClick={()=>setshowloginRegister(2)} className="hover:bg-indigo-600 focus:bg-indigo-600 focus:text-gray-50 hover:text-gray-50 px-3 py-1 rounded-md font-serif text-xl text-gray-700 font-semibold">Register</button>   
                </div>
                    <div className="m-4">
                        <input onChange={userRegisterData}  value={saveRegister.email} name="email" className="w-full h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="sample@gmail.com" />
                        <div className="m-1 font-serif text-start p-1 text-red-700">{emailErrorMsg}</div>
                    </div>
                    <div className="m-4">
                        <input onChange={userRegisterData} name="password" type="password" className="w-full h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="password" />
                        <div className="m-1 font-serif text-start p-1 text-red-700">{passwordErrorMsg}</div>
                    </div>
                    <div className="m-4">
                        <button onClick={sendRegisterdata} className="h-12 w-full bg-indigo-500 text-white font-serif font-semibold rounded-md text-xl focus:bg-indigo-700 hover:bg-indigo-700 text-center transition-colors duration-700 ease-in-out">Register</button>
                    </div>
                
               </div>
            :null}
         </div>
     )
 }
 