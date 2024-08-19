import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  delReview,
  getRecommend,
  getReviewList,
} from "../../apis/reviewapi/reviewapi";
import { CiSearch, CiTrash } from "react-icons/ci";
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
  min-width: 1280px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
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

export const ReviewItemStyle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  .review-comment {
    position: relative;
    padding: 20px 5px;

    .review-hover-del-bt {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      border: 1px solid #999;
      border-radius: 15px;
      padding: 5px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      opacity: 0;
      transition: opacity 0.2s ease;
      background-color: ${prColor.g200};
      color: #999;
      & svg {
        color: #999;
        width: 33px;
        height: 33px;
      }
    }
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
  .review-comment:hover {
    background-color: ${prColor.p100};
  }
  .review-comment:hover .review-hover-del-bt {
    opacity: 1;
    background-color: ${prColor.g200};
  }
  .review-hover-del-bt:hover {
    cursor: pointer;
    color: #000;
    border: 1px solid #000;
  }
  .review-hover-del-bt:hover svg {
    color: #000;
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
    /* cursor: pointer; */
    border-radius: 7px;
    /* &:hover {
      background-color: ${prColor.p200};
      border: 1px solid ${prColor.p200};
    } */
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

const AdminReview = () => {
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
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // 다음 페이지로 가기
  const handleClickNext = () => {
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

  // 모임명 클릭 시 상세페이지로 이동
  const handleClickDetailPage = _partySeq => {
    navigate(`/meeting/${_partySeq}?mu=1`);
  };

  // 리뷰 삭제하기
  const handleDeleteReview = async _reviewSeq => {
    const isConfirmed = confirm("해당 후기를 삭제하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    try {
      const result = await delReview(_reviewSeq);
      if (result.code != 1) {
        alert(result.resultMsg);
        return;
      }
      getReviewData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReviewInnerStyle>
      {reviewList.length ? (
        reviewList.map((item, index) => (
          <ReviewItemStyle key={index}>
            <div className="review-comment">
              <div
                className="review-hover-del-bt"
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteReview(item.reviewSeq);
                }}
              >
                <CiTrash /> 삭제하기
              </div>
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
                  <div className="rb-button">도움이 됐어요</div>
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

export default AdminReview;
