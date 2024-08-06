import axios from "axios";
import jwtAxios from "../jwtUtil";

// 내가 만든 모임 불러오기
// http://112.222.157.156:5122/api/party/mine?userSeq=9&page=1&size=10
export const getMyMeetLeaderList = async ({ userSeq, page, size }) => {
  try {
    const res = await jwtAxios.get(
      `/api/party/leader?userSeq=${userSeq}&page=${page}&size=9`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};
// 내가 속해있는 모임 불러오기
export const getMyMeetMemberList = async ({ userSeq, page, size }) => {
  try {
    const res = await jwtAxios.get(
      `/api/party/mine?userSeq=${userSeq}&page=${page}&size=9`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};
