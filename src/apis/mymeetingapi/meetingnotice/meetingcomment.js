// Comment
import { makeRequest } from "../../jwtAxios";

// http://112.222.157.156:5122/api/board/comment
export const deleteComment = async ({ commentSeq, commentMemberSeq }) => {
  try {
    const result = await makeRequest(`/api/board/comment`, "DELETE", {
      commentSeq,
      commentMemberSeq,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// /api/board/comment?boardSeq=63&page=1
export const getComment = async (boardSeq, page) => {
  try {
    const result = await makeRequest(
      `/api/board/comment?boardSeq=${boardSeq}&page=${page}`,
      "GET",
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

// http://112.222.157.156:5122/api/board/comment?commentSeq=1&commentMemberSeq=2&commentContents=
export const patchComment = async (
  commentSeq,
  commentMemberSeq,
  commentContents,
) => {
  const url = `/api/board/comment?commentSeq=${commentSeq}&commentMemberSeq=${commentMemberSeq}&commentContents=${commentContents}`;

  try {
    const result = await makeRequest(url, "PATCH", null);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//http://112.222.157.156:5122/api/board/comment
export const postComment = async ({
  commentBoardSeq,
  commentMemberSeq,
  commentContents,
}) => {
  try {
    const res = await makeRequest("/api/board/comment", "POST", {
      commentBoardSeq,
      commentMemberSeq,
      commentContents,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
