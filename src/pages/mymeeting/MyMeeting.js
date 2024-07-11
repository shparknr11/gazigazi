import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  getMyMeetLeaderList,
  getMyMeetMemberList,
} from "../../apis/mymeetingapi/mymeetingapi";

const MyMeetingStyle = styled.div`
  width: 100%;

  .meeting-wrap {
    width: calc(100% - 30px);
    max-width: 1200px;
    margin: 0 auto;
    height: auto;
    margin-top: 25px;
    transition: width 1s;
  }
  // no-wrap _ 쓸수있는데 사용하자
  @media (max-width: 1400px) {
    .meeting-wrap {
      width: 100% !important;
      transition: width 1s;
    }
  }
  @media (max-width: 768px) {
    .meeting-wrap {
      width: 100% !important;
      transition: width 1s;
    }
  }

  .meeting-inner {
    width: 100%;
    display: flex;
    /* height: 1000px; */
  }
  .meeting-sidebar-inner {
    background-color: #f8ebd6;
    width: 15%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    height: 100%;
  }
  .caption-area {
    background-color: #f8ebd6;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 25px 0px;
  }
  .img-wrap {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    padding-top: 30px;
    padding-left: 50px;
  }
  .img-container {
    width: 30%;
    margin-bottom: 25px;
  }
  .caption-img {
    display: block;
  }
  .img-text-area {
    padding: 5px;
    background-color: white;
    line-height: 2;
    /* css 조금 깨져있음  */
    width: 100%;
    height: 100%;
    margin-top: -2px;
    border-radius: 0 0 10px 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 25px 0px;
  }
  .font-size30 {
    font-size: 30px;
  }
  .cut-text {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .container {
    position: relative;
    display: inline-block;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0 0;
  }
  .caption-img {
    display: block;
    width: 100%;
    transition: filter 0.3s;
    border-radius: 10px 10px 0 0;
  }
  .caption-img.blur {
    filter: blur(3px);
  }
  .buttons {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    gap: 10px;
  }
  .container:hover .caption-img {
    filter: blur(5px);
  }
  .container:hover .buttons {
    display: flex;
  }
  .button {
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    cursor: pointer;
  }
  .button-style {
    width: 50px;
    height: 50px;
  }
  .buttons-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
  }
  .span-pointer {
    cursor: pointer;
  }
  .span-pointer:hover {
    color: #fff;
  }
`;
const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-left: 5px;
  padding-top: 20px;
`;
const MyMeeting = () => {
  const [imgUrl, setImgUrl] = useState("meetinga.png");
  const [isAuth, setIsAuth] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [allData, setAllData] = useState([]);
  const [userSeq, setUserSeq] = useState(9);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const navigate = useNavigate();
  // 나중에 axios 들어오면 이거 그냥 필요없음
  // 권한에 따라 쏘고 받고만 하면됨
  const handleClickEnterMeet = async () => {
    // userSeq 변경 해야하고 page, 는 나중에 수정
    // size 는
    const enterMeetObj = {
      userSeq: 9,
      page,
    };
    const res = await getMyMeetMemberList(enterMeetObj);
    setAllData(res);
  };
  const handleClickMakeMeet = async () => {
    const enterMeetObj = {
      userSeq: 1,
      page,
    };
    const res = await getMyMeetLeaderList(enterMeetObj);
    setAllData(res);
  };
  useEffect(() => {}, []);
  const imgOnError = () => {
    setImgError(true);
  };
  return (
    <MyMeetingStyle>
      <div className="meeting-wrap">
        <div className="meeting-inner">
          <div className="caption-area">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TitleDivStyle>모임 리스트</TitleDivStyle>
              <div
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "40px",
                  paddingRight: "55px",
                }}
              >
                <div>
                  <span
                    className="span-pointer"
                    onClick={() => {
                      setIsAuth(1);
                      handleClickEnterMeet();
                    }}
                  >
                    내가 속한 모임
                  </span>
                </div>
                <div>
                  <span
                    className="span-pointer"
                    onClick={() => {
                      setIsAuth(2);
                      handleClickMakeMeet();
                    }}
                  >
                    내가 만든 모임
                  </span>
                </div>
              </div>
            </div>

            {/* <!-- 스와이퍼 들어올수도 있음. --> */}
            {/* <!-- 버튼 관련된건 media쪽에서 줄여야할듯. --> */}
            <div className="img-wrap">
              {allData?.map(item => (
                <div className="img-container" key={item.partySeq}>
                  <div>
                    <div className="container">
                      {/* <!-- 얘 맵돌릴때 url 바꿔야함 --> */}
                      {imgUrl && imgError ? (
                        <img
                          className="caption-img"
                          src={`./www/images/${item.partyPic}`}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          onError={imgOnError}
                        ></img>
                      ) : (
                        <CiImageOff
                          className="caption-img"
                          size="216"
                          style={{ textAlign: "center" }}
                        />
                      )}
                      <div className="buttons">
                        <div className="buttons-inner">
                          {isAuth === 1 ? (
                            <>
                              <button
                                className="button-style delete-btn"
                                onClick={() => {
                                  if (
                                    confirm("정말 모임을 탈퇴하시겠습니까?")
                                  ) {
                                    alert("탈퇴 되었습니다.");
                                  }
                                }}
                              >
                                탈퇴
                              </button>
                              <button
                                className="button-style etc-btn"
                                onClick={e => {
                                  navigate(
                                    "/mymeeting/mymeetinguser/:meetingId",
                                  );
                                }}
                              >
                                Blog
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="button-style etc-btn"
                                style={{ width: "100px" }}
                                onClick={() => {
                                  if (confirm("수정하시겠습니까?")) {
                                    alert("수정페이지로 이동.");
                                  }
                                }}
                              >
                                수정
                              </button>
                              <button
                                className="button-style etc-btn"
                                style={{ width: "100px" }}
                                onClick={e => {
                                  navigate(
                                    "/mymeeting/mymeetingLeader/:meetingId",
                                  );
                                }}
                              >
                                Blog
                              </button>
                              <button
                                className="button-style etc-btn"
                                style={{ width: "100px" }}
                                onClick={e => {
                                  navigate(
                                    "/mymeeting/mymeetingmemberlist/:meetingMemberlistid",
                                  );
                                }}
                              >
                                모임 신청 관리
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="img-text-area">
                      {/* <!-- 얘 맵돌릴때 아이콘 바꿔야함 --> */}

                      <div className="cut-text">
                        {item.icon}
                        {item.userName}
                        {/* 🚗(아이콘으로변경)최서윤 님의 모임 */}
                      </div>
                      {/* <div className="cut-text">신나는 모임 어쩌구</div> */}
                      <div className="cut-text">{item.partyIntro}</div>
                      <div className="cut-text">
                        {item.address}
                        {/* 7월 7일(일) 18:00 홍대 플레이스오션 */}
                      </div>
                      <div className="cut-text">
                        현재 참가 인원 : 10 / {item.partyMaximum}
                        {/* 7월 7일(일) 18:00 홍대 플레이스오션 */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MyMeetingStyle>
  );
};

export default MyMeeting;
