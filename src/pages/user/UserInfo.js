import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import UserDelete from "./UserDelete";
import LogOut from "./LogOut";

const UserInfoStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: transparent;
`;

const UserInfoWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const UserInfoInnerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  padding: 20px;

  .mypage-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    overflow: hidden;
  }

  .profile-picture-container {
    text-align: center;
    margin-bottom: 10px;
  }

  .profile-picture-container img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }

  .mypage-container label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 12pt;
  }

  .mypage-container input[type="email"],
  .mypage-container input[type="text"],
  .mypage-container input[type="date"],
  .mypage-container input[type="password"] {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 12pt;
  }

  .mypage-container input[readonly] {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }

  .button {
    background-color: #ebddcc;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    width: 35%;
    font-size: 12pt;
    margin: 5px;
    transition: background-color 0.3s;
  }

  .button:hover {
    background-color: #e0b88a;
  }
`;

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [certificationCode, setCertificationCode] = useState("");
  const [isCertifying, setIsCertifying] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailCompleted, setIsEmailCompleted] = useState(false);
  const navigate = useNavigate();
  const userSeq = useSelector(state => state.user.userSeq);
  const userEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    const storedEmailVerified =
      sessionStorage.getItem("isEmailCompleted") === "true";
    setIsEmailCompleted(storedEmailVerified);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userSeq = sessionStorage.getItem("userSeq");
      const token = sessionStorage.getItem("token");

      if (!userSeq) {
        alert("유저 Email을 찾을 수 없습니다. 로그인 상태를 확인하세요.");
        navigate("/login");
        return;
      }

      if (!token) {
        console.error("Token이 없습니다.");
        return;
      }

      try {
        const response = await axios.get(
          `/api/user/${userSeq}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUserData(response.data.resultData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("정보를 가져오는 것에 실패했습니다. 다시 로그인해주세요.");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1초 후 로딩 종료

    return () => clearTimeout(timeout);
  }, [navigate, userSeq]);

  const sendCertificationCode = async () => {
    if (isEmailCompleted) {
      alert("이미 인증된 계정입니다.");
      return;
    }
    try {
      await axios.post(`/mailSend`, { userEmail });
      alert("인증 코드가 이메일로 발송되었습니다.");
      setIsCertifying(true);
    } catch (error) {
      alert("인증 코드 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const verifyCertificationCode = async () => {
    try {
      const response = await axios.post(`/mailauthCheck`, {
        userEmail,
        authNum: certificationCode,
      });
      if (response.data.code === 1) {
        alert("이메일 인증이 완료되었습니다.");
        setIsEmailVerified(true);
        setIsCertifying(false);
        setIsEmailCompleted(true);
        sessionStorage.setItem("isEmailCompleted", "true");
      } else {
        alert("인증 코드가 잘못되었습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("인증 코드 검증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  if (!userData) {
    return <div>사용자 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <UserInfoStyle>
      <UserInfoWrapStyle>
        <UserInfoInnerStyle>
          <div className="mypage-container">
            <div className="profile-picture-container">
              <img
                src={`/pic/user/${userSeq}/${userData.userPic || "default.png"}`}
                alt="프로필 사진"
                id="profilePreview"
              />
            </div>
            <label>
              <span>이메일</span>
              <input type="email" value={userData.userEmail} readOnly />
              {isCertifying && (
                <>
                  <input
                    type="text"
                    value={certificationCode}
                    onChange={e => setCertificationCode(e.target.value)}
                    placeholder="인증번호 입력"
                  />
                  <button
                    className="button"
                    type="button"
                    onClick={verifyCertificationCode}
                  >
                    인증하기
                  </button>
                </>
              )}
              <button
                className="button"
                type="button"
                onClick={sendCertificationCode}
                disabled={isEmailCompleted}
              >
                {isEmailCompleted ? "인증완료" : "인증코드 발송"}
              </button>
            </label>
            <label>
              <span>이름</span>
              <input type="text" value={userData.userName} readOnly />
            </label>
            <label>
              <span>비밀번호</span>
              <input type="password" value={userData.userPw} readOnly />
            </label>
            <label>
              <span>비밀번호 확인</span>
              <input type="password" value={userData.userPwCheck} readOnly />
            </label>
            <label>
              <span>닉네임</span>
              <input type="text" value={userData.userNickname} readOnly />
            </label>
            <label>
              <span>주소</span>
              <input type="text" value={userData.userAddr} readOnly />
            </label>
            <label>
              <span>생년 월일</span>
              <input
                type="date"
                value={
                  userData.userBirth ? userData.userBirth.split("T")[0] : ""
                }
                readOnly
              />
            </label>
            <label>
              <span>전화번호</span>
              <input type="text" value={userData.userPhone} readOnly />
            </label>
            <label>
              <span>관심있는 분야</span>
              <input type="text" value={userData.userFav} readOnly />
            </label>
            <label>
              <span>성별</span>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="남성"
                  checked={userData.userGender === 1}
                  disabled
                />
                남
                <input
                  type="radio"
                  name="gender"
                  value="여성"
                  checked={userData.userGender === 2}
                  disabled
                />
                여
              </div>
            </label>
            <label>
              <span>자기 소개</span>
              <input type="text" value={userData.userIntro} readOnly />
            </label>
            <LogOut className="logout-button" />
            <UserDelete className="withdrawal-button" />
          </div>
        </UserInfoInnerStyle>
      </UserInfoWrapStyle>
    </UserInfoStyle>
  );
};

export default UserInfo;
