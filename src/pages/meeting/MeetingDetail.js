import styled from "@emotion/styled";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import meetimg from "../../images/meetinga.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPartyOne, getWishParty } from "../../apis/meeting/meetingapi";
import useModal from "../../hooks/useModal";
import JoinModal from "../../components/modal/JoinModal";
import { postApplication } from "../../apis/meeting/joinapi";
import { IoPersonSharp } from "react-icons/io5";
import { prColor } from "../../css/color";

const MeetItemStyle = styled.div`
  margin-top: 30px;
  .inner {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    width: calc(100% - 30px);
    max-width: 1280px;
  }
`;
const MeetItemTitle = styled.div`
  .meet-item-category {
    display: flex;
    gap: 10px;
    font-size: 1.2rem;

    svg {
      color: orange;
    }

    span {
      color: #555;
    }
  }

  .meet-item-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .meet-item-member-div {
    display: flex;
  }
  .meet-item-member {
    display: flex;
  }
  .meet-item-member span {
    display: flex;
    align-items: center;
  }

  .meet-item-member svg {
    width: 19px;
    height: 19px;
  }
`;

const MeetItemCard = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;
  margin-bottom: 40px;

  .meet-item-img {
    /* background: url(${meetimg}) no-repeat center;
    background-size: cover; */
    display: block;
    max-width: 500px;
    width: 100%;
    height: 308px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    /* 
    img {
      display: block;
      width: 100%;
      height: 100%;
    } */
  }

  .meet-item-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* padding: 25px; */
  }
  .meet-item-leader {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    padding: 12px 20px;
    img {
      display: block;
      width: 20px;
      height: 20px;
      border: 1px solid #999;
      border-radius: 60%;
      margin-right: 5px;
    }
  }
  .meet-condition,
  .meet-apply-form {
    padding: 25px 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 15px;
    span {
      text-align: center;
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
  .meet-item-button-div {
    display: flex;
    justify-content: space-around;
  }
  .meet-item-button {
    display: flex;
    padding: 10px 20px;
    border: 1px solid #999;
    background-color: ${prColor.white};
    border-radius: 25px;
    color: #000;
    &:hover {
      border: 1px solid #000;
      background-color: ${prColor.p000};
    }
  }
  .meet-item-button span {
    display: flex;
    align-items: center;
    svg {
      color: red;
    }
  }
`;
const UnderLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(227, 229, 231);
  margin: 20px 0;
`;

const MeetItemInfo = styled.div`
  margin-top: 50px;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    margin-top: 30px;
    line-height: 1.7rem;
  }
`;

const MeetingDetail = () => {
  const [detailList, setDetailList] = useState(null);
  const [joinContent, setJoinContent] = useState("");
  const [isWished, setIsWished] = useState(false);
  //   const [searchParams] = useSearchParams();
  const { partySeq } = useParams();
  const userSeq = sessionStorage.getItem("userSeq");
  // console.log("partySeq", partySeq);
  const { isModalOpen, confirmAction, openModal, closeModal } = useModal();

  const handleJoinModal = () => {
    openModal({
      onConfirm: async joinContent => {
        try {
          const appliycation = { joinUserSeq: userSeq, joinMsg: joinContent };
          await postApplication(partySeq, appliycation);
          setJoinContent("");
          closeModal();
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  useEffect(() => {
    // api함수
    const getDetailData = async _partySeq => {
      try {
        const result = await getPartyOne(_partySeq);
        if (result.code !== 1) {
          alert(result.resultMsg);
          return;
        }
        // console.log(result.resultData);
        setDetailList(result.resultData);
      } catch (error) {
        console.log(error);
      }
    };
    if (partySeq) {
      getDetailData(partySeq);
    }
  }, []);

  if (!detailList) {
    return null; // detailList가 로딩 중이면 아무것도 렌더링하지 않음
  }

  const handleClickWish = async () => {
    const parseUserSeq = parseInt(userSeq);
    const parsePartySeq = parseInt(partySeq);
    const result = await getWishParty(parseUserSeq, parsePartySeq);
    if (result.code !== 1) {
      alert(result.resultMsg);
      return;
    }
    alert("관심목록에 추가되었습니다.");
    setIsWished(!isWished);
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

  return (
    <MeetItemStyle>
      <div className="inner">
        <MeetItemTitle>
          <div className="meet-item-category">
            <BsFillTicketPerforatedFill />
            <span>모임</span>
          </div>
          <div className="meet-item-title">
            <span>{detailList.partyName}</span>
          </div>
          <div className="meet-item-member-div">
            <div className="meet-item-member">
              <span style={{ color: "rgba(0,0,0,0.5)", marginRight: "5px" }}>
                <IoPersonSharp />
                참여인원
              </span>
              <span>
                {detailList.partyNowMem}/{detailList.partyMaximum}
              </span>
            </div>
          </div>
          <MeetItemCard>
            {/* style={{
                background: `url(${detailList.partyPic}) no-repeat center`,
                backgroundSize: "cover",
              }} */}
            <div
              className="meet-item-img"
              style={{
                // 임시
                backgroundImage: `url(/pic/party/${detailList.partySeq}/${detailList.partyPic})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              {/* <img
                src={`/pic/party/${detailList.partySeq}/${detailList.partyPic}`}
                alt="모임사진"
              /> */}
            </div>

            <div className="meet-item-content">
              <span className="meet-item-leader">
                <img
                  src={`/pic/user/${detailList.userSeq}/${detailList.userPic}`}
                  alt="프로필"
                />
                {detailList.userName} 모임장
              </span>
              <div className="meet-condition">
                <span>가입 조건 </span>
                <p> 남여 무관, 98년생~00년생</p>
              </div>
              <div className="meet-apply-form">
                <span>신청서 양식</span>
                <p>자유형식</p>
              </div>
              <div className="meet-item-button-div">
                <div
                  className="meet-item-button"
                  onClick={() => {
                    handleClickWish();
                  }}
                >
                  <span>
                    {!isWished ? <>🤍</> : <>🧡</>}
                    찜하기
                  </span>
                </div>
                <div
                  className="meet-item-button"
                  onClick={() => {
                    handleJoinModal();
                  }}
                >
                  신청하기
                </div>
              </div>
            </div>
          </MeetItemCard>
        </MeetItemTitle>
        <UnderLine />
        <MeetItemInfo>
          <div>
            <h2>
              {detailList.partyGenre === "1"
                ? "🏈 내 취미는 스포츠"
                : detailList.partyGenre === "2"
                  ? "🎮 게임"
                  : detailList.partyGenre === "3"
                    ? "🍨 모여서 맛집탐방"
                    : detailList.partyGenre === "4"
                      ? "🛍 내가 패션왕"
                      : detailList.partyGenre === "5"
                        ? "📔 자기개발 끝판왕"
                        : detailList.partyGenre === "6"
                          ? "✨ 문화 / 예술 즐기기"
                          : detailList.partyGenre === "7"
                            ? "🍷 분위기 있게 한잔"
                            : "💬 기타"}
            </h2>
            <p>{detailList.partyIntro}</p>
          </div>
          <div className="meet-item-imgs"></div>
        </MeetItemInfo>
        <UnderLine />
        <div></div>
      </div>
      {/* 모달 */}
      <JoinModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        joinContent={joinContent}
        setJoinContent={setJoinContent}
      />
    </MeetItemStyle>
  );
};

export default MeetingDetail;
