import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import MyMeetingNotice from "./MyMeetingNotice";
import MyMeetingCalendar from "./MyMeetingCalendar";
import { Link } from "react-router-dom";

const MyMeetingFuncStyle = styled.div`
  width: calc(100% - 720px);
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
  .item {
    width: 100%;
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
    background-color: #d9d9d9;
    color: #fff;
  }
`;
const MyMeetingFunc = () => {
  const [isClicked, setIsClicked] = useState();
  useEffect(() => {
    console.log(isClicked);
  }, [isClicked]);
  // 버튼 2개로 움직일 거임
  // 그 전에 태그를 담아 두는거
  let activeItem = null;

  // onclick 형태로 고쳐야함
  window.addEventListener("click", e => {
    const a = document.querySelector(".func-main");
    if (e.target.classList.contains("item")) {
      const clickedItem = e.target;
      if (activeItem) {
        activeItem.classList.remove("divButtonStyle");
      }

      clickedItem.classList.add("divButtonStyle");

      activeItem = clickedItem;
      // 이벤트 걸곳
      switch (clickedItem.id) {
        case "1":
          a.style.backgroundColor = "red";
          break;
        case "2":
          a.style.backgroundColor = "blue";
          break;
        default:
          break;
      }
    }
  });
  return (
    <MyMeetingFuncStyle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* <!-- 일단 누르면 이벤트 나오게 해놓음. --> */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="1"
            className="item"
            onClick={() => {
              setIsClicked(1);
            }}
          >
            일정 관리
          </div>
          <div
            id="2"
            className="item"
            onClick={() => {
              setIsClicked(2);
            }}
          >
            모임 게시판
          </div>
        </div>
        {/*  height: "600px */}
        <div className="func-main" style={{ width: "100%" }}>
          <div className="func-main-inner">
            {/* <!-- 삼항 연산자 들어올 자리 지금은 조건값 1,2임 --> */}
            {isClicked === 1 ? (
              <MyMeetingCalendar></MyMeetingCalendar>
            ) : isClicked === 2 ? (
              // li map 돌릴거임
              <div>
                <div>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "40px",
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        borderBottom: "1px solid gray",
                        paddingBottom: "10px",
                      }}
                    >
                      <div>글쓴이</div>
                      <div>제목</div>
                      <div>내용</div>
                      <div>날짜</div>
                    </li>
                    <li>
                      <Link to={"/mymeeting/mymeetingnotice/${pk}"}>1</Link>
                    </li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                  </ul>
                </div>
              </div>
            ) : isClicked === 3 ? (
              <div>
                <div>혹시나 버튼추가 될 시 </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </MyMeetingFuncStyle>
  );
};

export default MyMeetingFunc;
