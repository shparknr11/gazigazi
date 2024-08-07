import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { getPartyAll } from "../../apis/meeting/meetingapi";
import { patchApproval } from "../../apis/meeting/joinapi";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../components/button/Button";
import { useSelector } from "react-redux";
const AdminInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1280px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
  display: flex;
  height: 1000px;
`;
const AdminLeftDivStyle = styled.div`
  nav {
    width: 150px;
  }
  ul,
  li {
    width: 100%;
  }
  .admin-list {
  }
  .admin-list-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    display: flex;

    & span {
      text-align: end;
      width: 100%;
      padding: 10px 16px 10px 24px;
      margin-bottom: 5px;
    }
    & span:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
const AdminRightDivStyle = styled.div`
  padding: 0px 50px;
  margin-left: 50px;
  h1 {
    margin-bottom: 40px;
    font-size: 28px;
  }
  .admin-application-div {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    width: 100%;
  }
  .admin-application {
    width: 200px;
    height: 100px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .admin-application-btn {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    button {
    }
  }
`;
const Admin = () => {
  const [filteredPartyList, setFilteredPartyList] = useState([]);
  const navigate = useNavigate();

  // const userSeq = sessionStorage.getItem("userSeq");
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;

  const getData = async () => {
    try {
      const result = await getPartyAll();
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      filterParty(result.resultData);
      // console.log(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  // api함수

  const filterParty = _resultData => {
    const updateList = _resultData.filter(item => item.partyAuthGb === "0");
    setFilteredPartyList(updateList);
  };

  const handleClickApproval = async _partySeq => {
    try {
      const result = await patchApproval(_partySeq, userSeq);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      await getData(); // 목록을 다시 가져와 업데이트
    } catch (error) {
      console.error("Approval error:", error);
    }
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

  const getYearLastTwoDigits = year => {
    // return year.toString().slice(-2);
    return year.toString();
  };

  // 클릭시 상페 페이지로
  const handleClickDetail = _partySeq => {
    // console.log(_partySeq);
    navigate(`/meeting/${_partySeq}`);
  };
  return (
    <AdminInnerStyle>
      <AdminLeftDivStyle>
        <nav>
          <ul className="admin-list">
            {/* <li className="admin-list-item">
              <span>메인</span>
            </li> */}
            <li className="admin-list-item">
              <span>모임 신청 관리</span>
            </li>
            {/* <li className="admin-list-item">
              <span>...</span>
            </li>
            <li className="admin-list-item">
              <span>설정</span>
            </li> */}
          </ul>
        </nav>
      </AdminLeftDivStyle>
      <AdminRightDivStyle>
        <h1>모임 신청 리스트</h1>
        <span></span>
        <div className="admin-application-div">
          {filteredPartyList.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="list-box">
                <div className="list-box-img">
                  <img
                    src={`/pic/party/${item.partySeq}/${item.partyPic}`}
                    alt="파티이미지"
                  />
                </div>
                <div className="list-box-content">
                  <div className="list-box-title">
                    <div className="list-box-profileimg">
                      <img
                        src={`/pic/user/${item.userSeq}/${item.userPic}`}
                        alt="프로필이미지"
                      />
                    </div>
                    <span style={{ fontWeight: "bold" }}>{item.userName}</span>
                    <span style={{ color: "#999" }}> 님의 모임</span>
                  </div>
                  <h3 className="list-box-text" style={{ fontWeight: "bold" }}>
                    {item.partyName}
                  </h3>
                  <p className="list-box-local" style={{ fontSize: "13px" }}>
                    {item.partyLocation1} {item.partyLocation2}
                  </p>
                  <span className="list-box-gender">
                    {getGenderText(item.partyGender)}
                  </span>
                  <span className="list-box-age">
                    {getYearLastTwoDigits(item.partyMinAge) === "1901"
                      ? "연령무관"
                      : `${getYearLastTwoDigits(item.partyMinAge)} ~`}
                    {getYearLastTwoDigits(item.partyMaxAge) === "2155"
                      ? ""
                      : `${getYearLastTwoDigits(item.partyMaxAge)}년생`}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  padding: "10px 0px",
                  justifyContent: "end",
                  paddingRight: "10px",
                }}
              >
                <MainButton
                  label="상세보기"
                  onClick={() => {
                    handleClickDetail(item.partySeq);
                  }}
                ></MainButton>

                <MainButton
                  label="승인"
                  onClick={() => {
                    handleClickApproval(item.partySeq);
                  }}
                ></MainButton>
              </div>
            </div>
          ))}
        </div>
      </AdminRightDivStyle>
    </AdminInnerStyle>
  );
};

export default Admin;
