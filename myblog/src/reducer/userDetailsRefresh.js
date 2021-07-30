 const userDetailsReducer = (state ={},action)=>{
    if(action.type==="user_details"){
      return action.payload;
    }else{
        return state;
    }
}
export const isUserInfoReducer = (state=false,action)=>{
    if(action.type==="IS_INFO"){
        return action.payload;
      }else{
          return state;
      }   
}
export const setUseridReducer =(state=null,action)=>{
    if(action.type==="USERID"){
        return action.payload;
    }else{
        return state;
    }
}
export default userDetailsReducer;