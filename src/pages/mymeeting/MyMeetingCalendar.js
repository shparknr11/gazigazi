import styled from "@emotion/styled";
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "../../css/calendar/calendar.css";
const ReactCalendarStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
`;
const CalendarListUlStyle = styled.div`
  display: flex;
  text-align: center;
  a {
    display: block;
  }
`;
const MyMeetingCalendar = () => {
  const [calendarFilterData, setCalendarFilterData] = useState([]);
  const [userSeq, setUserSeq] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // 날짜 요일 출력
  // 캘린더의 날짜 출력을 US 달력으로 변경하기
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };

  // 외부 데이터의 내용을 날짜에 출력하기
  // axios.get("todos") 리턴결과
  // 이건 api 만들어지면 해당 데이터 아이디 매칭해야됨
  // 데이터도 가라임
  // todoApi
  const [allData, setAllData] = useState([]);
  // 조회

  // 내용 출력하기
  // 캘린더 날짜 숫자만큼 실행 됨
  const tileContent = ({ date }) => {
    // MM : 2자리 월
    // DD : 2자리 일
    const checkDay = moment(date).format("yyyy-MM-DD");
    // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
    const dayResult = allData?.find(
      item => checkDay === item.managementDate.toString(),
    );
    //const filteredDay = ;
    // map으로 객체 1,2,3,4 값에 해당 되는 아이콘 빼기.
    // console.log(dayResult);
    if (!dayResult) {
      return <div></div>;
    }
  };

  // 날짜 css 꾸미기
  const tileClassName = ({ date }) => {
    // MM : 2자리 월
    // DD : 2자리 일

    const checkDay = moment(date).format("yyyy-MM-DD");
    // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
    const dayResult = allData?.find(item => checkDay === item.day);
    if (dayResult) {
      return "sun";
    }
  };
  // 일자의 날짜 출력 포맷 변경하기
  // 오늘날짜 리스트에서 보여주기
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));
  const [clickInfo, setClickInfo] = useState(null);

  useEffect(() => {
    onClickDay(moment().format("yyyy-MM-DD"));
  }, []);
  const formatDay = (locale, date) => moment(date).format("D");
  // 날짜 선택 시 처리
  const onClickDay = async (value, event) => {
    setIsLoading(true);
    try {
      const checkDay = moment(value).format("yyyy-MM-DD");
      setClickDay(checkDay);
      // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
      // const dayResult = allData?.find(
      //   item => checkDay.toString() === item.managementDate,
      // );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // getOneData
  // useEffect(() => {
  // console.log("wwwww", allData.managementDate, clickDay);
  // const dayFilterData = allData?.filter(
  //   item => item.managementDate.toString() === clickDay.toString(),
  // );
  // console.log("asdasdadasd", dayFilterData);
  // setCalendarFilterData(dayFilterData);
  // }, []);
  // ************************* 데이터 변경 ********************************* //
  // if (isLoading) {
  //   return <Loading></Loading>;
  // }
  return (
    <ReactCalendarStyle>
      <TitleDivStyle>일정 관리</TitleDivStyle>

      <div style={{ margin: "0 auto" }}>
        {/* 굳이 밑에 리스트형식 및 아이콘으로 표현 해주는데 알려줄 필요가 있나? */}
        {/* <div>
          {clickDay}의 상세정보 : {clickInfo?.title}
        </div> */}
        <Calendar
          calendarType={"gregory"}
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
          tileContent={tileContent}
          formatDay={formatDay}
          onClickDay={onClickDay}
          value={clickDay}
        />
      </div>
      {/* <ToastContainer /> */}
      <TitleDivStyle>일정 상세 정보</TitleDivStyle>
      <ReactCalendarListStyle>
        <CalendarListUlStyle>
          <li>
            <span>이미지</span>
            <span>애칭</span>
            <span>가드닝활동</span>
            <span>날짜</span>
          </li>
        </CalendarListUlStyle>
        <div style={{ textAlign: "end", marginRight: "10px" }}>
          <button
            type="button"
            onClick={() => {
              navigate("/", { state: clickDay });
            }}
          >
            일정 등록 페이지 만들면 그때 수정
          </button>
        </div>
      </ReactCalendarListStyle>
    </ReactCalendarStyle>
  );
};

export default MyMeetingCalendar;
