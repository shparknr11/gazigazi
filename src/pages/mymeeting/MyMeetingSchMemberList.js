import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../../css/calendar/calendar.css";
import { getSchMemberAll } from "../../apis/mymeetingapi/meetschapi/meetschapi";

const ReactCalendarStyle = styled.div`
  width: 35%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  .cut-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  .member-wrap {
    display: flex;
    width: 100%;
    text-align: center;
  }
  .item {
    width: 100%;
    padding: 10px;
    color: #383737;
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    width: 100%;
    transition: width 0.3s;
    .member-wrap {
      flex-direction: column !important;
    }
    .item-wrap {
      width: 100% !important;
      justify-content: center !important;
      flex-direction: row !important;
    }
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
  width: 100%;
  border: 1px solid gray;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media all and (max-width: 1024px) {
    width: 100%;
  }
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
    width: 100%;
    border-bottom: 1px solid gray;
    align-items: center;
    display: flex;
    font-size: 18px !important;
    font-weight: 700;
    color: black;
    height: 40px;
  }
  .none-sch-div {
    display: flex;
    font-weight: bold;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid gray;
    width: 100%;
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
    height: 55px;
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
<<<<<<< Updated upstream
const MyMeetingSchMemberList = () => {
=======
const MyMeetingSchMemberList = ({ meetingId, setPlanMemberSeq }) => {
>>>>>>> Stashed changes
  const [allData, setAllData] = useState([]);
  const [isClicked, setIsClicked] = useState(0);
  const params = useParams();
  const location = useLocation();
  console.log(params);
<<<<<<< Updated upstream
  useEffect(() => {}, []);
  useEffect(() => {
    document.getElementById(1).click();
  }, []);
  const a = async () => {
    console.log("sdfaskjfalsjhflkasjhdkjsdf", location);
    const res = await getSchMemberAll(params.meetingMemberlistid);
    console.log(res.resultData);
    setAllData(res);
  };
=======
  useEffect(() => {
    a();
  }, []);
  useEffect(() => {}, []);
>>>>>>> Stashed changes

  const b = async () => {
    const res = await getSchMemberAll(params.meetingMemberlistid);
    setAllData(res);
    console.log(res);
  };
  let activeItem = null;
  // todo : 정리 중 관리 페이지 식으로 갈지 ...
  window.addEventListener("click", e => {
    // 내부 css background 먹일 시 활용할 것
    // const a = document.querySelector("");
    if (e.target.classList.contains("item")) {
      const clickedItem = e.target;
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
<<<<<<< Updated upstream
=======
  const a = async () => {
    console.log("sdfaskjfalsjhflkasjhdkjsdf", location);
    const res = await getSchMemberAll(meetingId);
    setAllData(res);
    const a = Number(sessionStorage.getItem("userSeq"));
    console.log("asdasdasdasd" + a);
    console.log("fsalkfjsdalkfjsdlk", res.userSeq);
    if (allData?.length > 0) {
      const b = allData?.filter(item => {
        return Number(item?.userSeq) === Number(a);
      });
      setPlanMemberSeq(b[0]?.plmemberSeq);
    }
  };
>>>>>>> Stashed changes
  return (
    <ReactCalendarStyle>
      <label>신청 멤버 관리</label>
      <div className="member-wrap">
        {/* <!-- 일단 누르면 이벤트 나오게 해놓음. --> */}
        {/* <div className="item-wrap">
          <div
            id="1"
            className="item item-border-right"
            onClick={() => {
              a();
              setIsClicked(1);
            }}
          >
            일정 멤버 확인
          </div>
          {/* <div
            id="2"
            className="item"
            onClick={() => {
              b();
              setIsClicked(2);
            }}
          >
            일정 신청 확인
          </div>
        </div> */}
        <ReactCalendarListStyle>
          <CalendarListUlStyle>
            <li>
              <span>순번</span>
              <span>멤버명</span>
              {/* <span>신청일자</span> */}
              {/* {isClicked === 1 ? <span>승인 / 반려</span> : null} */}
            </li>
          </CalendarListUlStyle>
          <div className="func-main" style={{ width: "100%" }}>
            <div className="func-main-inner">
              {isClicked === 1 ? (
                allData.length > 0 ? (
                  allData.map((item, index) => (
                    <CalendarListLiStyle key={item.pk}>
                      {/* 컴포넌트로 뺄꺼임 일단 테스트 */}
                      <li>
                        <span>{index + 1}</span>
                        <span>{item?.userName}</span>
                        {/* <span>{item.managementDate}</span> */}
                        {/* <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <button
                            type="button"
                            className="resister-btn"
                            onClick={() => {
                              alert("승인");
                            }}
                          >
                            승인
                          </button>
                          &nbsp;&nbsp;
                          <button
                            className="delete-btn"
                            type="button"
                            onClick={() => {
                              alert("반려");
                            }}
                          >
                            반려
                          </button>
                        </span> */}
                      </li>
                    </CalendarListLiStyle>
                  ))
                ) : (
                  <div className="none-sch-div">
                    일정 신청한 멤버가 없습니다.
                  </div>
                )
              ) : allData.length > 0 ? (
                allData.map((item, index) => (
                  <CalendarListLiStyle key={item.pk}>
                    {/* 컴포넌트로 뺄꺼임 일단 테스트 */}
                    <li>
                      <span>{index + 1}</span>
                      <span>{item.userName}</span>
                    </li>
                  </CalendarListLiStyle>
                ))
              ) : (
                <div className="none-sch-div" style={{}}>
                  일정 신청한 멤버가 없습니다.
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
