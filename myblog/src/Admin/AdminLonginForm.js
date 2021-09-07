import React,{useState} from 'react';
import { useHistory } from 'react-router';
import { Route,Switch } from 'react-router';

export default function AdminLonginForm() {
    const history = useHistory();
    const [adminLoginData, setAdminLoginData] = useState({email:"",password:""});
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoginadmin, setisLoginadmin] = useState(false);
    const adminLoginDataSet = (e)=>{
        setAdminLoginData({...adminLoginData,[e.target.name]:e.target.value})
    }
    const adminLoginHandler= async ()=>{
    let adminDataSend = await fetch("http://localhost:8000/api/admin/login",{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(adminLoginData)
    });
    const adminDataSendrespose = await adminDataSend.json();
    setErrorMessage(adminDataSendrespose.message);
    if(adminDataSendrespose.admintoken){
        setisLoginadmin(true);
        history.push("/admindashbord")
    }
    }
    return (
        <>
        <div className="bg-indigo-100 fixed w-5/6 xl:w-2/5  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-md transition-all ease-in-out duration-700">
            <div className="p-4 text-lg font-serif">Admin Login Form</div>
            <div className="text-center text-red-500">{errorMessage}</div>
             <div className="m-4">
                 <input onChange={adminLoginDataSet} name="email" className="w-full h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="sample@gmail.com" />
             </div>   
             <div className="m-4">
                 <input onChange={adminLoginDataSet} type="password" name="password" className="w-full h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="password" />
             </div>    
             <div className="m-4">
                <button onClick={adminLoginHandler} className="h-12 w-full bg-indigo-500 text-white font-serif font-semibold rounded-md text-xl focus:bg-indigo-700 hover:bg-indigo-700 text-center transition-colors duration-700 ease-in-out">Login</button>
            </div>   
        </div>
        
        </>
    )
}
