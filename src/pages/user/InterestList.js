import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import cate from "../../images/cate2.png";

const InterestListStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InterestWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const InterestInnerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 20px;

  .interest-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
  }
  .interest-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .interest-item:last-child {
    border-bottom: none;
  }
  .interest-item-title {
    font-size: 18pt;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .interest-item-date,
  .interest-item-location,
  .interest-item-description {
    font-size: 12pt;
    color: #fff;
    margin-bottom: 5px;
  }
  .interest-item button {
    align-self: flex-end;
    padding: 10px 20px;
    font-size: 12pt;
    border: none;
    border-radius: 4px;
    background-color: #ebddcc;
    color: white;
    cursor: pointer;
  }
  .interest-item button:hover {
    background-color: #e0b88a;
  }
  .cate {
    width: 80px;
    height: 50px;
  }
`;

const InterestList = () => {
  const [loading, setLoading] = useState(true);
  const [interestItems, setInterestItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterestItem = async () => {
      try {
        const userSeq = sessionStorage.getItem("userSeq");

        if (!userSeq) {
          setError("사용자 Email을 찾을 수 없습니다.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/party/wish/${userSeq}`);
        const { resultData, resultMsg } = response.data;

        if (response.data.code === 1) {
          setInterestItems(resultData);
        } else {
          setError(resultMsg);
        }
      } catch (error) {
        console.error("찜한 목록을 가져오는데 실패했습니다.", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterestItem();
  }, []);

  const handleDelete = async partySeq => {
    const userSeq = sessionStorage.getItem("userSeq");

    if (!userSeq) {
      alert("사용자 정보를 찾을 수 없습니다.");
      return;
    }

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const url = `/api/party/wish?wishUserSeq=${userSeq}&wishPartySeq=${partySeq}`;
        console.log("요청 URL:", url);

        const response = await axios.get(url);

        if (response.data.code === 1) {
          console.log(response.data);
          if (response.data.resultData === 0) {
            setInterestItems(prevItems =>
              prevItems.filter(item => item.partySeq !== partySeq),
            );
            alert("찜하기를 취소하였습니다.");
          } else {
            alert("삭제 실패: 문제가 발생했습니다. 다시 시도해주세요.");
          }
        } else {
          console.error("삭제 실패:", response.data.resultMsg);
          alert(
            `삭제 실패: ${response.data.resultMsg || "문제가 발생했습니다. 다시 시도해주세요."}`,
          );
        }
      } catch (error) {
        console.error("모임 삭제 실패:", error);
        alert(
          "삭제에 실패했습니다. 네트워크 문제나 서버 오류일 수 있습니다. 다시 시도해주세요.",
        );
      }
    }
  };

  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  return (
    <InterestListStyle>
      <InterestWrapStyle>
        <InterestInnerStyle>
          <div className="interest-container">
            {interestItems.length === 0 ? (
              <p>죄송합니다. 찜한 모임이 없습니다.</p>
            ) : (
              interestItems.map(item => (
                <div className="interest-item" key={item.partySeq}>
                  {" "}
                  {/* partySeq를 사용 */}
                  <img
                    src={cate}
                    alt="내가 찜한 모임의 썸네일"
                    className="cate"
                  />
                  <div>
                    <div className="interest-item-title">{item.partyName}</div>
                    <div className="interest-item-date">
                      날짜: {item.partyDate}
                    </div>
                    <div className="interest-item-location">
                      장소: {item.partyLocation}
                    </div>
                    <div className="interest-item-description">
                      {item.partyPresident}
                    </div>
                  </div>
                  <button
                    className="interest-item-delete"
                    onClick={() => handleDelete(item.partySeq)} // partySeq 사용
                  >
                    삭제
                  </button>
                </div>
              ))
            )}
          </div>
        </InterestInnerStyle>
      </InterestWrapStyle>
    </InterestListStyle>
  );
};

export default InterestList;
