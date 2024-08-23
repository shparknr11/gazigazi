import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { getPlanList } from "../../apis/meeting/meetingapi";
import styled from "@emotion/styled";

const MeetingCalendarWrapStyle = styled.div`
  .react-calendar {
    width: 100%;
    max-width: 600px;
    height: auto;
    background: #f9f8f5;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation__arrow {
    visibility: hidden;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__navigation__label {
    pointer-events: none;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }

  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    height: 77px;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 0.833em;
  }

  .react-calendar__tile:disabled {
    /* background-color: #292929; */
    background-color: rgba(255, 255, 255, 0.2);
    color: #ababab;
  }

  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #efede5;
  }

  .react-calendar__tile--now {
    background: #efede5;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #efede5;
  }

  .react-calendar__tile--hasActive {
    background: #e6e2d5;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #efede5;
  }

  .react-calendar__tile--active {
    background: #e6e2d5;
    color: #000;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #efede5;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }

  .rain {
    background-color: blue;
  }
  .sun {
    background-color: #c9c2a5 !important;
  }

  .react-calendar__month-view__days {
    height: auto !important;
  }

  .calendar-plan-title {
    /* background-color: #b59a6f; */
    /* border-radius: 15px; */
    white-space: nowrap;

    text-overflow: ellipsis;
    overflow: hidden;
  }
  .react-calendar__tile--active,
  .react-calendar__tile--now,
  .react-calendar__tile--active,
  .react-calendar__tile--range,
  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd,
  .react-calendar__tile--rangeBothEnds {
  }
`;

const MeeetingDetailCalendar = ({ partySeq }) => {
  // 날짜 요일 출력
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };

  // 외부 데이터의 내용을 날짜에 출력하기
  // axios.get("todos") 리턴결과
  //   const todoApi = [
  //     {
  //       pk: 0,
  //       title: "점심먹기",
  //       text: "내용 1",
  //       day: "2024-08-04",
  //       img: "/logo192.png",
  //     },
  //     {
  //       pk: 1,
  //       title: "영화보기",
  //       text: "내용 2",
  //       day: "2024-08-31",
  //       img: "/logo192.png",
  //       planLocation: "asdfasdf",
  //     },
  //     {
  //       pk: 2,
  //       title: "1",
  //       text: "내용 3",
  //       day: "2024-08-17",
  //       img: "/logo192.png",
  //       planLocation: "asdfasdf",
  //     },
  //     {
  //       pk: 3,
  //       title: "111",
  //       text: "내용 4",
  //       day: "2024-08-29",
  //       img: "/logo192.png",
  //       planLocation: "asdfasdf",
  //     },
  //   ];
  const [allData, setAllData] = useState([]);

  // api 호출함수 (모임 일정 정보 불러오기)
  const getPlanListApi = async () => {
    try {
      const result = await getPlanList(partySeq);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      // console.log(result.resultData);
      setAllData(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlanListApi();
  }, []);

  // 내용 출력하기
  const tileContent = ({ date }) => {
    // console.log("내용 : ", date);
    const checkDay = moment(date).format("YYYY-MM-DD");
    // console.log("변환 : ", day);
    // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
    const dayResult = allData.find(
      (item, index, arr) => checkDay === item.planStartDt,
    );
    // console.log(dayResult);

    if (dayResult) {
      return (
        <div>
          <h2 className="calendar-plan-title">{dayResult.planTitle}</h2>
          {/* <div>
            <img
              src={dayResult.img}
              alt={dayResult.title}
              style={{ width: "10px", height: "10px" }}
            />
          </div> */}
        </div>
      );
    }
  };
  // 날짜 css 꾸미기
  const tileClassName = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => checkDay === item.planStartDt);
    if (dayResult) {
      return "sun";
    }
  };

  // 일자의 날짜 출력 포맷 변경하기
  const formatDay = (locale, date) => {
    return moment(date).format("D");
  };

  // 날짜 선택시 처리
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));
  const [clickInfo, setClickInfo] = useState(null);
  useEffect(() => {
    // 죄송합니다.
    // 강제로 onClickDay 함수를 실행하면서 날짜를 전달하였습니다.
    onClickDay(moment().format());
  }, []);

  const onClickDay = (value, event) => {
    const checkDay = moment(value).format("YYYY-MM-DD");
    setClickDay(checkDay);

    const dayResult = allData.find(item => checkDay === item.planStartDt);
    if (dayResult) {
      setClickInfo(dayResult);
    } else {
      setClickInfo(null);
    }
  };

  // 현재 월의 시작일과 끝일 계산
  const startOfMonth = moment().startOf("month").toDate();
  const endOfMonth = moment().endOf("month").toDate();

  return (
    <div>
      <h1 className="meeting-tag">📅 모임원과 함께한 PLANNER</h1>
      <div>
        {clickDay}의 상세정보 : {clickInfo?.title}
      </div>
      <MeetingCalendarWrapStyle>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
          tileContent={tileContent}
          formatDay={formatDay}
          onClickDay={onClickDay}
          value={clickDay}
          minDate={startOfMonth}
          maxDate={endOfMonth}
        ></Calendar>
      </MeetingCalendarWrapStyle>
    </div>
  );
};

export default MeeetingDetailCalendar;
