import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getReviewList } from "../../apis/reviewapi/reviewapi";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import GuideTitle from "../../components/common/GuideTitle";
const ReviewInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1280px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
  margin-bottom: 10px;

  .review-search-div {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 10px;
  }
  .review-search {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #999;
    border-radius: 15px;
    padding: 5px 0px;
    width: 244px;
  }
  .review-search-input {
    border: none;
  }
`;
const ReviewTitleStyle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
  }
`;
const ReviewItemStyle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  .review-comment {
    padding: 20px 0px;
    .review-top {
      display: flex;
      align-items: center;
      justify-content: end;
      width: 100%;
      height: auto;
      margin-bottom: 10px;
      .rt-profile {
        display: flex;
        width: 100%;
      }
      img {
        display: block;
        width: 30px;
        height: 30px;
      }
      span {
        display: flex;
        align-items: center;
        margin-left: 5px;
      }
    }
    * {
      font-size: 14px;
      line-height: 1.5;
    }
  }
  .rm-star {
    color: orange;
    display: flex;
    align-items: center;
  }
  .review-mid {
    width: 100%;
    max-width: 700px;
  }
  .review-img {
  }
  .review-bottom-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .review-bottom {
    display: flex;
  }
  .rb-button {
    border: 0.5px solid #000;
    cursor: pointer;
    border-radius: 7px;
  }
`;

const ReviewPaginationStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 60px;
  .prev-button,
  .next-button {
    display: flex;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  .review-page-div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 10px;
    .review-page {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      font-size: 18px;
      width: 18px;
      height: 18px;
      border-radius: 60%;
      &:hover {
        background-color: #999;
      }
    }
  }
`;
const NoReviewStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
`;

const Review = () => {
  const [reviewList, setReviewList] = useState([]);
  const [reviewSearchText, setRevieSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // **Pagination** 을 위한 코드처리
  // 총 목록수는 state에 저장되어 있음. (todos배열.length)
  // 한 페이지당 보여줄 목록 최대 개수
  // api함수
  const getReviewData = async () => {
    try {
      const result = await getReviewList(reviewSearchText, currentPage);
      if (result.code != 1) {
        alert(result.resultMsg);
        return;
      }
      setTotalPage(result.resultData.totalPages);
      setReviewList(result.resultData.list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviewData();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [currentPage]);

  // 이전 페이지로 가기
  const handleClickPrev = () => {
    setRevieSearchText("");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // 다음 페이지로 가기
  const handleClickNext = () => {
    setRevieSearchText("");
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 리뷰 사진
  const makeReviewPic = (_reviewSeq, _pics) => {
    return _pics.map((item, index) => (
      <img
        src={`/pic/review/${_reviewSeq}/${item}`}
        key={index}
        style={{ width: 80 }}
      />
    ));
  };

  // 평점에 따른 별점 생성 함수
  const makeStars = rating => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} color={i < rating ? "orange" : "#ccc"} />);
    }
    return stars;
  };

  const handleChangeSearchText = e => {
    setRevieSearchText(e.target.value);
  };

  const handleReviewSearchClick = () => {
    getReviewData();
    setCurrentPage(1);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleReviewSearchClick();
    }
  };

  return (
    <ReviewInnerStyle>
      <ReviewTitleStyle>
        <GuideTitle guideTitle="커뮤니티 후기" title="📝맴버들의 모임 후기" />
        <div>
          <p>가까운 지역 가까운 지인을 만난 맴버들이 남긴 후기들</p>
          <div className="review-search-div">
            <div className="review-search">
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                className="review-search-input"
                value={reviewSearchText}
                onKeyDown={e => {
                  handleKeyDown(e);
                }}
                onChange={e => {
                  handleChangeSearchText(e);
                }}
              ></input>
              <CiSearch
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleReviewSearchClick();
                }}
              />
            </div>
          </div>
        </div>
      </ReviewTitleStyle>
      {reviewList.length ? (
        reviewList.map((item, index) => (
          <ReviewItemStyle key={index}>
            <div className="review-comment">
              <div className="review-top">
                <div className="rt-profile">
                  <img
                    src={`/pic/user/${item.userSeq}/${item.userPic}`}
                    alt="프로필"
                  />
                  <span>{item.userName}</span>
                </div>
                <div className="rm-star">
                  {makeStars(item.reviewRating)}
                  {item.reviewRating}
                </div>
              </div>

              <div className="review-mid">
                <div className="rb-text">
                  <p>{item.reviewContents}</p>
                </div>
              </div>
              {item.pics && item.pics[0] && (
                <div className="review-img">
                  {makeReviewPic(item.reviewSeq, item.pics)}
                </div>
              )}
              <div className="review-bottom-div">
                <div className="review-bottom">
                  <h3>모임명 :</h3>
                  <span>{item.partyName}</span>
                </div>
                <div>
                  <span>{item.inputDt.substr(0, 10)}</span>
                </div>
              </div>
            </div>
          </ReviewItemStyle>
        ))
      ) : (
        <NoReviewStyle>작성된 후기가 없습니다.</NoReviewStyle>
      )}
      <ReviewPaginationStyle>
        <div
          className="prev-button"
          disabled={currentPage === 1}
          onClick={() => {
            handleClickPrev();
          }}
        >
          <IoIosArrowBack />
        </div>
        <div className="review-page-div">
          {currentPage} / {totalPage}
        </div>
        <div
          className="next-button"
          disabled={currentPage === totalPage}
          onClick={() => {
            handleClickNext();
          }}
        >
          <IoIosArrowForward />
        </div>
        <div></div>
      </ReviewPaginationStyle>
    </ReviewInnerStyle>
  );
};

export default Review;
