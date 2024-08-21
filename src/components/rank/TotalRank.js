import React from "react";
import { MainButton } from "../button/Button";
import { RankCubeStyle, RankTopTenStyle } from "../../pages/meeting/Rank";
import { useNavigate } from "react-router-dom";

const TotalRank = ({ totalRank }) => {
  const navigate = useNavigate();
  return (
    <>
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
                <img
                  src={`/pic/party/${item.partySeq}/${item.partyPic}`}
                  alt="파티이미지"
                />
                <div className="cube-medal">🥈</div>
              </div>

              <div className="cube-back">
                <MainButton
                  label="모임 자세히보기"
                  onClick={() => {
                    navigate(`/meeting/${item.partySeq}?mu=1`);
                  }}
                />
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
                <img
                  src={`/pic/party/${item.partySeq}/${item.partyPic}`}
                  alt="파티이미지"
                />
                <div className="cube-medal">🥇</div>
              </div>
              <div className="cube-back">
                <MainButton
                  label="모임 자세히보기"
                  onClick={() => {
                    navigate(`/meeting/${item.partySeq}?mu=1`);
                  }}
                />
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
                <img
                  src={`/pic/party/${item.partySeq}/${item.partyPic}`}
                  alt="파티이미지"
                />
                <div className="cube-medal">🥉</div>
              </div>
              <div className="cube-back">
                <MainButton
                  label="모임 자세히보기"
                  onClick={() => {
                    navigate(`/meeting/${item.partySeq}?mu=1`);
                  }}
                />
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
            <li
              key={index}
              onClick={() => {
                navigate(`/meeting/${item.partySeq}?mu=1`);
              }}
            >
              <span className="rank-top10">{index + 4}</span>
              <div className="rank-party-description">
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
              <button>모임 자세히보기</button>
            </li>
          ))}
        </ul>
      </RankTopTenStyle>
    </>
  );
};

export default TotalRank;
