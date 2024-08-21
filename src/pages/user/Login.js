import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import mainlogo from "../../images/logo2.png";
import googleLogo from "../../images/chrome_888846.png";
import naverLogo from "../../images/naver.jpg";
import kakaoLogo from "../../images/free-icon-kakao-talk-3991999.png";
import { setUser } from "../../slices/userSlice";

const LoginStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
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
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    width: 100%;
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
  }
  .login-options a:hover {
    text-decoration: underline;
  }

  /* 소셜 로그인 버튼 스타일 */
  .social-buttons {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .social-buttons a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 16px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  .social-buttons a img {
    height: 20px; /* 로고 이미지 크기 */
    margin-right: 10px; /* 로고와 텍스트 간의 간격 */
  }
  .social-buttons a.google {
    background-color: #4285f4;
  }
  .social-buttons a.naver {
    background-color: #1ec800;
  }
  .social-buttons a.kakao {
    background-color: #ffeb00;
    color: #3c1e1e;
  }
  .social-buttons a.google:hover {
    background-color: #357ae8;
  }
  .social-buttons a.naver:hover {
    background-color: #17b300;
  }
  .social-buttons a.kakao:hover {
    background-color: #f7e600;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const host = window.location.origin;
    setRedirectUrl(`${host}/oauth/redirect`);
    const token = sessionStorage.getItem("token");
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (token && userData) {
      dispatch(setUser({ ...userData, token }));
      navigate("/");
    }
  }, [dispatch, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (typeof email === "undefined" || typeof password === "undefined") {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/user/sign_in", {
        userEmail: email,
        userPw: password,
      });

      if (response.data.code === 1) {
        const {
          userSeq,
          userEmail,
          accessToken,
          userPic,
          userName,
          userFav,
          userBirth,
          userPhone,
          userGender,
          userIntro,
          userAddr,
          userRole,
        } = response.data.resultData;

        dispatch(
          setUser({
            userSeq,
            token: accessToken,
            userPic,
            userEmail,
            userName,
            userFav,
            userBirth,
            userPhone,
            userGender,
            userIntro,
            userAddr,
            userRole,
          }),
        );

        sessionStorage.setItem("token", accessToken);
        sessionStorage.setItem(
          "userData",
          JSON.stringify({
            userSeq,
            userPic,
            userEmail,
            userName,
            userFav,
            userBirth,
            userPhone,
            userGender,
            userIntro,
            userAddr,
            userRole,
          }),
        );

        navigate("/");
      } else {
        const { resultMsg } = response.data;
        let errorMessage;

        switch (resultMsg) {
          case "가입되지 않은 계정입니다.":
            errorMessage = "가입되지 않은 계정입니다. 회원가입 해주세요.";
            break;
          case "이메일이 틀립니다. 또는 비밀번호가 틀립니다.":
            errorMessage =
              "이메일이 틀리거나 비밀번호가 틀립니다. 다시 확인해 주세요.";
            break;
          default:
            errorMessage = "로그인에 실패했습니다. 다시 시도해주세요.";
        }

        alert(errorMessage);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.resultMsg ||
        "오류가 발생했습니다. 다시 시도해주세요.";
      alert(errorMsg);
    }
  };

  if (user.token) {
    return null;
  }

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
                      autoComplete="off"
                    />

                    <label htmlFor="password">비밀번호</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="off"
                    />

                    <button type="submit">로그인</button>
                  </form>
                  <div className="login-options">
                    <Link to="/login/findid:pw">이메일 / 비밀번호 찾기</Link>
                    <Link to="/createAccount">회원가입</Link>
                  </div>
                  <div className="social-buttons">
                    <a
                      href={`/oauth2/authorization/google?redirect_uri=${redirectUrl}`}
                      className="google"
                    >
                      <img src={googleLogo} alt="Google Logo" />
                      구글 로그인
                    </a>
                    <a
                      href={`/oauth2/authorization/naver?redirect_uri=${redirectUrl}`}
                      className="naver"
                    >
                      <img src={naverLogo} alt="Naver Logo" />
                      네이버 로그인
                    </a>
                    <a
                      href={`/oauth2/authorization/kakao?redirect_uri=${redirectUrl}`}
                      className="kakao"
                    >
                      <img src={kakaoLogo} alt="Kakao Logo" />
                      카카오 로그인
                    </a>
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
