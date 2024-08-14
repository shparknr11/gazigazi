import styled from "@emotion/styled";
import {
  FormControl,
  FormControlLabel,
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
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: auto;

  .notice-inner {
    width: 100%;
  }

  .notice-form-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    background-color: #ffffff;
  }

  .meeting-introduce {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  form {
    width: 100%;
  }

  .button-wrap {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    gap: 20px;
  }

  .flex-column {
    width: 100%;
    text-align: left;
    padding: 20px 0;
  }

  .notice-form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .notice-textarea {
    resize: vertical;
    padding: 10px;
    line-height: 1.5;
    width: 100%;
    min-height: 100px;
    box-sizing: border-box;
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
    border-bottom: 1px solid #ddd;
    background-color: #f9f9f9;
  }

  .member-li {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    background-color: #ffffff;
    transition: background-color 0.3s;

    span {
      padding: 10px 0;
      cursor: pointer;
      transition: color 0.3s;
    }

    &:hover {
      background-color: #f0f0f0;
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
  const [formData, setFormData] = useState({
    imgFile: null,
    imgUrl: "",
    textAreaVal: "",
    money: "",
    memberName: "",
    memberSeq: "",
    budgetDt: "",
  });

  const [memberList, setMemberList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dateYear = new Date().getFullYear();
  const lastDay = new Date(dateYear, monthValue, 0).getDate();
  const params = useParams();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getMember(params.meetingId);
        setMemberList(res || []);
      } catch (error) {
        console.error("Failed to fetch members:", error);
        setMemberList([]);
      }
    };

    fetchMembers();
  }, [params.meetingId]);

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "money") {
      const cleanedValue = value.replace(/,/g, "");
      if (!isNaN(cleanedValue) && /^[0-9]*$/.test(cleanedValue)) {
        const formattedValue = Number(cleanedValue).toLocaleString();
        setFormData(prev => ({ ...prev, money: formattedValue }));
      } else {
        toast.warning("숫자 이외의 값은 입력이 불가능합니다.");
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imgFile: file, imgUrl: fileUrl }));
    }
  };

  const handleMemberClick = member => {
    if (confirm(`${member.userName}님을 등록하시는게 맞습니까?`)) {
      setFormData(prev => ({
        ...prev,
        memberName: member.userName,
        memberSeq: member.memberSeq,
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const { imgFile, money, memberSeq, budgetDt } = formData;

    if (!imgFile || !memberSeq || !money || !budgetDt) {
      toast.warning("모든 필수값을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    const form = {
      budgetPartySeq: Number(params.meetingId),
      budgetMemberSeq: memberSeq,
      budgetAmount: money.replaceAll(",", ""),
      budgetGb: "1",
      budgetDt,
      ...formData,
    };

    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "p",
        new Blob([JSON.stringify(form)], { type: "application/json" }),
      );
      formDataToSend.append("budgetPic", imgFile);

      await postBudget(formDataToSend);
      toast.success("회계 정보가 저장되었습니다.");
      handleBudgetClick(monthValue);
    } catch (error) {
      toast.error(error.message || "예기치 못한 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
      setIsPopup(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <MyMeetingNoticeStyle>
      <div className="notice-wrap">
        <div className="notice-inner">
          <div className="notice-form-area">
            <form id="formData" onSubmit={handleSubmit}>
              <div className="form-header">
                <span>영수증 이미지</span>
                <span>입금 내역 등록</span>
                <span>일정 멤버 리스트</span>
              </div>
              <div className="meeting-introduce">
                <div className="image-upload-section">
                  <label htmlFor="budgetPic">
                    {formData.imgUrl ? (
                      <img
                        src={formData.imgUrl}
                        style={{ width: "200px", height: "200px" }}
                      />
                    ) : (
                      <>
                        <CiImageOff size="216" />
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
                      accept="image/jpg, image/png, image/gif"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <div className="form-input-section">
                  <div className="form-group">
                    <label htmlFor="memberName">
                      <strong style={{ color: "red" }}>*</strong>멤버명
                    </label>
                    <input
                      id="memberName"
                      name="memberName"
                      type="text"
                      value={formData.memberName}
                      readOnly
                      placeholder="멤버리스트에서 선택해주세요."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="budgetAmount">
                      <strong style={{ color: "red" }}>*</strong>금액
                    </label>
                    <input
                      id="budgetAmount"
                      name="money"
                      type="text"
                      value={formData.money}
                      onChange={handleInputChange}
                      maxLength={8}
                      placeholder="금액은 15자리까지 입력가능합니다."
                    />
                    <span style={{ fontSize: "13px" }}>
                      <strong style={{ color: "red" }}>*</strong>금액은
                      8자리까지 가능합니다.
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budgetDt">
                      <strong style={{ color: "red" }}>*</strong>날짜
                    </label>
                    <input
                      id="budgetDt"
                      name="budgetDt"
                      type="date"
                      value={formData.budgetDt}
                      onChange={handleInputChange}
                      min={`${dateYear}-${monthValue}-01`}
                      max={`${dateYear}-${monthValue}-${lastDay}`}
                    />
                  </div>

                  <div className="flex-column">
                    <label htmlFor="budgetText">입출금 상세 내역</label>
                    <textarea
                      id="budgetText"
                      name="budgetText"
                      className="notice-textarea"
                      rows="4"
                      value={formData.textAreaVal}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          textAreaVal: e.target.value,
                        }))
                      }
                      maxLength={300}
                    />
                    <div style={{ textAlign: "right" }}>
                      <span>
                        <strong style={{ color: "red" }}>*</strong>제한 숫자
                        {formData.textAreaVal.length}/300
                      </span>
                    </div>
                  </div>
                </div>
                <div className="member-list-section">
                  <ul>
                    <li className="member-title-li">
                      <span>이름</span>
                      <span>닉네임</span>
                    </li>
                    {memberList.length > 0 ? (
                      memberList.map(item => (
                        <li
                          className="member-li"
                          key={item.memberSeq}
                          onClick={() => handleMemberClick(item)}
                        >
                          <span>{item.userName}</span>
                          <span>{item.userNickname}</span>
                        </li>
                      ))
                    ) : (
                      <li>등록된 멤버가 없습니다.</li>
                    )}
                  </ul>
                </div>
              </div>
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
            </form>
          </div>
        </div>
      </div>
    </MyMeetingNoticeStyle>
  );
};

export default MyMeetingBudgetResister;
