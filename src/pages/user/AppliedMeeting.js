import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { prColor } from "../../css/color";
import {
  getMyAppliedList,
  getOneApplication,
  patchOneApplication,
} from "../../apis/meeting/joinapi";
import { useSelector } from "react-redux";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DOMPurify from "dompurify";
// react Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../css/quill.css";
import { modules } from "../../components/modules/quill";
import { MainButton } from "../../components/button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AppliedMeetingWrapStyle = styled.div`
  width: 100%;
  min-height: 627px;
  h1 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 35px;
  }
`;
const AppliedMeetingItemStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  width: 100%;
  .applied-item-wrap {
    width: 40%;
    border: 1px solid ${prColor.p300};
    > h2 {
      padding: 5px 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      margin-bottom: 15px;
      min-height: 50px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .applied-item-inner {
    display: flex;
    justify-content: end;
    align-items: center;
    & span {
      padding: 5px 10px;
      font-size: 12px;
      margin-right: 5px;
    }
    & svg {
      width: 33px;
      height: 33px;
      cursor: pointer;
      color: #999;
      &:hover {
        color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
const JoinModalStyle = styled.div`
  margin-top: 40px;
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
`;
const JoinTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${prColor.black};
  margin-bottom: 15px;
`;
const JoinBoxStyle = styled.div`
  border: 1px solid ${prColor.p1000};
  padding: 25px 40px 25px 40px;
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${prColor.p000};
`;

const JoinInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  .join-form-div {
    /* width: 500px; */

    padding: 20px;
    background-color: #fff;
    border-radius: 13px;
    margin-bottom: 15px;
    min-height: 300px;
    overflow-y: auto;
    /* resize: none; */
  }
`;
const AppliedMeeting = () => {
  const [appliedList, setAppliedList] = useState([]);
  const [appliedContent, setAppliedContent] = useState("");
  const [partySeq, setPartySeq] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;
  console.log(partySeq);
  console.log(isOpen);
  // api 호출 함수
  const getMyAppliedListCall = async () => {
    try {
      const result = await getMyAppliedList(userSeq);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      console.log(result.resultData);
      setAppliedList(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyAppliedListCall();
  }, []);

  // 더보기 버늩 눌렀을때
  const handleClickMore = async _partySeq => {
    try {
      const result = await getOneApplication(_partySeq, userSeq);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      setPartySeq(_partySeq);
      setAppliedContent(result.resultData.joinMsg);
      setIsOpen(!isOpen);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickModify = async () => {
    try {
      const data = {
        joinUserSeq: userSeq,
        joinMsg: appliedContent,
      };

      const result = await patchOneApplication(partySeq, data);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      setIsOpen(false);
      toast.success("신청서가 수정 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppliedMeetingWrapStyle>
      <h1>모임 신청현황</h1>
      <AppliedMeetingItemStyle>
        {appliedList.map((item, index) => (
          <div
            className="applied-item-wrap"
            key={index}
            onClick={() => {
              navigate(`/meeting/${item.partySeq}?mu=1`);
            }}
          >
            <h2>{item.partyName}</h2>
            <div className="applied-item-inner">
              <span>{item.inputDt}</span>

              <MdOutlineArrowDropDownCircle
                onClick={e => {
                  e.stopPropagation();
                  handleClickMore(item.partySeq, item.joinSeq);
                }}
              />
            </div>
          </div>
        ))}
      </AppliedMeetingItemStyle>
      <JoinModalStyle isOpen={isOpen}>
        <JoinBoxStyle>
          <JoinTitle>신청서</JoinTitle>
          <JoinInputStyle>
            <ReactQuill
              value={appliedContent}
              onChange={setAppliedContent}
              modules={modules}
            />
          </JoinInputStyle>
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "end",
              marginTop: "5px",
            }}
          >
            <MainButton
              label="수정"
              onClick={() => {
                handleClickModify();
              }}
            />
            <MainButton
              label="취소"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>
        </JoinBoxStyle>
      </JoinModalStyle>
    </AppliedMeetingWrapStyle>
  );
};

export default AppliedMeeting;
