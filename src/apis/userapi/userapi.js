import axios from "axios";

export const postAC = async signupData => {
  try {
    const {
      userEmail,
      userPw,
      userPwCheck,
      userName,
      userAddr,
      userNickname,
      userFav,
      userBirth,
      userGender,
      userPhone,
      userIntro,
    } = signupData;
    const res = await axios.post(
      `http://112.222.157.156:5122/api/user/sign_up`,
      signupData,
      {
        userEmail: "",
        userPw: "",
        userPwCheck: "",
        userName: "",
        userAddr: "",
        userNickname: "",
        userFav: "",
        userBirth: "",
        userGender: "",
        userPhone: "",
        userIntro: "",
      },
    );
    console.log(res.data);
  } catch (error) {
    console.log("postAC Error:", error);
  }
};

export const postLogin = async () => {
  try {
    const res = await axios.get(`/api/user/sign_in`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
