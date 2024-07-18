import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  deleteSchOne,
  getSchOne,
  patchSch,
  patchSchComp,
  postSchJoin,
} from "../../apis/mymeetingapi/meetschapi/meetschapi";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MyMeetingSchMemberList from "./MyMeetingSchMemberList";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";

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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .notice-form-area {
    width: 100%;
    border-right: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 900px;
    border: 1px solid gray;
    border-radius: 4px;
    box-shadow: 1px 1px 1px 1px gray;
    label {
      font-size: 18px;
    }
    .input-style {
      height: 40px;
      border: 1px solid gray;
      border-radius: 10px;
      padding: 10px;
    }
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
    border-right: 1px solid gray;
    display: flex;
    padding: 0 3%;
    flex-direction: column;
    gap: 20px;
    width: 65%;
    justify-content: center;
    align-items: center;
  }
  .notice-textarea {
    resize: none;
    padding: 10px;
    line-height: 2;
    width: 100%;
    margin-top: 15px;
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
  const [planTitle, setPlanTitle] = useState("");
  const [planStartDt, setPlanStartDt] = useState("");
  const [planStartTime, setPlanStartTime] = useState("");
  const [planLocation, setPlanLocation] = useState("");
  const [planContents, setPlanContents] = useState("");
  const [planCdNm, setPlanCdNm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState();
  const [isCompleted, setIsCompleted] = useState();
  const [planMemberSeq, setPlanMemberSeq] = useState();
  const [planMemberJoinFunc, setPlanMemberJoinFunc] = useState(() => {});
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  console.log(param.meetingschid);
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  useEffect(() => {}, [isAuth]);
  useEffect(() => {}, [isCompleted]);
  const getDataOne = async () => {
    console.log(location.state.planSeq);
    const res = await getSchOne(param.meetingschid);
    console.log(res);
    // setPlanObj(res);
    setPlanTitle(res.planTitle);
    setPlanStartDt(res.planStartDt);
    setPlanStartTime(res.planStartTime);
    setPlanLocation(res.planLocation);
    setPlanContents(res.planContents);
    setPlanCdNm(res.cdNm);
    setIsAuth(location.state.isAuth);
    setIsCompleted(res.planCompleted);
    console.log(location.state.isAuth);
  };
  useEffect(() => {
    getDataOne();
  }, []);
  useEffect(() => {}, [isCompleted]);
  const formDataFunc = formId => {
    let formData = {};
    const form = document.getElementById(formId);

    for (let i = 0; i < form?.elements.length; i++) {
      const element = form.elements[i];
      if (element.type !== "submit") {
        if (element.value !== "") {
          formData[element.name] = element.value;
        }
      }
    }

    return formData;
  };
  useEffect(() => {}, []);
  const handleClick = async () => {
    console.log(location.state.planSeq);
    setIsLoading(true);
    console.log({
      planPartySeq: location.state.planSeq,
      ...formDataFunc("dataForm"),
    });
    try {
      const res = await patchSch({
        planSeq: param.meetingschid,
        ...formDataFunc("dataForm"),
      });
      console.log(param.meetingId);
      toast.success("일정이 수정되었습니다.");
      navigate(`/mymeeting/mymeetingLeader/${location.state.planSeq}`, {
        state: { isAuth: isAuth },
      });
    } catch (error) {
      toast.warning(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickSchComp = async () => {
    setIsLoading(true);
    try {
      console.log(location.state.planSeq);
      const res = await patchSchComp(param.meetingschid);
      console.log(res);
      toast.success("일정이 완료 되었습니다!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("asdlkfjasklfjasdlkj", location);
  const handleClickSchEnter = async () => {
    setIsLoading(true);
    try {
      const res = await postSchJoin(
        location.state.planSeq,
        sessionStorage.getItem("userSeq"),
      );
      toast.success("일정에 참가되었습니다!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(param.meetingschid);
  const handleClickSchDelete = async () => {
    setIsLoading(true);
    try {
      const res = await deleteSchOne(param.meetingschid);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    toast.success("일정이 삭제되었습니다.");
    navigate(`/mymeeting/mymeetingLeader/${location.state.planSeq}`, {
      state: {
        isAuth: isAuth,
      },
    });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <MyMeetingNoticeStyle>
        <div className="notice-wrap">
          <TitleDivStyle>일정 상세페이지</TitleDivStyle>
          <div className="notice-inner">
            <div className="notice-form-area">
              {isAuth === 2 ? (
                <div
                  style={{
                    width: "100%",
                    margin: "0 10px",
                    display: "flex",
                    justifyContent: "end",
                    marginRight: "30px",
                    marginTop: "10px",
                  }}
                >
                  {isCompleted === 2 ? (
                    <>
                      <button
                        className="etc-btn"
                        onClick={() => {
                          toast.warning("일정이 완료된 일정입니다.");
                        }}
                      >
                        일정완료
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="etc-btn"
                        onClick={() => {
                          handleClickSchComp();
                        }}
                      >
                        진행중
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    margin: "0 10px",
                    display: "flex",
                    justifyContent: "end",
                    marginRight: "30px",
                    marginTop: "10px",
                  }}
                >
                  {isCompleted === 2 ? (
                    <>
                      <button
                        className="etc-btn"
                        onClick={() => {
                          toast.warning("일정이 완료된 일정입니다.");
                        }}
                      >
                        참가완료
                      </button>
                      {isCompleted === 2 ? (
                        <button
                          className={"etc-btn"}
                          onClick={() => {
                            navigate("/review/write", {
                              state: {
                                planSeq: location.state.planSeq,
                                planMemberSeq: planMemberSeq,
                                planTitle: planTitle,
                                partyName: location.state.partyName,
                              },
                            });
                          }}
                        >
                          리뷰 작성
                        </button>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <button
                        className="etc-btn"
                        onClick={() => {
                          handleClickSchEnter();
                          // handleClickSchEnter();
                        }}
                      >
                        일정참가
                      </button>
                    </>
                  )}
                </div>
              )}
              <form
                id="dataForm"
                name="dataForm"
                style={{ display: "flex", width: "100%" }}
              >
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
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",

                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <label htmlFor="noticeid">일정명</label>
                          <input
                            id="planTitle"
                            name="planTitle"
                            className="input-style"
                            value={planTitle}
                            style={{ height: "30px", padding: "5px" }}
                            onChange={e => {
                              setPlanTitle(e.target.value);
                            }}
                          />
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",

                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          {/* 앞에서 불러오는데 이거 수정할 때 수정가능하면 데이트 피커 사용해야함 */}
                          <label htmlFor="schDateId">일정날짜</label>
                          <input
                            type="date"
                            id="planStartDt"
                            name="planStartDt"
                            value={planStartDt}
                            className="input-style"
                            onChange={e => {
                              setPlanStartDt(e.target.value);
                            }}
                          />
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",

                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          {/* 앞에서 불러오는데 이거 수정할 때 수정가능하면 데이트 피커 사용해야함 */}
                          <label htmlFor="schDateId">일정시간</label>
                          <input
                            id="planStartTime"
                            name="planStartTime"
                            type="time"
                            className="input-style"
                            style={{ height: "30px", padding: "5px" }}
                            value={planStartTime}
                            onChange={e => {
                              setPlanStartTime(e.target.value);
                            }}
                          />
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <label htmlFor="noticeid">장소</label>
                          <input
                            type="text"
                            id="planLocation"
                            name="planLocation"
                            value={planLocation}
                            className="input-style"
                            onChange={e => {
                              setPlanLocation(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-column">
                    <label htmlFor="noticecontent">일정 소개</label>
                    <textarea
                      type="textarea"
                      id="planContents"
                      name="planContents"
                      value={planContents}
                      className="notice-textarea"
                      rows="3"
                      onChange={e => {
                        setPlanContents(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  {/* <div className="flex-column">
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
                  </div> */}
                  {isAuth === 2 ? (
                    <div className="button-wrap">
                      <button
                        type="button"
                        className="resister-btn"
                        onClick={() => {
                          handleClick();
                        }}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => {
                          if (confirm("삭제하시겠습니까?")) {
                            handleClickSchDelete();
                          }
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  ) : null}
                </div>
                <MyMeetingSchMemberList
                  meetingId={param.meetingschid}
                  setPlanMemberSeq={setPlanMemberSeq}
                ></MyMeetingSchMemberList>
              </form>
            </div>
          </div>
        </div>
      </MyMeetingNoticeStyle>
    </>
  );
};

export default MyMeetingSchDetail;
