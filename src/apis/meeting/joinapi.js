import axios from "axios";
import jwtAxios, { makeRequest } from "../jwtAxios";

// 모임 승인 (관리자) --- api 변경으로 사용 X
export const patchApproval = async (_partySeq, _userSeq) => {
  try {
    const response = await axios.patch(
      `/api/party/authGb1?partySeq=${_partySeq}&userSeq=${_userSeq}`,
    );
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 모임 승인 (관리자)
export const patchApprovalAdmin = async _data => {
  try {
    const response = await jwtAxios.patch(`/api/admin/auth`, _data);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 모임신청서 작성
export const postApplication = async (_partySeq, _data) => {
  try {
    const response = await jwtAxios.post(`/api/join/${_partySeq}`, _data);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    alert("이미 가입되거나 신청한 모임입니다.");
    console.log(error);
  }
};

// 신청서 불러오기 (전체)
export const getApplication = async (_partySeq, _leaderUserSeq) => {
  try {
    const response = await jwtAxios.get(`/api/join/${_partySeq}`);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
// 신청서 하나 불러오기 (본인)
export const getOneApplication = async (_partySeq, _joinUserSeq) => {
  try {
    const response = await makeRequest(
      `/api/join/detail/${_partySeq}?joinUserSeq=${_joinUserSeq}`,
      "GET",
    );
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
// 신청서 하나 불러오기 (수정)
export const patchOneApplication = async (_partySeq, _data) => {
  try {
    const response = await makeRequest(
      `/api/join/${_partySeq}`,
      "PATCH",
      _data,
    );
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
// 모임 맴버 불러오기
export const getMemberList = async _partySeq => {
  try {
    const response = await jwtAxios.get(`/api/member/${_partySeq}`);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 신청승인 (모임장)
export const patchNewMember = async (_partySeq, _data) => {
  try {
    const response = await jwtAxios.patch(`/api/join/gb/${_partySeq}`, _data);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 나의 모임신청 목록 불러오기 (마이페이지)
export const getMyAppliedList = async _userSeq => {
  try {
    const response = await makeRequest(`/api/join?userSeq=${_userSeq}`, "GET");
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
