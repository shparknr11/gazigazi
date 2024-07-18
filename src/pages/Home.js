import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import meetingImg from "../images/meetinga.png";
import { useEffect, useState } from "react";
import { getPartyAll } from "../apis/meeting/meetingapi";
import { IoIosList } from "react-icons/io";
import { Link } from "react-router-dom";

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
    border: 1px solid #999;
    width: 80px;
    height: 80px;
    border-radius: 55px;
    cursor: pointer;
    &:hover {
      background-color: #999;
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

const Home = () => {
  const navigate = useNavigate();
  const [partyAllList, setPartyAllList] = useState([]);
  const [arroundPartyList, setArroundPartyList] = useState([]);
  const [popularList, setPopularList] = useState([]);
  const [randomParties, setRandomParties] = useState([]);

  // 검색
  const [searchKeyword, setSearchKeyword] = useState("");

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

  // api함수
  const getData = async () => {
    try {
      const result = await getPartyAll();
      if (result.code != 1) {
        alert(result.resultMsg);
        return;
      }
      filterHomeList(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
  }, [arroundPartyList]);

  // search 클릭 시 검색
  const handleChangeSearch = e => {
    setSearchKeyword(e.target.value);
  };
  const handleClickSearch = () => {
    navigate(`/category?partyGenre=0&search=${searchKeyword}`);
  };

  // 클릭시 상페 페이지로
  const handleClickDetail = _partySeq => {
    console.log(_partySeq);
    navigate(`/meeting/${_partySeq}`);
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
              <div className="list-box">
                <div className="list-box-img">
                  <img src={meetingImg} alt="모임이미지" />
                </div>
                <div className="list-box-content">
                  <div className="list-box-title">
                    <img alt="프로필" />
                    <span>OOO 님의 모임</span>
                  </div>
                  <h3 className="list-box-text">
                    여전히 일드를 보는 사람들 - 일본문화를 좋아하는 나는 어떤
                    사람? (with 제이팝) 🙌
                  </h3>
                  <p className="list-box-local">서울 강남구</p>
                  <span className="list-box-gender">성별 무관</span>
                  <span className="list-box-age">90~98년생</span>
                </div>
              </div>
              <div className="list-box"></div>
              <div className="list-box"></div>
              <div className="list-box"></div>
              <div className="list-box"></div>
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
                      {getYearLastTwoDigits(item.partyMinAge) === "1940"
                        ? "연령무관"
                        : `${getYearLastTwoDigits(item.partyMinAge)} ~`}
                      {getYearLastTwoDigits(item.partyMaxAge) === "2024"
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
              <div className="list-box">
                <div className="list-box-img"></div>
                <div className="list-box-title">
                  <img alt="프로필" />
                  <span>OOO 님의 모임</span>
                </div>
                <h3 className="list-box-text">
                  여전히 일드를 보는 사람들 - 일본문화를 좋아하는 나는 어떤
                  사람? (with 제이팝) 🙌
                </h3>
                <p className="list-box-local">서울 강남구</p>
                <span className="list-box-gender">성별 무관</span>
                <span className="list-box-age">90~98년생</span>
              </div>
              <div className="list-box"></div>
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
    </HomeInnerStyle>
  );
};

export default Home;
