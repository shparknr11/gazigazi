import { combineReducers } from "redux";

const initialState = {
  userSeq: sessionStorage.getItem("userSeq") || null,
  userEmail: sessionStorage.getItem("userEmail") || "",
  userPw: sessionStorage.getItem("userPw") || "",
  userPwCheck: sessionStorage.getItem("userPwCheck") || "",
  userName: sessionStorage.getItem("userName") || "",
  userAddr: sessionStorage.getItem("userAddr") || "",
  userNickname: sessionStorage.getItem("userNickname") || "",
  userFav: sessionStorage.getItem("userFav") || null,
  userBirth: sessionStorage.getItem("userBirth") || "",
  userGender: sessionStorage.getItem("userGender") || "",
  userPhone: sessionStorage.getItem("userPhone") || "",
  userIntro: sessionStorage.getItem("userIntro") || null,
  isDeleted: sessionStorage.getItem("isDeleted") === "true",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER": {
      const {
        userSeq,
        userPic,
        userGender,
        userName,
        userBirth,
        userEmail,
        userPhone,
        isDeleted,
      } = action.payload;

      sessionStorage.setItem("userSeq", userSeq);
      sessionStorage.setItem("userPic", userPic);
      sessionStorage.setItem("userGender", userGender);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("userBirth", userBirth);
      sessionStorage.setItem("userEmail", userEmail);
      sessionStorage.setItem("userPhone", userPhone);
      sessionStorage.setItem("isDeleted", isDeleted);

      return {
        ...state,
        ...action.payload,
      };
    }

    case "DELETE_USER_ACCOUNT": {
      sessionStorage.clear();
      return {
        ...initialState,
        isDeleted: true,
      };
    }

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
