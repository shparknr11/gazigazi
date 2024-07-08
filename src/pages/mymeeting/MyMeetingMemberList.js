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
const MyMeetingMemberList = () => {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    setAllData([
      {
        pk: 1,
        meetMember: "멤버명1",
        meetPlace: "대구광역시 동구",
        managementDate: "2024-07-04",
      },
      {
        pk: 2,
        meetMember: "멤버명2",
        meetPlace: "대구광역시 남구",
        managementDate: "2024-07-07",
      },
      {
        pk: 3,
        meetMember: "멤버명3",
        meetPlace: "대구광역시 북구",
        managementDate: "2024-07-02",
      },
      {
        pk: 4,
        meetMember: "멤버명4",
        meetPlace: "하와이",
        managementDate: "2024-07-09",
      },
      {
        pk: 5,
        meetMember: "멤버명5",
        meetPlace: "제주도",
        managementDate: "2024-07-10",
      },
      {
        pk: 6,
        meetMember: "멤버명6",
        meetPlace: "대구광역시 서구",
        managementDate: "2024-07-18",
      },
    ]);
  }, []);
  // todo : 정리 중 관리 페이지 식으로 갈지 ...
  return (
    <ReactCalendarStyle>
      <TitleDivStyle>모임 멤버 관리</TitleDivStyle>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
        }}
      >
        <button>모임 신청 멤버</button>
        <button>모임 멤버 관리</button>
      </div>
      <ReactCalendarListStyle>
        <CalendarListUlStyle>
          <li>
            <span>모임명</span>
            <span>멤버명</span>
            <span>신청일자</span>
            <span>승인 / 반려</span>
          </li>
        </CalendarListUlStyle>
        {allData.length > 0 ? (
          allData.map(item => (
            <CalendarListLiStyle key={item.pk}>
              {/* 컴포넌트로 뺄꺼임 일단 테스트 */}
              <li>
                <span>{item.pk}</span>
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
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            <Link to={"/mymeeting/mymeetingschresister"}>
              등록 된 일정이 없습니다.
            </Link>
          </div>
        )}
      </ReactCalendarListStyle>
    </ReactCalendarStyle>
  );
};

export default MyMeetingMemberList;
