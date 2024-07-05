import styled from "@emotion/styled";

const ModalFormDivStyle = styled.div`
  width: 100%;
  padding: 20px;
  height: 3000px;
  background-color: beige;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .review-form-group {
    display: flex;
    flex-direction: column;
    select,
    input {
      padding: 10px;
      width: 500px;
      height: 40px;
    }
    textarea {
      resize: none;
    }
  }
`;

const ReviewModal = () => {
  return (
    <ModalFormDivStyle>
      <div>
        <h1>후기작성</h1>
      </div>
      <div className="review-form-group">
        <label htmlFor="meetname">가입한 모임</label>
        <input type="text" id="meetname" />
      </div>
      <div className="review-form-group">
        <label htmlFor="meetreview">후기</label>
        <input type="text" id="meetreview" />
      </div>
      <div className="review-form-group">
        <label htmlFor="meetpic">사진</label>
        <input type="text" id="meetpic" />
      </div>
      <div className="review-form-group">
        <label htmlFor="meetcomment">별점을 선택해주세요</label>
        <input type="text" id="meetcomment" />
      </div>
    </ModalFormDivStyle>
  );
};

export default ReviewModal;
