import styled from "@emotion/styled";
import { prColor } from "../../css/color";

import { useEffect, useState } from "react";
import { getTotalRank } from "../../apis/meeting/rankapi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import TotalRank from "../../components/rank/TotalRank";
import GuideTitle from "../../components/common/GuideTitle";

export const RankWrapStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1280px;
  margin: 40px auto;
  height: auto;
  .rank-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin-top: 150px;
  }
  .rank-first-div {
    margin-bottom: 100px;
  }
`;
export const RankCubeStyle = styled.div`
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
    margin-bottom: 10px;
  }
  .party-admin-div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3px;
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
    align-items: center;
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
export const RankTopTenStyle = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  li {
    position: relative;
    display: flex;
    align-items: center;
    width: 1000px;
    height: 40px;
    background-color: ${prColor.p000};
    border: 2px solid transparent;

    &:hover {
      border: 2px solid ${prColor.p300};
    }
    &:hover button {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
    }
    &:hover .rank-top10,
    &:hover .rank-party-description,
    &:hover .rank-party-title,
    &:hover .rank-party-admin,
    &:hover .rank-party-points {
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.3s,
        visibility 0.3s;
    }
    & button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      background-color: ${prColor.p800};
      color: ${prColor.white};
      border: 1px solid ${prColor.p800};
      border-radius: 15px;
      padding: 5px 10px;
      cursor: pointer;
      transition:
        opacity 0.3s,
        visibility 0.3s;
      &:hover {
        border: 1px solid ${prColor.p1000};
        background-color: ${prColor.p1000};
      }
    }
  }
  .rank-top10 {
    padding: 10px;
    font-size: 22px;
    font-weight: bold;
    color: ${prColor.p500};
  }
  .rank-party-description {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .rank-party-title {
    font-size: 15px;
    font-weight: bold;
    display: inline-block;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-width: 300px;
    max-width: 300px; /* 최대 너비 설정 */
    white-space: nowrap; /* 줄 바꿈 방지 */
    overflow: hidden; /* 넘치는 부분 숨김 */
    text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
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
export const RankArrowStyle = styled.div`
  position: relative;
  .rank-prev-btn {
    position: absolute;
    left: 40px;
    bottom: 350px;
  }
  .rank-next-btn {
    position: absolute;
    right: 40px;
    bottom: 350px;
  }
  svg {
    width: 60px;
    height: 60px;
    color: ${prColor.p700};
    cursor: pointer;
    &:hover {
      color: ${prColor.p400};
    }
  }
`;

const Rank = () => {
  const [totalRank, setTotalRank] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

  const handleClickPrev = () => {
    const showRank = searchParams.get("rank");
    console.log(showRank);
    if (showRank === "total") {
      console.log("total");
      // navigate(`/`)
      navigate(`/rank?rank=local`);
    } else if (showRank === "local") {
      console.log("local");
      // navigate(`/rank?rank=local`);
    } else {
      console.log("다른랭킹");
    }
  };
  return (
    <RankWrapStyle>
      <GuideTitle subTitle="전체 랭킹" guideTitle="모임 랭킹" />
      <TotalRank totalRank={totalRank} />
      <RankArrowStyle>
        <div className="rank-prev-btn">
          <IoIosArrowBack
            onClick={() => {
              console.log("클릭");
              handleClickPrev();
            }}
          />
        </div>
        <div className="rank-next-btn">
          <IoIosArrowForward />
        </div>
      </RankArrowStyle>
    </RankWrapStyle>
  );
};

export default Rank;
