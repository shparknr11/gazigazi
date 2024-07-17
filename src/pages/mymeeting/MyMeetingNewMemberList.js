import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getApplication, patchNewMember } from "../../apis/meeting/joinapi";
import { ActionButton, MainButton } from "../../components/button/Button";
import {
  MemberInfo,
  MemberListInnerStyle,
  MemberListMenuStyle,
  MemberListTitle,
  PermissionBtn,
} from "./MyMeetingMemberList";
import { prColor } from "../../css/color";

const MemberListMainStyle = styled.div`
  width: 80%;

  .memberlist-member-div {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .membelist-member {
    max-width: 300px;
    height: 100px;
    width: 100%;
    display: flex;
    border: 1px dashed rgba(0, 0, 0, 0.2);
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .membelist-member-img {
    background-color: ${prColor.pr01};
    width: 60px;
    height: 60px;
    border-radius: 100px;
  }

  .member-checkbox {
    align-self: end;
  }
`;
const MyMeetingNewMemberList = () => {
  const [applicationList, setApplicationList] = useState([]);

  const { partySeq } = useParams();
  const location = useLocation();
  const userSeq = sessionStorage.getItem("userSeq");
  console.log(partySeq);
  console.log(userSeq);
  // api함수
  const getData = async () => {
    try {
      const result = await getApplication(partySeq, userSeq);
      if (result.code != 1) {
        alert(result.resultMsg);
        return;
      }
      console.log(result.resultData);
      setApplicationList(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(applicationList);
  }, [applicationList]);

  const handleClickConfirm = async joinUserSeq => {
    console.log(joinUserSeq);
    const data = {
      joinUserSeq,
      leaderUserSeq: userSeq,
      joinGb: 1,
    };
    await patchNewMember(partySeq, data);
  };
  return (
    <MemberListInnerStyle>
      <MemberListMenuStyle>
        <Link
          to={`/mymeeting/mymeetingmemberlist/${partySeq}`}
          className={`memeber-list-menu ${location.pathname.includes("mymeetingmemberlist") ? "active" : ""}`}
        >
          <span>모임원 관리</span>
        </Link>
        <Link
          to={`/mymeeting/mymeetingnewmemberlist/${partySeq}`}
          className={`memeber-list-menu ${location.pathname.includes("mymeetingnewmemberlist") ? "active" : ""}`}
        >
          <span>모임 신청관리</span>
        </Link>
      </MemberListMenuStyle>

      <MemberListMainStyle>
        <MemberListTitle>
          <h1>신청 관리</h1>
          <div className="member-list-btn">
            <MainButton label="버튼1" />
            <ActionButton label="버튼2" />
          </div>
        </MemberListTitle>
        <div className="memberlist-member-div">
          {applicationList.map((item, index) => (
            <div key={index} className="membelist-member">
              <div className="membelist-member-img" />
              <MemberInfo>
                <div className="member-position">직급</div>
                <div>박성호(남)</div>
                <div>{item.joinMsg}</div>
              </MemberInfo>
              <PermissionBtn>
                <MainButton
                  label="승인"
                  onClick={() => {
                    handleClickConfirm(item.joinUserSeq);
                  }}
                />
                <ActionButton label="반려" />
              </PermissionBtn>
            </div>
          ))}

          <div className="membelist-member">
            <div className="membelist-member-img" />
            <MemberInfo>
              <div className="member-position">직급</div>
              <div>박성호(남)</div>
              <div>24세</div>
            </MemberInfo>
            <PermissionBtn>
              <MainButton label="승인" />
              <ActionButton label="반려" />
            </PermissionBtn>
          </div>
        </div>
      </MemberListMainStyle>
    </MemberListInnerStyle>
  );
};

export default MyMeetingNewMemberList;
