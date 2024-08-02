import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getPartyAll } from "../apis/meeting/meetingapi";
import { prColor } from "../css/color";
import Category from "../components/meeting/Category";

import HomeMainAround from "../components/meeting/HomeMainAround";
import HomeMainPopular from "../components/meeting/HomeMainPopular";
import { useSelector } from "react-redux";

const HomeInnerStyle = styled.div`
  width: 100%;
  max-width: 1920px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;
const HomeMidInnerStyle = styled.div`
  width: calc(100% - 10px);
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: bold;
    font-size: 22px;
  }
`;
const HomeCreateMeetingBtnStyle = styled.div`
  .home-createbt {
    position: fixed;
    bottom: 48px;
    right: 48px;
    padding: 20px;
    background-color: ${prColor.g900};
    border-radius: 15px;
    color: white;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    box-shadow:
      rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
      rgba(0, 0, 0, 0.3) 0px 3px 3px,
      rgba(0, 0, 0, 0.25) 0px 3px 5px;
    &:hover {
      background-color: ${prColor.g800};
      box-shadow:
        rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
        rgba(0, 0, 0, 0.3) 0px 3px 7px,
        rgba(0, 0, 0, 0.25) 0px 3px 10px;
    }
  }
`;
const Home = () => {
  const navigate = useNavigate();
  const [newList, setNewList] = useState([]);
  const [arroundPartyList, setArroundPartyList] = useState([]);
  const [popularList, setPopularList] = useState([]);

  // 검색
  const [searchKeyword, setSearchKeyword] = useState("");
  // const userSeq = sessionStorage.getItem("userSeq");
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;

  // search 클릭 시 검색
  const handleChangeSearch = e => {
    setSearchKeyword(e.target.value);
  };
  const handleClickSearch = () => {
    navigate(`/category?partyGenre=0&search=${searchKeyword}`);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleClickSearch();
    }
  };

  // 랜더링 시 스크롤 최상단
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    getData();
  }, []);

  // 주변모임 필터
  const filterHomeList = _resultData => {
    const userLocation = sessionStorage.getItem("userAddr");
    if (!userLocation) {
      const filteredListOne = _resultData.filter(
        item => item.partyAuthGb === "1" && item.partyLocation1 === "대구",
      );
      setArroundPartyList(filteredListOne);
    } else {
      const filteredList = _resultData.filter(
        item =>
          item.partyAuthGb === "1" &&
          item.partyLocation1 === userLocation.slice(0, 2),
      );

      setArroundPartyList(filteredList);
    }
  };

  // 마감임박 모임 필터
  const popularHomeList = _resultData => {
    const filteredList = _resultData.filter(
      item =>
        item.partyAuthGb === "1" && item.partyMaximum - item.partyNowMem < 5,
    );
    setPopularList(filteredList);
  };

  // 새로 만들어진모임 필터
  const newHomeList = _resultData => {
    // const currentDate = new Date(); // 현재 날짜와 시간을 가져옵니다

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // 한 달 전 날짜를 계산합니다

    const filteredList = _resultData.filter(item => {
      // inputDt가 ISO 8601 형식을 준수하도록 가정
      const inputDate = new Date(item.inputDt);
      // console.log(inputDate);
      // inputDate가 oneMonthAgo 이상이고, partyAuthGb가 1인 경우만 필터링
      return inputDate >= oneMonthAgo && item.partyAuthGb === "1";
    });

    // 만약 filteredList에 데이터가 없다면, partyAuthGb가 1인 데이터만 필터링
    if (filteredList.length === 0) {
      const onlyPartyAuthGbList = _resultData.filter(
        item => item.partyAuthGb === "1",
      );
      setNewList(onlyPartyAuthGbList);
    } else {
      setNewList(filteredList);
    }
  };

  // api함수 (모임 전체 불러오기)
  const getData = async () => {
    try {
      const result = await getPartyAll();
      if (result.code != 1) {
        alert(result.resultMsg);
        return;
      }
      filterHomeList(result.resultData);
      popularHomeList(result.resultData);
      newHomeList(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  // 무작위 항목을 선택하는 함수
  function getRandomItems(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // arroundPartyList에서 무작위로 6개 선택
  // useEffect(() => {
  //   if (arroundPartyList.length > 0) {
  //     const randomItems = getRandomItems(arroundPartyList, 5);
  //     setRandomParties(randomItems);
  //   }
  //   if (popularList.length > 0) {
  //     const randomItems = getRandomItems(popularList, 5);
  //     setRandomPopularParties(randomItems);
  //   }
  //   if (newList.length > 0) {
  //     const randomItems = getRandomItems(newList, 5);
  //     setRandomNewParties(randomItems);
  //   }
  // }, [arroundPartyList, popularList, newList]);

  const handleClickCreate = () => {
    // console.log(userSeq);
    if (userSeq) {
      navigate(`/meeting/create`);
      return;
    } else {
      navigate(`/login`);
    }
  };

  return (
    <HomeInnerStyle>
      <div className="main-top">
        <div className="mt-banner-div">
          <span>집에만 있는 당신,</span>
          <p>취미를 고르고 일상을 찾으세요</p>
        </div>
        <div className="mt-searchbox-div">
          <div className="mt-searchbox">
            <input
              type="text"
              value={searchKeyword}
              onKeyDown={e => {
                handleKeyDown(e);
              }}
              onChange={e => {
                handleChangeSearch(e);
              }}
            ></input>
            <div
              className="mt-searchbt"
              onClick={() => {
                handleClickSearch();
              }}
            >
              SEARCH
            </div>
          </div>
        </div>
        <Category />
      </div>
      <HomeMidInnerStyle>
        <div className="main-mid">
          <HomeMainAround arroundPartyList={arroundPartyList} />

          <HomeMainPopular popularList={popularList} />
        </div>
      </HomeMidInnerStyle>

      {/* <HomeBtmInnerStyle>
        <div className="main-bottom">
          <div className="mb-event-div">
            <h1>후기</h1>
            <div className="mb-event-list"></div>
          </div>
          <div className="mb-rank-div">
            <h1>모임랭킹</h1>

            <div className="mb-rank-list"></div>

            <div></div>
          </div>
        </div>
      </HomeBtmInnerStyle> */}
      <HomeCreateMeetingBtnStyle>
        <div
          className="home-createbt"
          onClick={() => {
            handleClickCreate();
          }}
        >
          모임생성
        </div>
      </HomeCreateMeetingBtnStyle>
    </HomeInnerStyle>
  );
};

export default Home;
