import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { prColor } from "../../css/color";
import { getMyAppliedList } from "../../apis/meeting/joinapi";
import { useSelector } from "react-redux";

const AppliedMeetingWrapStyle = styled.div`
  h1 {
    font-size: 22px;
    font-weight: bold;
  }
`;
const AppliedMeetingItemStyle = styled.div`
  width: 100%;
  min-height: 627px;
  border: 1px solid ${prColor.p300};
`;
const AppliedMeeting = () => {
  const [appliedList, setAppliedList] = useState([]);

  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;

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

  return (
    <AppliedMeetingWrapStyle>
      <h1>나의 모임 신청현황</h1>
      <AppliedMeetingItemStyle>
        {/* {appliedList.map((item, index) => (
          <div key={index}>
            <h2>{item.partyName}</h2>
            <div>
              <img />
            </div>
          </div>
        ))} */}
        <div className="applied-item-wrap">
          <h2>축사모</h2>
          <div>
            <div>이미지</div>
            <div>파티내용</div>
          </div>
        </div>
      </AppliedMeetingItemStyle>
    </AppliedMeetingWrapStyle>
  );
};

export default AppliedMeeting;
