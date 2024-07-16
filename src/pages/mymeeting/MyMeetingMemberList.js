import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getMemberList } from "../../apis/meeting/joinapi";

const MemberListInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1300px;
  display: flex;
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
`;

const MemberListMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  margin-top: 50px;

  .memeber-list-menu {
    display: block;
    min-width: 200px;
    padding: 10px 20px;
    margin-bottom: 10px;
    &:hover {
      background-color: #efede5;
    }
    &.active {
      background-color: #e6e2d5;
    }
  }
  span {
    font-weight: 700;
    font-size: 18px;
  }
`;

const MemberListMainStyle = styled.div`
  width: 80%;
  > h1 {
    margin-bottom: 10px;
    font-size: 28px;
    margin-bottom: 40px;
  }
  .memberlist-member-div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .membelist-member {
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 30%;
    padding: 10px;
  }
  .member-checkbox {
    align-self: end;
  }
`;

const MyMeetingMemberList = () => {
  const [memberList, setMemberList] = useState([]);

  const { partySeq } = useParams();
  console.log(partySeq);
  // api함수
  const getData = async () => {
    try {
      const result = await getMemberList(partySeq);
      if (result.code != 1) {
        alert(result.resultMsg);
        return;
      }
      setMemberList(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
        <h1>회원관리</h1>
        <div className="memberlist-member-div">
          {memberList.map((item, index) => (
            <div key={index} className="membelist-member">
              <div>
                <img src="" alt="프로필" />
              </div>
              <div>
                <div>남</div>
                <div>박성호</div>
                <div>2024세</div>
                <div>memberSeq:{item.memberSeq}</div>
                <div>memberSeq:{item.memberUserSeq}</div>
              </div>
              <div>
                <input type="checkbox" className="member-checkbox" />
              </div>
            </div>
          ))}
        </div>
      </MemberListMainStyle>
    </MemberListInnerStyle>
  );
};

export default MyMeetingMemberList;
