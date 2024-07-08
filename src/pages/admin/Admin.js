import styled from "@emotion/styled";
import React from "react";
const AdminInnerStyle = styled.div`
  width: calc(100% - 720px);
  max-width: 1200px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
  display: flex;
`;
const AdminLeftDivStyle = styled.div`
  .admin-list {
  }
  .admin-list-item {
    padding: 10px 16px 10px 24px;
    border-bottom: 1px solid #000;
    margin-bottom: 10px;
    display: flex;
    justify-content: end;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
const AdminRightDivStyle = styled.div`
  max-width: 1000px;
  padding: 0px 50px;
  margin-left: 50px;
  h1 {
    margin-bottom: 50px;
    font-size: 28px;
  }
  .admin-application {
    width: 100px;
    height: 100px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Admin = () => {
  return (
    <AdminInnerStyle>
      <AdminLeftDivStyle>
        <nav>
          <ul className="admin-list">
            <li className="admin-list-item">메인</li>
            <li className="admin-list-item">모임 신청 관리</li>
            <li className="admin-list-item">...</li>
            <li className="admin-list-item">설정</li>
          </ul>
        </nav>
      </AdminLeftDivStyle>
      <AdminRightDivStyle>
        <h1>모임 신청 리스트</h1>
        <div>
          <div className="admin-application">리스트</div>
          <button>승인</button>
          <button>반려</button>
        </div>
        <div>
          <div className="admin-application">리스트</div>
          <button>승인</button>
          <button>반려</button>
        </div>
        <div>
          <div className="admin-application">리스트</div>
          <button>승인</button>
          <button>반려</button>
        </div>
        <div>
          <div className="admin-application">리스트</div>
          <button>승인</button>
          <button>반려</button>
        </div>
        <div>
          <div className="admin-application">리스트</div>
          <button>승인</button>
          <button>반려</button>
        </div>
        <div>
          <div className="admin-application">리스트</div>
          <button>승인</button>
          <button>반려</button>
        </div>
      </AdminRightDivStyle>
    </AdminInnerStyle>
  );
};

export default Admin;
