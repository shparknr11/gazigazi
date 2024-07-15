import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getPartyAll } from "../../apis/meeting/meetingapi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
      border: 1px solid #000;
      padding: 12px;
      border-radius: 25px;
      box-shadow: 1px 3px 2px 0px rgba(0, 0, 0, 0.1);
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      &.active {
        background-color: lightblue;
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
    height: 278px;
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
  const { partyGenre } = useParams();

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
    // console.log(partyAllList);
    const updateList = partyAllList.filter(
      item =>
        item.partyAuthGb === "2" &&
        (partyGenre === "0" || item.partyGenre === partyGenre),
    );
    setFilteredPartyList(updateList);
  }, [partyAllList, partyGenre]);

  const handleClickDetail = _partySeq => {
    console.log(_partySeq);
    navigate(`/meeting/${_partySeq}`);
  };

  useEffect(() => {
    // api함수
    console.log(filteredPartyList);
  }, [filteredPartyList]);

  return (
    <CateInnerStyle>
      <div>
        <div className="category-category">
          <Link to="/category/0">
            <div className="category-item">전체보기</div>
          </Link>
          <Link to="/category/1">
            <div className="category-item">스포츠</div>
          </Link>
          <Link to="/category/2">
            <div className="category-item">게임</div>
          </Link>
          <Link to="/category/3">
            <div className="category-item">맛집</div>
          </Link>
          <Link to="/category/4">
            <div className="category-item">패션</div>
          </Link>
          <Link to="/category/5">
            <div className="category-item">자기개발</div>
          </Link>
          <Link to="/category/6">
            <div className="category-item">문화•예술</div>
          </Link>
          <Link to="/category/7">
            <div className="category-item">Bar</div>
          </Link>
          <Link to="/category/8">
            <div className="category-item">기타</div>
          </Link>
        </div>
        <div className="category-search-div">
          <div className="category-search">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="category-search-input"
            ></input>
          </div>
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
            <div className="cate-box-img">
              <img src={item.partyPic} alt="모임이미지" />
            </div>
            <div className="cate-box-content">
              <div className="cate-box-title">
                <img alt="프로필" />
                <span>OOO 님의 모임</span>
              </div>
              <h3 className="cate-box-text">{item.partyName}</h3>
              <p className="cate-box-local">{item.partyLocation}</p>
              <span className="cate-box-gender">{item.partyGender}</span>
              <span className="cate-box-age">
                {item.partyMinAge}~{item.partyMaxAge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CateInnerStyle>
  );
};

export default CategoryOthers;
