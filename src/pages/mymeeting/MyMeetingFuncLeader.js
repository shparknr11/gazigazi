import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import MyMeetingCalendar from "./MyMeetingCalendar";
import { Link, useNavigate } from "react-router-dom";
import { CiImageOff } from "react-icons/ci";
import "./printledger.css";
const MyMeetingFuncLeaderStyle = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
  transition: width 0.3s;
  .meeting-wrap {
    display: flex;
    width: 100%;
    text-align: center;
  }

  .item-wrap {
    display: flex;
    width: 20%;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #f7ebd5;
    border-radius: 4px 4px 0px 0px;
    flex-direction: column;
    justify-content: start;
  }
  @media (max-width: 1340px) {
    width: 100%;
    transition: width 0.3s;
    .meeting-wrap {
      /* flex-direction: column !important; */
    }
    .item-wrap {
      /* width: 100%; */
      /* justify-content: center !important; */
    }
  }
  @media (max-width: 1024px) {
    width: 100%;
    transition: width 0.3s;
    .meeting-wrap {
      flex-direction: column !important;
    }
    .item-wrap {
      width: 100% !important;
      justify-content: center !important;
      flex-direction: row !important;
    }
  }

  .item {
    width: 100%;
    padding: 10px;
    color: #383737;
    cursor: pointer;
  }
  .item-border {
    border-right: 1px solid #f7ebd5;
    border-bottom: 1px solid #f7ebd5;
  }
  .func-main {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .func-main-inner {
    width: 98%;
    height: 98%;
    border-radius: 4px;
    background-color: white;
    margin: 0 auto;
  }
  .divButtonStyle {
    background-color: #f8ebd6;
    color: #c5861f;
  }
  .main-notice-ul {
    display: flex;
    flex-direction: column;
    border: 1px solid #f8ebd6;
    border-radius: 6px;
  }
  .main-notice-li {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #f8ebd6;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .cut-text {
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const LedgerStyle = styled.div`
  .select-box-style {
    height: 30px;
    border: 1px solid antiquewhite;
    text-align: center;
    width: 50px;
    vertical-align: middle;
    border-radius: 15px;
  }
  .select-box-style:hover {
    box-shadow: 1px 1px 1px 1px inset gray;
    background-color: #f8ebd6;
  }
  .ledger-ul {
    border: 1px solid antiquewhite;
  }
  .ledger-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      border: 1px solid rgb(248, 235, 214);
      width: 25%;
      padding: 20px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding: 20px 0px 20px 5px;
`;
const MyMeetingFuncLeader = () => {
  const [isClicked, setIsClicked] = useState();
  const [monthValue, setMonthValue] = useState(1);
  const [isDisplayNone, setIsDisplayNone] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isClicked);
  }, [isClicked]);
  useEffect(() => {
    console.log(monthValue);
  }, [monthValue]);
  useEffect(() => {
    document.getElementById(1).click();
  }, []);
  // 버튼 2개로 움직일 거임
  // 그 전에 태그를 담아 두는거
  let activeItem = null;
  // onclick 형태로 고쳐야함
  window.addEventListener("click", e => {
    const a = document.querySelector(".func-main");
    const titletext = document.querySelector("#titletext");
    if (e.target.classList.contains("item")) {
      const clickedItem = e.target;
      if (activeItem) {
        activeItem.classList.remove("divButtonStyle");
      }

      clickedItem.classList.add("divButtonStyle");
      if (titletext) {
        titletext.innerHTML =
          "Blog" + "(" + document.getElementById(e.target.id).innerText + ")";
        activeItem = clickedItem;
        // 이벤트 걸곳 axios 여기다 걸자
        switch (clickedItem.id) {
          case "1":
            a.style.backgroundColor = "#f8ebd6";

            break;
          case "2":
            a.style.backgroundColor = "#f8ebd6";
            break;
          case "3":
            a.style.backgroundColor = "#f8ebd6";
            break;
          default:
            break;
        }
      }
    }
  });

  // let resetHtml = document.body.innerHTML;
  // const a = document.querySelector("#printTagId").innerHTML;
  // const b = () => {
  //   document.body.innerHTML = a;
  // };
  // window.onbeforeprint = b();
  // window.print();
  // window.onafterprint = document.body.innerHTML = resetHtml;
  const handlePrint = () => {
    window.print();
  };
  return (
    <MyMeetingFuncLeaderStyle id="aaaaa">
      <TitleDivStyle id="titletext">Blog</TitleDivStyle>
      <div className="meeting-wrap">
        {/* <!-- 일단 누르면 이벤트 나오게 해놓음. --> */}
        <div className="item-wrap">
          <div
            id="1"
            className="item item-border cut-text"
            onClick={() => {
              setIsClicked(1);
            }}
          >
            일정 관리
          </div>
          <div
            id="2"
            className="item item-border cut-text"
            onClick={() => {
              setIsClicked(2);
            }}
          >
            모임 게시판
          </div>
          <div
            id="3"
            className="item item-border cut-text"
            onClick={() => {
              setIsClicked(3);
            }}
          >
            가계부
          </div>
        </div>
        {/*  height: "600px */}
        <div className="func-main" style={{ width: "100%" }}>
          <div className="func-main-inner">
            {/* <!-- 삼항 연산자 들어올 자리 지금은 조건값 1,2임 --> */}
            {isClicked === 1 ? (
              <MyMeetingCalendar isClicked={isClicked} />
            ) : isClicked === 2 ? (
              // li map 돌릴거임
              // 컴포넌트로 빠질애들임
              <div>
                <div>
                  <TitleDivStyle>모임 게시판</TitleDivStyle>
                  <div style={{ textAlign: "right", paddingRight: "10px" }}>
                    <button
                      className="resister-btn"
                      onClick={() => {
                        navigate(
                          "/mymeeting/mymeetingnotice/mymeetingnoticeid",
                        );
                      }}
                    >
                      등록
                    </button>
                  </div>
                </div>
                <div>
                  <ul className="main-notice-ul">
                    <li className="main-notice-li">
                      <div>글쓴이</div>
                      <div>제목</div>
                      <div>내용</div>
                      <div>날짜</div>
                    </li>
                    <Link to={"/mymeeting/mymeetingnotice/${pk}"}>
                      <li className="main-notice-li">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            ) : isClicked === 3 ? (
              // 가계부가 추가되서 여기다가 해야될듯
              <div id="printTagId">
                <LedgerStyle>
                  <TitleDivStyle id="title-print">
                    {monthValue} 월 명세자료
                  </TitleDivStyle>
                  {isDisplayNone ? (
                    <div
                      id="printDeleteTag"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "right",
                        padding: "30px 10px",
                        gap: "20px",
                      }}
                    >
                      <select
                        id="monthselect"
                        name="monthselect"
                        className="select-box-style"
                        onChange={e => {
                          setMonthValue(e.target.value);
                        }}
                        onClick={() => {
                          // axios get 들어올 자리
                        }}
                      >
                        {/* 외부 적용 예정 */}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                      {
                        <button type="button" className="resister-btn">
                          등록
                        </button>
                      }
                      <button
                        type="button"
                        className="etc-btn"
                        onClick={() => {
                          handlePrint();
                        }}
                      >
                        출력
                      </button>
                    </div>
                  ) : null}

                  {/* 권한 나왔을 때.... 조건 걸어서 보여주고 안보여주고 해야함. */}
                  <ul className="ledger-ul">
                    <li className="ledger-li">
                      <span>순서</span>
                      <span>회계 구분</span>
                      {/* 일단 해둠 */}
                      <span>멤버명</span>
                      <span>금액</span>
                      <span>일자</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>1</span>
                      <span>{"후원금"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>2</span>
                      <span>{"입금"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>3</span>
                      <span>{"후원금"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>4</span>
                      <span>{"지출"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>5</span>
                      <span>{"입금"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>6</span>
                      <span>{"후원금"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>7</span>
                      <span>{"지출"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>8</span>
                      <span>{"입금"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>9</span>
                      <span>{"후원금"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 이게 필요없으면 없앰 */}
                      <span>10</span>
                      <span>{"후원금"}</span>
                      <span>길동이</span>
                      <span>100,000</span>
                      <span>2024-03-20</span>
                    </li>
                    <li className="ledger-li">
                      {/* 영수증 이미지의 값이 있을 시 ... 이미지  */}
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          height: "100%",
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          <span
                            style={{ display: "inline-block", width: "100%" }}
                          >
                            회비 미납입 인원
                          </span>
                        </div>
                        <div style={{ width: "100%" }}>
                          <span
                            style={{ display: "inline-block", width: "100%" }}
                          >
                            50 / 100
                          </span>
                        </div>
                        <div style={{ width: "100%", height: "100%" }}>
                          <span
                            style={{
                              display: "inline-block",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            {monthValue} 월 금액 내역
                          </span>
                        </div>
                        <div style={{ width: "100%", height: "100%" }}>
                          <span
                            style={{ display: "inline-block", width: "100%" }}
                          >
                            100,000
                          </span>
                        </div>
                      </span>
                      <span style={{ width: "50%", border: "none" }}>
                        {<CiImageOff size={160} />}
                      </span>
                    </li>
                    <li className="ledger-li"></li>
                  </ul>
                </LedgerStyle>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </MyMeetingFuncLeaderStyle>
  );
};

export default MyMeetingFuncLeader;
