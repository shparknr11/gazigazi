import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getPartyAll } from "../../apis/meeting/meetingapi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { prColor } from "../../css/color";
const CateInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1300px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
  .category-category {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    .category-item {
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px;
      border-radius: 25px;
      box-shadow: 1px 3px 2px 0px rgba(0, 0, 0, 0.1);
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      &.active {
        background-color: ${prColor.pr02};
      }
    }
  }
  .category-search-div {
    display: flex;
    justify-content: end;
    margin-bottom: 40px;
  }
  .category-search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 25px;
    border: 1px solid #000;
    border-radius: 15px;
  }
  .category-search-input {
    border: none;
  }
  .mm-meeting-cate {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    width: 100%;
    height: auto;
  }
  .cate-box {
    display: block;
    width: 100%;
    max-width: 220px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 10px 0px;
    border-radius: 10px;
    margin-bottom: 50px;
  }
  .cate-box-img {
    display: block;
    height: 150px;
    /* background: url("../images/meetinga.png") no-repeat center;
  background-size: cover; */
    margin-bottom: 5px;
  }
  .cate-box-img img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0px 0px;
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
const CategoryOthers = () => {
  const [partyAllList, setPartyAllList] = useState([]);
  const [filteredPartyList, setFilteredPartyList] = useState([]);
  const navigate = useNavigate();
  //   const { partyGenre } = useParams();
  const [searchParams] = useSearchParams();
  const partyGenre = searchParams.get("partyGenre");
  const searchKeyword = searchParams.get("search");

  useEffect(() => {
    // api함수
    const getData = async () => {
      try {
        const result = await getPartyAll();
        if (result.code !== 1) {
          alert(result.resultMsg);
          return;
        }
        setPartyAllList(result.resultData);
        // console.log(result.resultData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // partyAuthGb 0:미확인 1:승인 2: 삭제
  useEffect(() => {
    const updateList = partyAllList.filter(
      item =>
        // 여기수정******************************************************
        item.partyAuthGb === "1" &&
        (partyGenre === "0" || item.partyGenre === partyGenre) &&
        (!searchKeyword || item.partyName.includes(searchKeyword)),
    );
    console.log("uadateList", updateList);
    setFilteredPartyList(updateList);
  }, [partyAllList, partyGenre, searchKeyword]);

  const handleClickDetail = _partySeq => {
    console.log(_partySeq);
    navigate(`/meeting/${_partySeq}`);
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
    return `${year.toString().slice(-2)}년생`;
  };
  return (
    <CateInnerStyle>
      <div>
        <div className="category-category">
          <Link to="/category?partyGenre=0">
            <div
              className={`category-item ${partyGenre === "0" ? "active" : ""}`}
            >
              전체보기
            </div>
          </Link>
          <Link to="/category?partyGenre=1">
            <div
              className={`category-item ${partyGenre === "1" ? "active" : ""}`}
            >
              스포츠
            </div>
          </Link>
          <Link to="/category?partyGenre=2">
            <div
              className={`category-item ${partyGenre === "2" ? "active" : ""}`}
            >
              게임
            </div>
          </Link>
          <Link to="/category?partyGenre=3">
            <div
              className={`category-item ${partyGenre === "3" ? "active" : ""}`}
            >
              맛집
            </div>
          </Link>
          <Link to="/category?partyGenre=4">
            <div
              className={`category-item ${partyGenre === "4" ? "active" : ""}`}
            >
              패션
            </div>
          </Link>
          <Link to="/category?partyGenre=5">
            <div
              className={`category-item ${partyGenre === "5" ? "active" : ""}`}
            >
              자기개발
            </div>
          </Link>
          <Link to="/category?partyGenre=6">
            <div
              className={`category-item ${partyGenre === "6" ? "active" : ""}`}
            >
              문화•예술
            </div>
          </Link>
          <Link to="/category?partyGenre=7">
            <div
              className={`category-item ${partyGenre === "7" ? "active" : ""}`}
            >
              Bar
            </div>
          </Link>
          <Link to="/category?partyGenre=8">
            <div
              className={`category-item ${partyGenre === "8" ? "active" : ""}`}
            >
              기타
            </div>
          </Link>
        </div>
        <div className="category-search-div">
          {/* <div className="category-search">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="category-search-input"
            ></input>
          </div> */}
        </div>
      </div>
      <div className="mm-meeting-cate">
        {filteredPartyList.map((item, index) => (
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
                // 임시
                backgroundImage: `url(/pic/party/${item.partySeq}/${item.partyPic})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="cate-box-content">
              <div className="cate-box-title">
                <img alt="프로필" />
                <span>OOO 님의 모임</span>
              </div>
              <h3 className="cate-box-text">{item.partyName}</h3>
              <p className="cate-box-local">{item.partyLocation}</p>
              <span className="cate-box-gender">
                {getGenderText(item.partyGender)}
              </span>
              <span className="cate-box-age">
                {getYearLastTwoDigits(item.partyMinAge)}~
                {getYearLastTwoDigits(item.partyMaxAge)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CateInnerStyle>
  );
};

export default CategoryOthers;
