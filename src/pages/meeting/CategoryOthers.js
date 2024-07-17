import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getPartyAll } from "../../apis/meeting/meetingapi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartegoryWrapStyle } from "../Home";
import { IoIosList } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const CateInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1200px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 40px;

  h1 {
    font-size: 25px;
    margin-top: 25px;
    margin-bottom: 60px;
    font-weight: bold;
  }
  .category-category {
    display: flex;
    gap: 10px;
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
  }

  .mm-meeting-cate {
    display: flex;
    flex-wrap: wrap;
    gap: 33px;
    width: 100%;
    height: auto;
    margin-bottom: 40px;
  }
  .cate-box {
    display: block;
    width: 100%;
    max-width: 220px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 10px 0px;
    border-radius: 15px;
    margin-bottom: 50px;
  }
  .cate-box-img {
    display: block;
    height: 150px;
    /* background: url("../images/meetinga.png") no-repeat center;
  background-size: cover; */
    margin-bottom: 5px;
    border-radius: 15px 15px 0px 0px;
  }
  .cate-box-img img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 15px 15px 0px 0px;
  }
  .cate-box-content {
    margin-bottom: 5px;
  }
  .cate-box-title {
    padding: 5px;
    font-size: 14px;
  }
  .cate-box-text {
    padding: 5px;
    font-size: 14px;
  }
  .cate-box-local {
    font-size: 14px;
    padding: 5px;
  }
  .cate-box-gender {
    font-size: 12px;
    padding: 5px;
  }
  .cate-box-age {
    font-size: 12px;
    padding: 5px;
  }
`;
const CateGoryListStyle = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  .category-main-div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  h3 {
    display: flex;
    align-items: center;
  }
  .category-search-div {
  }
  .category-search {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    justify-content: center;
    border: 1px solid #999;
    border-radius: 15px;
    gap: 10px;
  }
  .category-search-input {
    border: none;
  }
  .mm-meeting-dl-name {
    font-size: 18px;
  }
`;
const CategoryOthers = () => {
  const [filteredPartyList, setFilteredPartyList] = useState([]);
  const navigate = useNavigate();
  //   const { partyGenre } = useParams();
  const [searchParams] = useSearchParams();
  const partyGenre = searchParams.get("partyGenre");
  const searchKeyword = searchParams.get("search");

  const filterCategory = _resultData => {
    const updateList = _resultData.filter(
      item =>
        // 여기수정******************************************************
        item.partyAuthGb === "1" &&
        (partyGenre === "0" || item.partyGenre === partyGenre) &&
        (!searchKeyword || item.partyName.includes(searchKeyword)),
    );
    console.log("uadateList", updateList);
    setFilteredPartyList(updateList);
  };
  useEffect(() => {
    // api함수
    const getData = async () => {
      try {
        const result = await getPartyAll();
        if (result.code !== 1) {
          alert(result.resultMsg);
          return;
        }
        // setPartyAllList(result.resultData);
        filterCategory(result.resultData);
        // console.log(result.resultData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [partyGenre]);

  const handleClickDetail = _partySeq => {
    console.log(_partySeq);
    navigate(`/meeting/${_partySeq}`);
  };

  const getListTitle = partyGenre => {
    switch (partyGenre) {
      case "1":
        return `스포츠(${filteredPartyList.length})`;
      case "2":
        return `게임(${filteredPartyList.length})`;
      case "3":
        return `맛집(${filteredPartyList.length})`;
      case "4":
        return `패션(${filteredPartyList.length})`;
      case "5":
        return `자기개발(${filteredPartyList.length})`;
      case "6":
        return `문화•예술(${filteredPartyList.length})`;
      case "7":
        return `bar(${filteredPartyList.length})`;
      case "8":
        return `기타(${filteredPartyList.length})`;
      default:
        return `전체보기(${filteredPartyList.length})`;
    }
  };

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

  return (
    <CateInnerStyle>
      <div className="category-main-title">
        <span style={{ display: "flex", justifyItems: "center" }}>
          <TiHome
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/`);
            }}
          />
          <IoIosArrowForward />
          <span>카테고리</span>
        </span>
        <h1>나만의 모임 찾기</h1>
      </div>
      <div className="category-category">
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
      <CateGoryListStyle>
        <div className="category-main-div">
          <h3 className="mm-meeting-dl-name">{getListTitle(partyGenre)}</h3>
          <div className="category-search-div">
            <div className="category-search">
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                className="category-search-input"
              ></input>
              <CiSearch />
            </div>
          </div>
        </div>
        <div className="mm-meeting-cate">
          {filteredPartyList.map((item, index) => (
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
                      backgroundImage: `url(/pic/user/${item.userSeq}/${item.userPic})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <span style={{ fontWeight: "bold" }}>{item.userName}</span>
                  <span style={{ color: "#999" }}> 님의 모임</span>
                </div>
                <h3 className="list-box-text" style={{ fontWeight: "bold" }}>
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
          {/* {filteredPartyList.map((item, index) => (
          <div
            key={index}
            className="cate-box"
            onClick={() => {
              handleClickDetail(item.partySeq);
            }}
          >
            <div
              className="cate-box-img"
              style={{
                backgroundImage: `url(/pic/party/${item.partySeq}/${item.partyPic})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="cate-box-content">
              <div className="cate-box-title">
                <div className="cate-box-profileimg" style={{}}></div>
                <span style={{ fontWeight: "bold" }}>{item.userName}</span>
                <span style={{ color: "#999" }}> 님의 모임</span>
              </div>
              <h3 className="cate-box-text" style={{ fontWeight: "bold" }}>
                {item.partyName}
              </h3>
              <p className="cate-box-local" style={{ fontSize: "13px" }}>
                {item.partyLocation1} {item.partyLocation2}
              </p>
              <span className="cate-box-gender">
                {getGenderText(item.partyGender)}
              </span>
              <span className="cate-box-age">
                {getYearLastTwoDigits(item.partyMinAge) === "1940"
                  ? "연령무관"
                  : `${getYearLastTwoDigits(item.partyMinAge)} ~`}
                {getYearLastTwoDigits(item.partyMaxAge) === "2024"
                  ? ""
                  : `${getYearLastTwoDigits(item.partyMaxAge)}년생`}
              </span>
            </div>
          </div>
        ))} */}
        </div>
      </CateGoryListStyle>
    </CateInnerStyle>
  );
};

export default CategoryOthers;
