import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getPartyAll } from "../../apis/meeting/meetingapi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import GuideTitle from "../../components/common/GuideTitle";

const CateInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1280px;
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

  .mm-meeting-cate {
    display: flex;
    flex-wrap: wrap;
    gap: 33px;
    width: 100%;
    height: auto;
    min-height: 300px;
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
const CartegoryWrapStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1062px;
  margin: 0 auto;
  gap: 40px;
  margin-bottom: 120px;
  /* .categoryslide {
    display: flex;
    width: 100%;
    max-width: 1062px;
    margin: 0 auto;
  }
  .swiper-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    gap: 40px;
    margin-bottom: 120px;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px !important;
  } */
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
  @media all and (max-width: 1072px) {
    .categoryslide {
      width: 100%;
      max-width: 100%;
    }
    .swiper-wrapper {
    }
  }
`;
const CateGoryListStyle = styled.div`
  width: 100%;
  max-width: 1062px;
  margin: 0 auto;
  .category-main-div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .mm-meeting-dl-name {
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
    & svg {
      cursor: pointer;
    }
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
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  //   const { partyGenre } = useParams();
  const [searchParams] = useSearchParams();
  const partyGenre = searchParams.get("partyGenre");
  const searchKeyword = searchParams.get("search");
  const location = useLocation();
  console.log(location);

  const filterCategory = _resultData => {
    const updateList = _resultData.filter(
      item =>
        // 여기수정******************************************************
        item.partyAuthGb === "2" &&
        (partyGenre === "0" || item.partyGenre === partyGenre) &&
        (!searchKeyword || item.partyName.includes(searchKeyword)),
    );
    // console.log("uadateList", updateList);
    setFilteredPartyList(updateList);
  };

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

  useEffect(() => {
    // api함수
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    getData();
  }, [partyGenre, searchText, searchKeyword]);

  const handleClickDetail = _partySeq => {
    // console.log(_partySeq);
    navigate(`/meeting/${_partySeq}?mu=1`);
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

  const handleClickSearch = () => {
    if (searchText) {
      navigate(`/category?partyGenre=0&search=${searchText}`);
      setSearchText("");
    } else {
      alert("검색어를 입력해 주세요.");
    }
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleClickSearch();
    }
  };
  return (
    <CateInnerStyle>
      <GuideTitle guideTitle="카테고리" title="나의 모임 찾기" />

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
                value={searchText}
                onKeyDown={e => {
                  handleKeyDown(e);
                }}
                onChange={e => setSearchText(e.target.value)}
              ></input>
              <CiSearch
                onClick={() => {
                  handleClickSearch();
                }}
              />
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
              <div className="list-box-img">
                <img src={`/pic/party/${item.partySeq}/${item.partyPic}`} />
              </div>
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
                  {getYearLastTwoDigits(item.partyMinAge) === "1901" &&
                  getYearLastTwoDigits(item.partyMaxAge) === "2155"
                    ? "연령무관"
                    : `${getYearLastTwoDigits(item.partyMinAge)} ~ ${getYearLastTwoDigits(item.partyMaxAge)}년생`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CateGoryListStyle>
    </CateInnerStyle>
  );
};

export default CategoryOthers;
