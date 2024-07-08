import styled from "@emotion/styled";
const WriteInnerStyle = styled.div`
  width: calc(100% - 720px);
  max-width: 1200px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 25px;

  .review-write-div {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
  }
  h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
`;
const ReviewSelectStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const ReviewCommentStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const ReviewFileStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const ReviewTextStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Write = () => {
  return (
    <WriteInnerStyle>
      <div className="review-write-div">
        <h1>후기작성</h1>
      </div>
      <ReviewSelectStyle>
        <label htmlFor="review-title">내가 가입한 모임</label>
        <select id="review-title">
          <option value="1">내가 가입한 모임</option>
        </select>
      </ReviewSelectStyle>
      <ReviewCommentStyle>
        <label htmlFor="review-comment">별점을 선택해주세요</label>
        <div>⭐⭐⭐⭐⭐</div>
        {/* <input type="text" id="meetcomment" /> */}
      </ReviewCommentStyle>
      <ReviewFileStyle>
        <label htmlFor="review-pic">사진</label>
        <input type="file" id="review-pic" />
      </ReviewFileStyle>
      <ReviewTextStyle>
        <label htmlFor="revew-text">솔직한 리뷰를 작성해주세요</label>
        <input type="text" id="revew-text" />
      </ReviewTextStyle>
      <button>작성완료</button>
      <button>취소</button>
    </WriteInnerStyle>
  );
};

export default Write;
