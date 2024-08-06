import styled from "@emotion/styled";
import GuideTitle from "../common/GuideTitle";
import partyImg from "../../images/banner1.png";
import { prColor } from "../../css/color";
import {
  ActionButton,
  DelectButton,
  MainButton,
  SubButton,
} from "../button/Button";
const RankWrapStyle = styled.div`
  width: calc(100% - 10px);
  max-width: 1300px;
  margin: 40px auto;
  height: auto;
  .rank-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }
  .rank-first-div {
    margin-bottom: 100px;
  }
`;
const RankCubeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 200px;
  height: 150px;
  transform-style: preserve-3d;
  transform: ${({ rotateX, rotateY }) =>
    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`};
  transform-origin: center;
  transition: transform 1s;
  .party-name {
    font-size: 13px;
    font-weight: 700;
    color: #999;
  }
  .party-admin-div {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 18px;
      width: 18px;
      border: 1px solid #999;
      border-radius: 15px;
      margin-right: 5px;
      overflow: hidden;
    }
  }
  .party-admin {
    font-size: 12px;
  }
  &:hover {
    transform: ${({ rotateX1, rotateY1 }) =>
      `rotateX(${rotateX1}deg) rotateY(${rotateY1}deg)`};
    /* transform: rotateX(-7deg) rotateY(187deg); */
  }
  .cube-contents {
    padding: 10px;
  }
  .cube-front,
  .cube-back {
    position: absolute;
    width: 150px;
    height: 100px;
    /* background-color: rgba(255, 255, 255, 0.9); */
    /* border: 1px solid #958959; */
    background-color: rgba(230, 226, 212, 0.9);
    background: linear-gradient(45deg, #dcd8c5, #efede5);
    border: 1px solid ${prColor.p300};
    box-sizing: border-box;
  }
  .cube-right,
  .cube-left {
    position: absolute;
    width: 100px;
    height: 100px;
    /* background-color: rgba(255, 255, 255, 0.9); */
    /* border: 1px solid #958959; */
    background-color: rgba(230, 226, 212, 0.9);
    background: linear-gradient(45deg, #dcd8c5, #efede5);

    border: 1px solid ${prColor.p300};

    box-sizing: border-box;
  }
  .cube-top,
  .cube-bottom {
    position: absolute;
    width: 150px;
    height: 100px;
    /* background-color: rgba(255, 255, 255, 0.9); */
    /* border: 1px solid #958959; */
    background-color: rgba(230, 226, 212, 0.9);
    background: linear-gradient(45deg, #dcd8c5, #efede5);
    border: 1px solid ${prColor.p300};
    box-sizing: border-box;
  }
  .cube-top {
    transform: rotateX(90deg) translateZ(50px);
  }
  .cube-bottom {
    transform: rotateX(-90deg) translateZ(50px);
  }
  /* .cube-bottomtwo {
    transform: rotateX(-90deg) translateZ(0px);
    border: 2px solid;
  } */
  .cube-left {
    transform: rotateY(-90deg) translateZ(75px);
  }
  .cube-right {
    transform: rotateY(90deg) translateZ(75px);
  }
  .cube-back {
    transform: rotateY(180deg) translateZ(50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cube-front {
    transform: rotateY(0deg) translateZ(50px);
  }
  .cube-pic {
    position: absolute;
    width: 120px;
    height: 100px;
    box-sizing: border-box;
    margin-bottom: 40px;
    transform: rotateY(0deg) translateZ(0px) translateY(-100px);
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }
  .cube-medal {
    position: absolute;
    bottom: -5px;
    right: -5px;
    font-size: 29px;
  }
`;
const RankTopTenStyle = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }
  li {
    width: 1000px;
    height: 40px;
    background-color: ${prColor.p000};
  }
`;
const Rank = () => {
  return (
    <RankWrapStyle>
      <GuideTitle subTitle="랭킹" />
      <div className="rank-inner">
        <div className="rank-second-div">
          {/* <div className="rank-second">
            <div className="rank-party-pic"></div>
          </div> */}
          <RankCubeStyle rotateX={-7} rotateY={7} rotateX1={-7} rotateY1={187}>
            <div className="cube-front">
              <div className="cube-contents">
                <span className="party-name">[모임제목]자리 입니다.</span>
                <div className="party-admin-div">
                  <img src="" alt="프로필사진" />
                  <p className="party-admin">모임장 님의 모임</p>
                </div>
              </div>
            </div>
            <div className="cube-pic">
              <img src={partyImg} alt="파티이미지" />
              <div className="cube-medal">🥈</div>
            </div>

            <div className="cube-back">
              <MainButton label="모임 자세히보기" />
            </div>
            <div className="cube-top"></div>
            <div className="cube-bottom"></div>
            <div className="cube-left"></div>
            <div className="cube-right"></div>
          </RankCubeStyle>
        </div>

        <div className="rank-first-div">
          {/* <div className="rank-first">
            <div className="rank-party-pic">사진</div>
          </div> */}
          <RankCubeStyle rotateX={-7} rotateY={0} rotateX1={-7} rotateY1={180}>
            <div className="cube-front"></div>
            <div className="cube-pic">
              <img src={partyImg} alt="파티이미지" />
              <div className="cube-medal">🥇</div>
            </div>
            <div className="cube-back"></div>
            <div className="cube-top"></div>
            <div className="cube-bottom"></div>
            <div className="cube-left"></div>
            <div className="cube-right"></div>
          </RankCubeStyle>
        </div>

        <div className="rank-third-div">
          {/* <div className="rank-third">
            <div className="rank-party-pic">사진</div>
          </div> */}
          <RankCubeStyle rotateX={-7} rotateY={-7} rotateX1={-7} rotateY1={173}>
            <div className="cube-front"></div>
            <div className="cube-pic">
              <img src={partyImg} alt="파티이미지" />
              <div className="cube-medal">🥉</div>
            </div>
            <div className="cube-back"></div>
            <div className="cube-top"></div>
            <div className="cube-bottom"></div>
            <div className="cube-left"></div>
            <div className="cube-right"></div>
          </RankCubeStyle>
        </div>
      </div>
      <RankTopTenStyle>
        <ul>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </ul>
      </RankTopTenStyle>
    </RankWrapStyle>
  );
};

export default Rank;
