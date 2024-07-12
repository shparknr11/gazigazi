import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

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
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 150%;
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
    display: none;
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
`;

const CreateAccount = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    userNickname: "",
    userAddr: "",
    userBirth: "",
    userPhone: "",
    userFav: "",
    userGender: "",
    userIntro: "",
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    if (form.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(form.password)) {
      alert(
        "비밀번호는 최소 8자 이상, 대문자, 숫자, 특수문자를 포함해야 합니다.",
      );
      return;
    }
    try {
      const response = await axios.post("/api/user/sign_up", form);
      if (response.data.success) {
        alert("계정이 성공적으로 생성되었습니다!");
      } else {
        alert("계정 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("계정 생성 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const checkEmailDuplication = async () => {
    if (!emailRegex.test(form.email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (form.email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(`/api/user/duplicated?str=1&num=2`, {
        params: {
          email: form.email,
        },
      });

      if (response.data.exists) {
        alert("이미 존재하는 이메일입니다. 이메일을 다시 확인해주세요!");
      } else {
        alert("사용 가능한 이메일입니다! 다음 단계로 이행해주세요!");
      }
    } catch (error) {
      console.error("이메일 중복 확인 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const checkNickNameDuplication = async () => {
    try {
      const response = await axios.get(`/api/user/duplicated?str=1&num=2`, {
        nickname: form.userNickname,
      });
      // 입력된 이메일이 유효할 경우
      if (response.data.exists) {
        alert("이미 존재하는 닉네임입니다. 닉네임을 다시 확인해주세요!");
      } else {
        alert("사용 가능한 닉네임입니다! 다음 단계로 이행해주세요!");
      }
    } catch (error) {
      console.error("이메일 중복 확인 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const ProfilePicture = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
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
                      <img
                        src="https://via.placeholder.com/100"
                        alt="프로필 사진"
                        className="profile-picture"
                        id="profilePreview"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        id="profilePicture"
                        className="create-profile-picture-input"
                        name="userPic"
                        onChange={handleImageChange}
                      />
                    </div>
                    <label htmlFor="userEmail">
                      <small>이메일*</small>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                      <div className="create-button-group-1">
                        <button type="button" onClick={checkEmailDuplication}>
                          중복 확인
                        </button>
                      </div>
                    </label>
                    <label>
                      비밀번호*
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      비밀번호 확인*
                      <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      이름*
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      닉네임
                      <div className="create-nickname-button-group">
                        <input
                          type="text"
                          name="userNickname"
                          value={form.userNickname}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={checkNickNameDuplication}
                        >
                          중복 확인
                        </button>
                      </div>
                    </label>
                    <label>
                      주소
                      <input
                        type="text"
                        name="userAddr"
                        value={form.userAddr}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      생년 월일*
                      <input
                        type="date"
                        name="userBirth"
                        value={form.userBirth}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      전화번호
                      <input
                        type="text"
                        name="userPhone"
                        value={form.userPhone}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      관심있는 분야
                      <input
                        type="text"
                        name="userFav"
                        value={form.userFav}
                        onChange={handleChange}
                      />
                    </label>
                    <label className="create-gender-group">
                      성별*
                      <div className="create-gender-item">
                        <input
                          type="radio"
                          name="userGender"
                          value="남성"
                          onChange={handleChange}
                        />
                        남
                      </div>
                      <div className="create-gender-item">
                        <input
                          type="radio"
                          name="userGender"
                          value="여성"
                          onChange={handleChange}
                        />
                        여
                      </div>
                    </label>
                    <label>
                      자기 소개
                      <input
                        type="text"
                        name="userIntro"
                        value={form.userIntro}
                        onChange={handleChange}
                      />
                    </label>
                    <button type="submit">가입 완료</button>
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
