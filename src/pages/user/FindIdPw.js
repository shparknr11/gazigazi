import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import mainlogo from "../../images/logo2.png";

const FindContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  margin: 0;
`;

const TabMenu = styled.div`
  display: flex;
  border-bottom: 2px solid #ebddcc;
  margin-bottom: 0px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${props => (props.active ? "#ebddcc" : "transparent")};
  border: 1px solid #ebddcc;
  border-radius: 4px 4px 0 0;
  margin-right: 10px;
  font-weight: ${props => (props.active ? "bold" : "normal")};
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0b88a;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .logo {
    display: block;
    margin: 0 auto 20px;
  }
`;

const FindGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
`;

const FindLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  text-align: center;
`;

const FindInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 10px;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #ebddcc;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    background-color: #e0b88a;
  }
`;

const Result = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #333;
`;

const FindId = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleFindIdSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/findid", {
        userName: name,
        userPhone: phoneNumber,
        userBirth: birthDate,
      });
      if (response.data.code === 1) {
        setResultMessage(`이메일: ${response.data.resultData}`);
      } else {
        setResultMessage(
          response.data.resultMsg || "이메일을 찾을 수 없습니다.",
        );
      }
    } catch (error) {
      console.error("이메일 찾기 오류:", error);
      if (error.response?.status === 404) {
        const errorMsg =
          error.response?.data?.message || "존재하지 않는 유저입니다.";
        alert(errorMsg);
      }
      setResultMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <div>
        <img src={mainlogo} alt="mainlogo" className="logo" />
        <form id="find-email-form" onSubmit={handleFindIdSubmit}>
          <FindGroup>
            <FindLabel htmlFor="name">이름</FindLabel>
            <FindInput
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="off"
            />
          </FindGroup>
          <FindGroup>
            <FindLabel htmlFor="phone_number">전화번호</FindLabel>
            <FindInput
              type="text"
              id="phone_number"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              required
              autoComplete="off"
            />
          </FindGroup>
          <FindGroup>
            <FindLabel htmlFor="birth_date">생년월일</FindLabel>
            <FindInput
              type="date"
              id="birth_date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              required
              autoComplete="off"
            />
          </FindGroup>
          <ButtonContainer>
            <Button type="submit">이메일 찾기</Button>
          </ButtonContainer>
          <Result>{resultMessage}</Result>
        </form>
      </div>
    </Container>
  );
};

const FindPw = () => {
  const [email, setEmail] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleFindPwSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.patch("/findpw", {
        userEmail: email,
      });
      if (response.data.code === 1) {
        setResultMessage(`임시 비밀번호: ${response.data.resultData}`);
      } else {
        setResultMessage(
          response.data.resultMsg || "임시 비밀번호 발급에 실패했습니다.",
        );
      }
    } catch (error) {
      setResultMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <div>
        <img src={mainlogo} alt="pw 찾기" className="logo" />
        <form id="find-password-form" onSubmit={handleFindPwSubmit}>
          <FindGroup>
            <FindLabel htmlFor="email">이메일</FindLabel>
            <FindInput
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </FindGroup>
          <ButtonContainer>
            <Button type="submit">비밀번호 발급</Button>
          </ButtonContainer>
          <Result>{resultMessage}</Result>
        </form>
      </div>
    </Container>
  );
};

const FindAccount = () => {
  const [activeTab, setActiveTab] = useState("findId");

  return (
    <FindContainer>
      <TabMenu>
        <Tab
          active={activeTab === "findId"}
          onClick={() => setActiveTab("findId")}
        >
          이메일 찾기
        </Tab>
        <Tab
          active={activeTab === "findPw"}
          onClick={() => setActiveTab("findPw")}
        >
          비밀번호 찾기
        </Tab>
      </TabMenu>
      {activeTab === "findId" && <FindId />}
      {activeTab === "findPw" && <FindPw />}
    </FindContainer>
  );
};

export default FindAccount;
