import styled from "@emotion/styled";
import { useState } from "react";
import { CiImageOff } from "react-icons/ci";
const MyMeetingNoticeStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .notice-wrap {
    width: 100%;
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
const MyMeetingSchDetail = () => {
  const [imgUrl, setImgUrl] = useState("meetinga.png");
  return (
    <>
      <MyMeetingNoticeStyle>
        <div className="notice-wrap">
          <TitleDivStyle>일정 상세페이지</TitleDivStyle>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {<CiImageOff size={200} />}
                      </div>
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <label htmlFor="noticeid">일정명</label>
                          <input id="noticeid" />
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <label htmlFor="noticeid">일정날짜</label>
                          {/* 앞에서 불러오는데 이거 수정할 때 수정가능하면 데이트 피커 사용해야함 */}
                          <input type="date" id="noticeid" />
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <label htmlFor="noticeid">인원수</label>
                          <select id="">
                            <option>30</option>
                            <option>100</option>
                            <option>200</option>
                            <option>300</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-column">
                    <label htmlFor="noticecontent">모임 소개</label>
                    <textarea className="notice-textarea" rows="3"></textarea>
                  </div>
                  <div className="flex-column">
                    <label htmlFor="noticecontent">모임 일정 장소</label>
                    <div
                      style={{
                        width: "100%",
                        height: "400px",
                        border: "1px solid black",
                      }}
                    >
                      지도 API 들어올 자리
                    </div>
                  </div>
                  <div className="button-wrap">
                    <button type="button">수정</button>
                    <button type="button" onClick={() => {}}>
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

export default MyMeetingSchDetail;
