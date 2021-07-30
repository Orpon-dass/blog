import { combineReducers } from "redux";
import userDetailsReducer,{isUserInfoReducer,setUseridReducer} from "./userDetailsRefresh";
const reducer =combineReducers(
  {
    userDetailsReducer,
    isUserInfoReducer,
    setUseridReducer
  }
);
export default reducer;