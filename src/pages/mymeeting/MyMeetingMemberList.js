import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getMemberList } from "../../apis/meeting/joinapi";

export const MemberListInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1280px;
  display: flex;
  margin: 0 auto;
  /* height: auto; */
  margin-top: 40px;
  margin-bottom: 150px;
  height: 540px;
`;

export const MemberListMenuStyle = styled.div`
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

export const MemberListTitle = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    margin-bottom: 10px;
    font-size: 28px;
    margin-bottom: 40px;
  }

  .member-list-btn {
    display: flex;
    gap: 10px;
  }
`;

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
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .membelist-member-img {
    img {
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }

  .member-checkbox {
    align-self: end;
  }
`;

export const MemberInfo = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  justify-content: center;
  /* margin-right: 100px; */
  font-size: 0.9rem;

  .member-position {
    font-weight: 700;
    font-size: 1rem;
  }
`;

export const PermissionBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 25px;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MyMeetingMemberList = () => {
  const [memberList, setMemberList] = useState([]);

  const { partySeq } = useParams();

  // console.log(partySeq);

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

  const getGenderText = genderCode => {
    switch (genderCode) {
      case 1:
        return "남성";
      case 2:
        return "여성";
      case 3:
        return "성별무관";
      default:
        return "";
    }
  };
  const getRoleText = roleCode => {
    switch (roleCode) {
      case "1":
        return "모임장";
      case "2":
        return "모임원";
      default:
        return "";
    }
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
          <h1>회원관리</h1>
          {/* <div className="member-list-btn">
            <MainButton label="버튼1" />
            <ActionButton label="버튼2" />
          </div> */}
        </MemberListTitle>
        <div className="memberlist-member-div">
          {memberList.map((item, index) => (
            <div key={index} className="membelist-member">
              <div className="membelist-member-img">
                <img
                  src={`/pic/user/${item.memberUserSeq}/${item.userPic}`}
                  alt="프로필"
                />
              </div>
              <MemberInfo>
                <div className="member-position">
                  {getRoleText(item.memberRole)}
                </div>
                <div>
                  {item.userName}({getGenderText(item.userGender)})
                </div>
              </MemberInfo>
            </div>
          ))}

          {/* <div className="membelist-member">
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
          </div> */}
        </div>
      </MemberListMainStyle>
    </MemberListInnerStyle>
  );
};

export default MyMeetingMemberList;
