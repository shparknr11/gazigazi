import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import meetingImg from "../images/meetinga.png";
import { useEffect, useState } from "react";
import { getPartyAll } from "../apis/meeting/meetingapi";
import { IoIosList } from "react-icons/io";
import { Link } from "react-router-dom";
import { prColor } from "../css/color";

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
// const HomeBtmInnerStyle = styled.div`
//   width: 100%;
//   max-width: 1300px;
//   margin: 0 auto;
// display: flex;

//   align-items: center;
//   justify-content: center;
// `;
export const CartegoryWrapStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin-bottom: 120px;
  padding: 0 160px;
  gap: 40px;
  .category-item {
    display: flex;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 55px;
    background-color: #efede5;
    border: 2px solid white;
    cursor: pointer;
    transition: border 1s ease;
    &:hover {
      border: 2px solid #d3cdb5;
    }
  }
  svg {
    width: 32px;
    height: 32px;
    /* 색상 변경 예정 */
  }
  p {
    font-size: 12px;
  }
`;
const ActiveCategoryStyle = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0 160px;
  flex-wrap: wrap;
  > div {
    width: 25%;
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
  const [randomNewParties, setRandomNewParties] = useState([]);

  const [arroundPartyList, setArroundPartyList] = useState([]);
  const [randomParties, setRandomParties] = useState([]);

  const [popularList, setPopularList] = useState([]);
  const [randomPupularParties, setRandomPopularParties] = useState([]);

  // 검색
  const [searchKeyword, setSearchKeyword] = useState("");
  const userSeq = sessionStorage.getItem("userSeq");
  const getGenderText = genderCode => {
    switch (genderCode) {
      case 1:
        return "남성";
      case 2:
        return "여성";
      case 3:
        return "성별무관";
      default:
        return "";
    }
  };

  const getYearLastTwoDigits = year => {
    // return year.toString().slice(-2);
    return year.toString();
  };

  const filterHomeList = _resultData => {
    const filteredList = _resultData.filter(
      // location 부분 수정*****************************************
      item => item.partyAuthGb === "1" && item.partyLocation1 === "서울",
    );
    setArroundPartyList(filteredList);
  };

  const popularHomeList = _resultData => {
    const filteredList = _resultData.filter(
      // location 부분 수정*****************************************
      item =>
        item.partyAuthGb === "1" && item.partyMaximum - item.partyNowMem < 5,
    );
    setPopularList(filteredList);
  };

  // const newHomeList = _resultData => {
  //   const filteredList = _resultData.filter(
  //     // location 부분 수정*****************************************
  //     item => item.partyAuthGb === "1" && item.inputDt,
  //   );
  //   setNewList(filteredList);
  // };

  const newHomeList = _resultData => {
    const currentDate = new Date(); // 현재 날짜와 시간을 가져옵니다

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
  // api함수
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

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    getData();
  }, []);

  // 무작위 항목을 선택하는 함수
  function getRandomItems(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // arroundPartyList에서 무작위로 6개 선택
  useEffect(() => {
    if (arroundPartyList.length > 0) {
      const randomItems = getRandomItems(arroundPartyList, 5);
      setRandomParties(randomItems);
    }
    if (popularList.length > 0) {
      const randomItems = getRandomItems(popularList, 5);
      setRandomPopularParties(randomItems);
    }
    if (newList.length > 0) {
      const randomItems = getRandomItems(newList, 5);
      setRandomNewParties(randomItems);
    }
  }, [arroundPartyList, popularList, newList]);

  // search 클릭 시 검색
  const handleChangeSearch = e => {
    setSearchKeyword(e.target.value);
  };
  const handleClickSearch = () => {
    navigate(`/category?partyGenre=0&search=${searchKeyword}`);
  };

  // 클릭시 상페 페이지로
  const handleClickDetail = _partySeq => {
    // console.log(_partySeq);
    navigate(`/meeting/${_partySeq}`);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleClickSearch();
    }
  };
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
        <ActiveCategoryStyle>
          <div>카테고리</div>
          <div>카테고리</div>
          <div>카테고리</div>
          <div>카테고리</div>
          <div>카테고리</div>
          <div>카테고리</div>
          <div>카테고리</div>
          <div>카테고리</div>
        </ActiveCategoryStyle>
        <CartegoryWrapStyle>
          <Link to="/category?partyGenre=0">
            <div className="category-item">
              <IoIosList style={{ witdh: "80px", height: "80px" }} />
            </div>
            <div className="mt-category-text">전체보기</div>
          </Link>
          <Link to="/category?partyGenre=1">
            <div className="mt-category-div">
              <div className="mt-category-img"></div>
              <div className="mt-category-text">스포츠</div>
            </div>
          </Link>
          <Link to="/category?partyGenre=2">
            <div className="mt-category-div">
              <div className="mt-category-imgone"></div>
              <div className="mt-category-text">게임</div>
            </div>
          </Link>
          <Link to="/category?partyGenre=3">
            <div className="mt-category-div">
              <div className="mt-category-imgtwo"></div>
              <div className="mt-category-text">맛집</div>
            </div>
          </Link>
          <Link to="/category?partyGenre=4">
            <div className="mt-category-div">
              <div className="mt-category-imgthree"></div>
              <div className="mt-category-text">패션</div>
            </div>
          </Link>
          <Link to="/category?partyGenre=5">
            <div className="mt-category-div">
              <div className="mt-category-imgfour"></div>
              <div className="mt-category-text">자기개발</div>
            </div>
          </Link>
          <Link to="/category?partyGenre=6">
            <div className="mt-category-div">
              <div className="mt-category-imgfive"></div>
              <div className="mt-category-text">문화•예술</div>
            </div>
          </Link>
          <Link to="/category?partyGenre=7">
            <div className="mt-category-div">
              <div className="mt-category-imgsix"></div>
              <div className="mt-category-text">Bar</div>
            </div>
          </Link>
          <Link to="/category?partyGenre=8">
            <div className="mt-category-div">
              <div className="mt-category-imgseven"></div>
              <div className="mt-category-text">기타</div>
            </div>
          </Link>
        </CartegoryWrapStyle>
      </div>
      <HomeMidInnerStyle>
        <div className="main-mid">
          <div className="mm-meeting-picks">
            <div className="mm-meeting-title">
              <h1>신규, 방금전 개설된 모임🔔</h1>
              <div>더보기</div>
            </div>
            <div className="mm-meeting-list">
              {randomNewParties.map((item, index) => (
                <div
                  key={index}
                  className="list-box"
                  onClick={() => {
                    handleClickDetail(item.partySeq);
                  }}
                >
                  <div
                    className="list-box-img"
                    style={{
                      backgroundImage: `url(/pic/party/${item.partySeq}/${item.partyPic})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="list-box-content">
                    <div className="list-box-title">
                      <div
                        className="list-box-profileimg"
                        style={{
                          backgroundImage: `url(/pic/user/${item.userSeq}/${item.userPic} )`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                        }}
                      ></div>
                      <span style={{ fontWeight: "bold" }}>
                        {item.userName}
                      </span>
                      <span style={{ color: "#999" }}> 님의 모임</span>
                    </div>
                    <h3
                      className="list-box-text"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.partyName}
                    </h3>
                    <p className="list-box-local" style={{ fontSize: "13px" }}>
                      {item.partyLocation1} {item.partyLocation2}
                    </p>
                    <span className="list-box-gender">
                      {getGenderText(item.partyGender)}
                    </span>
                    <span className="list-box-age">
                      {getYearLastTwoDigits(item.partyMinAge) === "1901"
                        ? "연령무관"
                        : `${getYearLastTwoDigits(item.partyMinAge)} ~`}
                      {getYearLastTwoDigits(item.partyMaxAge) === "2155"
                        ? ""
                        : `${getYearLastTwoDigits(item.partyMaxAge)}년생`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mm-meeting-around">
            <div className="mm-meeting-title">
              <h1>내 주변에 있는 모임🟢🟠🔴</h1>
              <div>더보기</div>
            </div>
            <div className="mm-meeting-list">
              {randomParties.map((item, index) => (
                <div
                  key={index}
                  className="list-box"
                  onClick={() => {
                    handleClickDetail(item.partySeq);
                  }}
                >
                  <div
                    className="list-box-img"
                    style={{
                      backgroundImage: `url(/pic/party/${item.partySeq}/${item.partyPic})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="list-box-content">
                    <div className="list-box-title">
                      <div
                        className="list-box-profileimg"
                        style={{
                          backgroundImage: `url(/pic/user/${item.userSeq}/${item.userPic} )`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                        }}
                      ></div>
                      <span style={{ fontWeight: "bold" }}>
                        {item.userName}
                      </span>
                      <span style={{ color: "#999" }}> 님의 모임</span>
                    </div>
                    <h3
                      className="list-box-text"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.partyName}
                    </h3>
                    <p className="list-box-local" style={{ fontSize: "13px" }}>
                      {item.partyLocation1} {item.partyLocation2}
                    </p>
                    <span className="list-box-gender">
                      {getGenderText(item.partyGender)}
                    </span>
                    <span className="list-box-age">
                      {getYearLastTwoDigits(item.partyMinAge) === "1901"
                        ? "연령무관"
                        : `${getYearLastTwoDigits(item.partyMinAge)} ~`}
                      {getYearLastTwoDigits(item.partyMaxAge) === "2155"
                        ? ""
                        : `${getYearLastTwoDigits(item.partyMaxAge)}년생`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mm-meeting-deadline">
            <div className="mm-meeting-title">
              <h1>실시간 인기있는, 곧 마감되는 모임🕛</h1>
              <div>더보기</div>
            </div>
            <div className="mm-meeting-list">
              {randomPupularParties.map((item, index) => (
                <div
                  key={index}
                  className="list-box"
                  onClick={() => {
                    handleClickDetail(item.partySeq);
                  }}
                >
                  <div
                    className="list-box-img"
                    style={{
                      backgroundImage: `url(/pic/party/${item.partySeq}/${item.partyPic})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="list-box-content">
                    <div className="list-box-title">
                      <div
                        className="list-box-profileimg"
                        style={{
                          backgroundImage: `url(/pic/user/${item.userSeq}/${item.userPic} )`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                        }}
                      ></div>
                      <span style={{ fontWeight: "bold" }}>
                        {item.userName}
                      </span>
                      <span style={{ color: "#999" }}> 님의 모임</span>
                    </div>
                    <h3
                      className="list-box-text"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.partyName}
                    </h3>
                    <p className="list-box-local" style={{ fontSize: "13px" }}>
                      {item.partyLocation1} {item.partyLocation2}
                    </p>
                    <span className="list-box-gender">
                      {getGenderText(item.partyGender)}
                    </span>
                    <span className="list-box-age">
                      {getYearLastTwoDigits(item.partyMinAge) === "1901"
                        ? "연령무관"
                        : `${getYearLastTwoDigits(item.partyMinAge)} ~`}
                      {getYearLastTwoDigits(item.partyMaxAge) === "2155"
                        ? ""
                        : `${getYearLastTwoDigits(item.partyMaxAge)}년생`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="more-bt-icon">
            <TfiArrowCircleRight />
          </div> */}
          </div>
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
