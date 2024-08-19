import styled from "@emotion/styled";
import { Card, Pagination } from "antd";
import { useEffect, useState } from "react";
import {
  deleteComment,
  getComment,
  patchComment,
  postComment,
} from "../../../apis/mymeetingapi/meetingnotice/meetingcomment";
import NoticeCommentForm from "./NoticeCommentForm";
import NoticeCommentList from "./NoticeCommentList";

// Styled
const NoticeCommentDiv = styled.div`
  /* max-width: 900px; */
  margin-top: 10px;
`;
const NoticeCommentFormDiv = styled.div`
  /* max-width: 900px; */
  margin-bottom: 10px;
`;

const NoticeComment = ({ boardSeq, memberSeq }) => {
  // API 연동
  // comment 등록
  const postCommentCall = async _txt => {
    try {
      const result = await postComment({
        commentBoardSeq: boardSeq,
        commentMemberSeq: memberSeq,
        commentContents: _txt,
      });
      getCommentCall();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // 코멘트 목록 가져오기
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const getCommentCall = async () => {
    try {
      const result = await getComment(boardSeq, page);
      setCommentList(result.commentList);
      setTotalPage(result.totalPage);
      setTotalElements(result.totalElements);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (boardSeq) {
      getCommentCall();
    }
  }, [boardSeq, page]);

  // 코멘트 수정
  const patchCommentCall = async (item, txt) => {
    try {
      const result = await patchComment(
        item.commentSeq,
        item.commentMemberSeq,
        txt,
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // comment 삭제
  const deleteCommentCall = async ({ commentSeq, commentMemberSeq }) => {
    try {
      await deleteComment({ commentSeq, commentMemberSeq });
      getCommentCall();
    } catch (error) {
      console.log(error);
    }
  };

  // Pagenation
  const handlePageChange = page => {
    setPage(page);
  };

  return (
    <NoticeCommentDiv>
      <NoticeCommentFormDiv>
        <Card>
          <NoticeCommentForm postCommentCall={postCommentCall} />
        </Card>
      </NoticeCommentFormDiv>
      <Card>
        <NoticeCommentList
          commentList={commentList}
          deleteCommentCall={deleteCommentCall}
          patchCommentCall={patchCommentCall}
        />
      </Card>
      <Pagination
        align="center"
        style={{ marginTop: 10 }}
        defaultCurrent={page}
        total={totalElements}
        onChange={handlePageChange}
      />
    </NoticeCommentDiv>
  );
};

export default NoticeComment;
