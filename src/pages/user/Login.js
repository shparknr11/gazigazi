import styled from "@emotion/styled";
import { Link } from "react-router-dom";
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
    background-color: #ebddcc;
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
  return (
    <LoginStyle>
      <LoginWrapStyle>
        <LoginInnerStyle>
          <div className="wrap">
            <main className="main">
              <div className="main-inner">
                <div className="login-container">
                  <img src={mainlogo} alt="mainlogo" className="logo" />
                  <form>
                    <label htmlFor="username">이메일</label>
                    <input
                      type="email"
                      id="username"
                      name="username"
                      required
                    />

                    <label htmlFor="password">비밀번호</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
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
