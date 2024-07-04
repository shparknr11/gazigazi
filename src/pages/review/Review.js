import styled from "@emotion/styled";

const ReviewInnerStyle = styled.div`
  width: calc(100% - 720px);
  max-width: 1200px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
`;
const ReviewTitleStyle = styled.div`
  border-bottom: 1px solid #000;
  margin-bottom: 20px;
  p {
    margin-bottom: 20px;
  }
`;
const ReviewItemStyle = styled.div`
  border-bottom: 1px solid #000;
  .review-comment {
    margin: 20px 0px;
    .review-top {
      width: 100%;
      height: 30px;
      background-color: aliceblue;
      .rt-profile {
        width: 30px;
        height: 30px;
        background-color: blue;
      }
    }
  }
  .review-bottom {
    width: 100%;
    height: 100px;
    background-color: beige;
  }
`;
const Review = () => {
  return (
    <ReviewInnerStyle>
      <ReviewTitleStyle>
        <h1>가지가지 모임 후기</h1>
        <p>가까운 지역 가까운 지인을 만난 맴버들이 남긴 후기들</p>
      </ReviewTitleStyle>
      <ReviewItemStyle>
        <div className="review-comment">
          <div className="review-top">
            <div className="rt-profile"></div>
            <div className="rt-star"></div>
          </div>
          <div className="review-bottom">
            <div className="rb-text"></div>
          </div>
        </div>
      </ReviewItemStyle>
    </ReviewInnerStyle>
  );
};

export default Review;
