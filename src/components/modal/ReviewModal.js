import styled from "@emotion/styled";
import { Rating } from "@mui/material";
import { useRef, useState } from "react";
import { MainButton } from "../../components/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { prColor } from "../../css/color";
import jwtAxios from "../../apis/jwtAxios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../css/quill.css";
import { modules } from "../../components/modules/quill";

const WriteInnerStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #000;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: ${prColor.p100};
  border: 1px solid ${prColor.p200};
  z-index: 99;
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
  & label {
    font-weight: bold;
  }
  & select {
    padding: 5px;
  }
`;
const ReviewCommentStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  & label {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
const ReviewFileStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  & label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .review-write-preview {
    display: flex;
    gap: 1px;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 5px;
    margin-top: 5px;
    min-height: 150px;
  }
  .review-write-nopreview {
    display: block;
    width: 150px;
    height: 150px;
    border-color: #000;
  }
  .preview-reviewpic {
    display: block;
    width: 150px;
    height: 150px;
    cursor: pointer;
  }
  .morerv-button {
    margin-top: 10px;
    cursor: pointer;
    color: ${prColor.p700};
    text-decoration: underline;
  }
`;

const ReviewTextStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  & label {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
const ReviewButtonStyle = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
`;

const ReviewModal = ({
  isModalOpen,
  setIsModalOpen,
  planMemberSeq,
  planSeqForReview,
}) => {
  if (!isModalOpen) return null;
  const navigate = useNavigate();
  const [reviewRating, setReviewRating] = useState(null);
  const [reviewContents, setReviewContents] = useState("");
  const [reviewPic, setReviewPic] = useState([]);
  const [previewPic, setPreviewPic] = useState([]);
  const [showMore, setShowMore] = useState(false); // 추가된 상태
  const fileBt = useRef(null);
  const location = useLocation();

  const handleRwFileChange = e => {
    const filesArr = Array.from(e.target.files);

    if (filesArr) {
      setReviewPic([...reviewPic, ...filesArr]);
      const imgUrlArr = filesArr.map(item => URL.createObjectURL(item));
      setPreviewPic([...previewPic, ...imgUrlArr]);
    } else {
      setReviewPic([]);
      setPreviewPic([]);
    }
  };

  const deleteFile = _index => {
    const tempPreviewArr = previewPic.filter((item, index) => index !== _index);
    setPreviewPic(tempPreviewArr);
    const tempFileArr = reviewPic.filter((item, index) => index !== _index);
    setReviewPic(tempFileArr);
  };

  const makeThumbnail = () => {
    const visiblePics = showMore ? previewPic : previewPic.slice(0, 3); // 보여줄 이미지
    return visiblePics.map((item, index) => (
      <img
        src={item}
        key={index}
        className="preview-reviewpic"
        onClick={() => deleteFile(index)}
      />
    ));
  };

  const handleSubmitWrite = async e => {
    e.preventDefault();
    if (!reviewContents) {
      alert("후기를 작성해주세요");
      return;
    }

    const formData = new FormData();
    const infoData = JSON.stringify({
      reviewPlanSeq: parseInt(planSeqForReview),
      reviewPlmemberSeq: parseInt(planMemberSeq),
      reviewContents,
      reviewRating,
    });
    const data = new Blob([infoData], { type: "application/json" });

    formData.append("p", data);
    reviewPic.forEach(item => formData.append("pics", item));

    try {
      const result = await postReview(formData);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
    } catch (error) {
      console.log(error);
    }

    setReviewRating(null);
    setReviewContents("");
    setReviewPic([]);
    setPreviewPic([]);

    setIsModalOpen(false);
    navigate(`/review`);
  };

  const postReview = async _formData => {
    try {
      const response = await jwtAxios.post(`/api/review`, _formData);
      const status = response.status.toString().charAt(0);
      if (status === "2") {
        return response.data;
      } else {
        alert("API 오류발생 status 확인해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileClick = () => {
    fileBt.current.click();
  };

  const handleChangeContents = e => {
    setReviewContents(e.target.value);
  };

  return (
    <WriteInnerStyle>
      <div className="review-write-div">
        <h1>후기작성</h1>
      </div>
      <ReviewSelectStyle>
        <label htmlFor="review-title">내가 가입한 모임</label>
        <select id="review-title">
          <option>{location.state.partyName}</option>
        </select>
      </ReviewSelectStyle>
      <ReviewCommentStyle>
        <label htmlFor="review-comment">별점을 선택해주세요</label>
        <div>
          <Rating
            name="simple-controlled"
            size="large"
            precision={1}
            value={reviewRating}
            onChange={(event, newValue) => setReviewRating(newValue)}
          />
        </div>
      </ReviewCommentStyle>
      <ReviewFileStyle>
        <label htmlFor="review-pic">사진을 첨부해 주세요. (선택)</label>
        <input
          style={{ display: "none" }}
          ref={fileBt}
          type="file"
          id="review-pic"
          multiple
          accept="image/jpg, image/png, image/gif"
          onChange={handleRwFileChange}
        />
        <div className="review-write-preview">{makeThumbnail()}</div>
        {previewPic.length > 3 && !showMore && (
          <div className="morerv-button" onClick={() => setShowMore(true)}>
            더보기
          </div>
        )}
        {showMore && previewPic.length > 3 && (
          <div className="morerv-button" onClick={() => setShowMore(false)}>
            접기
          </div>
        )}
        <button onClick={handleFileClick}>사진첨부</button>
      </ReviewFileStyle>
      <ReviewTextStyle>
        <label htmlFor="review-text">솔직한 리뷰를 작성해주세요</label>
        <ReactQuill onChange={setReviewContents} modules={modules} />
      </ReviewTextStyle>
      <ReviewButtonStyle>
        <MainButton onClick={handleSubmitWrite} label="작성"></MainButton>
        <MainButton
          label="취소"
          onClick={() => setIsModalOpen(false)}
        ></MainButton>
      </ReviewButtonStyle>
    </WriteInnerStyle>
  );
};

export default ReviewModal;
