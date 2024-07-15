import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import mainlogo from "../../images/logo2.png";

const LoginStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
`;

const LoginWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoginInnerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .login-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    width: 120%;
  }
  .login-container .logo {
    display: block;
    margin: 0 auto 30px auto;
    text-align: center;
  }
  .login-container label {
    display: block;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 12pt;
  }
  .login-container input[type="email"],
  .login-container input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14pt;
  }
  .login-container button {
    width: 100%;
    padding: 15px;
    background-color: #ebddcc;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  .login-container button:hover {
    background-color: #e0b88a;
  }
  .login-options {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 12pt;
  }
  .login-options a {
    text-decoration: none;
    color: #ebddcc;
  }
  .login-options a:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      alert("이미 로그인된 상태입니다.");
      navigate("/"); // 로그인 후 메인 페이지로 리다이렉트
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/sign_in",
        {
          userEmail: email,
          userPw: password,
        },
      );

      if (response.data.code === 1) {
        const { userSeq, accessToken } = response.data.resultData;
        localStorage.setItem("userSeq", userSeq); // 로컬 스토리지에 userSeq 저장
        localStorage.setItem("token", accessToken); // 로컬 스토리지에 token 저장.

        // Redux에 사용자 정보 저장
        dispatch({ type: "SET_USER", payload: { userSeq, userEmail: email } });

        alert("로그인 성공!");
        navigate(`/myprofile/${userSeq}`);
      } else {
        alert(response.data.resultMsg || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
          "오류가 발생했습니다. 다시 시도해주세요.",
      );
    }
  };

  if (localStorage.getItem("token")) return null;

  return (
    <LoginStyle>
      <LoginWrapStyle>
        <LoginInnerStyle>
          <div className="wrap">
            <main className="main">
              <div className="main-inner">
                <div className="login-container">
                  <img src={mainlogo} alt="mainlogo" className="logo" />
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="username">이메일</label>
                    <input
                      type="email"
                      id="username"
                      name="username"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />

                    <label htmlFor="password">비밀번호</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />

                    <button type="submit">로그인</button>
                  </form>
                  <div className="login-options">
                    <Link to="findid">이메일 찾기</Link>
                    <Link to="findpw">비밀번호 찾기</Link>
                    <Link to="/createAccount">회원가입</Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </LoginInnerStyle>
      </LoginWrapStyle>
    </LoginStyle>
  );
};

export default Login;
