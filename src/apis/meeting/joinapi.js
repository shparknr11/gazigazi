import axios from "axios";

// 신청서 작성
export const postApplication = async (_partySeq, _data) => {
  try {
    const response = await axios.post(`/api/join/${_partySeq}`, _data);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
// 신청서 승인
export const postApproval = async (_partySeq, _userSeq) => {
  try {
    const response = await axios.patch(
      `/api/party/authGb?partySeq=${_partySeq}&userSeq=${_userSeq}`,
    );
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
