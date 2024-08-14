import styled from "@emotion/styled";
import {
  BsFillHeartFill,
  BsFillTicketPerforatedFill,
  BsHeart,
} from "react-icons/bs";
import meetimg from "../../images/meetinga.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPartyOne, getWishParty } from "../../apis/meeting/meetingapi";
import useModal from "../../hooks/useModal";
import JoinModal from "../../components/modal/JoinModal";
import { postApplication } from "../../apis/meeting/joinapi";
import { IoPersonSharp } from "react-icons/io5";
import { prColor } from "../../css/color";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// react quill
import DOMPurify from "dompurify";

const MeetItemStyle = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;

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
  margin-bottom: 20px;

  .meet-item-img {
    /* background: url(${meetimg}) no-repeat center;
    background-size: cover; */
    display: block;
    max-width: 500px;
    width: 100%;
    height: 308px;
    background-color: ${prColor.p000};

    img {
      display: block;
      width: 100%;
      height: 100%;
      /* object-fit: contain; */
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
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
  .meet-condition {
    padding: 15px 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    span {
      text-align: center;
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
  .meet-apply-form {
    padding: 15px 20px;
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
    gap: 10px;
  }
  .meet-item-button {
    display: flex;
    padding: 10px 20px;
    border: 1px solid #999;
    background-color: ${prColor.white};
    border-radius: 25px;
    color: #000;
    cursor: pointer;
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
  margin-top: 40px;

  h2 {
    margin-bottom: 5px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    /* margin-top: 30px; */
    line-height: 1.7rem;
  }
  .meet-item-partyinfo {
    word-break: keep-all;
  }
`;

const MeetingDetail = () => {
  const [detailList, setDetailList] = useState(null);
  const [joinContent, setJoinContent] = useState("");
  const [isWished, setIsWished] = useState(false);
  //   const [searchParams] = useSearchParams();
  const { partySeq } = useParams();
  const navigate = useNavigate();
  // const userSeq = sessionStorage.getItem("userSeq");
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;

  const currentWish = localStorage.getItem(
    parseInt(partySeq) + parseInt(userSeq),
  );
  // console.log(currentWish);
  // console.log("partySeq", partySeq);
  const { isModalOpen, confirmAction, openModal, closeModal } = useModal();
  // const telNumber = sessionStorage.getItem("userPhone");
  const telNumber = user.userPhone;
  // const forUserBirth = sessionStorage.getItem("userBirth");
  const forUserBirth = user.userBirth;
  // const userGender = parseInt(sessionStorage.getItem("userGender"));
  const userGender = parseInt(user.userGender);
  const userBirth = parseInt(forUserBirth?.substring(0, 4));

  const handleJoinModal = () => {
    const partyMaximum = parseInt(detailList.partyMaximum);
    const partyNowMem = parseInt(detailList.partyNowMem);
    const partMinAge = parseInt(detailList.partMinAge);
    const partyMaxAge = parseInt(detailList.partyMaxAge);
    const partyGender = parseInt(detailList.partyGender);

    if (!userSeq) {
      navigate(`/login`);
      return;
    }

    if (partyMaximum / partyNowMem === 1) {
      alert("인원 모집이 마감되었습니다.(인원초과)");
      return;
    }

    if (partMinAge > userBirth || partyMaxAge < userBirth) {
      alert("연령제한이 있습니다.");
      return;
    }
    if (partyGender !== userGender && partyGender !== 3) {
      alert("성별 제한이 있습니다.");
      return;
    }
    if (detailList.userSeq == userSeq) {
      alert("본인의 모임입니다.");
      return;
    }
    openModal({
      onConfirm: async joinContent => {
        try {
          const appliycation = { joinUserSeq: userSeq, joinMsg: joinContent };
          const result = await postApplication(partySeq, appliycation);
          if (result.code != 1) {
            toast.warning(result.resultMsg);
            return;
          }
          setJoinContent("");
          toast.success("모임신청이 완료되었습니다.");
          closeModal();
        } catch (error) {
          console.log(error);
        }
      },
    });
  };
  // api함수
  const getDetailData = async _partySeq => {
    try {
      const result = await getPartyOne(_partySeq);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      console.log(result.resultData);
      setDetailList(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetailData(partySeq);
  }, []);

  useEffect(() => {
    const checkWishStatus = () => {
      const current = localStorage.getItem(
        parseInt(partySeq) + parseInt(userSeq),
      );
      setIsWished(!!current);
    };

    if (!detailList) {
      return;
    }

    checkWishStatus();
  }, [partySeq, userSeq, detailList]);

  if (!detailList) {
    return null; // detailList가 로딩 중이면 아무것도 렌더링하지 않음
  }

  const handleClickWish = async () => {
    if (!userSeq) {
      navigate(`/login`);
      return;
    }
    const parseUserSeq = parseInt(userSeq);
    const parsePartySeq = parseInt(partySeq);
    const parsePhoneNumber = parseInt(telNumber);
    const result = await getWishParty(parseUserSeq, parsePartySeq);
    if (result.code !== 1) {
      alert(result.resultMsg);
      return;
    }

    if (!currentWish) {
      localStorage.setItem(
        parsePartySeq + parseUserSeq,
        parseUserSeq + parsePartySeq + parsePhoneNumber,
      );
      setIsWished(true);
      alert("관심목록에 추가되었습니다.");
    } else {
      localStorage.removeItem(parsePartySeq + parseUserSeq);
      setIsWished(false);
      alert("관심목록에서 삭제되었습니다.");
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
  const heartIcon = isWished ? <BsFillHeartFill color="red" /> : <BsHeart />;

  const getYearLastTwoDigits = year => {
    // return year.toString().slice(-2);
    return year.toString();
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
            <div className="meet-item-img">
              <img
                src={`/pic/party/${detailList.partySeq}/${detailList.partyPic}`}
                alt="모임사진"
              />
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
                <p style={{ padding: "10px" }}>
                  {/* {getYearLastTwoDigits(detailList.partyMinAge) === "1901"
                    ? "연령무관"
                    : `${getYearLastTwoDigits(detailList.partyMinAge)} ~`}
                  {getYearLastTwoDigits(detailList.partyMaxAge) === "2155"
                    ? ""
                    : `${getYearLastTwoDigits(detailList.partyMaxAge)}년생`} */}
                  {getYearLastTwoDigits(detailList.partyMinAge) === "1901" &&
                  getYearLastTwoDigits(detailList.partyMaxAge) === "2155"
                    ? "연령무관"
                    : `${getYearLastTwoDigits(detailList.partyMinAge)} ~ ${getYearLastTwoDigits(detailList.partyMaxAge)}년생`}
                </p>
                <p style={{ padding: "10px", textAlign: "end" }}>
                  & {getGenderText(detailList.partyGender)}
                </p>
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
                    {heartIcon}
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
                ? "🏈 운동은 삶의 활력소, 같이 즐겨요!"
                : detailList.partyGenre === "2"
                  ? "🎮 새로운 친구들과 함께 GAME!"
                  : detailList.partyGenre === "3"
                    ? "🍨 모여서 맛집탐방"
                    : detailList.partyGenre === "4"
                      ? "🛍 트렌디한 패션 이야기를 함께 나눠요!"
                      : detailList.partyGenre === "5"
                        ? "📔 함께 공부하며 성장해요!"
                        : detailList.partyGenre === "6"
                          ? "✨ 전시, 공연, 영화, 문화생활을 함께 즐겨요!"
                          : detailList.partyGenre === "7"
                            ? "🍷 분위기 있게 한잔"
                            : "💬 기타 취미, 새로운 친구들과 함께 즐겨요!"}
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(detailList.partyIntro),
              }}
            />
            {/* <p className="meet-item-partyinfo">{detailList.partyIntro}</p> */}
          </div>
          {/* <div className="meet-item-imgs"></div> */}
        </MeetItemInfo>
        <UnderLine />
        <div>
          <div>
            <h1>모임장 님과 진행된 최근 일정</h1>
          </div>
          <div>
            <div>
              <span></span>
            </div>
          </div>
        </div>
        <UnderLine />
        <div></div>
      </div>
      {detailList.partyAuthGb === "1" ? (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          <h1
            style={{
              position: "fixed",
              top: "35%",
              left: "50%",
              fontSize: "50px",
              display: "flex",
              color: "#FF5858",
              fontWeight: "bold",
              letterSpacing: "11px",
              justifyContent: "center",
              alignContent: "center",
              border: "3px solid #FF5858",
              transform: "rotate(-30deg)",
              padding: "80px 60px",
            }}
          >
            승인대기
          </h1>
        </div>
      ) : null}
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
