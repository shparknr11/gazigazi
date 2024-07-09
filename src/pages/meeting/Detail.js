import styled from "@emotion/styled";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import meetimg from "../../images/meetinga.png";

const MeetItemStyle = styled.div`
  margin-top: 30px;
  .inner {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    width: calc(100% - 30px);
    max-width: 1200px;
  }
`;
const MeetItemTitle = styled.div`
  .meet-item-category {
    display: flex;
    gap: 10px;
    font-size: 1.2rem;

    svg {
      color: orange;
    }

    span {
      color: #555;
    }
  }

  .meet-item-title {
    font-weight: 700;
    font-size: 1.7rem;
    margin-top: 20px;
  }
`;

const MeetItemCard = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;
  margin-bottom: 50px;

  .meet-item-img {
    background: url(${meetimg}) no-repeat center;
    background-size: cover;
    max-width: 390px;
    width: 100%;
    height: 240px;
  }

  .meet-item-content {
    span {
      font-weight: 600;
      margin-left: 20px;
      font-size: 1.2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }
`;
const UnderLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(227, 229, 231);
  margin: 20px 0;
`;
const MeetItemInfo = styled.div`
  margin-top: 50px;

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
  }

  p {
    margin-top: 30px;
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

const Detail = () => {
  return (
    <MeetItemStyle>
      <div className="inner">
        <MeetItemTitle>
          <div className="meet-item-category">
            <BsFillTicketPerforatedFill />
            <span>소모임</span>
          </div>
          <div className="meet-item-title">
            <span>금요일 양반차림 (우리의 상반기, 당신의 이야기)</span>
          </div>
          <MeetItemCard>
            <div className="meet-item-img"></div>
            <div className="meet-item-content">
              <UnderLine />
              <span>최서윤 소모임장</span>
              <UnderLine />
              <p>
                안녕하세요. 유머러스한 불효자들 - 성장하며 흔들리는 영화
                캐릭터처럼’의 모임장입니다. 홍대 플레이스 오션의 운영을 돕고
                있어요. 서비스업 자영업자 새싹으로서 선배 자영업자 분들의 훈수
                환영합니다.(단, 오셔서💙)
              </p>
              <button style={{ marginTop: "30px", marginRight: "10px" }}>
                찜하기
              </button>
              <button>신청하기</button>
            </div>
          </MeetItemCard>
        </MeetItemTitle>
        <UnderLine />
        <MeetItemInfo>
          <div>
            <h2>🍷 분위기 있게 한잔</h2>
            <p>
              ✅ 우리 모임에서는 이런 분을 초대하고 있어요. - 퇴근 후 그냥 집에
              가기 허전한 분 - 새롭지만 편안한 사람들과 남이 차려준 밥상을
              즐기고픈 분 - 주중의 피로를 맛있는 음식과 적당한 술, 즐거운 대화로
              풀고 싶은 분! - 감각을 일깨우는 새로운 공간에 방문하길 즐기는 분 -
              결이 맞는 새로운 동네 친구를 원하는 분(본 모임장 특: 마포구 10년
              삶) ✅ 진행 순서 - 간단한 자기소개 및 아이스브레이킹 with
              핑거푸드와 맥주 or 하이볼(20분) - 대화와 식사(70분+@) - 그 후
              자유시간(21시부터 라틴 음악과 춤이 흐르는 공간으로 변신합니다.
              공간의 무드가 변화할 뿐 자정까지 원하시는 만큼 대화와 술, 심지어
              춤도 즐기실 수 있어요🤗 댄스화 갖고 계신 경우 지참 추천!) ✅ 안내
              사항 - 넷플연가 모임 해봐서 아시죠? 넷플연가식 자기소개가 있을
              예정이에요. :) - 이런 미친... 벌써 2024년이 반이나 지났다고???
              화들짝 놀랐지 뭐예요... 지난 반 년간 어떻게 보냈는지 얘기 나누고
              앞으로의 반 년을 어떻게 보낼 것인지 계획과 각오를 함께 다져봐요. -
              그밖에 삶의 낙 혹은 고민거리, 그 외 다른 사람들에 대해 궁금한 점을
              나누며 친해져요. - 참여비에는 하이볼 or 맥주 한 잔, 추가 음료권 한
              장, 음식 재료비, 시설 이용비, 양반 수고비, 노쇼 방지비, 넷플연가
              수수료 등이 포함돼있어요. - 더 많은 주류를 원하신다면 현장에서
              구매하여 즐기실 수 있습니다.🍻🥂🥃 - 음식은 오마카세 형식으로
              내드리며 모임 1일 전 재료 구매가 이뤄지니 이후 취소는
              지양해주세요. 📜About 양반차림 코로나 시국, 신길동 독거인 ‘양반’은
              친구들을 자신의 집에 초대해 술과 음식을 대접하기 시작했습니다.
              그러면서 양반은 깨달았습니다. 자신이 요리를 좋아하고, 사람들로부터
              맛있었다, 잘 먹었다는 말을 들으면 몹시 기쁘다는 사실을요. 그러던
              중 회사를 그만두며 오랜 시간 방황하던 양반은…. 방황의 끝에 자신의
              즐거움을 일과 연결하는 공간을 직접 차리기로 마음먹고, 홍대의 월세
              비싼 공간을 덜컥 계약해버리고 말았던 것이었어요…. 그리고 부동산
              계약 성공에 일조했던 저(C) 역시 그 죗값(?)으로 양반의 공간 운영을
              돕게 됐답니다. 링크에서 좀 더 자세한 양반(Y)의 사연을 만나보실 수
              있어요 👉 https://brunch.co.kr/@tangoing/25 👇︎기존의 양반차림
              메뉴 & 참여자 간 플러팅 사진이에요🤭
            </p>
          </div>
          <div className="meet-item-imgs"></div>
        </MeetItemInfo>
        <UnderLine />
        <div></div>
      </div>
    </MeetItemStyle>
  );
};

export default Detail;
