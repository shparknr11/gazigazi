import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { getPartyAll } from "../../apis/meeting/meetingapi";
import { patchApproval } from "../../apis/meeting/joinapi";
const AdminInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1300px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
  display: flex;
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
  const userSeq = sessionStorage.getItem("userSeq");

  // api함수
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

  const filterParty = _resultData => {
    const updateList = _resultData.filter(item => item.partyAuthGb === "0");
    setFilteredPartyList(updateList);
  };

  useEffect(() => {
    getData();
  }, []);

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

  return (
    <AdminInnerStyle>
      <AdminLeftDivStyle>
        <nav>
          <ul className="admin-list">
            <li className="admin-list-item">
              <span>메인</span>
            </li>
            <li className="admin-list-item">
              <span>모임 신청 관리</span>
            </li>
            <li className="admin-list-item">
              <span>...</span>
            </li>
            <li className="admin-list-item">
              <span>설정</span>
            </li>
          </ul>
        </nav>
      </AdminLeftDivStyle>
      <AdminRightDivStyle>
        <h1>모임 신청 리스트</h1>
        <div className="admin-application-div">
          {filteredPartyList.map((item, index) => (
            <div key={index}>
              <div className="admin-application">{item.partyName}</div>
              <div className="admin-application-btn">
                <button
                  onClick={() => {
                    handleClickApproval(item.partySeq);
                  }}
                >
                  승인
                </button>
                <button>반려</button>
              </div>
            </div>
          ))}
        </div>
      </AdminRightDivStyle>
    </AdminInnerStyle>
  );
};

export default Admin;
