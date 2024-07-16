import { combineReducers } from "redux";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "DELETE_USER_ACCOUNT":
      return initialState;
    default:
      return state;
  }
};

export const setUser = user => ({
  type: "SET_USER",
  payload: user,
});

export const deleteUserAccount = () => ({
  type: "DELETE_USER_ACCOUNT",
});

export default userReducer;
