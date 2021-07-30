import React,{useState} from 'react'

export default function ProfilePicture({profileToggle,isApiMessage,profileChange}) {
    const [profilePic, setprofilePic] = useState(null)
    const userId = localStorage.getItem("token");
    const profilePicHandler = async (e)=>{
        e.preventDefault();
        const formdata =new FormData();
        formdata.append("photo",profilePic);
        formdata.append("userId",userId);
        let saveProfilePic = await fetch("http://localhost:8000/api/profilepicupload",{
            method:"POST",
           body:formdata
        })
        let saveProfilePicResponse = await saveProfilePic.json();
        if(saveProfilePicResponse.message){
            isApiMessage(saveProfilePicResponse.message)
        }
         profileChange();
         profileToggle();
    }
    return (
        <div className="bg-gray-200 rounded-md w-4/5 fixed md:w-1/3 xl:w-1/5  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="flex justify-end">
                <svg onClick={profileToggle} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mx-2  mt-1 cursor-pointer text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <form onSubmit={profilePicHandler} method="POST" encType="multipart/formdata">
                <div className="mb-3 ml-4">
                <input onChange={(e)=>{setprofilePic(e.target.files[0])}} name="profilePic" type="file" className="font-serif text-gray-800" /> 
                </div>
                <div className="ml-4 mb-4">
                <button type="submit" className="bg-indigo-600 px-2 py-1 text-white rounded-md font-serif font-semibold" >Save</button>
                </div>
             </form>
        </div>
    )
}
