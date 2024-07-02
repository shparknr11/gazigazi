import { TfiArrowCircleRight } from "react-icons/tfi";
import { FaSearch } from "react-icons/fa";
import styled from "@emotion/styled";

const CartegoryWrapStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin-bottom: 120px;
  padding: 0 160px;
  gap: 40px;
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
        <div className="mt-banner-div">
          <span>집에만 있는 당신,</span>
          <p>취미를 고르고 일상을 찾으세요</p>
        </div>
        <div className="mt-searchbox-div">
          <div className="mt-searchbox">
            <input type="text"></input>
            <div className="mt-searchicon">
              <FaSearch />
            </div>
          </div>
        </div>
        <CartegoryWrapStyle>
          {/* json or api 연동 예정 */}
          <div className="mt-category-div">
            <div className="mt-category-img"></div>
            <div className="mt-category-text">스포츠</div>
          </div>
          <div className="mt-category-div">
            <div className="mt-category-imgone"></div>
            <div className="mt-category-text">게임</div>
          </div>
          <div className="mt-category-div">
            <div className="mt-category-imgtwo"></div>
            <div className="mt-category-text">맛집</div>
          </div>
          <div className="mt-category-div">
            <div className="mt-category-imgthree"></div>
            <div className="mt-category-text">스터디</div>
          </div>
          <div className="mt-category-div">
            <div className="mt-category-imgfour"></div>
            <div className="mt-category-text">패션</div>
          </div>
          <div className="mt-category-div">
            <div className="mt-category-imgfive"></div>
            <div className="mt-category-text">Bar</div>
          </div>
        </CartegoryWrapStyle>
      </div>
      <div className="main-mid">
        <div className="mm-meeting-picks">
          <div className="mm-meeting-title">
            <h1>신규, 추천 모임🔔</h1>
            <div>더보기</div>
          </div>
          {/* meeting-list api 연동 */}
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
        </div>
        <div className="mm-meeting-around">
          <div className="mm-meeting-title">
            <h1>내 주변에 있는 모임🟢🟠🔴</h1>
            <div>더보기</div>
          </div>
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
        </div>

        <div className="mm-meeting-deadline">
          <div className="mm-meeting-title">
            <h1>곧 마감되는 모임🕛</h1>
            <div>더보기</div>
          </div>
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
          {/* <div className="more-bt-icon">
            <TfiArrowCircleRight />
          </div> */}
        </div>
      </div>
      <div className="main-bottom">
        <div className="mb-event-div">
          <h1>후기</h1>
          <div className="mb-event-list"></div>
        </div>
        <div className="mb-rank-div">
          <h1>모임랭킹</h1>

          <div className="mb-rank-list"></div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default Home;
