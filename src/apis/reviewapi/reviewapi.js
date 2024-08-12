import axios from "axios";
import jwtAxios from "../jwtAxios";

// // 리뷰 불러오기
// export const getReviewList = async (_searchText, _totalPage, _pageSize) => {
//   try {
//     const response = await axios.get(
//       `/api/review?search=1&searchData="안녕"&page=${_totalPage}&size=${_pageSize}`,
//     );
//     console.log(response);
//     const status = response.status.toString().charAt(0);
//     if (status === "2") {
//       console.log("response", response.data);
//       return response.data;
//     } else {
//       alert("API 오류발생 status 확인해주세요");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// 리뷰 불러오기
export const getReviewList = async (
  _searchCondition,
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
