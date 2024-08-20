import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "../../css/calendar/meeting-calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { getPlanList } from "../../apis/meeting/meetingapi";

const MeeetingDetailCalendar = ({ partySeq }) => {
  // 날짜 요일 출력
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };

  // 특정 날짜 클래스 적용하기
  //   const tileClassName = ({ date }) => {
  //     // date.getDay()는 요일을 리턴함
  //     // 0 은 일요일
  //     // console.log(date.getDay());
  //     const day = date.getDay();
  //     let classNames = "";
  //     if (day === 2) {
  //       // 화요일인 경우 샘플
  //       classNames += "rain";
  //     } else if (day === 4) {
  //       // 목요일
  //       classNames += "sun";
  //     }
  //     return classNames;
  //   };

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
      console.log(result.resultData);
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
      <div>
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
      </div>
    </div>
  );
};

export default MeeetingDetailCalendar;
