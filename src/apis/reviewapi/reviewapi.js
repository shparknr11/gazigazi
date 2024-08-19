import axios from "axios";
import jwtAxios, { makeRequest } from "../jwtAxios";

// 리뷰 불러오기
export const getReviewList = async (
  _searchCondition = 1,
  _searchText,
  _currentPage,
) => {
  try {
    const response = await axios.get(
      `/api/review?search=${_searchCondition}&searchData=${_searchText}&page=${_currentPage}&size=10`,
    );
    // console.log(response);
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

// 리뷰 추천
export const getRecommend = async (_userSeq, _reviewSeq) => {
  // console.log(_userSeq);
  try {
    const response = await jwtAxios.get(
      `/api/review/fav?reviewFavReviewSeq=${_reviewSeq}`,
    );
    // console.log(response);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
    // const token = sessionStorage.getItem("token");
    // const header = { headers: { Authorization: `Bearer ${token}` } };
    // const response = await axios.get(
    //   `/api/review/fav?reviewFavReviewSeq=${_reviewSeq}`,
    //   header,
    // );
    // // console.log(response);
    // const status = response.status.toString().charAt(0);
    // if (status === "2") {
    //   // console.log("response", response.data);
    //   return response.data;
    // } else {
    //   alert("API 오류발생 status 확인해주세요");
    // }
  }
};

// 모임 상세페이지 용 해당모임 리뷰 불러오기
export const getMeetingPageReviewList = async (_partySeq, _limit) => {
  try {
    const response = await makeRequest(
      `/api/review/party?partySeq=${_partySeq}&limit=${_limit}`,
      "GET",
    );
    console.log(response);
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

// 리뷰 삭제하기
export const delReview = async _reviewSeq => {
  try {
    const response = await makeRequest(
      `/api/review?reviewSeq=${_reviewSeq}`,
      "DELETE",
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
