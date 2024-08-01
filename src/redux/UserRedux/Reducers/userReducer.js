const initialState = {
  userSeq: null,
  token: null,
  userPic: null,
  userEmail: null,
  userName: null,
  userPw: null,
  userPwCheck: null,
  userNickname: null,
  userFav: null,
  userBirth: null,
  userPhone: null,
  userGender: null,
  userIntro: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "CLEAR_USER":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
