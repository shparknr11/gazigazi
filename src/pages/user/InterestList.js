import styled from "@emotion/styled";
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
  justify-content: center;
  align-items: center;
  padding: 20px;

  .interest-list {
    font-size: 24pt;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .interest-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 160%;
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
  return (
    <InterestListStyle>
      <InterestWrapStyle>
        <InterestInnerStyle>
          <div className="wrap">
            <main className="main">
              <div className="main-inner">
                <div className="interest-list">찜 목록</div>
                <div className="interest-container">
                  <div className="interest-item">
                    <img
                      src={cate}
                      alt="내가 찜한 모임의 썸네일"
                      className="cate"
                    />
                    <div className="interest-item-title">모임 제목 1</div>
                    <div className="interest-item-date">날짜: 2023-08-15</div>
                    <div className="interest-item-location">
                      장소: 서울특별시 강남구
                    </div>
                    <div className="interest-item-description">
                      이곳에 모임 설명이 들어갑니다. (임시)
                    </div>

                    <button className="interest-item-delete">삭제</button>
                  </div>
                  <div className="interest-item">
                    <img
                      src={cate}
                      alt="내가 찜한 모임의 썸네일"
                      className="cate"
                    />
                    <div className="interest-item-title">모임 제목 2</div>
                    <div className="interest-item-date">날짜: 2023-09-10</div>
                    <div className="interest-item-location">
                      장소: 부산광역시 해운대구
                    </div>
                    <div className="interest-item-description">
                      이곳에 모임 설명이 들어갑니다. (임시)
                    </div>
                    <button className="interest-item-delete">삭제</button>
                  </div>
                  <div className="interest-item">
                    <img
                      src={cate}
                      alt="내가 찜한 모임의 썸네일"
                      className="cate"
                    />
                    <div className="interest-item-title">모임 제목 3</div>
                    <div className="interest-item-date">날짜: 2023-10-05</div>
                    <div className="interest-item-location">
                      장소: 인천광역시 남동구
                    </div>
                    <div className="interest-item-description">
                      이곳에 모임 설명이 들어갑니다. (임시)
                    </div>
                    <button className="interest-item-delete">삭제</button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </InterestInnerStyle>
      </InterestWrapStyle>
    </InterestListStyle>
  );
};

export default InterestList;
