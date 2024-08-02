// board-controller

import axios from "axios";

// POST
// /api/board
// 게시글 등록
// {
//     "pics": [
//       "string"
//     ],
//     "p": {
//       "boardPartySeq": 9007199254740991,
//       "boardMemberSeq": 9007199254740991,
//       "boardTitle": "string",
//       "boardContents": "string"
//     }
//   }
export const postNotice = async formData => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post(`/api/board`, formData, header);
    return res.data.resultData;
  } catch (error) {
    return error;
  }
};
// GET
// /api/board
// 게시글 조회
// http://112.222.157.156:5122/api/board?page=1
// 페이지네이션 나중에 추가
export const getNoticeAll = async (partySeq, page = 1) => {
  try {
    const res = await axios.get(
      `/api/board?page=${page}&boardPartySeq=${partySeq}`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// GET
// /api/board/{boardSeq}
// 게시글 상세 조회
// http://112.222.157.156:5122/api/board/1
export const getNoticeOne = async (boardSeq, boardPartySeq, boardMemberSeq) => {
  try {
    const res = await axios.get(
      `/api/board/${boardSeq}?boardSeq=1&boardMemberSeq=${boardMemberSeq}&boardPartySeq=${boardPartySeq}&page=1&size=10`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// PATCH
// /api/board
// 게시글 수정 3차 예정
export const patchNotice = async formData => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.patch(`/api/board`, formData, header);
    return res.data.resultData;
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
  console.log({ boardSeq, boardMemberSeq, boardPartySeq });
  try {
    const res = await axios.delete(`/api/board`, {
      boardSeq,
      boardMemberSeq: boardMemberSeq,
      boardPartySeq,
    });
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};
