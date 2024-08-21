import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { prColor } from "../../css/color";
import {
  getMyAppliedList,
  getOneApplication,
} from "../../apis/meeting/joinapi";
import { useSelector } from "react-redux";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DOMPurify from "dompurify";
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
      position: relative;
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
  position: absolute;
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
`;

const JoinTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${prColor.black};
`;

const JoinBoxStyle = styled.div`
  border: 1px solid ${prColor.p1000};
  padding: 25px 40px 25px 40px;
  z-index: 99;
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
    height: 200px;
    overflow-y: auto;
    /* resize: none; */
  }

  .join-btn {
    display: flex;
    justify-content: center;
    gap: 20px;
    .join-btn-close {
      top: 15px;
      right: 15px;
      position: absolute;
      cursor: pointer;
      svg {
        width: 29px;
        height: 29px;
        &:hover {
          color: #999;
        }
      }
    }
  }
`;
const AppliedMeeting = () => {
  const [appliedList, setAppliedList] = useState([]);
  const [appliedContent, setAppliedContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;
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
      console.log(result);
      setAppliedContent(result.resultData.joinMsg);
      setIsOpen(!isOpen);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppliedMeetingWrapStyle>
      <h1>모임 신청현황</h1>
      <AppliedMeetingItemStyle>
        {appliedList.map((item, index) => (
          <div className="applied-item-wrap" key={index}>
            <h2>{item.partyName}</h2>
            <div className="applied-item-inner">
              <span>{item.inputDt}</span>

              <MdOutlineArrowDropDownCircle
                onClick={() => {
                  handleClickMore(item.partySeq);
                }}
              />
            </div>
          </div>
        ))}
      </AppliedMeetingItemStyle>
      <JoinModalStyle isOpen={isOpen}>
        <JoinBoxStyle>
          <JoinInputStyle>
            <div
              className="join-form-div"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(appliedContent),
              }}
            />
          </JoinInputStyle>
        </JoinBoxStyle>
      </JoinModalStyle>
    </AppliedMeetingWrapStyle>
  );
};

export default AppliedMeeting;
