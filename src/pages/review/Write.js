import styled from "@emotion/styled";
import { Rating } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { MainButton } from "../../components/button/Button";
import { useLocation } from "react-router-dom";
import { prColor } from "../../css/color";
const WriteInnerStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #000;

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
  .review-write-preview {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const ReviewTextStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  textarea {
    height: 150px;
    width: 300px;
    padding: 10px;
    border: 1px solid ${prColor.g200};
    border-radius: 13px;
    resize: none;
  }
`;
const ReviewButtonStyle = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
`;
const Write = () => {
  const [reviewRating, setReviewRating] = useState(null);
  const [reviewContents, setReviewContents] = useState("");
  const [reviewPic, setReviewPic] = useState([]);
  const [previewPic, setPreviewPic] = useState([]);
  const fileBt = useRef(null);

  const handleRwFileChange = e => {
    const filesArr = Array.from(e.target.files);

    if (filesArr) {
      setReviewPic([...reviewPic, ...filesArr]);
      const imgUrlArr = filesArr.map(item => URL.createObjectURL(item));
      setPreviewPic([...previewPic, ...imgUrlArr]);
    } else {
      setReviewPic([]);
      setPreviewPic("");
    }
  };
  const deleteFile = _index => {
    // console.log("삭제", _index);
    // 미리보기 배열에서 제거 : 기준 순서(index)
    const tempPreviewArr = previewPic.filter((item, index) => index !== _index);
    setPreviewPic(tempPreviewArr);
    // 전송 파일 배열에서 제거 : 기준 순서(index)
    const tempFileArr = reviewPic.filter((item, index) => index !== _index);
    setReviewPic(tempFileArr);
  };

  const makeThumbnail = () => {
    return previewPic.map((item, index) => (
      <img
        src={item}
        key={index}
        style={{ width: 80 }}
        onClick={() => {
          deleteFile(index);
        }}
      />
    ));
  };

  // submit 이벤트 핸들러
  const handleSubmitWrite = e => {
    // 기본 기능 막기
    e.preventDefault();
    // step 1. 전송 데이터 포맷 만들기
    const formData = new FormData();

    // step 2. 보낼 데이터 (json 형식의 문자열로 만들기)
    const infoData = JSON.stringify({
      reviewPlanSeq: 1,
      reviewPlmemberSeq: 1,
      reviewContents,
      reviewRating,
    });
    // step 3. Blob 바이너리 데이터 만들기
    const data = new Blob([infoData], { type: "application/json" });

    // step 4. form-data에 "키명" 값으로 추가하기
    formData.append("p", data);
    reviewPic.forEach((item, index, arr) => {
      // step 5. 파일 추가하기
      formData.append("files", item);
    });
    // step 6. axios 로 전달
    postReview(formData);
  };

  // 리뷰 등록하기
  const postReview = async _formData => {
    try {
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.post(`/api/review`, _formData, header);
      console.log(response);
      const status = response.status.toString().charAt(0);
      if (status === "2") {
        console.log("response", response.data);
        return response.data;
      } else {
        alert("API 오류발생 status 확인해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 강제로 input type="file" 을 클릭한 것처럼 js 에서 실행
  const handleFileClick = () => {
    // document.querySelector("#filebt_id").click();
    fileBt.current.click();
  };

  const handleChangeContents = e => {
    setReviewContents(e.target.value);
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
          <option>내가 가입한 모임</option>
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
            onChange={(event, newValue) => {
              setReviewRating(newValue);
            }}
          />
        </div>
      </ReviewCommentStyle>
      <ReviewFileStyle>
        <label htmlFor="review-pic"></label>
        <button
          onClick={() => {
            handleFileClick();
          }}
        >
          사진첨부
        </button>
        <input
          style={{ display: "none" }}
          ref={fileBt}
          type="file"
          id="review-pic"
          multiple
          accept="image/jpg, image/png, image/gif"
          onChange={e => {
            handleRwFileChange(e);
          }}
        />
        {previewPic ? (
          <div className="review-write-preview">{makeThumbnail()}</div>
        ) : null}
      </ReviewFileStyle>
      <ReviewTextStyle>
        <label htmlFor="revew-text">솔직한 리뷰를 작성해주세요</label>
        <textarea
          type="text"
          id="revew-text"
          value={reviewContents}
          onChange={e => {
            handleChangeContents(e);
          }}
        />
      </ReviewTextStyle>
      <ReviewButtonStyle>
        <MainButton
          onClick={e => {
            handleSubmitWrite(e);
          }}
          label="작성"
        ></MainButton>
        <MainButton label="취소"></MainButton>
      </ReviewButtonStyle>
    </WriteInnerStyle>
  );
};

export default Write;
