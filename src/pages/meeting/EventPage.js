import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
const EventPage = () => {
  const [partyAllList, setPartyAllList] = useState([]);
  const [filteredPartyList, setFilteredPartyList] = useState([]);
  const navigate = useNavigate();
  const { eventId } = useParams();

  const handleClickDetail = _partySeq => {
    console.log(_partySeq);
    navigate(`/meeting/${_partySeq}?mu=1`);
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
      <div>
        <div className="category-category">
          <Link to="/event/1">
            <div className={`category-item ${eventId === "1" ? "active" : ""}`}>
              🔔
            </div>
          </Link>
          <Link to="/event/2">
            <div className={`category-item ${eventId === "2" ? "active" : ""}`}>
              🟢🟠🔴
            </div>
          </Link>
          <Link to="/event/3">
            <div className={`category-item ${eventId === "3" ? "active" : ""}`}>
              🕛
            </div>
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
      <div className="mm-meeting-list">
        {/* {randomNewParties.map((item, index) => (
          <div
            key={index}
            className="list-box"
            onClick={() => {
              handleClickDetail(item.partySeq);
            }}
          >
            <div className="list-box-img">
              <img
                src={`/pic/party/${item.partySeq}/${item.partyPic}`}
                alt="모임이미지"
              />
            </div>
            <div className="list-box-content">
              <div className="list-box-title">
                <div className="list-box-profileimg">
                  <img
                    src={`/pic/user/${item.userSeq}/${item.userPic}`}
                    alt="프로필이미지"
                  />
                </div>
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
                {getYearLastTwoDigits(item.partyMinAge) === "1901"
                  ? "연령무관"
                  : `${getYearLastTwoDigits(item.partyMinAge)} ~`}
                {getYearLastTwoDigits(item.partyMaxAge) === "2155"
                  ? ""
                  : `${getYearLastTwoDigits(item.partyMaxAge)}년생`}
              </span>
            </div>
          </div>
        ))} */}
      </div>
    </CateInnerStyle>
  );
};

export default EventPage;
