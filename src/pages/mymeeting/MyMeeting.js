import styled from "@emotion/styled";
import { useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const MyMeetingStyle = styled.div`
  width: 100%;

  .metting-wrap {
    width: calc(100% - 720px);
    max-width: 1200px;
    margin: 0 auto;
    height: auto;
    margin-top: 25px;
    transition: width 1s;
  }
  // no-wrap _ 쓸수있는데 사용하자
  @media (max-width: 1400px) {
    .metting-wrap {
      width: 100% !important;
      transition: width 1s;
    }
  }
  @media (max-width: 768px) {
    .metting-wrap {
      width: 100% !important;
      transition: width 1s;
    }
  }

  .metting-inner {
    width: 100%;
    display: flex;
    height: 1000px;
  }
  .metting-sidebar-inner {
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
  }
  .img-wrap {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    padding-top: 30px;
    padding-left: 20px;
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
  }
  .caption-img {
    display: block;
    width: 100%;
    transition: filter 0.3s;
  }
  .caption-img.blur {
    filter: blur(5px);
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
const MyMeeting = () => {
  const [imgUrl, setImgUrl] = useState("meetinga.png");
  const [isAuth, setIsAuth] = useState(0);
  const navigate = useNavigate();
  // 나중에 axios 들어오면 이거 그냥 필요없음
  // 권한에 따라 쏘고 받고만 하면됨
  const dummyData =
    isAuth === 2
      ? [
          {
            planSeq: 1,
            address: "대구광역시 더미 주소 1",
            partyIntro: "모임 소개 글 더미 1",
            userName: "모임장1",
            imgUrl: imgUrl,
          },
          {
            planSeq: 2,
            address: "대구광역시 더미 주소 2",
            partyIntro: "모임 소개 글 더미 2",
            userName: "모임장2",
            imgUrl: imgUrl,
          },
          {
            planSeq: 3,
            address: "대구광역시 더미 주소 3",
            partyIntro: "모임 소개 글 더미 3",
            userName: "모임장3",
            imgUrl: imgUrl,
          },
          {
            planSeq: 4,
            address: "대구광역시 더미 주소 4",
            partyIntro: "모임 소개 글 더미 4",
            userName: "모임장4",
            imgUrl: imgUrl,
          },
          {
            planSeq: 5,
            address: "대구광역시 더미 주소 5",
            partyIntro: "모임 소개 글 더미 5",
            userName: "모임장5",
            imgUrl: imgUrl,
          },
          {
            planSeq: 6,
            address: "대구광역시 더미 주소 6",
            partyIntro: "모임 소개 글 더미 6",
            userName: "모임장6",
            imgUrl: imgUrl,
          },
          {
            planSeq: 7,
            address: "대구광역시 더미 주소 7",
            partyIntro: "모임 소개 글 더미 7",
            userName: "모임장7",
            imgUrl: imgUrl,
          },
          {
            planSeq: 8,
            address: "대구광역시 더미 주소 8",
            partyIntro: "모임 소개 글 더미 8",
            userName: "모임장8",
            imgUrl: imgUrl,
          },
          {
            planSeq: 9,
            address: "대구광역시 더미 주소 9",
            partyIntro: "모임 소개 글 더미 9",
            userName: "모임장9",
            imgUrl: imgUrl,
          },
          {
            planSeq: 10,
            address: "대구광역시 더미 주소 10",
            partyIntro: "모임 소개 글 더미 10",
            userName: "모임장10",
            imgUrl: imgUrl,
          },
          {
            planSeq: 11,
            address: "대구광역시 더미 주소 11",
            partyIntro: "모임 소개 글 더미 11",
            userName: "모임장11",
            imgUrl: imgUrl,
          },
          {
            planSeq: 12,
            address: "대구광역시 더미 주소 12",
            partyIntro: "모임 소개 글 더미 12",
            userName: "모임장12",
            imgUrl: imgUrl,
          },
          {
            planSeq: 13,
            address: "대구광역시 더미 주소 13",
            partyIntro: "모임 소개 글 더미 13",
            userName: "모임장13",
            imgUrl: imgUrl,
          },
          {
            planSeq: 14,
            address: "대구광역시 더미 주소 14",
            partyIntro: "모임 소개 글 더미 14",
            userName: "모임장14",
            imgUrl: imgUrl,
          },
          {
            planSeq: 15,
            address: "대구광역시 더미 주소 15",
            partyIntro: "모임 소개 글 더미 15",
            userName: "모임장15",
            imgUrl: imgUrl,
          },
          {
            planSeq: 16,
            address: "대구광역시 더미 주소 16",
            partyIntro: "모임 소개 글 더미 16",
            userName: "모임장16",
            imgUrl: imgUrl,
          },
          {
            planSeq: 17,
            address: "대구광역시 더미 주소 17",
            partyIntro: "모임 소개 글 더미 17",
            userName: "모임장17",
            imgUrl: imgUrl,
          },
          {
            planSeq: 18,
            address: "대구광역시 더미 주소 18",
            partyIntro: "모임 소개 글 더미 18",
            userName: "모임장18",
            imgUrl: imgUrl,
          },
          {
            planSeq: 19,
            address: "대구광역시 더미 주소 19",
            partyIntro: "모임 소개 글 더미 19",
            userName: "모임장19",
            imgUrl: imgUrl,
          },
          {
            planSeq: 20,
            address: "대구광역시 더미 주소 20",
            partyIntro: "모임 소개 글 더미 20",
            userName: "모임장20",
            imgUrl: imgUrl,
          },
          {
            planSeq: 21,
            address: "대구광역시 더미 주소 21",
            partyIntro: "모임 소개 글 더미 21",
            userName: "모임장21",
            imgUrl: imgUrl,
          },
          {
            planSeq: 22,
            address: "대구광역시 더미 주소 22",
            partyIntro: "모임 소개 글 더미 22",
            userName: "모임장22",
            imgUrl: imgUrl,
          },
        ]
      : [
          {
            planSeq: 1,
            address: "대구광역시 더미 속한 주소 1",
            partyIntro: "모임 소개 글 더미 속한 1",
            userName: "모임장1",
            imgUrl: imgUrl,
          },
          {
            planSeq: 2,
            address: "대구광역시 더미 속한 주소 2",
            partyIntro: "모임 소개 글 더미 속한 2",
            userName: "모임장2",
            imgUrl: imgUrl,
          },
          {
            planSeq: 3,
            address: "대구광역시 더미 속한 주소 3",
            partyIntro: "모임 소개 글 더미 속한 3",
            userName: "모임장3",
            imgUrl: imgUrl,
          },
          {
            planSeq: 4,
            address: "대구광역시 더미 속한 주소 4",
            partyIntro: "모임 소개 글 더미 속한 4",
            userName: "모임장4",
            imgUrl: imgUrl,
          },
          {
            planSeq: 5,
            address: "대구광역시 더미 속한 주소 5",
            partyIntro: "모임 소개 글 더미 속한 5",
            userName: "모임장5",
            imgUrl: imgUrl,
          },
          {
            planSeq: 6,
            address: "대구광역시 더미 속한 주소 6",
            partyIntro: "모임 소개 글 더미 속한 6",
            userName: "모임장6",
            imgUrl: imgUrl,
          },
          {
            planSeq: 7,
            address: "대구광역시 더미 속한 주소 7",
            partyIntro: "모임 소개 글 더미 속한 7",
            userName: "모임장7",
            imgUrl: imgUrl,
          },
          {
            planSeq: 8,
            address: "대구광역시 더미 속한 주소 8",
            partyIntro: "모임 소개 글 더미 속한 8",
            userName: "모임장8",
            imgUrl: imgUrl,
          },
          {
            planSeq: 9,
            address: "대구광역시 더미 속한 주소 9",
            partyIntro: "모임 소개 글 더미 속한 9",
            userName: "모임장9",
            imgUrl: imgUrl,
          },
          {
            planSeq: 10,
            address: "대구광역시 더미 속한 주소 10",
            partyIntro: "모임 소개 글 더미 속한 10",
            userName: "모임장10",
            imgUrl: imgUrl,
          },
          {
            planSeq: 11,
            address: "대구광역시 더미 속한 주소 11",
            partyIntro: "모임 소개 글 더미 속한 11",
            userName: "모임장11",
            imgUrl: imgUrl,
          },
          {
            planSeq: 12,
            address: "대구광역시 더미 속한 주소 12",
            partyIntro: "모임 소개 글 더미 속한 12",
            userName: "모임장12",
            imgUrl: imgUrl,
          },
          {
            planSeq: 13,
            address: "대구광역시 더미 속한 주소 13",
            partyIntro: "모임 소개 글 더미 속한 13",
            userName: "모임장13",
            imgUrl: imgUrl,
          },
          {
            planSeq: 14,
            address: "대구광역시 더미 속한 주소 14",
            partyIntro: "모임 소개 글 더미 속한 14",
            userName: "모임장14",
            imgUrl: imgUrl,
          },
          {
            planSeq: 15,
            address: "대구광역시 더미 속한 주소 15",
            partyIntro: "모임 소개 글 더미 속한 15",
            userName: "모임장15",
            imgUrl: imgUrl,
          },
          {
            planSeq: 16,
            address: "대구광역시 더미 속한 주소 16",
            partyIntro: "모임 소개 글 더미 속한 16",
            userName: "모임장16",
            imgUrl: imgUrl,
          },
          {
            planSeq: 17,
            address: "대구광역시 더미 속한 주소 17",
            partyIntro: "모임 소개 글 더미 속한 17",
            userName: "모임장17",
            imgUrl: imgUrl,
          },
          {
            planSeq: 18,
            address: "대구광역시 더미 속한 주소 18",
            partyIntro: "모임 소개 글 더미 속한 18",
            userName: "모임장18",
            imgUrl: imgUrl,
          },
          {
            planSeq: 19,
            address: "대구광역시 더미 속한 주소 19",
            partyIntro: "모임 소개 글 더미 속한 19",
            userName: "모임장19",
            imgUrl: imgUrl,
          },
          {
            planSeq: 20,
            address: "대구광역시 더미 속한 주소 20",
            partyIntro: "모임 소개 글 더미 속한 20",
            userName: "모임장20",
            imgUrl: imgUrl,
          },
          {
            planSeq: 21,
            address: "대구광역시 더미 속한 주소 21",
            partyIntro: "모임 소개 글 더미 속한 21",
            userName: "모임장21",
            imgUrl: imgUrl,
          },
          {
            planSeq: 22,
            address: "대구광역시 더미 속한 주소 22",
            partyIntro: "모임 소개 글 더미 속한 22",
            userName: "모임장22",
            imgUrl: imgUrl,
          },
        ];
  return (
    <MyMeetingStyle>
      <div className="metting-wrap">
        <div className="metting-inner">
          <div className="caption-area">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className="font-size30">모임 리스트</h1>
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
              {dummyData.map(item => (
                <div className="img-container" key={item.planSeq}>
                  <div>
                    <div className="container">
                      {/* <!-- 얘 맵돌릴때 url 바꿔야함 --> */}
                      {imgUrl ? (
                        <img
                          className="caption-img"
                          src={`./www/images/${item.imgUrl}`}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
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
                              <button className="button-style">탈퇴</button>
                              <button
                                className="button-style"
                                onClick={e => {}}
                              >
                                관리페이지
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="button-style">수정</button>
                              <button
                                className="button-style"
                                onClick={e => {
                                  navigate("/mymeeting/1");
                                }}
                              >
                                관리페이지
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
