import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { postNotice } from "../../apis/mymeetingapi/meetingnotice/meetingnotice";
const MyMeetingNoticeStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .notice-wrap {
    width: 100%;
    margin-bottom: 75px;
    height: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1024px;
    gap: 40px;
  }
  .notice-inner {
    width: 100%;
  }
  .notice-form-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    max-width: 900px;
    border: 1px solid gray;
    border-radius: 4px;
    box-shadow: 1px 1px 1px 1px gray;
  }
  .meeting-introduce {
    display: flex;
    width: 100%;
    height: 205px;
    justify-content: center;
    align-items: center;
    gap: 63px;
  }
  /* 임시 */
  form {
    width: 90%;
  }
  .button-wrap {
    display: flex;
    justify-content: right;
    width: 100%;
    padding: 10px;
    gap: 20px;
  }
  .flex-column {
    width: 100%;
    text-align: left;
    padding: 20px 0;
  }
  .noitce-form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .notice-textarea {
    resize: none;
    padding: 10px;
    line-height: 2;
    width: 100%;
  }
`;
const TitleDivStyle = styled.div`
  width: 100%;
  display: block;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-left: 5px;
  padding-top: 20px;
`;
const MyMeetingNoticeResister = () => {
  const [imgUrl, setImgUrl] = useState("meetinga.png");
  const [textAreaVal, setTextAreaVal] = useState("");
  const [textAreaLength, setTextAreaLength] = useState(0);
  const [imgFile, setImgFile] = useState();
  const [previewPreImg, setPreviewPreImg] = useState();
  const location = useLocation();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(location);
  const formDataFunc = formId => {
    const a = 1;
    if (a === 1) return;
    let formData = {};

    const form = document.getElementById(formId);
    console.log(form);
    // 파일까지 처리하면 너무 복잡해질거 같아서 파일은 따로뺌
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      if (element.type !== "submit") {
        if (element.value !== "") {
          if (element.type !== "file") {
            formData[element.name] = element.value;
          }
        }
      }
    }
    return formData;
  };
  useEffect(() => {
    formDataFunc("dataForm");
  }, []);
  const handleFileChange = e => {
    const a = 1;
    if (a === 1) return;
    // file 이라서 e.target.value 를 활용하지 않는다.
    // e.taret.files 는 배열이다.
    // e.target.files = [];

    const tempFile = e?.target.files[0];
    // 사용자가 이미지를 선택하면
    // 웹브라우저는 이미지를 캐시에 보관함.
    // 임시 공간에 저장한 이미지를 우리는 경로를 알아내야 한다.
    // 그때 웹브라우저 상의 임시 URL 을 알아내는 기능 제공한다.
    console.log(tempFile);
    if (tempFile) {
      const tempUrl = URL?.createObjectURL(tempFile);

      setPreviewPreImg(tempUrl);

      // 전송할 파일 변경(주의합니다. 파일을 넣어주세요.)
      setImgFile(tempFile);
    }
  };
  const handlePostSubmit = async e => {
    const a = 1;
    if (a === 1) return;
    e.preventDefault();
    // setIsLoading(true);
    // 1. 전송데이터 포맷 만들기
    const formData = new FormData();
    // 모임장 seq, budgetMemberSeq 2개
    const form = {
      boardPartySeq: location?.state.boardPartySeq,
      boardMemberSeq: location?.state.boardMemberSeq,
      ...formDataFunc("dataForm"),
    };
    console.log(form);
    // if (!imgFile) {
    //   toast.warning("영수증 사진은 필수값입니다.");
    //   return;
    // }
    // 3차 때 구분
    // if(!form.budgetGb){
    //   toast.warning("입금 구분은 필수값입니다.");
    //   return;
    // }
    // if (!form.budgetDt) {
    //   document.getElementById("budgetDt").focus();

    //   toast.warning("입금날짜는 필수값입니다.");
    //   return;
    // }
    // 2. 보낼데이터 (json 형식의 문자열로 만들기)
    const infoData = JSON.stringify(form);
    // 3. Blob 바이너리 데이터 만들기
    // ***주의사항*** [infoData], 배열로 묶어줘야한다.
    // { type: "application/json" }
    const dto = new Blob([infoData], { type: "application/json" });

    // 4. form-data 에 키에 값으로 추가하기.
    // 위로 올릴 때 맞춰주기위한 키 : 값 구성
    formData.append("p", dto);

    // 5. 이미지 파일 추가하기.
    formData.append("pics", imgFile);
    // 6. 전송하기 (axios로 전달하기.)

    try {
      await postNotice(formData);
    } catch (error) {
      toast.error(error);
    } finally {
      toast.success("게시글이 저장되었습니다.");
      setIsLoading(false);
    }
  };
  // "pics": [
  //   "string"
  // ],
  // "p": {
  //   "boardPartySeq": 9007199254740991,
  //   "boardMemberSeq": 9007199254740991,
  //   "boardTitle": "string",
  //   "boardContents": "string"
  // }
  return (
    <>
      <MyMeetingNoticeStyle>
        <div className="notice-wrap">
          <TitleDivStyle>모임 게시판</TitleDivStyle>
          <div className="notice-inner">
            <div className="notice-form-area">
              <form
                id="dataForm"
                name="dataForm"
                onSubmit={e => {
                  handlePostSubmit(e);
                }}
              >
                {/* <!-- 굳이 해당 모임 타고 들어왔는데 보여줄 필요가 있나 싶어서 뺌 --> */}
                <div className="meeting-introduce">
                  <div style={{ width: "50%", height: "150px" }}>
                    {/* {imgUrl ? (
                      <div
                        style={{
                          width: "50%",
                          height: "150px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={previewPreImg}
                          style={{ width: "250px", height: "170px" }}
                        />
                      </div>
                    ) : null} */}
                    <label htmlFor="fileId">
                      <CiImageOff
                        className="caption-img"
                        size="200"
                        style={{ textAlign: "center" }}
                      />
                      <input
                        type="file"
                        style={{ width: 0, height: 0 }}
                        id="fileId"
                        onClick={e => {
                          handleFileChange(e);
                        }}
                      />
                    </label>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          textAlign: "left",
                        }}
                      >
                        <label htmlFor="boardTitle" style={{ width: "25%" }}>
                          제목
                        </label>
                        <input
                          id="boardTitle"
                          name="boardTitle"
                          style={{ width: "73%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="noitce-form-container">
                  <div className="flex-column">
                    <label
                      htmlFor="boardContents"
                      style={{ paddingBottom: "30px", display: "block" }}
                    >
                      내용
                    </label>
                    <textarea
                      id="boardContents"
                      name="boardContents"
                      className="notice-textarea"
                      rows="10"
                      value={textAreaVal}
                      maxLength={300}
                      onChange={e => {
                        setTextAreaVal(e.target.value);
                        setTextAreaLength(e.target.value.length);
                      }}
                    ></textarea>
                    <div style={{ textAlign: "right" }}>
                      <span>
                        <strong style={{ color: "red" }}>*</strong>
                        제한 숫자{textAreaLength}/300
                      </span>
                    </div>
                  </div>
                  <div className="button-wrap">
                    <button
                      type="button"
                      className="resister-btn"
                      onClick={() => {
                        toast.warning("3차때 구현 예정입니다.");
                        const a = 1;
                        if (a === 1) return;
                      }}
                    >
                      등록
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => {
                        navigate(
                          `/mymeeting/mymeetingLeader/${location?.state.boardPartySeq}`,
                        );
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MyMeetingNoticeStyle>
    </>
  );
};

export default MyMeetingNoticeResister;
