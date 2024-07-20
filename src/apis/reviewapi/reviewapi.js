import axios from "axios";

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
export const getReviewList = async (_searchText, _currentPage) => {
  try {
    const response = await axios.get(
      `/api/review?search=1&searchData=${_searchText}&page=${_currentPage}&size=10`,
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
  try {
    const response = await axios.get(
      `/api/review/fav?reviewFavUserSeq=${_userSeq}&reviewFavReviewSeq=${_reviewSeq}`,
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
