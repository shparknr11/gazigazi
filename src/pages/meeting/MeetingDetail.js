import styled from "@emotion/styled";
import {
  BsFillHeartFill,
  BsFillTicketPerforatedFill,
  BsHeart,
} from "react-icons/bs";
import meetimg from "../../images/meetinga.png";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPartyOne, getWishParty } from "../../apis/meeting/meetingapi";
import useModal from "../../hooks/useModal";
import JoinModal from "../../components/modal/JoinModal";
import { postApplication } from "../../apis/meeting/joinapi";
import { IoPersonSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { prColor } from "../../css/color";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// react quill
import DOMPurify from "dompurify";
import { NoReviewStyle, ReviewItemStyle } from "../review/Review";
import { getMeetingPageReviewList } from "../../apis/reviewapi/reviewapi";
import { Link } from "react-router-dom";
import ApplicationModal from "../../components/modal/ApplicationModal";
import MeeetingDetailCalendar from "../../components/meeting/MeetingDetailCalendar";

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
    margin-right: 5px;
  }
  .meet-item-member span {
    display: flex;
    align-items: center;
  }

  .meet-item-member svg {
    margin-right: 5px;
    width: 19px;
    height: 19px;
  }
  .meet-item-member-state {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid green;
    background-color: green;
    color: ${prColor.p100};
    border-radius: 15px;
    padding: 3px;
    font-size: 12px;
  }
  .meet-item-member-end {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid firebrick;
    background-color: firebrick;
    color: ${prColor.p100};
    border-radius: 15px;
    padding: 3px;
    font-size: 12px;
  }
  .meet-item-condition {
    display: flex;
    align-items: center;
    svg {
      width: 19px;
      height: 19px;
    }
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
    gap: 15px;
    /* padding: 25px; */
  }
  .meet-item-leader {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    padding: 12px 20px;
    img {
      display: block;
      width: 22px;
      height: 22px;
      border: 1px solid #999;
      border-radius: 60%;
      margin-right: 5px;
    }
  }

  .meet-item-balloon {
    position: relative;
    width: 320px;
    height: 100px;
    background-color: ${prColor.p100};
    border-radius: 10px;
    margin-bottom: 25px;
  }
  .meet-item-balloon:after {
    border-top: 15px solid ${prColor.p100};
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
    position: absolute;
    top: 14px;
    left: -14px;
  }
  .meet-item-balloon-two {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 320px;
    height: 100px;
    background-color: ${prColor.p100};
    border-radius: 10px;
  }
  .balloon-two-div {
    padding: 15px;
    & h1 {
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
  .meet-item-balloon-two:after {
    border-top: 15px solid ${prColor.p100};
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
    position: absolute;
    top: 14px;
    left: -14px;
  }
  .meet-condition-div {
    padding: 15px;
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 12px;
      margin-bottom: 12px;
    }
    span {
      font-size: 14px;
      font-weight: bold;
    }
    .mc-div {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
      & p {
        padding: 2px;
        font-size: 12px;
        background-color: ${prColor.p000};
      }
    }
    .ma-div {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
      & p {
        padding: 2px;
        font-size: 12px;
        background-color: ${prColor.p000};
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          color: #999;
        }
      }
    }
  }
  .meet-apply-form {
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    span {
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
  .meet-item-button-div {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .meet-item-button {
    display: flex;
    width: 100px;
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
const SmallUnderLine = styled.div`
  width: 500px;
  height: 1px;
  background-color: rgb(227, 229, 231);
  margin: 5px 0;
`;
const MeetItemMenu = styled.div`
  ul {
    display: flex;
    width: auto;
    border-bottom: 2px solid;
  }
  .mim-meetintro {
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 10px 100px;
      border-right: ${props =>
        props.activeMenu === "1" ? "1px solid" : "1px transparent"};
      border-left: ${props =>
        props.activeMenu === "1" ? "1px solid" : "1px transparent"};
      border-top: ${props =>
        props.activeMenu === "1" ? "1px solid" : "1px transparent"};

      /* background-color: ${prColor.p000}; */
      background-color: ${props =>
        props.activeMenu === "1" ? "#efede5" : "#f9f8f5"};

      cursor: pointer;
      &:hover {
        background-color: ${prColor.p100};
      }
    }
  }
  .mim-meetreview {
    &:hover {
      background-color: ${prColor.p100};
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 10px 100px;
      border-right: ${props =>
        props.activeMenu === "2" ? "1px solid" : "1px transparent"};
      border-left: ${props =>
        props.activeMenu === "2" ? "1px solid" : "1px transparent"};
      border-top: ${props =>
        props.activeMenu === "2" ? "1px solid" : "1px transparent"};
      background-color: ${props =>
        props.activeMenu === "2" ? "#efede5" : "#f9f8f5"};
      cursor: pointer;
      &:hover {
        background-color: ${prColor.p100};
      }
    }
  }
`;
const MeetItemInfo = styled.div`
  margin-top: 40px;

  .meeting-tag {
    margin-bottom: 20px;
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
const MeetReviewStyle = styled.div`
  h1 {
    margin-bottom: 5px;
    margin-top: 40px;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const MeetingDetail = () => {
  const [detailList, setDetailList] = useState(null);
  const [joinContent, setJoinContent] = useState("");
  const [isWished, setIsWished] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [meetingReviewList, setMeetingReviewList] = useState([]);
  const { partySeq } = useParams();
  const [searchParams] = useSearchParams();
  const detailMenu = searchParams.get("mu");

  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;
  // console.log(user);

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
  const birthDate = new Date(forUserBirth);
  const userBirth = birthDate.getFullYear();
  // const userGender = parseInt(sessionStorage.getItem("userGender"));
  const userGender = parseInt(user.userGender);
  // const userBirth = parseInt(forUserBirth?.substring(0, 4));

  // api 함수 (모임 정보 불러오기)
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

  // api 함수 (해당 모임 리뷰 불러오기)
  const getReviewData = async _partySeq => {
    try {
      const result = await getMeetingPageReviewList(_partySeq, 10);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      // console.log(result.resultData);
      setMeetingReviewList(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailData(partySeq);
    getReviewData(partySeq);
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

  const handleClickApplication = () => {
    // console.log("클릭");
    setModalOpen(true);
  };

  // 신청하기 클릭 시
  const handleJoinModal = () => {
    const partyMaximum = parseInt(detailList.partyMaximum);
    const partyNowMem = parseInt(detailList.partyNowMem);
    const partyMinAge = parseInt(detailList.partyMinAge);
    const partyMaxAge = parseInt(detailList.partyMaxAge);
    const partyGender = parseInt(detailList.partyGender);
    // console.log(userBirth > partyMaxAge, userBirth, partyMaxAge);
    if (!userSeq) {
      navigate(`/login`);
      return;
    }

    if (partyMaximum / partyNowMem === 1) {
      alert("인원 모집이 마감되었습니다.(인원초과)");
      return;
    }

    if (partyMinAge > userBirth || partyMaxAge < userBirth) {
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
          const application = { joinUserSeq: userSeq, joinMsg: joinContent };
          const result = await postApplication(partySeq, application);
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

  // 찜하기 클릭 시
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

  // 리뷰 사진
  const makeReviewPic = (_reviewSeq, _pics) => {
    return _pics.map((item, index) => (
      <div key={index} className="review-img-pic">
        <img
          onClick={() => {
            window.open(
              `http://112.222.157.156:5122/pic/review/${_reviewSeq}/${item}`,
              `gazi_img`,
              `width=430,hight=500`,
            );
          }}
          src={`/pic/review/${_reviewSeq}/${item}`}
        />
      </div>
    ));
  };

  // 평점에 따른 별점 생성 함수
  const makeStars = rating => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} color={i < rating ? "orange" : "#ccc"} />);
    }
    return stars;
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
            {detailList.partyNowMem / detailList.partyMaximum !== 1 ? (
              <div className="meet-item-member-state">
                <span>모집중</span>
              </div>
            ) : (
              <div className="meet-item-member-end">
                <span>모집마감</span>
              </div>
            )}
          </div>
          <MeetItemCard>
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
              <div className="meet-item-balloon">
                <div className="meet-condition-div">
                  <h1>* 신청하기전 반드시 확인해주세요</h1>
                  <div className="mc-div">
                    <span className="mc-condition">연령 조건</span>
                    <p>
                      {getYearLastTwoDigits(detailList.partyMinAge) ===
                        "1901" &&
                      getYearLastTwoDigits(detailList.partyMaxAge) === "2155"
                        ? " 연령무관"
                        : ` ${getYearLastTwoDigits(detailList.partyMinAge)} ~ ${getYearLastTwoDigits(detailList.partyMaxAge)}년생`}
                    </p>
                    <span className="mc-condition">성별 조건</span>
                    <p> {getGenderText(detailList.partyGender)}</p>
                  </div>
                  <div className="ma-div">
                    <span className="ma-application">가입 양식</span>
                    <p
                      className="ma-application-sub"
                      onClick={() => {
                        handleClickApplication();
                      }}
                    >
                      여기를 클릭하세요 .
                    </p>
                  </div>
                </div>
              </div>
              <div className="meet-item-balloon-two">
                <div className="balloon-two-div">
                  <h1>* 모임이 마음에 드신다면</h1>
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
              </div>
            </div>
          </MeetItemCard>
        </MeetItemTitle>

        <MeetItemMenu activeMenu={detailMenu}>
          <ul className="meet-item-menu-ul">
            <li className="mim-meetintro">
              <Link to={`/meeting/${partySeq}?mu=1`}>모임 소개</Link>
            </li>
            <li className="mim-meetreview">
              <Link to={`/meeting/${partySeq}?mu=2`}>후기</Link>
            </li>
          </ul>
        </MeetItemMenu>
        {detailMenu == 1 ? (
          <MeetItemInfo>
            <div>
              <h2 className="meeting-tag">
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
            <UnderLine />

            <MeeetingDetailCalendar partySeq={partySeq} />
          </MeetItemInfo>
        ) : (
          <MeetReviewStyle>
            <div className="meet-item-review">
              <h1>📝 {detailList.userName} 모임장 님이 받은 후기</h1>
              {/* <div>
                <div>4.9</div>
                <div>
                  <ul>
                    <li>5점</li>
                    <li>4점</li>
                    <li>3점</li>
                    <li>2점</li>
                    <li>1점</li>
                  </ul>
                </div>
              </div> */}
              <UnderLine />
              {meetingReviewList.length ? (
                meetingReviewList.map((item, index) => (
                  <ReviewItemStyle key={index}>
                    <div className="review-comment">
                      <div className="review-top">
                        <div className="rt-profile">
                          <img
                            src={`/pic/user/${item.userSeq}/${item.userPic}`}
                            alt="프로필"
                          />
                          <span>{item.userName}</span>
                        </div>
                        <div className="rm-star">
                          {makeStars(item.reviewRating)}
                          {item.reviewRating}
                        </div>
                      </div>

                      <div className="review-mid">
                        <div className="review-mid-text">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(item.reviewContents),
                            }}
                          />
                        </div>
                      </div>
                      {item.pics && item.pics[0] && (
                        <div className="review-img">
                          {makeReviewPic(item.reviewSeq, item.pics)}
                        </div>
                      )}

                      <div className="review-bottom">
                        <div>
                          <div className="review-partyname">
                            <span
                              className="review-partyname-click"
                              style={{ fontWeight: "bold", cursor: "pointer" }}
                              onClick={() => {
                                // handleClickDetailPage(item.partySeq);
                              }}
                            >
                              {item.partyName} - {item.president}
                            </span>
                          </div>
                          <span style={{ fontSize: "12px" }}>
                            {item.inputDt.substr(0, 10)}
                          </span>
                        </div>
                        <div>
                          추천 {item.favCnt}
                          <div className="rb-button">도움이 됐어요</div>
                        </div>
                      </div>
                    </div>
                  </ReviewItemStyle>
                ))
              ) : (
                <NoReviewStyle>작성된 후기가 없습니다.</NoReviewStyle>
              )}
            </div>
          </MeetReviewStyle>
        )}

        <UnderLine style={{ height: "5px", marginBottom: "40px" }} />
      </div>
      {detailList.partyAuthGb !== "2" ? (
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
              color: "#999",
              fontWeight: "bold",
              letterSpacing: "11px",
              justifyContent: "center",
              alignContent: "center",
              border: "3px solid #999",
              transform: "rotate(-30deg)",
              padding: "80px 60px",
            }}
          >
            관리자 승인 필요
          </h1>
        </div>
      ) : null}
      {/* 신청모달 */}
      <JoinModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        joinContent={joinContent}
        setJoinContent={setJoinContent}
      />
      <ApplicationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        applicationText={detailList.partyJoinForm}
      />
    </MeetItemStyle>
  );
};

export default MeetingDetail;
