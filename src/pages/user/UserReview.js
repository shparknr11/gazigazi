import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import jwtAxios from "../../apis/jwtAxios";
import axios from "axios";

// 스타일 컴포넌트 정의
const UserReviewStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  margin: 0;
  font-family: Arial, sans-serif;
`;

const UserReviewWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

const UserReviewInnerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  button {
    width: 10%;
    padding: 5px;
    background-color: #d3cdb5;
    border: none;
    border-radius: 2px;
    color: white;
    font-size: 12px;
    cursor: pointer;
    margin-top: 10px;
    margin: 10px 20px;
    margin-left: 0px;

    &:hover {
      background-color: #dcd8c5;
    }
  }

  .search-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    gap: 15px;

    select,
    input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    input {
      flex: 1;
    }

    button {
      width: 10%;
      border: none;
      border-radius: 4px;
      background-color: #d3cdb5;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-top: 0px;

      &:hover {
        background-color: #dcd8c5;
      }
    }
  }

  .loading {
    text-align: center;
    font-size: 18px;
    color: #007bff;
  }

  .error {
    text-align: center;
    font-size: 18px;
    color: #ff4d4d;
  }

  .allreview {
    color: #888;
  }

  .review-list {
    list-style: none;

    li {
      padding: 20px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      h3 {
        margin: 0 0 10px 0;
        color: #333;
      }

      p {
        margin: 0 0 10px 0;
        color: #555;
      }

      span {
        display: block;
        font-size: 14px;
        color: #888;
      }

      .edit-form {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        input[type="file"] {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
        }

        button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 4px;
          background-color: #d3cdb5;
          color: white;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 0px;

          &:hover {
            background-color: #dcd8c5;
          }
        }
      }

      .image-preview {
        margin-top: 10px;

        img {
          max-width: 100px;
          border-radius: 8px;
        }
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
      width: auto;
      padding: 10px 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #d3cdb5;
      color: white;
      cursor: pointer;
      font-size: 12px;
      margin: 0 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #dcd8c5;
      }

      &:disabled {
        background-color: #dcd8c5;
        cursor: not-allowed;
      }
    }

    span {
      align-self: center;
      font-size: 16px;
      color: #333;
    }
  }
`;

// 날짜 포맷 함수
const formatDateString = dateString => {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  const formattedDate = `${year}-${month}-${day}T${timePart}`;
  return new Date(formattedDate);
};

function MyPageReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editPics, setEditPics] = useState([]);
  const [previewPics, setPreviewPics] = useState([]);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchType, setSearchType] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    fetchReviews();
  }, [page, size, searchType, searchQuery]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL("/api/review/user", window.location.origin);
      url.searchParams.append("userSeq", 12345); // userSeq를 적절한 값으로 설정
      url.searchParams.append("search", searchType);
      url.searchParams.append("searchData", searchQuery);
      url.searchParams.append("page", page);
      url.searchParams.append("size", size);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "리뷰 데이터를 불러오는 데 실패했습니다.",
        );
      }

      const { resultData } = await response.json();
      console.log("Fetched reviews:", resultData.list);
      setReviews(resultData.list);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchReviews();
  };

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleEditClick = review => {
    console.log("Clicked review:", review);
    setEditingReviewId(review.reviewSeq);
    setEditContent(review.reviewContents);
    setEditRating(review.reviewRating);
    setEditPics([]);
    setPreviewPics(review.pics.map(pic => pic.url) || []);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditContent("");
    setEditRating(5);
    setEditPics([]);
    setPreviewPics([]);
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    setEditPics(files);

    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviewPics(filePreviews);
  };

  const handleEditSubmit = async reviewSeq => {
    if (!reviewSeq) {
      console.error("Review ID is undefined");
      return;
    }

    const formData = new FormData();
    setLoading(true);
    setError(null);

    formData.append(
      "p",
      new Blob(
        [
          JSON.stringify({
            reviewSeq: reviewSeq,
            reviewContents: editContent,
            reviewRating: editRating,
          }),
        ],
        { type: "application/json" },
      ),
    );

    editPics.forEach(item => {
      formData.append("pics", item);
    });

    try {
      const response = await jwtAxios.patch(`/api/review`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Review ID:", reviewSeq);
      console.log(response.data);

      alert("리뷰를 수정하였습니다!");
      setEditingReviewId(null);
      fetchReviews();
    } catch (error) {
      console.error(
        "Error occurred:",
        error.response ? error.response.data : error.message,
      );
      alert("오류가 발생하여 수정에 실패하였습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const DeleteReview = async reviewSeq => {
    setLoading(true);
    setError(null);

    try {
      const response = await jwtAxios.delete(`/api/review`, {
        params: { reviewSeq: reviewSeq }, // params 객체로 쿼리 파라미터 전달
      });

      if (response.data.code === 1) {
        console.log(response.data);
        alert(response.data.message || "리뷰 삭제에 성공하셨습니다!");
        setEditingReviewId(null);
      } else {
        alert(
          response.data.message ||
            "리뷰 삭제에 실패하셨습니다. 다시 시도해주세요.",
        );
      }
    } catch (error) {
      console.error(
        "Error deleting review:",
        error.response ? error.response.data : error.message,
      );
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserReviewStyle>
      <UserReviewWrapStyle>
        <UserReviewInnerStyle>
          <h1>내가 작성한 리뷰</h1>

          <div className="search-wrapper">
            <select
              value={searchType}
              onChange={e => setSearchType(Number(e.target.value))}
            >
              <option value={1}>전체</option>
              <option value={2}>모임명</option>
              <option value={3}>모임장명</option>
              <option value={4}>작성자명</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="검색어 입력"
            />
            <button onClick={handleSearch}>검색</button>
          </div>

          {loading && <div className="loading">로딩 중...</div>}
          {error && <div className="error">에러 발생: {error}</div>}

          {!loading && !error && (
            <ul className="review-list">
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <li key={review.reviewSeq}>
                    <h3>{review.partyName}</h3>
                    {editingReviewId === review.reviewSeq ? (
                      <div className="edit-form">
                        <textarea
                          value={editContent}
                          onChange={e => setEditContent(e.target.value)}
                        />
                        <select
                          value={editRating}
                          onChange={e => setEditRating(Number(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>
                              {rating}점
                            </option>
                          ))}
                        </select>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <div className="image-preview">
                          {previewPics.map((pic, index) => (
                            <img
                              key={index}
                              src={pic}
                              alt={`preview ${index}`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => handleEditSubmit(review.reviewSeq)}
                        >
                          저장
                        </button>
                        <button
                          onClick={() => {
                            handleCancelEdit();
                          }}
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <>
                        <p>{review.reviewContents}</p>
                        <span>평점: {review.reviewRating}점</span>
                        <span>
                          작성일:{" "}
                          {formatDateString(
                            review.inputDt,
                          ).toLocaleDateString()}
                        </span>
                        <span>
                          <Link to={`/review`} className="allreview">
                            모든 후기
                          </Link>
                        </span>
                        <button onClick={() => handleEditClick(review)}>
                          수정
                        </button>
                        <button onClick={() => DeleteReview(review)}>
                          삭제
                        </button>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <p>작성된 리뷰가 없습니다.</p>
              )}
            </ul>
          )}

          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              이전
            </button>
            <span>페이지 {page}</span>
            <button onClick={() => handlePageChange(page + 1)}>다음</button>
          </div>
        </UserReviewInnerStyle>
      </UserReviewWrapStyle>
    </UserReviewStyle>
  );
}

export default MyPageReviews;
