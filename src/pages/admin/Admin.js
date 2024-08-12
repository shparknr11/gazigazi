import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { getPartyAll } from "../../apis/meeting/meetingapi";
import { patchApproval, patchApprovalAdmin } from "../../apis/meeting/joinapi";
import { useNavigate } from "react-router-dom";
import {
  DelButton,
  MainButton,
  ReturnButton,
} from "../../components/button/Button";
import { useSelector } from "react-redux";
import GuideTitle from "../../components/common/GuideTitle";
import useModal from "../../hooks/useModal";
import ApprovalModal from "../../components/modal/admin/ApprovalModal";
import {
  getGenderText,
  getYearLastTwoDigits,
} from "../../components/meeting/homeFunction";
import { Link } from "react-router-dom";

const AdminWrapStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1280px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
  height: 1000px;
`;
const AdminInnerStyle = styled.div`
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
    flex-direction: column;

    & .admin-list-item-menu {
      text-align: end;
      width: 100%;
      padding: 10px 16px 10px 24px;
      margin-bottom: 5px;
      background-color: rgba(0, 0, 0, 0.1);

      a {
        display: block;
        width: 100%;
        height: 100%;
        font-weight: bold;
        font-size: 19px;
      }
    }
    & .admin-list-item-menu:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
    & .admin-list-item-submenu {
      display: flex;
      flex-direction: column;
      width: 100px;

      gap: 10px;
      margin: 10px 0px;
      margin-left: 50px;
      & span:hover {
        cursor: pointer;
        text-decoration: underline;
      }
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
  .yoffset {
    position: relative;
    border: 2px dashed #c9c2a5;
  }
  .admin-btns {
    position: absolute;
    top: 160px;
    left: 19px;
    display: flex;
    gap: 15px;
    padding: 10px 0px;
    justify-content: end;
    padding-right: 10px;
    opacity: 0;
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }
  .yoffset:hover .admin-btns {
    opacity: 1;
    transform: translateY(-15px);
  }

  /* .yoffset {
    opacity: 1;
    transform: translateY(-65px);
  } */
`;

const Admin = () => {
  const { isModalOpen, confirmAction, openModal, closeModal } = useModal();
  const [joinContent, setJoinContent] = useState("");

  const [filteredPartyList, setFilteredPartyList] = useState([]);
  const navigate = useNavigate();

  // const userSeq = sessionStorage.getItem("userSeq");
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;
  const userEmail = user.userEmail;

  // Api 함수
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

  const filterParty = _resultData => {
    const updateList = _resultData.filter(item => item.partyAuthGb === "1");
    setFilteredPartyList(updateList);
  };

  const handleClickApproval = _partySeq => {
    openModal({
      onConfirm: async () => {
        const data = {
          partySeq: _partySeq,
          num: 2,
          userEmail,
        };

        try {
          const result = await patchApprovalAdmin(data);
          if (result.code !== 1) {
            alert(result.resultMsg);
            return;
          }
          await getData(); // 목록을 다시 가져와 업데이트
        } catch (error) {
          console.error("Approval error:", error);
        }
      },
    });
  };

  // 클릭시 상페 페이지로
  const handleClickDetail = _partySeq => {
    // console.log(_partySeq);
    navigate(`/meeting/${_partySeq}`);
  };
  return (
    <AdminWrapStyle>
      <GuideTitle guideTitle="관리자 페이지" subTitle="🔒" />
      <AdminInnerStyle>
        <AdminLeftDivStyle>
          <nav>
            <ul className="admin-list">
              {/* <li className="admin-list-item">
              <span>메인</span>
            </li> */}
              <li className="admin-list-item">
                <div className="admin-list-item-menu">
                  <Link to={`/admin?meeting`}>모임 관리</Link>
                </div>
                <div className="admin-list-item-submenu">
                  <span>• 승인중인 모임</span>
                  <span>• 승인된 모임</span>
                  <span>• 반려된 모임</span>
                  <span>• 삭제된 모임</span>
                </div>
              </li>

              <li className="admin-list-item">
                <div className="admin-list-item-menu">
                  <Link to={`/admin?review`}>후기 관리</Link>
                </div>
              </li>
              <li className="admin-list-item">
                <div className="admin-list-item-menu">
                  <Link to={`/admin?service`}>서비스 관리</Link>
                </div>
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
          <div className="admin-application-div">
            {filteredPartyList.map((item, index) => (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  className="list-box yoffset"
                  onClick={() => {
                    handleClickDetail(item.partySeq);
                  }}
                >
                  <div className="list-box-img">
                    <img
                      src={`/pic/party/${item.partySeq}/${item.partyPic}`}
                      alt="파티이미지"
                    />
                    <div className="admin-btns">
                      <DelButton
                        label="삭제"
                        onClick={e => {
                          e.stopPropagation();
                        }}
                      ></DelButton>

                      <ReturnButton
                        label="반려"
                        onClick={e => {
                          e.stopPropagation();
                        }}
                      ></ReturnButton>

                      <MainButton
                        label="승인"
                        onClick={e => {
                          e.stopPropagation();
                          handleClickApproval(item.partySeq);
                        }}
                      ></MainButton>
                    </div>
                  </div>
                  <div className="list-box-content">
                    <div className="list-box-title">
                      <div className="list-box-profileimg">
                        <img
                          src={`/pic/user/${item.userSeq}/${item.userPic}`}
                          alt="프로필이미지"
                        />
                      </div>
                      <span style={{ fontWeight: "bold" }}>
                        {item.userName}
                      </span>
                      <span style={{ color: "#999" }}> 님의 모임</span>
                    </div>
                    <h3
                      className="list-box-text"
                      style={{ fontWeight: "bold" }}
                    >
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
              </div>
            ))}
          </div>
        </AdminRightDivStyle>
      </AdminInnerStyle>
      {/* 모달 */}
      <ApprovalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        joinContent={joinContent}
        setJoinContent={setJoinContent}
      />
    </AdminWrapStyle>
  );
};

export default Admin;
