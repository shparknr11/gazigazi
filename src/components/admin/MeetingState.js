import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPartyAll } from "../../apis/meeting/meetingapi";
import { patchApprovalAdmin } from "../../apis/meeting/joinapi";
import { DelButton, MainButton, ReturnButton } from "../button/Button";
import { getGenderText, getYearLastTwoDigits } from "../meeting/homeFunction";
import ApprovalModal from "../modal/admin/ApprovalModal";
import Loading from "../common/Loading";
import useAdminModal from "../../hooks/useAdminModal";

const MeetingState = ({ meetingState }) => {
  const { modalTitle, isModalOpen, confirmAction, openModal, closeModal } =
    useAdminModal();
  const [isLoading, setIsLoading] = useState(false);

  const [filteredPartyList, setFilteredPartyList] = useState([]);
  const [joinContent, setJoinContent] = useState("");
  const navigate = useNavigate();

  // const userSeq = sessionStorage.getItem("userSeq");
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;

  // Api 함수
  const getData = async () => {
    setIsLoading(true);
    try {
      const result = await getPartyAll();
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      filterParty(result.resultData);
      setIsLoading(false);
      // console.log(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  // num(상태) 에 따른 모임 필터
  const filterParty = _resultData => {
    const updateList = _resultData.filter(
      item => item.partyAuthGb === meetingState,
    );
    setFilteredPartyList(updateList);
  };

  useEffect(() => {
    getData();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [meetingState]);

  // 모임 승인
  const handleClickApproval = (_partySeq, _userEmail, _num) => {
    openModal({
      topTitle: getModalTitle(_num),
      onConfirm: async joinContent => {
        const data = {
          partySeq: _partySeq,
          num: _num,
          text: joinContent,
          userEmail: _userEmail,
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

  const getModalTitle = _num => {
    switch (_num) {
      case 2:
        return "모임[승인] 안내";
      case 3:
        return "모임[반려] 안내";
      case 4:
        return "모임[삭제] 안내";
      default:
        return;
    }
  };

  const getMeetingBorderStyle = _num => {
    switch (_num) {
      case "2":
        return "2px soild red";
      case "3":
        return "2px solid blue";
      case "4":
        return "2px solid orange";
      default:
        return "2px dashed #e6e2d5";
    }
  };

  const getNoMeeting = _num => {
    switch (_num) {
      case "2":
        return "승인된 모임이 없습니다.";
      case "3":
        return "반려된 모임이 없습니다.";
      case "4":
        return "삭제된 모임이 없습니다.";
      default:
        return "승인 대기중인 모임이 없습니다.";
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      {filteredPartyList.length > 0 ? (
        <div className="admin-application-div">
          {filteredPartyList.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                className="list-box yoffset"
                style={{ border: getMeetingBorderStyle(meetingState) }}
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
                        handleClickApproval(item.partySeq, item.userEmail, 4);
                      }}
                    ></DelButton>

                    <ReturnButton
                      label="반려"
                      onClick={e => {
                        e.stopPropagation();
                        handleClickApproval(item.partySeq, item.userEmail, 3);
                      }}
                    ></ReturnButton>

                    <MainButton
                      label="승인"
                      onClick={e => {
                        e.stopPropagation();
                        handleClickApproval(item.partySeq, item.userEmail, 2);
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
            </div>
          ))}
        </div>
      ) : (
        <p>{getNoMeeting(meetingState)}</p>
      )}

      {/* 모달 */}
      <ApprovalModal
        modalTitle={modalTitle}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        joinContent={joinContent}
        setJoinContent={setJoinContent}
      />
    </>
  );
};

export default MeetingState;
