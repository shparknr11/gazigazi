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
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
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
    width: 200%;
    box-sizing: border-box;
    margin-top: -300px;
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
          console.log(response.data);
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
              interestItems.map((item, index) => (
                <div className="interest-item" key={index}>
                  <img
                    src={cate}
                    alt="내가 찜한 모임의 썸네일"
                    className="cate"
                  />
                  <div>
                    <div className="interest-item-title">{item.partyName}</div>
                    <div className="interest-item-date">
                      날짜: {item.partyLocation}
                    </div>
                    <div className="interest-item-location">
                      장소: {item.partyLocation}
                    </div>
                    <div className="interest-item-description">
                      {item.partyPresident}
                    </div>
                  </div>
                  <button className="interest-item-delete">삭제</button>
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
