// board-controller

import axios from "axios";
import { makeRequest } from "../../jwtAxios";

// 사용자 memberSeq 알아내기

export const getMemberSeq = async (partySeq, userSeq) => {
  try {
    const result = await makeRequest(
      `/api/member/detail/${partySeq}?memberUserSeq=${userSeq}`,
      "GET",
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 게시글 등록
export const postNotice = async formData => {
  try {
    const result = await makeRequest("/api/board", "POST", formData, {
      "Content-Type": "multipart/form-data",
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// GET
export const getNoticeAll = async (partySeq, page = 1) => {
  try {
    const result = await makeRequest(
      `/api/board?page=${page}&boardPartySeq=${partySeq}`,
      "GET",
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

// GET
export const getNoticeOne = async (boardSeq, boardPartySeq, boardMemberSeq) => {
  try {
    const result = await makeRequest(
      `/api/board/${boardSeq}?boardSeq=${boardSeq}&boardMemberSeq=${boardMemberSeq}&boardPartySeq=${boardPartySeq}&page=1&size=10`,
      "GET",
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

// PATCH
// /api/board
// 게시글 수정 3차 예정
export const patchNotice = async formData => {
  try {
    const result = await makeRequest(`/api/board`, "PATCH", formData, {
      "Content-Type": "multipart/form-data",
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// DELETE
// /api/board
// 게시글 삭제
// http://112.222.157.156:5122/api/board
// '{
//     "boardSeq": 9007199254740991,
//     "boardMemberSeq": 9007199254740991
//   }'

export const deleteNotice = async ({
  boardSeq,
  boardMemberSeq,
  boardPartySeq,
}) => {
  try {
    const result = await makeRequest(`/api/board`, "DELETE", {
      boardSeq,
      boardMemberSeq: boardMemberSeq,
      boardPartySeq,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
