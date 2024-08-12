import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      background-color: #ebddcc;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e0b88a;
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
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
      padding: 10px 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #ebddcc;
      color: #333;
      cursor: pointer;
      font-size: 16px;
      margin: 0 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e0b88a;
      }

      &:disabled {
        background-color: #ebddcc;
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

// 날짜 문자열을 Date 객체로 변환하는 함수
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
    try {
      const url = new URL("/api/review/user", window.location.origin);
      url.searchParams.append("userSeq", 12345);
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
        console.log("리뷰 데이터를 불러오는 데 실패했습니다.", errorData);
        throw new Error("리뷰 데이터를 불러오는 데 실패했습니다.");
      }

      const { resultData } = await response.json();
      setReviews(resultData.list);
    } catch (error) {
      console.log("에러 발생:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1); // 검색 시 페이지를 처음으로 리셋
    fetchReviews();
  };

  const handlePageChange = newPage => {
    setPage(newPage);
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
                reviews.map((review, index) => (
                  <li key={index}>
                    <h3>{review.partyName}</h3>
                    <p>{review.reviewContents}</p>
                    <span>
                      작성일:{" "}
                      {formatDateString(review.inputDt).toLocaleDateString()}
                    </span>
                    <span>
                      <Link to={`/review`} className="allreview">
                        모든 후기
                      </Link>
                    </span>
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
