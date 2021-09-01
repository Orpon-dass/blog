import React,{useState} from 'react'

export default function AdminLonginForm() {
    const [adminLoginData, setAdminLoginData] = useState({email:"",password:""});
    const adminLoginDataSet = (e)=>{
        setAdminLoginData({...adminLoginData,[e.target.name]:e.target.value})
    }
    const adminLoginHandler= async ()=>{
    let adminDataSend = await fetch("")
    console.log(adminLoginData)
    }
    return (
        <div className="bg-indigo-100 fixed w-5/6 xl:w-2/5  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-md transition-all ease-in-out duration-700">
            <div className="p-4 text-lg font-serif">Admin Login Form</div>
             <div className="m-4">
                 <input onChange={adminLoginDataSet} name="email" className="w-full h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="sample@gmail.com" />
             </div>   
             <div className="m-4">
                 <input onChange={adminLoginDataSet} name="password" className="w-full h-12 rounded-md focus:ring-indigo-700 focus:ring-2 focus:outline-none text-lg pl-3 text-gray-700 font-serif" placeholder="password" />
             </div>    
             <div className="m-4">
                <button onClick={adminLoginHandler} className="h-12 w-full bg-indigo-500 text-white font-serif font-semibold rounded-md text-xl focus:bg-indigo-700 hover:bg-indigo-700 text-center transition-colors duration-700 ease-in-out">Login</button>
            </div>   
        </div>
    )
}
