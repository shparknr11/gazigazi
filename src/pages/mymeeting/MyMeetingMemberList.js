import styled from "@emotion/styled";

const MemberListInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1300px;
  display: flex;
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
`;

const MemberListMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  margin-right: 50px;
  span {
    width: 150px;
    padding: 10px 5px;
    text-align: start;
    font-size: 18px;
  }
  span:hover {
    background-color: aliceblue;
    border-radius: 10px;
  }
`;

const MemberListMainStyle = styled.div`
  width: 80%;
  > h1 {
    margin-bottom: 10px;
    font-size: 28px;
    margin-bottom: 40px;
  }
  .memberlist-member-div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .membelist-member {
    display: flex;
    border: 1px dashed rgba(0, 0, 0, 0.2);
    width: 30%;
    padding: 10px;
  }
  .member-checkbox {
    align-self: end;
  }
`;

const MyMeetingMemberList = () => {
  return (
    <MemberListInnerStyle>
      <MemberListMenuStyle>
        <span>모임원 관리</span>
        <span>모임 신청관리</span>
      </MemberListMenuStyle>

      <MemberListMainStyle>
        <h1>회원관리</h1>
        <div className="memberlist-member-div">
          <div className="membelist-member">
            <div>
              <img src="" alt="프로필" />
            </div>
            <div>
              <div>남</div>
              <div>박성호</div>
              <div>2024세</div>
            </div>
            <div>
              <input type="checkbox" className="member-checkbox" />
            </div>
          </div>
          <div className="membelist-member">
            <div>
              <img src="" alt="프로필" />
            </div>
            <div>
              <div>남</div>
              <div>박성호</div>
              <div>2024세</div>
            </div>
            <div>
              <input type="checkbox" className="member-checkbox" />
            </div>
          </div>
          <div className="membelist-member">
            <div>
              <img src="" alt="프로필" />
            </div>
            <div>
              <div>남</div>
              <div>박성호</div>
              <div>2024세</div>
            </div>
            <div>
              <input type="checkbox" className="member-checkbox" />
            </div>
          </div>
        </div>
      </MemberListMainStyle>
    </MemberListInnerStyle>
  );
};

export default MyMeetingMemberList;
