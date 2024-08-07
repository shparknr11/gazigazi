import { createSlice } from "@reduxjs/toolkit";
// 1. 초기값 셋팅
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

const userSlice = createSlice({
  // name 은 slice 구분하기 위한용도
  // 관례상 파일명을 작성한다.
  name: "userSlice",
  // 초기값
  initialState: initialState,
  // 상태 정보를 CRUD 하는 함수작성
  // 아래의 철자를 주의합니다. reducers
  // 복수형입니다.
  reducers: {
    setUser: (state, action) => {
      console.log("userSlice SET_USER.....", action);
      return { ...state, ...action.payload };
    },
    setToken: (state, action) => {
      console.log("userSlice SET_TOKEN!!!!", action);
      return { ...state, ...action.payload };
    },
    clearUser: (state, action) => {
      console.log("userSlice CLEAR_USER!!!!", action);
      return initialState;
    },
    logout: (state, action) => {
      console.log("userSlice LogOut!!!!", action);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userData");
      return initialState;
    },
  },
});
export const { setUser, setToken, clearUser, logout } = userSlice.actions;
export default userSlice.reducer;
