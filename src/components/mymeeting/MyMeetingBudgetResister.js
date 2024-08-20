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
  background-color: rgba(247, 235, 213, 0.8);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .notice-wrap {
    width: 90%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }

  .notice-form-area {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    height: 600px;
    width: 100%;
    max-width: 900px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
  }

  .meeting-introduce {
    display: flex;
    width: 100%;
    justify-content: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
  }

  form {
    width: 100%;
  }

  .button-wrap {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    gap: 20px;
  }

  .flex-column {
    width: 100%;
    text-align: left;
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
    line-height: 1.5;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
  }

  .member-title-li {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    background-color: #f9f9f9;
  }

  .member-li {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 400;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .member-li:hover {
    background-color: #f0f0f0;
  }
`;

const TitleDivStyle = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  color: black;
  padding: 20px 0 10px 5px;
`;

const MyMeetingBudgetResister = ({
  setIsPopup,
  handleBudgetClick,
  monthValue,
}) => {
  const [imgUrl, setImgUrl] = useState("");
  const [textAreaVal, setTextAreaVal] = useState("");
  const [textAreaLength, setTextAreaLength] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [money, setMoney] = useState("");
  const [sendFile, setSendFile] = useState(null);
  const [previewPreImg, setPreviewPreImg] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [memberSeq, setMemberSeq] = useState(null);
  const [budgetGb, setBudgetGb] = useState("1"); // 기본값을 '입금'으로 설정
  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const dateYear = new Date().getFullYear();
  const lastDay = new Date(dateYear, monthValue, 0).getDate();
  const params = useParams();

  const imgOnError = () => {
    setImgError(true);
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleChange = e => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value) && /^[0-9]*$/.test(value)) {
      const formattedValue = Number(value).toLocaleString();
      setMoney(formattedValue);
    } else {
      toast.warning("숫자 이외의 값은 입력이 불가능합니다.");
    }
  };

  const formDataFunc = formId => {
    let formData = {};
    const form = document.getElementById(formId);
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
    const tempFile = e?.target.files[0];
    if (tempFile) {
      const tempUrl = URL?.createObjectURL(tempFile);
      setPreviewPreImg(tempUrl);
      setImgFile(tempFile);
    }
  };

  const handleClick = async e => {
    e.preventDefault();

    const formData = new FormData();
    const form = {
      budgetPartySeq: Number(params.meetingId),
      ...formDataFunc("formData"),
      budgetAmount: formDataFunc("formData").budgetAmount
        ? formDataFunc("formData").budgetAmount.replaceAll(",", "")
        : "",
      budgetGb: budgetGb, // 숫자 값을 그대로 사용
    };

    if (!imgFile) {
      toast.warning("영수증 사진은 필수값입니다.");
      return;
    }
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
      toast.warning("입금날짜는 필수값입니다.");
      document.getElementById("budgetDt").focus();
      return;
    }

    delete form.memberName;
    const infoData = JSON.stringify(form);
    const dto = new Blob([infoData], { type: "application/json" });
    formData.append("p", dto);
    formData.append("budgetPic", imgFile);

    try {
      await postBudget(formData);
      toast.success("회계 정보가 저장되었습니다.");
      setIsPopup(false);
      handleBudgetClick(monthValue);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBudgetChange = e => {
    setBudgetGb(Number(e.target.value)); // 숫자로 설정
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
    return <Loading />;
  }

  return (
    <MyMeetingNoticeStyle>
      <div className="notice-wrap">
        <div className="notice-form-area">
          <form id="formData" name="formData" onSubmit={handleClick}>
            <div className="meeting-introduce">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span style={{ marginLeft: "60px" }}>영수증 이미지</span>
                <span style={{ marginRight: "-10px" }}>
                  입금/출금 내역 등록
                </span>
                <span style={{ marginRight: "60px" }}>일정 멤버 리스트</span>
              </div>
            </div>
            <div className="meeting-introduce">
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="budgetPic"
                  style={{ cursor: "pointer", display: "block" }}
                >
                  {previewPreImg ? (
                    <img
                      src={previewPreImg || `/www/images/` + imgUrl}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      onError={imgOnError}
                    />
                  ) : (
                    <>
                      <CiImageOff size="216" style={{ textAlign: "center" }} />
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
                    style={{ display: "none" }}
                    accept="image/jpg, image/png, image/gif"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div
                style={{
                  width: "40%",
                  padding: "0 20px",
                  borderLeft: "1px solid #ddd",
                  borderRight: "1px solid #ddd",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div>
                    <label htmlFor="memberSeq">
                      <strong style={{ color: "red" }}>*</strong>멤버명
                    </label>
                    <input
                      id="memberName"
                      name="memberName"
                      type="text"
                      value={memberName}
                      readOnly
                      placeholder="멤버리스트에서 선택해주세요."
                    />
                    <input
                      id="budgetMemberSeq"
                      name="budgetMemberSeq"
                      type="number"
                      value={memberSeq}
                      style={{ display: "none" }}
                      readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="budgetAmount">
                      <strong style={{ color: "red" }}>*</strong>금액
                    </label>
                    <input
                      id="budgetAmount"
                      name="budgetAmount"
                      type="text"
                      value={money}
                      maxLength={8}
                      onChange={handleChange}
                      placeholder="금액은 8자리까지 입력가능합니다."
                    />
                  </div>

                  <div>
                    <label htmlFor="budgetDt">
                      <strong style={{ color: "red" }}>*</strong>날짜
                    </label>
                    <input
                      id="budgetDt"
                      name="budgetDt"
                      min={`${dateYear}-${monthValue}-01`}
                      max={`${dateYear}-${monthValue}-${lastDay}`}
                      type="date"
                    />
                  </div>

                  <div className="flex-column">
                    <label htmlFor="budgetText">상세 내역</label>
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
                    />
                    <div style={{ textAlign: "right", color: "#666" }}>
                      <strong style={{ color: "red" }}>*</strong>
                      제한 숫자 {textAreaLength}/300
                    </div>
                  </div>

                  <div>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        <strong style={{ color: "red" }}>*</strong>입출금 종류
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-label="budgetGb"
                        name="budgetGb"
                        value={budgetGb}
                        onChange={handleBudgetChange}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label="입금"
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label="출금"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div style={{ width: "30%", borderLeft: "1px solid #ddd" }}>
                <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
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
                          confirm(`${item.userName}님을 등록하시는게 맞습니까?`)
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
                <button type="submit" className="resister-btn">
                  등록
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => setIsPopup(false)}
                >
                  취소
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MyMeetingNoticeStyle>
  );
};

export default MyMeetingBudgetResister;
