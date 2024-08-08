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
import { useEffect, useState } from "react";
import { getTotalRank } from "../../apis/meeting/rankapi";
const RankWrapStyle = styled.div`
  width: calc(100% - 10px);
  max-width: 1280px;
  margin: 40px auto;
  height: auto;
  .rank-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin-top: 250px;
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
    color: #000;
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
  .cube-front {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
  }
  .cube-contents {
    padding: 10px;
    .cube-contents-no {
      position: absolute;
      top: -2px;
      left: 55px;
      padding: 10px;
      font-size: 29px;
      font-weight: bold;
      color: ${prColor.p900};
    }
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
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  li {
    display: flex;
    align-items: center;
    width: 1000px;
    height: 40px;
    background-color: ${prColor.p000};
  }
  .rank-top10 {
    padding: 10px;
    font-size: 22px;
    font-weight: bold;
    color: ${prColor.p500};
  }
  .rank-party-desctiption {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 700px;
    height: 100%;
  }
  .rank-party-title {
    font-size: 15px;
    font-weight: bold;
  }
  .rank-party-admin {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 18px;
      height: 18px;
      border-radius: 15px;
      margin-right: 5px;
    }
    span {
      font-size: 14px;
    }
  }
  .rank-party-points {
    font-size: 13px;
    font-weight: bold;
  }
`;
const Rank = () => {
  const [totalRank, setTotalRank] = useState([]);

  const getTotalData = async () => {
    try {
      const result = await getTotalRank();
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      // console.log(result.resultData);
      setTotalRank(result.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalData();
  }, []);

  return (
    <RankWrapStyle>
      <GuideTitle subTitle="모임 랭킹" guideTitle="rank" />
      <div className="rank-inner">
        {totalRank.slice(1, 2).map((item, index) => (
          <div key={index} className="rank-second-div">
            {/* <div className="rank-second">
            <div className="rank-party-pic"></div>
          </div> */}
            <RankCubeStyle
              rotateX={-5}
              rotateY={5}
              rotateX1={-5}
              rotateY1={185}
            >
              <div className="cube-front">
                <div className="cube-contents">
                  <p className="cube-contents-no">2</p>
                  <span className="party-name">{item.partyName}</span>
                  <div className="party-admin-div">
                    <img
                      src={`/pic/user/${item.presidentSeq}/${item.presidentPic}`}
                      alt="프로필사진"
                    />
                    <p className="party-admin">{item.president} 님의 모임</p>
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
        ))}

        {totalRank.slice(0, 1).map((item, index) => (
          <div key={index} className="rank-first-div">
            {/* <div className="rank-first">
            <div className="rank-party-pic">사진</div>
          </div> */}
            <RankCubeStyle
              rotateX={-5}
              rotateY={0}
              rotateX1={-5}
              rotateY1={180}
            >
              <div className="cube-front">
                <div className="cube-contents">
                  <p className="cube-contents-no">1</p>
                  <span className="party-name">{item.partyName}</span>
                  <div className="party-admin-div">
                    <img
                      src={`/pic/user/${item.presidentSeq}/${item.presidentPic}`}
                      alt="프로필사진"
                    />
                    <p className="party-admin">{item.president} 님의 모임</p>
                  </div>
                </div>
              </div>
              <div className="cube-pic">
                <img src={partyImg} alt="파티이미지" />
                <div className="cube-medal">🥇</div>
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
        ))}

        {totalRank.slice(2, 3).map((item, index) => (
          <div key={index} className="rank-third-div">
            {/* <div className="rank-third">
            <div className="rank-party-pic">사진</div>
          </div> */}
            <RankCubeStyle
              rotateX={-5}
              rotateY={-5}
              rotateX1={-5}
              rotateY1={175}
            >
              <div className="cube-front">
                <div className="cube-contents">
                  <p className="cube-contents-no">3</p>
                  <span className="party-name">{item.partyName}</span>
                  <div className="party-admin-div">
                    <img
                      src={`/pic/user/${item.presidentSeq}/${item.presidentPic}`}
                      alt="프로필사진"
                    />
                    <p className="party-admin">{item.president} 님의 모임</p>
                  </div>
                </div>
              </div>
              <div className="cube-pic">
                <img src={partyImg} alt="파티이미지" />
                <div className="cube-medal">🥉</div>
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
        ))}
      </div>
      <RankTopTenStyle>
        <ul>
          {totalRank.slice(3).map((item, index) => (
            <li key={index}>
              <sapn className="rank-top10">{index + 4}</sapn>
              <div className="rank-party-desctiption">
                <div className="rank-party-title">{item.partyName}</div>
                <div className="rank-party-admin">
                  <img
                    src={`/pic/user/${item.presidentSeq}/${item.presidentPic}`}
                    alt="모임장사진"
                  />
                  <span>{item.president} 님의 모임</span>
                </div>
                <div className="rank-party-points">
                  <span>{item.totalPoints} points</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </RankTopTenStyle>
    </RankWrapStyle>
  );
};

export default Rank;
