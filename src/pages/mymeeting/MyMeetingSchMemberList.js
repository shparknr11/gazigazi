import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/calendar/calendar.css";

const ReactCalendarStyle = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  .cut-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-wrap {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #f7ebd5;
    border-radius: 4px 4px 0px 0px;
  }
  .item {
    width: 100%;
    padding: 10px;
    color: #383737;
    cursor: pointer;
  }
  .item-border-right {
    border-right: 1px solid #f7ebd5;
  }
  .divButtonStyle {
    background-color: #f8ebd6;
    color: #c5861f;
  }
`;
const ReactCalendarListStyle = styled.div`
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  ul {
    display: flex;
    width: 100%;
    align-items: center;
    //justify-content: space-around;
  }
  span {
    display: block;
    width: 100%;
  }
  li {
    padding-left: 10px;
    height: 30px;
    width: 100%;
    border-bottom: 1px solid gray;
    display: flex;
    font-size: 18px !important;
    font-weight: 700;
    color: black;
  }
`;
const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-left: 5px;
  padding-top: 20px;
`;
const CalendarListUlStyle = styled.div`
  display: flex;
  text-align: center;
  a {
    display: block;
  }
`;
const CalendarListLiStyle = styled.div`
  display: flex;
  width: 100%;
  li {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 60px;
  }
  a {
    width: 100%;
  }
  span {
    display: block;
    width: 100%;

    text-align: center;
  }
`;
const MyMeetingSchMemberList = () => {
  const [allData, setAllData] = useState([]);
  const [isClicked, setIsClicked] = useState(0);
  useEffect(() => {
    setAllData([
      {
        pk: 1,
        meetName: "모임명1",
        meetMember: "멤버명1",
        meetPlace: "대구광역시 동구",
        managementDate: "2024-07-04",
      },
      {
        pk: 2,
        meetName: "모임명2",
        meetMember: "멤버명2",
        meetPlace: "대구광역시 남구",
        managementDate: "2024-07-07",
      },
      {
        pk: 3,
        meetName: "모임명3",
        meetMember: "멤버명3",
        meetPlace: "대구광역시 북구",
        managementDate: "2024-07-02",
      },
      {
        pk: 4,
        meetName: "모임명4",
        meetMember: "멤버명4",
        meetPlace: "하와이",
        managementDate: "2024-07-09",
      },
      {
        pk: 5,
        meetName: "모임명5",
        meetMember: "멤버명5",
        meetPlace: "제주도",
        managementDate: "2024-07-10",
      },
      {
        pk: 6,
        meetName: "모임명6",
        meetMember: "멤버명6",
        meetPlace: "대구광역시 서구",
        managementDate: "2024-07-18",
      },
    ]);
  }, []);
  let activeItem = null;
  // todo : 정리 중 관리 페이지 식으로 갈지 ...
  window.addEventListener("click", e => {
    // 내부 css background 먹일 시 활용할 것
    // const a = document.querySelector("");
    if (e.target.classList.contains("item")) {
      const clickedItem = e.target;
      console.log(clickedItem);
      if (activeItem) {
        activeItem.classList.remove("divButtonStyle");
      }

      clickedItem.classList.add("divButtonStyle");
      activeItem = clickedItem;
      // 이벤트 걸곳 axios 여기다 걸자
      switch (clickedItem.id) {
        case "1":
          // a.style.backgroundColor = "#f8ebd6";

          break;
        case "2":
          // a.style.backgroundColor = "#f8ebd6";
          break;
        default:
          break;
      }
    }
  });
  return (
    <ReactCalendarStyle>
      <TitleDivStyle>신청 멤버 관리</TitleDivStyle>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* <!-- 일단 누르면 이벤트 나오게 해놓음. --> */}
          <div className="item-wrap">
            <div
              id="1"
              className="item item-border-right"
              onClick={() => {
                setIsClicked(1);
              }}
            >
              일정 신청 멤버
            </div>
            <div
              id="2"
              className="item"
              onClick={() => {
                setIsClicked(2);
              }}
            >
              일정 멤버 확인
            </div>
          </div>
        </div>
        <ReactCalendarListStyle>
          <CalendarListUlStyle>
            <li>
              <span>순번</span>
              <span>모임명</span>
              <span>멤버명</span>
              <span>신청일자</span>
              {isClicked === 1 ? <span>승인 / 반려</span> : null}
            </li>
          </CalendarListUlStyle>
          <div className="func-main" style={{ width: "100%" }}>
            <div className="func-main-inner">
              {isClicked === 1 ? (
                allData.length > 0 ? (
                  allData.map(item => (
                    <CalendarListLiStyle key={item.pk}>
                      {/* 컴포넌트로 뺄꺼임 일단 테스트 */}
                      <li>
                        <span>{item.pk}</span>
                        <span>{item.meetName}</span>
                        <span>{item.meetMember}</span>
                        <span>{item.managementDate}</span>
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              alert("승인");
                            }}
                          >
                            승인
                          </button>
                          /
                          <button
                            type="button"
                            onClick={() => {
                              alert("반려");
                            }}
                          >
                            반려
                          </button>
                        </span>
                      </li>
                    </CalendarListLiStyle>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      fontWeight: "bold",
                      margin: "0 auto",
                      height: "70px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottom: "1px solid #f8ebd6",
                      width: "100%",
                    }}
                  >
                    <Link to={"/mymeeting/mymeetingschresister"}>
                      등록 된 일정이 없습니다.
                    </Link>
                  </div>
                )
              ) : allData.length > 0 ? (
                allData.map(item => (
                  <CalendarListLiStyle key={item.pk}>
                    {/* 컴포넌트로 뺄꺼임 일단 테스트 */}
                    <li>
                      <span>{item.pk}</span>
                      <span>{item.meetName}</span>
                      <span>{item.meetMember}</span>
                      <span>{item.managementDate}</span>
                    </li>
                  </CalendarListLiStyle>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    fontWeight: "bold",
                    margin: "0 auto",
                    height: "70px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottom: "1px solid gray",
                    width: "100%",
                  }}
                >
                  <Link to={"/mymeeting/mymeetingschresister"}>
                    등록 된 일정이 없습니다.
                  </Link>
                </div>
              )}
            </div>
          </div>
        </ReactCalendarListStyle>
      </div>
    </ReactCalendarStyle>
  );
};

export default MyMeetingSchMemberList;
