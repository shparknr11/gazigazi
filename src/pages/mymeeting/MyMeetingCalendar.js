import styled from "@emotion/styled";
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../css/calendar/calendar.css";
import { Link } from "react-router-dom";
import { CiImageOff } from "react-icons/ci";
import { getSchAll } from "../../apis/mymeetingapi/meetschapi/meetschapi";
import Loading from "../../components/common/Loading";
import { toast } from "react-toastify";

const ReactCalendarStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  .cut-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
const MyMeetingCalendar = ({ isClicked }) => {
  const [calendarFilterData, setCalendarFilterData] = useState([]);
  const [userSeq, setUserSeq] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // 일자의 날짜 출력 포맷 변경하기
  // 오늘날짜 리스트에서 보여주기
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));
  const [clickInfo, setClickInfo] = useState(null);
  const [monthData, setMonthData] = useState([]);
  const [planSeq, setPlanSeq] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const currentDay = new moment(Date()).format("yyyy-MM-DD");
  // 날짜 요일 출력
  // 캘린더의 날짜 출력을 US 달력으로 변경하기
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };
  useEffect(() => {
    // const monthData = clickDay.replaceAll("-", "");
    getMonthCalendars();
  }, []);
  const getMonthCalendars = async () => {
    // const result = await getMonthCalendar(userSeq, clickDay);
    // const result = setMonthData([
    //   { pk: 1, title: "모임명", planStartDt: "2024-07-04" },
    // ]);
    // setMonthData(result);
    const res = await getSchAll(params.meetingId);
    setMonthData(res);
    onClickDay(moment().format("yyyy-MM-DD"));
  };
  // 외부 데이터의 내용을 날짜에 출력하기
  // axios.get("todos") 리턴결과
  // 이건 api 만들어지면 해당 데이터 아이디 매칭해야됨
  // 데이터도 가라임
  // todoApi
  const [allData, setAllData] = useState([]);
  // 조회
  useEffect(() => {}, []);
  // 내용 출력하기
  // 캘린더 날짜 숫자만큼 실행 됨
  const tileContent = ({ date }) => {
    // MM : 2자리 월
    // DD : 2자리 일
    const checkDay = moment(date).format("yyyy-MM-DD");
    // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
    const dayResult = monthData?.find(
      item => checkDay === item.planStartDt.toString(),
    );
    const dayResultArr = [];
    if (dayResult) {
      dayResultArr.push(dayResult);
    }
    //const filteredDay = ;
    // map으로 객체 1,2,3,4 값에 해당 되는 아이콘 빼기.
    // todo : ** 이거 들어갔을 때 바로 불러오는거 해놔야함.

    if (dayResultArr) {
      return (
        <div>
          {dayResultArr?.map(item => (
            <div key={item.planSeq}>
              <div className="cut-text">{item.planTitle}</div>
              <div className="cut-text">
                {item.planStartDt}&nbsp;/&nbsp;{item.planStartTime}
              </div>
              <div style={{ fontWeight: "bold" }}>
                {item.planCompleted === 2 ? (
                  <span style={{ color: "red" }}>일정 종료</span>
                ) : (
                  <span>진행중</span>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  // 날짜 css 꾸미기
  const tileClassName = ({ date }) => {
    // MM : 2자리 월
    // DD : 2자리 일

    const checkDay = moment(date).format("yyyy-MM-DD");

    // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
    let classNames = "";
    if (checkDay < currentDay) {
      classNames += "end-day-style";
    }
    return classNames;
  };

  const formatDay = (locale, date) => moment(date).format("D");

  // 날짜 선택 시 처리
  const onClickDay = async (value, event) => {
    setIsLoading(true);
    try {
      const checkDay = moment(value).format("yyyy-MM-DD");
      setClickDay(checkDay);
      // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
      const dayResult = monthData?.find(item => checkDay === item.planStartDt);
      setAllData(dayResult);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // getOneData
  // useEffect(() => {
  // const dayFilterData = allData?.filter(
  //   item => item.planStartDt.toString() === clickDay.toString(),
  // );
  // setCalendarFilterData(dayFilterData);
  // }, []);
  // ************************* 데이터 변경 ********************************* //
  // if (isLoading) {
  //   return <Loading></Loading>;
  // }
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <ReactCalendarStyle>
      <TitleDivStyle>일정 관리</TitleDivStyle>
      {/*  style={{ margin: "0 auto" }} */}
      <div>
        {/* 굳이 밑에 리스트형식 및 아이콘으로 표현 해주는데 알려줄 필요가 있나? */}
        {/* <div>
          {clickDay}의 상세정보 : {clickInfo?.title}
        </div> */}
        {/* tileClassName={tileClassName} */}
        <Calendar
          calendarType={"gregory"}
          formatShortWeekday={formatShortWeekday}
          tileContent={tileContent}
          tileClassName={tileClassName}
          formatDay={formatDay}
          onClickDay={onClickDay}
          value={clickDay}
        />
      </div>

      <TitleDivStyle>일정 정보 리스트</TitleDivStyle>
      <div style={{ textAlign: "end", marginRight: "10px" }}>
        {isClicked === 1 ? (
          <div style={{ textAlign: "right", padding: "10px" }}>
            {/* TODO : 중요 _ 일정 명 넘길 것 / 그리고 일정 날짜도 넘길 것 */}
            {clickDay >= currentDay ? (
              <button
                className="resister-btn"
                type="button"
                onClick={() => {
                  if (allData) {
                    toast.warning("해당 날짜에는 일정이 있습니다.");
                    return;
                  }

                  navigate(`/mymeeting/mymeetingschresister`, {
                    state: {
                      clickDay,
                      planSeq: params?.meetingId,
                      isAuth: location?.state.isAuth,
                    },
                  });
                }}
              >
                등록
              </button>
            ) : (
              <span style={{ color: "red" }}>
                <strong>*</strong>현재 날짜는 일정을 생성 할 수 없습니다.
              </span>
            )}
          </div>
        ) : null}
      </div>
      <ReactCalendarListStyle>
        <CalendarListUlStyle>
          <li>
            <span>일정명</span>
            <span>장소</span>
            <span>모임날짜</span>
            <span>진행중 / 일정종료</span>
          </li>
        </CalendarListUlStyle>
        {allData ? (
          <CalendarListLiStyle>
            {/* 컴포넌트로 뺄꺼임 일단 테스트 */}
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/mymeeting/mymeetingschdetail/${allData.planSeq}`, {
                  state: {
                    planSeq: params.meetingId,
                    isAuth: location?.state.isAuth,
                    partyName: location?.state.partyName,
                  },
                });
              }}
            >
              <li>
                <span>{allData?.planTitle}</span>
                {/* <span>{allData.meetPlace}</span> */}
                <span>{allData?.planLocation}</span>
                <span style={{ fontSize: "16px" }}>
                  {allData?.planStartDt}
                  <br />
                  {allData?.planStartTime}
                </span>
                <span>
                  {allData?.planCompleted === 2 ? "일정종료" : "진행중"}
                </span>
              </li>
            </li>
          </CalendarListLiStyle>
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
            등록 된 일정이 없습니다.
          </div>
        )}
      </ReactCalendarListStyle>
    </ReactCalendarStyle>
  );
};

export default MyMeetingCalendar;
