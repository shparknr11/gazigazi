import styled from "@emotion/styled";
import moment from "moment";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding: 20px 0px 20px 5px;
`;
const MyMeetingBoard = ({ noticeList }) => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <div>
        <TitleDivStyle>모임 게시판</TitleDivStyle>
        <div style={{ textAlign: "right", paddingRight: "10px" }}>
          <button
            className="resister-btn"
            onClick={() => {
              navigate(`/mymeeting/mymeetingnoticeresister`, {
                state: {
                  boardPartySeq: params?.meetingId,
                  boardMemberSeq: sessionStorage.getItem("userSeq"),
                },
              });
            }}
          >
            등록
          </button>
        </div>
      </div>
      <div>
        <ul className="main-notice-ul">
          <li className="main-notice-li">
            <div style={{ width: "10%" }}>순번</div>
            <div style={{ width: "10%" }}>글쓴이</div>
            <div style={{ width: "40%" }}>제목</div>
            {/* <div style={{ width: "20%" }}>내용</div> */}
            <div style={{ width: "20%" }}>등록일자</div>
          </li>
          {noticeList?.map((item, index) => (
            <li
              key={item.boardSeq}
              className="main-notice-li"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/mymeeting/mymeetingnotice/${item.boardSeq}`, {
                  state: {
                    boardMemberSeq: item.boardMemberSeq,
                    boardPartySeq: item.boardPartySeq,
                  },
                });
              }}
            >
              <span style={{ width: "10%" }}>{index + 1}</span>
              <span style={{ width: "10%" }}>{item.userName}</span>
              <span className={"cut-text"} style={{ width: "40%" }}>
                {item.boardTitle}
              </span>
              {/* <span style={{ width: "20%" }}>
                          {item.boardContents}
                        </span> */}
              <span style={{ width: "20%" }}>
                {moment(item.inputD).format("YYYY-MM-DD")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyMeetingBoard;
