import { TfiArrowCircleRight } from "react-icons/tfi";
import styled from "@emotion/styled";

const CartegoryWrapStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin-bottom: 50px;
  padding: 0 160px;
  gap: 10px;
  svg {
    width: 32px;
    height: 32px;
    /* 색상 변경 예정 */
  }
  p {
    font-size: 12px;
  }
`;

const Home = () => {
  return (
    <>
      <div className="main-top">
        <div className="mt-banner-div"></div>
        <div className="mt-searchbox-div">
          <div className="mt-searchbox"></div>
        </div>
        <CartegoryWrapStyle>
          <div className="mt-category-div">
            <div className="mt-category-img"></div>
            <div className="mt-category-text">스포츠</div>
          </div>
        </CartegoryWrapStyle>
      </div>
      <div className="main-mid">
        <div className="mm-meeting-picks">
          <h1>곧 마감되는 모임🔔</h1>
          <div className="mm-meeting-list">
            <div className="list-box">
              <div className="list-box-img"></div>
              <div className="list-box-title">
                <span>OOO 모임장</span>
              </div>
              <h3 className="list-box-text">
                여전히 일드를 보는 사람들 - 일본문화를 좋아하는 나는 어떤 사람?
                (with 제이팝) 🙌
              </h3>
              <p className="list-box-place">일본 디즈니랜드</p>
              <span className="list-box-day">2024.02.08까지</span>
            </div>
            <div className="list-box"></div>
            <div className="list-box"></div>
            <div className="list-box"></div>
            <div className="list-box"></div>
            <div className="list-box"></div>
          </div>
          <div className="more-bt-icon">
            <TfiArrowCircleRight />
          </div>
        </div>
        <div className="mm-meeting-around">
          <h1>내 주변에 있는 모임🟢🟠🔴</h1>

          <div className="mm-meeting-list">
            <div className="list-box">
              <div className="list-box-img"></div>
              <div className="list-box-title">
                <span>OOO 모임장</span>
              </div>
              <h3 className="list-box-text">
                여전히 일드를 보는 사람들 - 일본문화를 좋아하는 나는 어떤 사람?
                (with 제이팝) 🙌
              </h3>
              <p className="list-box-place">일본 디즈니랜드</p>
              <span className="list-box-day">2024.02.08까지</span>
            </div>
            <div className="list-box"></div>
            <div className="list-box"></div>
            <div className="list-box"></div>
            <div className="list-box"></div>
            <div className="list-box"></div>
          </div>
          <div className="more-bt-icon">
            <TfiArrowCircleRight />
          </div>
        </div>

        <div className="mm-meeting-deadline">
          <h1>곧 마감되는 모임🕛</h1>
          <div className="mm-meeting-list">
            <div className="list-box">
              <div className="list-box-img"></div>
              <div className="list-box-title">
                <span>OOO 모임장</span>
              </div>
              <h3 className="list-box-text">
                여전히 일드를 보는 사람들 - 일본문화를 좋아하는 나는 어떤 사람?
                (with 제이팝) 🙌
              </h3>
              <p className="list-box-place">일본 디즈니랜드</p>
              <span className="list-box-day">24.07.01(월) 마감</span>
            </div>
            <div className="list-box"></div>
            <div className="list-box"></div>
            <div className="list-box"></div>
            <div className="list-box"></div>
            <div className="list-box"></div>
          </div>
          <div className="more-bt-icon">
            <TfiArrowCircleRight />
          </div>
        </div>
      </div>
      <div className="main-bottom">
        <div className="mb-event-div">
          <h1>EVENT</h1>
          <div className="mb-event-list"></div>
        </div>
        <div className="mb-rank-div">
          <h1>Rank</h1>

          <div className="mb-rank-list"></div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default Home;
