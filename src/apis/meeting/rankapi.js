import axios from "axios";

// 통합 랭킹 불러오기
export const getTotalRank = async () => {
  try {
    const response = await axios.get(`/api/ranking/total?limit=10`);
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
