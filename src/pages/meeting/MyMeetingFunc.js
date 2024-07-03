import styled from "@emotion/styled";

const MyMeetingFuncStyle = styled.div`
  width: 100%;
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
  // 버튼 2개로 움직일 거임
  // 그 전에 태그를 담아 두는거
  let activeItem = null;

  window.addEventListener("click", e => {
    const a = document.querySelector(".func-main");
    if (e.target.classList.contains("item")) {
      const clickedItem = e.target;
      if (activeItem) {
        activeItem.classList.remove("divButtonStyle");
      }

      clickedItem.classList.add("divButtonStyle");

      activeItem = clickedItem;
      console.log(clickedItem);
      // 이벤트 걸곳
      console.log(a);
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
          <div id="1" className="item">
            일정 관리
          </div>
          <div id="2" className="item">
            모임 게시판
          </div>
        </div>
        <div className="func-main" style={{ width: "100%", height: "600px" }}>
          <div className="func-main-inner">
            {/* <!-- 삼항 연산자 들어올 자리 지금은 조건값 1,2임 --> */}
            <div>
              <div>캘린더</div>
            </div>
            <div>
              <div>게시판리스트</div>
            </div>
          </div>
        </div>
      </div>
    </MyMeetingFuncStyle>
  );
};

export default MyMeetingFunc;
