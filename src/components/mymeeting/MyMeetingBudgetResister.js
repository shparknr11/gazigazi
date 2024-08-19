import styled from "@emotion/styled";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { toast } from "react-toastify";
import {
  getMember,
  postBudget,
} from "../../apis/mymeetingapi/budget/budgetapi";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
const MyMeetingNoticeStyle = styled.div`
  position: fixed;
  background-color: #f7ebd5a1;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  .notice-wrap {
    position: absolute;
    top: 11%;
    left: 27%;
    width: 100%;
    /* height: 650px; */
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
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    height: 600px;
    /* max-width: 900px; */
    border: 1px solid gray;
    border-radius: 4px;
    box-shadow: 1px 1px 1px 1px gray;
  }
  .meeting-introduce {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 45px;
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
  label {
    font-size: 16px;
    font-weight: bold;
  }
  .member-title-li {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid gray;
  }
  .member-li {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid gray;
    span {
      padding: 10px 0;
      cursor: pointer;
    }
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
const MyMeetingBudgetResister = ({
  setIsPopup,
  handleBudgetClick,
  monthValue,
}) => {
  // todo : 가계부 등록 창
  const [imgUrl, setImgUrl] = useState("");
  const [textAreaVal, setTextAreaVal] = useState("");
  const [textAreaLength, setTextAreaLength] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [money, setMoney] = useState(0);
  const [sendFile, setSendFile] = useState(null);
  const [previewPreImg, setPreviewPreImg] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [memberSeq, setMemberSeq] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [IsClicked, setIsClicked] = useState();
  const dateYear = new Date().getFullYear();
  const lastDay = new Date(dateYear, monthValue, 0).getDate();
  const params = useParams();
  const imgOnError = () => {
    setImgError(true);
  };
  useEffect(() => {}, [previewPreImg]);
  useEffect(() => {
    getMembers();
  }, []);
  const handleChange = e => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value) && /^[0-9]*$/.test(value)) {
      // 숫자인지 확인
      const formattedValue = Number(value).toLocaleString();
      setMoney(formattedValue);
    } else {
      // 모달이나 이런걸로 변경 해야함
      alert("숫자 이외의 값은 입력이 불가능합니다.");
      // 글자를 여러번 입력 시 많이 뜸 _ 이부분은 조금 수정 필요
      // toast.warning("숫자 이외의 값은 입력이 불가능합니다.");
    }
  };

  const formDataFunc = formId => {
    let formData = {};
    const form = document.getElementById(formId);
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

  const handleFileChange = e => {
    // file 이라서 e.target.value 를 활용하지 않는다.
    // e.taret.files 는 배열이다.
    // e.target.files = [];

    const tempFile = e?.target.files[0];
    // 사용자가 이미지를 선택하면
    // 웹브라우저는 이미지를 캐시에 보관함.
    // 임시 공간에 저장한 이미지를 우리는 경로를 알아내야 한다.
    // 그때 웹브라우저 상의 임시 URL 을 알아내는 기능 제공한다.
    if (tempFile) {
      const tempUrl = URL?.createObjectURL(tempFile);

      setPreviewPreImg(tempUrl);

      // 전송할 파일 변경(주의합니다. 파일을 넣어주세요.)
      setImgFile(tempFile);
    }
  };
  const handleClick = async e => {
    e.preventDefault();
    // setIsLoading(true);
    // 1. 전송데이터 포맷 만들기
    const formData = new FormData();
    // 모임장 seq, budgetMemberSeq 2개
    const form = {
      budgetPartySeq: Number(params.meetingId),
      ...formDataFunc("formData"),
    };
    form.budgetAmount = form.budgetAmount.replaceAll(",", "");
    form.budgetGb = "1";
    if (!imgFile) {
      toast.warning("영수증 사진은 필수값입니다.");
      return;
    }
    // 3차 때 구분
    // if(!form.budgetGb){
    //   toast.warning("입금 구분은 필수값입니다.");
    //   return;
    // }
    if (!form.budgetMemberSeq) {
      toast.warning("등록할 멤버를 선택해주세요.");
      document.getElementById("budgetAmount").focus();
      return;
    }
    if (!form.budgetAmount) {
      toast.warning("금액은 필수값입니다.");
      document.getElementById("budgetAmount").focus();
      return;
    }
    if (!form.budgetDt) {
      document.getElementById("budgetDt").focus();

      toast.warning("입금날짜는 필수값입니다.");
      return;
    }
    delete form.memberName;
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
    formData.append("budgetPic", imgFile);
    // 6. 전송하기 (axios로 전달하기.)

    try {
      await postBudget(formData);
    } catch (error) {
      toast.error(error);
    } finally {
      toast.success("회계 정보가 저장되었습니다.");
      setIsLoading(false);
      setIsPopup(false);
      handleBudgetClick(monthValue);
    }
  };
  const getMembers = async () => {
    try {
      const res = await getMember(params.meetingId);
      setMemberList(res);
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <MyMeetingNoticeStyle>
        <div className="notice-wrap">
          <div className="notice-inner">
            <div className="notice-form-area">
              <form
                id="formData"
                name="formData"
                onSubmit={e => {
                  handleClick(e);
                }}
              >
                {/* <!-- 굳이 해당 모임 타고 들어왔는데 보여줄 필요가 있나 싶어서 뺌 --> */}
                <div
                  style={{
                    display: "flex",
                    gap: "230px",
                    marginBottom: "20px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  <span>영수증 이미지</span>
                  <span>입금 내역 등록</span>
                  <span style={{ marginLeft: "33px" }}>일정 멤버 리스트</span>
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "end",
                  }}
                ></div>
                <div className="meeting-introduce">
                  <div
                    style={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <label
                        htmlFor="budgetPic"
                        style={{ cursor: "pointer", display: "block" }}
                      >
                        {previewPreImg ? (
                          <img
                            src={
                              previewPreImg
                                ? previewPreImg
                                : `/www/images/` + imgUrl
                            }
                            style={{
                              width: "200px",
                              height: "200px",
                            }}
                            onError={imgOnError}
                          />
                        ) : (
                          <>
                            <CiImageOff
                              className="caption-img"
                              size="216"
                              style={{ textAlign: "center" }}
                            />
                            <div>
                              <strong style={{ color: "red" }}>*</strong>영수증
                              이미지는 필수 값입니다.
                            </div>
                          </>
                        )}
                        <input
                          id="budgetPic"
                          name="budgetPic"
                          type="file"
                          style={{ width: 0, height: 0 }}
                          accept="image/jpg, image/png, image/gif"
                          onChange={e => {
                            handleFileChange(e);
                          }}
                        ></input>
                      </label>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "40%",
                      margin: "0 auto",
                      height: "100%",
                      padding: "0 20px",
                      borderLeft: "1px solid gray",
                      borderRight: "1px solid gray",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}
                    >
                      <div
                        style={{
                          display: "none",
                          alignItems: "center",
                          textAlign: "left",
                        }}
                      >
                        <label htmlFor="mettingname" style={{ width: "100%" }}>
                          회비 입금 등록
                        </label>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="1"
                            name="budgetGb"
                          >
                            {/* 나중에 통합적으로 관리 X 현재는 입금 default */}
                            <div hidden>
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="입금"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="출금"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "left",
                        }}
                      >
                        <label htmlFor="memberSeq" style={{ width: "25%" }}>
                          <strong style={{ color: "red" }}>*</strong>
                          멤버명
                        </label>
                        <input
                          id="memberName"
                          name="memberName"
                          type="text"
                          value={memberName}
                          style={{ width: "80%" }}
                          readOnly
                          placeholder="멤버리스트에서 선택해주세요."
                        />
                        <input
                          id="budgetMemberSeq"
                          name="budgetMemberSeq"
                          type="number"
                          value={memberSeq}
                          style={{
                            width: "0px",
                            height: "0px",
                            border: "none",
                          }}
                          readOnly
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "left",
                        }}
                      >
                        <label htmlFor="mettingdata" style={{ width: "31%" }}>
                          <strong style={{ color: "red" }}>*</strong>금액
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <input
                            id="budgetAmount"
                            name="budgetAmount"
                            type="text"
                            style={{ width: "100%" }}
                            value={money}
                            maxLength={8}
                            onChange={e => {
                              handleChange(e);
                            }}
                            placeholder="금액은 15자리까지 입력가능합니다."
                          />
                          <span style={{ fontSize: "13px" }}>
                            <strong style={{ color: "red" }}>*</strong>금액은
                            8자리까지 가능합니다.
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "left",
                        }}
                      >
                        <label htmlFor="budgetDt" style={{ width: "25%" }}>
                          <strong style={{ color: "red" }}>*</strong>날짜
                        </label>
                        <input
                          id="budgetDt"
                          name="budgetDt"
                          min={`${dateYear}-${monthValue}-01`}
                          max={`${dateYear}-${monthValue}-${lastDay}`}
                          type="date"
                          style={{ width: "80%" }}
                        />
                      </div>
                      <div className="flex-column">
                        <label
                          htmlFor="noticecontent"
                          style={{ paddingBottom: "30px", display: "block" }}
                        >
                          입출금 상세 내역
                        </label>
                        <textarea
                          id="budgetText"
                          name="budgetText"
                          className="notice-textarea"
                          rows="4"
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
                    </div>
                  </div>
                  <div style={{ width: "20%", height: "444px" }}>
                    <ul>
                      <li className="member-title-li">
                        <span>이름</span>
                        <span>닉네임</span>
                      </li>
                      {memberList.map(item => (
                        <li
                          className="member-li"
                          key={item.memberSeq}
                          onClick={() => {
                            if (
                              confirm(
                                `${item.userName}님을 등록하시는게 맞습니까?`,
                              )
                            ) {
                              setMemberName(item.userName);
                              setMemberSeq(item.memberSeq);
                            }
                          }}
                        >
                          <span>{item.userName}</span>
                          <span>{item.userNickname}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="noitce-form-container">
                  <div className="button-wrap">
                    <button
                      type="submit"
                      className="resister-btn"
                      onClick={() => {}}
                    >
                      등록
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => {
                        setIsPopup(false);
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

export default MyMeetingBudgetResister;
