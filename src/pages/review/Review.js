import styled from "@emotion/styled";

const ReviewInnerStyle = styled.div`
  width: calc(100% - 720px);
  max-width: 1200px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
  * {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
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
const ReviewItemStyle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  .review-comment {
    padding: 20px 0px;
    .review-top {
      display: flex;
      align-items: center;
      justify-content: end;
      width: 100%;
      height: auto;
      margin-bottom: 5px;
      background-color: aliceblue;
      .rt-profile {
        display: flex;
        width: 100%;
        height: 30px;
      }
      img {
        display: block;
        width: 30px;
        background-color: blue;
      }
      span {
        display: flex;
        align-items: center;
        margin-left: 5px;
        background-color: red;
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
            <div className="rt-profile">
              <img src="" alt="프로필" />
              <span>OOO님</span>
            </div>
            <div className="rm-star">별다섯개</div>
          </div>

          <div className="review-bottom">
            <div className="rb-text">
              <p>
                락밴드 쫓아다닌지 1년. 좀 더 잘 알고싶어 신청한 모임이었고, 첫
                모임 운영이시라는 게 믿기지 않을 정도로 잘 진행되었습니다!
                대화보다는 모임장님이 들려주는 이야기를 시대별로 들어 봤고,
                시대의 배경과 함께 그러한 음악이 등장한 이유와 시대를 풍미했던
                몇몇 밴드들의 색깔을 잘 연결지어 알려주셨어요. 모임원들의 추억과
                기억과 정보들도 함께해서 즐거웠고, 마지막날엔 올드바이닐을 들고
                오셔서 들려주시기까지! 뒷풀이장소도 찾아와주시는 꼼꼼함은 덤*_*
                바쁜 현생에 번개를 못해서 아쉽지만 즐거운 시간이었습니다.
                모임원들은 락페에서 또 만나기로! 🤟🤟🤟🤟🤟
              </p>
            </div>
          </div>
        </div>
      </ReviewItemStyle>
    </ReviewInnerStyle>
  );
};

export default Review;
