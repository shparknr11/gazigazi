import styled from "@emotion/styled";
import React from "react";
const MyMeetingNoticeStyle = styled.div`
  width: 100%;

  .notice-wrap {
    width: 100%;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .notice-inner {
    max-width: 1024px;
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
`;
const MyMeetingNotice = () => {
  return (
    <MyMeetingNoticeStyle>
      <div className="notice-wrap">
        <div className="notice-inner">
          <div className="notice-form-area">
            <form>
              {/* <!-- 굳이 해당 모임 타고 들어왔는데 보여줄 필요가 있나 싶어서 뺌 --> */}
              <div className="meeting-introduce">
                <div style={{ height: "150px" }}>
                  <img src="./www/images/meetinga.png" />
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
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="flex-column"
                  style={{ textAlign: "left", width: "60%" }}
                >
                  <label htmlFor="noticeid">제목</label>
                  <input id="noticeid" style={{ padding: "3px" }} />
                </div>
                <div
                  className="flex-column"
                  style={{ textAlign: "left", width: "60%", padding: "20px 0" }}
                >
                  <label htmlFor="noticecontent" style={{ width: "100%" }}>
                    내용/ 에디터 형식이 될듯함 사진 배치 이런것들이 들어가서
                  </label>
                  <textarea
                    id="noticecontent"
                    rows="10"
                    style={{
                      resize: "none",
                      padding: "10px",
                      lineHeight: 2,
                      width: "100%",
                    }}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MyMeetingNoticeStyle>
  );
};

export default MyMeetingNotice;
