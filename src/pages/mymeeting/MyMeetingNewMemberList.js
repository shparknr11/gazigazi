import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getApplication, patchNewMember } from "../../apis/meeting/joinapi";
import { MainButton } from "../../components/button/Button";
import {
  MemberInfo,
  MemberListInnerStyle,
  MemberListMenuStyle,
  MemberListTitle,
  PermissionBtn,
} from "./MyMeetingMemberList";
import { useSelector } from "react-redux";

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
    border: 2px dashed rgba(0, 0, 0, 0.2);
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
const MyMeetingNewMemberList = () => {
  const [applicationList, setApplicationList] = useState([]);

  const { partySeq } = useParams();
  const location = useLocation();
  // const userSeq = sessionStorage.getItem("userSeq");
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;

  // console.log(partySeq);
  // console.log(userSeq);
  // api함수
  const getData = async () => {
    try {
      const result = await getApplication(partySeq, userSeq);
      if (result.code != 1) {
        alert(result.resultMsg);
        return;
      }
      console.log(result.resultData);
      popularHomeList(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  const popularHomeList = _resultData => {
    const filteredList = _resultData.filter(item => item.joinGb !== 1);
    setApplicationList(filteredList);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClickConfirm = async joinUserSeq => {
    // console.log(joinUserSeq);
    const data = {
      joinUserSeq,
      leaderUserSeq: parseInt(userSeq),
      joinGb: 1,
    };
    await patchNewMember(partySeq, data);

    await getData();
  };

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
          <h1>신청 관리</h1>
        </MemberListTitle>
        <div className="memberlist-member-div">
          {applicationList.length ? (
            <>
              {applicationList.map((item, index) => (
                <div key={index} className="membelist-member">
                  <div className="membelist-member-img">
                    <img
                      src={`/pic/user/${item.joinUserSeq}/${item.userPic}`}
                      alt="프로필"
                    />
                  </div>
                  <MemberInfo>
                    <div className="member-position"></div>
                    <div>이름 : {item.userName}</div>
                    <div>내용 : {item.joinMsg}</div>
                  </MemberInfo>
                  <PermissionBtn>
                    <MainButton
                      label="승인"
                      onClick={() => {
                        handleClickConfirm(item.joinUserSeq);
                      }}
                    />
                  </PermissionBtn>
                </div>
              ))}
            </>
          ) : (
            <h2>신청한 유저가 없습니다.</h2>
          )}

          {/* 
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
          </div> */}
        </div>
      </MemberListMainStyle>
    </MemberListInnerStyle>
  );
};

export default MyMeetingNewMemberList;
