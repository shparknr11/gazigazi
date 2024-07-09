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
  width: 20%;
`;

const MemberListMainStyle = styled.div`
  width: 80%;
  > h1 {
    margin-bottom: 10px;
  }
  .memberlist-member-div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
  }
  .membelist-member {
    border: 1px dashed rgba(0, 0, 0, 0.2);
    width: 30%;
    padding: 10px;
  }
`;

const MyMeetingMemberList = () => {
  return (
    <MemberListInnerStyle>
      <MemberListMenuStyle>
        <span>모임원 관리</span>
        <span>모임신청 관리</span>
      </MemberListMenuStyle>

      <MemberListMainStyle>
        <h1>회원관리</h1>
        <div className="memberlist-member-div">
          <div className="membelist-member">박성호</div>
          <div className="membelist-member">윤성환</div>
          <div className="membelist-member">황운철</div>
          <div className="membelist-member">박성호</div>
          <div className="membelist-member">윤성환</div>
          <div className="membelist-member">황운철</div>
          <div className="membelist-member">박성호</div>
          <div className="membelist-member">윤성환</div>
          <div className="membelist-member">황운철</div>
          <div className="membelist-member">박성호</div>
          <div className="membelist-member">윤성환</div>
          <div className="membelist-member">황운철</div>
          <div className="membelist-member">박성호</div>
          <div className="membelist-member">윤성환</div>
          <div className="membelist-member">황운철</div>
          <div className="membelist-member">박성호</div>
          <div className="membelist-member">윤성환</div>
          <div className="membelist-member">황운철</div>
          <div className="membelist-member">박성호</div>
          <div className="membelist-member">윤성환</div>
          <div className="membelist-member">황운철</div>
        </div>
      </MemberListMainStyle>
    </MemberListInnerStyle>
  );
};

export default MyMeetingMemberList;
