//fetching user post
export const fetchUserPost = async (url)=>
{
let userId = localStorage.getItem("token");
let singlePost = await fetch(url,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body:JSON.stringify({userId})
});
let response = await singlePost.json();
let post = response.post;
return post;
}
//fetching user details
export const userInfo = async (url)=>{
    let userId = localStorage.getItem("token");
    let userdetails = await fetch(url,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body:JSON.stringify({userId})
});
let userResponse = await userdetails.json();
let info = userResponse.userDetails;
let status=userResponse.status;
return {info,status}
}
// export const postDateAddTime =(arg)=>{
//     const date = new Date(arg);
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const year = date.getFullYear();
//     const month = months[date.getMonth()];
//     const postdate = date.getDate();
//     const finalDate =`${postdate}.${month}.${year}`;
//     return finalDate ;
// } 
// calculate time for post 

