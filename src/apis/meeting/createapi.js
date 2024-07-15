// import axios from "axios";
// // 모임 생성하기
// export const getLocal = async _data => {
//   try {
//     const response = await axios.get(
//       `/api/party/location?cd=${_data.cd}&cd_gb=${_data.cd_gb}`,
//     );
//     // console.log("axios respones", response);
//     const status = response.status.toString().charAt(0);
//     if (status === "2") {
//       return response.data;
//     } else {
//       alert("API 오류발생 status 확인해주세요");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getLocalDetail = async _data => {
//   try {
//     const response = await axios.get(
//       `/api/party/location?cd=${_data.cd}&cd_gb=${_data.cd_gb}`,
//     );
//     const status = response.status.toString().charAt(0);
//     // console.log("resopnse : ", response);
//     if (status === "2") {
//       //   console.log(response);
//       //   console.log(response.data);
//       return response.data;
//     } else {
//       alert("API 오류발생 status 확인해주세요");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
