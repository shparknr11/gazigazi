import axios from "axios";
import jwtAxios from "../jwtUtil";
// 모임 전체 불러오기
export const getPartyAll = async () => {
  try {
    const response = await axios.get(`/api/party`);
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
// 모임 한개 불러오기
export const getPartyOne = async _partySeq => {
  try {
    const response = await axios.get(`/api/party/detail?partySeq=${_partySeq}`);
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

// 모임 생성하기
export const postParty = async (_data, _token) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${_token}`,
    };

    const response = await axios.post(`/api/party`, _data, { headers });
    console.log(response);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
// 모임 수정하기
export const patchParty = async (_data, _token) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${_token}`,
    };
    const response = await axios.patch(`/api/party`, _data, { headers });
    // console.log(response);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 모임 삭제하기
export const DeleteParty = async _data => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.delete(`/api/party`, _data, header);
    // console.log(response);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 지역 불러오기 api
export const getLocal = async _data => {
  try {
    const response = await axios.get(
      `/api/party/location?cdSub=${_data.cdSub}&cdGb=${_data.cdGb}`,
    );

    const status = response.status.toString().charAt(0);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLocalDetail = async _data => {
  try {
    const response = await axios.get(
      `/api/party/location?cdSub=${_data.cdSub}&cdGb=${_data.cdGb}`,
    );
    const status = response.status.toString().charAt(0);
    // console.log("resopnse : ", response);
    if (status === "2") {
      //   console.log(response);
      //   console.log(response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 찜하기
export const getWishParty = async (_userSeq, _partySeq) => {
  try {
    const response = await jwtAxios.get(
      `/api/party/wish?wishUserSeq=${_userSeq}&wishPartySeq=${_partySeq}`,
    );
    const status = response.status.toString().charAt(0);
    // console.log("resopnse : ", response);
    if (status === "2") {
      //   console.log(response);
      //   console.log(response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
