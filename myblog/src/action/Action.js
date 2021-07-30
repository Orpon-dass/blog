 const userDetailsAction =(value)=>{
    return{
        type:"user_details",
        payload:value
    }
}
export const isUserDetailsAction = (value) =>{
    return{
        type:"IS_INFO",
        payload:value
    }
}
export const setUseridAction = value =>{
    return {
        type:"USERID",
        payload:value
    }
}

export default userDetailsAction;