import axios from "axios";
// // 모임 생성하기
// export const getCompleteList = async _id => {
//   try {
//     const response = await axios.get(`/api/board/done?signed_user_id=${_id}`);
//     const status = response.status.toString().charAt(0);
//     // console.log("resopnse : ", response);
//     if (status === "2") {
//       return response.data;
//     } else {
//       alert("API 오류발생 status 확인해주세요");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleProgressApi = async () => {
//     const result = await patchProgressCompleteList(selectedBoardId);
//     if (result.statusCode !== 2) {
//       alert(result.resultMsg);
//       return;
//     }
//     setSelectBoardId([]); // 선택된 항목 ID 초기화
//     setSelectedItems([]); // 선택된 항목 초기화
//     getApi(); // 완료 목록 갱신
//   };
