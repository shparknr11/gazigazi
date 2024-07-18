import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  getMyMeetLeaderList,
  getMyMeetMemberList,
} from "../../apis/mymeetingapi/mymeetingapi";
import GuideTitle from "../../components/common/GuideTitle";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";

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
    width: 15%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    height: 100%;
  }
  .caption-area {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 25px 0px; */
  }
  .img-wrap {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    padding-top: 30px;
    padding-left: 50px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 25px 0px;
    min-height: 553px;
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
    margin-top: -4px;
    border-radius: 0 0 10px 10px;
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
    height: 300px;
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
  .mymeeting-div {
    display: flex;
    border: 1px solid rgb(219, 219, 219);
    height: 30px;
    justify-content: center;
    gap: 3px;
    border-radius: 4px 4px 0px 0;
    border-bottom: none;
  }
  .mymeeting-div-area {
    color: #c2c2c2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .mymeeting-div-area:hover {
    color: #fff;
    transition: background-color 0.6s;
    background: rgb(248, 235, 214);
  }
  .span-pointer {
    display: block;
    cursor: pointer;
    height: 10px;
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
  const [imgUrl, setImgUrl] = useState();
  const [isAuth, setIsAuth] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const navigate = useNavigate();
  // 나중에 axios 들어오면 이거 그냥 필요없음
  // 권한에 따라 쏘고 받고만 하면됨
  const handleClickEnterMeet = async () => {
    // userSeq 변경 해야하고 page, 는 나중에 수정
    // size 는
    setIsLoading(true);
    const enterMeetObj = {
      userSeq: sessionStorage.getItem("userSeq"),
      page,
    };
    try {
      const res = await getMyMeetMemberList(enterMeetObj);
      setAllData(res?.list);
      toast.success("모임이 조회되었습니다.");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const handleClickMakeMeet = async () => {
    setIsLoading(true);
    const enterMeetObj = {
      userSeq: sessionStorage.getItem("userSeq"),
      page,
    };
    try {
      const res = await getMyMeetLeaderList(enterMeetObj);
      setAllData(res?.list);
      toast.success("모임이 조회되었습니다.");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    document.getElementById("meetingMake").click();
  }, []);
  const imgOnError = () => {
    setImgError(true);
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <MyMeetingStyle>
      <div className="meeting-wrap">
        <GuideTitle title={"모임리스트"} guideTitle={"내 모임"}></GuideTitle>
        <div className="meeting-inner">
          <div className="caption-area">
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                fontSize: "18px",
                color: "#c9c2a5",
              }}
            >
              <div className="mymeeting-div">
                <div className="mymeeting-div-area">
                  <span
                    id="meetingEnter"
                    className="span-pointer"
                    onClick={() => {
                      setIsAuth(1);
                      handleClickEnterMeet();
                    }}
                  >
                    내가 속한 모임
                  </span>
                </div>
                <div className="mymeeting-div-area">
                  <span
                    id="meetingMake"
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
              {allData.length > 0 ? (
                allData?.map(item => (
                  <div className="img-container" key={item?.partySeq}>
                    <div>
                      <div className="container">
                        {/* <!-- 얘 맵돌릴때 url 바꿔야함 --> */}
                        <img
                          className="caption-img"
                          src={`http://112.222.157.156:5122/pic/party/${item?.partySeq}/${item?.partyPic}`}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          onError={imgOnError}
                        ></img>
                        <div className="buttons">
                          <div className="buttons-inner">
                            {isAuth === 1 ? (
                              <>
                                <button
                                  style={{ display: "none" }}
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
                                      `/mymeeting/mymeetinguser/${item?.partySeq}`,
                                      {
                                        state: {
                                          isAuth: isAuth,
                                          partyName: item?.partyName,
                                        },
                                      },
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
                                      navigate(
                                        `/meeting/modify/${item?.partySeq}`,
                                      );
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
                                      `/mymeeting/mymeetingLeader/${item?.partySeq}`,
                                      {
                                        state: {
                                          isAuth: isAuth,
                                          partyName: item?.partyName,
                                        },
                                      },
                                    );
                                  }}
                                >
                                  Blog
                                </button>
                                {/* <div>{item.partyAuthGb}</div> */}
                                <button
                                  className="button-style etc-btn"
                                  style={{ width: "100px" }}
                                  onClick={e => {
                                    navigate(
                                      `/mymeeting/mymeetingmemberlist/${item.partySeq}`,
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
                          모임장 : {item.userName}
                          {/* 🚗(아이콘으로변경)최서윤 님의 모임 */}
                        </div>
                        {/* <div className="cut-text">신나는 모임 어쩌구</div> */}
                        <div className="cut-text">{item.partyIntro}</div>
                        <div className="cut-text">
                          모임명 : {item.partyName}
                          {/* 7월 7일(일) 18:00 홍대 플레이스오션 */}
                        </div>
                        <div className="cut-text">
                          {/* 일단 물어볼 것 */}
                          {item.partyAuthGb !== "0" ? (
                            <>
                              현재 참가 인원 : {item.partyNowMem} /{" "}
                              {item.partyMaximum}
                            </>
                          ) : (
                            "모임 승인 대기중"
                          )}
                          {/* 7월 7일(일) 18:00 홍대 플레이스오션 */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    fontWeight: "bold",
                  }}
                >
                  <span style={{ fontSize: "30px" }}>
                    조회된 모임이 없습니다.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MyMeetingStyle>
  );
};

export default MyMeeting;
