import styled from "@emotion/styled";
import { Rating } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const WriteInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1300px;
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
  // const labels = {
  //   0.5: "Useless",
  //   1: "Useless+",
  //   1.5: "Poor",
  //   2: "Poor+",
  //   2.5: "Ok",
  //   3: "Ok+",
  //   3.5: "Good",
  //   4: "Good+",
  //   4.5: "Excellent",
  //   5: "Excellent+",
  // };
  const [rating, setRating] = useState(null);
  const [reviewPic, setReviewPic] = useState(null);
  const [previewPic, setPreviewPic] = useState("");

  const handleRwFileChange = e => {
    const tempFile = e.target.files[0];
    if (tempFile) {
      setReviewPic(tempFile);
      const tempUrl = URL.createObjectURL(tempFile);
      setPreviewPic(tempUrl);
    } else {
      setReviewPic(null);
      setPreviewPic("");
    }
  };
  const location = useLocation();
  console.log(location);
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
        <div>
          <Rating
            name="simple-controlled"
            size="large"
            precision={0.5}
            value={rating}
            onChange={(event, newValue) => {
              console.log(newValue);
              setRating(newValue);
            }}
          />
        </div>
      </ReviewCommentStyle>
      <ReviewFileStyle>
        <label htmlFor="review-pic">사진</label>
        <input
          type="file"
          id="review-pic"
          accept="image/jpg, image/png, image/gif"
          onChange={e => {
            handleRwFileChange(e);
          }}
        />
        {previewPic ? (
          <img style={{ width: "20%", height: "20%" }} src={previewPic} />
        ) : null}
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
