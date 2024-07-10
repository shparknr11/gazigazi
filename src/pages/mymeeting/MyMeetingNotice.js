import styled from "@emotion/styled";
import { useState } from "react";
const MyMeetingNoticeStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .notice-wrap {
    width: 100%;
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
const MyMeetingNotice = () => {
  const [imgUrl, setImgUrl] = useState("meetinga.png");
  const [textAreaVal, setTextAreaVal] = useState("");
  const [textAreaLength, setTextAreaLength] = useState(0);
  return (
    <>
      <MyMeetingNoticeStyle>
        <div className="notice-wrap">
          <TitleDivStyle>모임 게시판</TitleDivStyle>
          <div className="notice-inner">
            <div className="notice-form-area">
              <form>
                {/* <!-- 굳이 해당 모임 타고 들어왔는데 보여줄 필요가 있나 싶어서 뺌 --> */}
                {/* <div className="meeting-introduce">
                <div style={{ height: "150px" }}>
                  {imgUrl ? (
                    <img src={imageTest} />
                  ) : (
                    <CiImageOff
                      className="caption-img"
                      size="150"
                      style={{ textAlign: "center" }}
                    />
                  )}
                </div>
                <div style={{ width: "30%" }}>
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
                      <label htmlFor="mettingname" style={{ width: "25%" }}>
                        모임명
                      </label>
                      <input id="mettingname" style={{ width: "73%" }} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textAlign: "left",
                      }}
                    >
                      <label htmlFor="mettingdata" style={{ width: "25%" }}>
                        모임날짜
                      </label>
                      <input
                        id="mettingdata"
                        type="date"
                        style={{ width: "73%" }}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
                <div className="noitce-form-container">
                  <div className="flex-column">
                    <div>
                      <label
                        htmlFor="noticeid"
                        style={{ paddingBottom: "30px", display: "block" }}
                      >
                        제목
                      </label>
                    </div>
                    <div>
                      <input id="noticeid" />
                    </div>
                  </div>
                  <div className="flex-column">
                    <label
                      htmlFor="noticecontent"
                      style={{ paddingBottom: "30px", display: "block" }}
                    >
                      내용/ 에디터 형식이 될듯함 사진 배치_ 등록 페이지 따로 뺌
                    </label>
                    <textarea
                      id="noticecontent"
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
                    <button className="resister-btn">수정</button>
                    <button className="delete-btn">삭제</button>
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

export default MyMeetingNotice;
