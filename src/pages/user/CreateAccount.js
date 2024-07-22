import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #fff;
`;

const AccountWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const AccountInnerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .signup-container {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
  }
  .main-create-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .profile-picture-container {
    text-align: center;
    margin-bottom: 15px;
  }
  .profile-picture {
    display: block;
    margin: 0 auto 10px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
  }
  .create-profile-picture-input {
  }
  .main-create-detail label {
    display: block;
    width: 90%;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .main-create-detail input[type="email"],
  .main-create-detail input[type="password"],
  .main-create-detail input[type="text"],
  .main-create-detail input[type="date"] {
    width: 100%;
    padding: 10px;
    font-size: 10pt;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .email-addres {
    font-size: 10pt;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .create-email-button-group-1,
  .create-nickname-button-group {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  .create-email-button-group-1 input[type="email"] {
    flex: 1;
  }
  .main-create-detail button {
    width: 50%;
    padding: 10px;
    font-size: 10pt;
    cursor: pointer;
    background-color: #ebddcc;
    color: white;
    border: none;
    border-radius: 4px;
    text-align: center;
  }
  .main-create-detail button:hover {
    background-color: #e0b88a;
  }
  .create-button-group {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  .create-button-group button {
    flex: 1;
  }
  .create-gender-group {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .create-gender-group .create-gender-item {
    flex: 1;
  }

  /* Custom styles for asterisk */
  .main-create-detail label .required-asterisk {
    color: red; /* Change color to red for asterisk */
  }
`;

const Message = styled.div`
  color: ${props => (props.success ? "green" : "red")};
  margin-bottom: 10px;
`;

const CreateAccount = () => {
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])\S{10,20}$/;
  const emailRegex = /^[a-zA-Z0-9]{6,15}@[a-z]{3,7}\.(com|net){1}$/;
  const nicknameRegex = /^[a-zA-Z0-9가-힣]{4,10}$/;
  const NameRegex = /^[가-힣]{2,6}$/;
  const PhoneRegex = /^01[01](?:\d{3}|\d{4})\d{4}$/;

  const [accountPic, setAccountPic] = useState(null);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const [user, setUser] = useState({
    userPic: "",
    userEmail: "",
    userPw: "",
    userPwCheck: "",
    userName: "",
    userAddr: "",
    userNickname: "",
    userFav: "",
    userBirth: "",
    userGender: "",
    userPhone: "",
    userIntro: "",
  });

  const [messages, setMessages] = useState({
    userPw: "",
    userPwCheck: "",
    userEmail: "",
    userNickname: "",
    userName: "",
    userPhone: "",
    userAddr: "",
    form: "", 
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
        alert("유효한 이미지 파일을 업로드해주세요. (2MB 이하)");
        setAccountPic(null);
        return;
      }
      setAccountPic(file);
    }
  };

  const validateField = (name, value) => {
    const newMessages = { ...messages };
    let isValid = true;
  
    switch (name) {
      case "userPw":
        if (!passwordRegex.test(value)) {
          newMessages.userPw =
            "비밀번호는 최소 10자 이상, 대문자, 숫자, 특수문자를 포함해야 합니다.";
          isValid = false;
        } else {
          newMessages.userPw = "사용할 수 있는 비밀번호입니다.";
        }
        break;
      case "userPwCheck":
        if (value !== user.userPw) {
          newMessages.userPwCheck = "비밀번호가 일치하지 않습니다!";
          isValid = false;
        } else {
          newMessages.userPwCheck = "비밀번호가 일치합니다.";
        }
        break;
      case "userEmail":
        if (!emailRegex.test(value)) {
          newMessages.userEmail = "이메일 형식이 올바르지 않습니다.";
          isValid = false;
        } else {
          newMessages.userEmail = "사용할 수 있는 이메일입니다.";
        }
        break;
      case "userNickname":
        if (!value) {
          newMessages.userNickname = "닉네임을 입력해주세요.";
          isValid = false;
        } else if (!nicknameRegex.test(value)) {
          newMessages.userNickname =
            "닉네임은 영문, 한글, 숫자로 4~10자리로 구성되어야 합니다.";
          isValid = false;
        } else {
          newMessages.userNickname = "사용할 수 있는 닉네임입니다.";
        }
        break;
      case "userName":
        if (!value) {
          newMessages.userName = "이름을 입력해주세요.";
          isValid = false;
        } else if (!NameRegex.test(value)) {
          newMessages.userName = "이름은 한글 2~6자로 구성되어야 합니다.";
          isValid = false;
        } else {
          newMessages.userName = "사용할 수 있는 이름입니다.";
        }
        break;
      case "userPhone":
        if (!value) {
          newMessages.userPhone = "전화번호를 입력해주세요.";
          isValid = false;
        } else if (!PhoneRegex.test(value)) {
          newMessages.userPhone = "전화번호 형식이 올바르지 않습니다.";
          isValid = false;
        } else {
          newMessages.userPhone = "사용할 수 있는 전화번호입니다.";
        }
        break;
      case "userAddr":
        if (!value) {
          newMessages.userAddr = "주소를 입력해주세요.";
          isValid = false;
        } else {
          newMessages.userAddr = "";
        }
        break;
      default:
        break;
    }
  
    setMessages(newMessages);
    return isValid;
  };
  

  const validateForm = () => {
    const newMessages = { ...messages };
    let valid = true;

    // 기본 유효성 검사
    if (!user.userEmail) {
        newMessages.userEmail = "이메일을 입력해주세요.";
        valid = false;
    } else if (!emailRegex.test(user.userEmail)) {
        newMessages.userEmail = "유효하지 않은 이메일입니다.";
        valid = false;
    }

    if (!user.userPw) {
        newMessages.userPw = "비밀번호를 입력해주세요.";
        valid = false;
    } else if (!passwordRegex.test(user.userPw)) {
        newMessages.userPw = "비밀번호는 6자리 이상이어야 합니다.";
        valid = false;
    }

    if (user.userPw !== user.userPwCheck) {
        newMessages.userPwCheck = "비밀번호 확인이 일치하지 않습니다.";
        valid = false;
    }

    if (!user.userName) {
        newMessages.userName = "이름을 입력해주세요.";
        valid = false;
    } else if (!NameRegex.test(user.userName)) {
        newMessages.userName = "유효하지 않은 이름입니다.";
        valid = false;
    }

    if (!user.userNickname) {
        newMessages.userNickname = "닉네임을 입력해주세요.";
        valid = false;
    } else if (!nicknameRegex.test(user.userNickname)) {
        newMessages.userNickname = "유효하지 않은 닉네임입니다.";
        valid = false;
    }

    if (!user.userAddr) {
        newMessages.userAddr = "주소를 입력해주세요.";
        valid = false;
    }

    if (!user.userBirth) {
        newMessages.userBirth = "생년월일을 입력해주세요.";
        valid = false;
    }

    if (!user.userPhone) {
        newMessages.userPhone = "전화번호를 입력해주세요.";
        valid = false;
    } else if (!PhoneRegex.test(user.userPhone)) {
        newMessages.userPhone = "유효하지 않은 전화번호입니다.";
        valid = false;
    }

    if (!user.userGender) {
        newMessages.userGender = "성별을 선택해주세요.";
        valid = false;
    }

    if (!accountPic) {
        newMessages.form = "프로필 사진을 선택해주세요.";
        valid = false;
    } else {
        newMessages.form = ""; 
    }

    setMessages(newMessages);
    return valid;
};

  const handleSubmit = async e => {
    e.preventDefault();

    const formValid = validateForm();

    if (!formValid) {
      return;
    }

    const formData = new FormData();
    if (accountPic) {
      formData.append("userPic", accountPic);
    }

    // 사용자 정보 추가
    const userData = {
      userEmail: user.userEmail,
      userPw: user.userPw,
      userPwCheck: user.userPwCheck,
      userName: user.userName,
      userAddr: user.userAddr,
      userNickname: user.userNickname,
      userFav: user.userFav,
      userBirth: user.userBirth,
      userGender: user.userGender,
      userPhone: user.userPhone,
      userIntro: user.userIntro,
    };

    formData.append(
      "p",
      new Blob([JSON.stringify(userData)], { type: "application/json" }),
    );

    try {
      const response = await axios.post("/api/user/sign_up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.code === 1) {
        alert("계정이 성공적으로 생성되었습니다!");
        navigate("/login");
      } else {
        alert(response.data.message || "계정 생성에 실패했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const checkDuplication = async (type, value) => {
    if (!value) {
      alert(
        `${type === "userEmail" ? "이메일" : "닉네임"}을(를) 입력해주세요.`,
      );
      return;
    }

    try {
      const num = type === "userEmail" ? 1 : 2;
      const response = await axios.get(`/api/user/duplicated`, {
        params: { str: value, num },
      });

      if (response.data.resultData === 0) {
        alert(
          `중복되지 않는 ${type === "userEmail" ? "이메일" : "닉네임"}입니다!`,
        );
        if (type === "userEmail") {
          setIsEmailChecked(true);
        } else {
          setIsNicknameChecked(true);
        }
      } else {
        alert(
          `이미 존재하는 ${type === "userEmail" ? "이메일" : "닉네임"}입니다.`,
        );
        if (type === "userEmail") {
          setIsEmailChecked(false);
        } else {
          setIsNicknameChecked(false);
        }
      }
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AccountStyle>
      <AccountWrapStyle>
        <AccountInnerStyle>
          <div className="wrap">
            <main className="main">
              <div className="main-inner">
                <div className="signup-container">
                  <form className="main-create-detail" onSubmit={handleSubmit}>
                    <div className="profile-picture-container">
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif"
                        id="profilePicture"
                        name="userPic"
                        onChange={handleImageChange}
                      />
                    </div>
                    <label htmlFor="userEmail">
                      이메일<span className="required-asterisk">*</span>
                      <input
                        type="email"
                        name="userEmail"
                        value={user.userEmail}
                        onChange={handleChange}
                        required
                      />
                      <div className="create-button-group">
                        <button
                          type="button"
                          onClick={() =>
                            checkDuplication("userEmail", user.userEmail)
                          }
                        >
                          중복 확인
                        </button>
                      </div>
                    </label>
                    <Message success={emailRegex.test(user.userEmail)}>
                      {messages.userEmail}
                    </Message>
                    <label>
                      비밀번호<span className="required-asterisk">*</span>
                      <input
                        type="password"
                        name="userPw"
                        value={user.userPw}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <Message success={passwordRegex.test(user.userPw)}>
                      {messages.userPw}
                    </Message>
                    <label>
                      비밀번호 확인<span className="required-asterisk">*</span>
                      <input
                        type="password"
                        name="userPwCheck"
                        value={user.userPwCheck}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <Message success={user.userPw === user.userPwCheck}>
                      {messages.userPwCheck}
                    </Message>
                    <label>
                      이름<span className="required-asterisk">*</span>
                      <input
                        type="text"
                        name="userName"
                        value={user.userName}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <Message success={NameRegex.test(user.userName)}>
                      {messages.userName}
                    </Message>
                    <label>
                      닉네임<span className="required-asterisk">*</span>
                      <div className="create-nickname-button-group">
                        <input
                          type="text"
                          name="userNickname"
                          value={user.userNickname}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            checkDuplication("userNickname", user.userNickname)
                          }
                        >
                          중복 확인
                        </button>
                      </div>
                    </label>
                    <Message success={nicknameRegex.test(user.userNickname)}>
                      {messages.userNickname}
                    </Message>
                    <label>
                      주소<span className="required-asterisk">*</span>
                      <input
                        type="text"
                        name="userAddr"
                        value={user.userAddr}
                        onChange={handleChange}
                      />
                    </label>
                    <Message success={user.userAddr ? true : false}>
                      {messages.userAddr}
                    </Message>
                    <label>
                      생년 월일<span className="required-asterisk">*</span>
                      <input
                        type="date"
                        name="userBirth"
                        value={user.userBirth}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      전화번호<span className="required-asterisk">*</span>
                      <input
                        type="text"
                        name="userPhone"
                        value={user.userPhone}
                        onChange={handleChange}
                      />
                    </label>
                    <Message success={PhoneRegex.test(user.userPhone)}>
                      {messages.userPhone}
                    </Message>
                    <label>
                    관심 분야
                    <input
                type="text"
                name="userIntro"
                value={user.userIntro}
                onChange={handleChange}
              />
              </label>
                    <label>
                      성별<span className="required-asterisk">*</span>
                      <div className="create-gender-group">
                        <div className="create-gender-item">
                          <input
                            type="radio"
                            name="userGender"
                            value="1"
                            onChange={handleChange}
                          />
                          남
                        </div>
                        <div className="create-gender-item">
                          <input
                            type="radio"
                            name="userGender"
                            value="2"
                            onChange={handleChange}
                          />
                          여
                        </div>
                      </div>
                    </label>
                    <label>
                      자기 소개
                      <input
                        type="text"
                        name="userIntro"
                        value={user.userIntro}
                        onChange={handleChange}
                      />
                    </label>
                    <Message success={messages.form === ""}>
                      {messages.form}
                    </Message>
                    <button
                      type="submit"
                      disabled={!isEmailChecked || !isNicknameChecked}
                    >
                      가입 완료
                    </button>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </AccountInnerStyle>
      </AccountWrapStyle>
    </AccountStyle>
  );
};

export default CreateAccount;
