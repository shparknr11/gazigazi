import { createStore, combineReducers } from "redux";
import userReducer from "./userSlice"; // 경로를 조정하세요

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
