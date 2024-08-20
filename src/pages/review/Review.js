import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getRecommend, getReviewList } from "../../apis/reviewapi/reviewapi";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import GuideTitle from "../../components/common/GuideTitle";
import { useNavigate } from "react-router-dom";
import { prColor } from "../../css/color";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// react quill
import DOMPurify from "dompurify";
const ReviewInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1280px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
  margin-bottom: 90px;

  .review-search-div {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 10px;
  }
  .review-selectbox {
    margin-right: 3px;
    padding: 3px;
    background-color: ${prColor.g100};
    border: 1px solid ${prColor.g200};
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
export const ReviewItemStyle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  .review-comment {
    padding: 20px 0px;
    .review-top {
      display: flex;
      align-items: center;
      justify-content: end;
      width: 100%;
      height: auto;
      margin-bottom: 15px;
      .rt-profile {
        display: flex;
        width: 100%;
        font-weight: bold;
      }
      img {
        display: block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      span {
        display: flex;
        align-items: center;
        margin-left: 5px;
        font-size: 16px;
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
    /* width: 100%; */
    /* max-width: 700px; */
    width: auto;
    .review-mid-text {
      margin-bottom: 10px;
    }
  }
  /* .review-img {
  }
  .review-img-pic {
    display: block;
    width: 100%;
    max-width: 450px;
    height: 73.33vw;
    max-height: 330px;

    margin-bottom: 10px;
  } */
  .review-img {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 10px;
    /* min-height: 210px; */
    margin: 10px 0px;
    margin-right: 4px;
  }
  .review-img-pic {
    /* Firefox 스크롤바 스타일 */
    scrollbar-width: thin; /* 스크롤바 두께 */
    scrollbar-color: ${prColor.p300}; /* 스크롤바 색상 */
  }

  /* 웹킷 기반 브라우저에서 스크롤바 스타일 */
  .review-img::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 6px;
  }

  .review-img::-webkit-scrollbar-track {
    background: ${prColor.p100}; /* 스크롤바 트랙 색상 */
    border-radius: 8px;
  }

  .review-img::-webkit-scrollbar-thumb {
    background: ${prColor.p300};
    border-radius: 6px;
  }

  .review-img-pic img {
    height: 210px;
    min-height: 210px;
    border-radius: 8px;
    border: 2px solid ${prColor.p200};
    transition: border 0.5s ease;
    cursor: pointer;
    &:hover {
      border: 2px solid ${prColor.p500};
    }
  }
  /* .review-bottom-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  } */
  .review-partyname {
    display: flex;
    h3 {
      margin-right: 5px;
    }
    .review-partyname-click {
      /* border-bottom: 1px solid transparent; */
    }
    .review-partyname-click:hover {
      /* border-bottom: 1px solid; */
      text-decoration: underline;
    }
  }
  .review-bottom {
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
  .rb-button {
    padding: 5px 10px;
    background-color: ${prColor.p100};
    border: 1px solid ${prColor.p100};
    cursor: pointer;
    border-radius: 7px;
    &:hover {
      background-color: ${prColor.p200};
      border: 1px solid ${prColor.p200};
    }
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
export const NoReviewStyle = styled.div`
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
  const [searchCondition, setSearchCondition] = useState(1);

  const navigate = useNavigate();

  // const userSeq = sessionStorage.getItem("userSeq");
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;
  // **Pagination** 을 위한 코드처리
  // 총 목록수는 state에 저장되어 있음. (todos배열.length)
  // 한 페이지당 보여줄 목록 최대 개수
  // api함수
  const getReviewData = async () => {
    try {
      const result = await getReviewList(
        searchCondition,
        reviewSearchText,
        currentPage,
      );
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
    toast.success("리뷰목록이 조회되었습니다.");
    window.scroll({
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
      <div key={index} className="review-img-pic">
        <img
          onClick={() => {
            window.open(
              `http://112.222.157.156:5122/pic/review/${_reviewSeq}/${item}`,
              `gazi_img`,
              `width=430,hight=500`,
            );
          }}
          src={`/pic/review/${_reviewSeq}/${item}`}
        />
      </div>
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

  const handleClickDetailPage = _partySeq => {
    navigate(`/meeting/${_partySeq}?mu=1`);
  };

  const handleClickRecommend = async _reviewSeq => {
    if (!userSeq) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    try {
      const result = await getRecommend(userSeq, _reviewSeq);
      if (result.code != 1) {
        alert(result.resultMsg);
        return;
      }
      await getReviewData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSearchCondition = e => {
    const condition = parseInt(e.target.value);
    setSearchCondition(condition);
  };
  return (
    <ReviewInnerStyle>
      <ReviewTitleStyle>
        <GuideTitle guideTitle="커뮤니티 후기" title="📝맴버들의 모임 후기" />
        <div>
          <p>가까운 지역 가까운 지인을 만난 맴버들이 남긴 후기들</p>
          <div className="review-search-div">
            <select
              className="review-selectbox"
              onChange={e => {
                handleChangeSearchCondition(e);
              }}
            >
              <option value="1">전체</option>
              <option value="2">모임명 </option>
              <option value="3">모임장</option>
              <option value="4">작성자</option>
            </select>
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
                <div className="review-mid-text">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.reviewContents),
                    }}
                  />
                </div>
              </div>
              {item.pics && item.pics[0] && (
                <div className="review-img">
                  {makeReviewPic(item.reviewSeq, item.pics)}
                </div>
              )}

              <div className="review-bottom">
                <div>
                  <div className="review-partyname">
                    <span
                      className="review-partyname-click"
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => {
                        handleClickDetailPage(item.partySeq);
                      }}
                    >
                      {item.partyName} - {item.president}
                    </span>
                  </div>
                  <span style={{ fontSize: "12px" }}>
                    {item.inputDt.substr(0, 10)}
                  </span>
                </div>
                <div>
                  추천 {item.favCnt}
                  <div
                    className="rb-button"
                    onClick={() => {
                      handleClickRecommend(item.reviewSeq);
                    }}
                  >
                    도움이 됐어요
                  </div>
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
      </ReviewPaginationStyle>
    </ReviewInnerStyle>
  );
};

export default Review;
