import styled from "@emotion/styled";
import React from "react";
import GuideTitle from "../common/GuideTitle";
const RankWrapStyle = styled.div`
  width: calc(100% - 10px);
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 40px;
  height: 700px;
  .rank-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }
  .rank-first,
  .rank-second,
  .rank-third {
    display: flex;
    justify-content: center;
  }
  .rank-party-pic {
    display: block;
    width: 100px;
    height: 100px;
    border: 1px solid;
  }
`;
const RankCubeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transform: ${({ rotateX, rotateY }) =>
    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`};
  transform-origin: center;
  transition: transform 1s;
  .cube-front,
  .cube-back {
    position: absolute;
    width: 150px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #958959;
    box-sizing: border-box;
  }
  .cube-right,
  .cube-left {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #958959;
    box-sizing: border-box;
  }
  .cube-top,
  .cube-bottom {
    position: absolute;
    width: 150px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #958959;
    box-sizing: border-box;
  }
  .cube-top {
    transform: rotateX(90deg) translateZ(50px);
  }
  .cube-bottom {
    transform: rotateX(-90deg) translateZ(50px);
  }
  .cube-left {
    transform: rotateY(-90deg) translateZ(75px);
  }
  .cube-right {
    transform: rotateY(90deg) translateZ(75px);
  }
  .cube-back {
    transform: rotateY(180deg) translateZ(50px);
  }
  .cube-front {
    transform: rotateY(0deg) translateZ(50px);
  }
`;

const Rank = () => {
  return (
    <RankWrapStyle>
      <GuideTitle subTitle="랭킹" />
      <div className="rank-inner">
        <div className="rank-second-div">
          <div className="rank-second">
            <div className="rank-party-pic">사진</div>
          </div>
          <RankCubeStyle rotateX={-5} rotateY={5}>
            <div className="cube-front"></div>
            <div className="cube-back"></div>
            <div className="cube-top"></div>
            <div className="cube-bottom"></div>
            <div className="cube-left"></div>
            <div className="cube-right"></div>
          </RankCubeStyle>
        </div>

        <div className="rank-first-div">
          <div className="rank-first">
            <div className="rank-party-pic">사진</div>
          </div>
          <RankCubeStyle rotateX={-5} rotateY={0}>
            <div className="cube-front"></div>
            <div className="cube-back"></div>
            <div className="cube-top"></div>
            <div className="cube-bottom"></div>
            <div className="cube-left"></div>
            <div className="cube-right"></div>
          </RankCubeStyle>
        </div>

        <div className="rank-third-div">
          <div className="rank-third">
            <div className="rank-party-pic">사진</div>
          </div>
          <RankCubeStyle rotateX={-5} rotateY={-5}>
            <div className="cube-front"></div>
            <div className="cube-back"></div>
            <div className="cube-top"></div>
            <div className="cube-bottom"></div>
            <div className="cube-left"></div>
            <div className="cube-right"></div>
          </RankCubeStyle>
        </div>
      </div>
    </RankWrapStyle>
  );
};

export default Rank;
