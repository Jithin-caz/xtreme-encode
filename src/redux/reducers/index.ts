import { combineReducers } from "redux";
import { emailReducer } from "./emailReducer";

 const reducers=combineReducers({
    email:emailReducer
})

export default reducers