import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserDelete from "./UserDelete";

const MyPageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
`;

const MyPageWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const MyPageInnerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .mypage-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 60%;
    height: 95vh;
    box-sizing: border-box;
  }
  .mypage-container .profile-picture-container {
    text-align: center;
    margin-bottom: 10px;
  }
  .mypage-container .profile-picture-container img {
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
    width: calc(100% - 0px);
    padding: 8px;
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
  .mypage-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .mypage-buttons button {
    padding: 8px 16px;
    font-size: 12pt;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .edit-button {
    background-color: #ebddcc;
    color: white;
  }
  .edit-button:hover {
    background-color: #e0b88a;
  }
  .delete-button {
    background-color: #ebddcc;
    color: white;
  }
  .delete-button:hover {
    background-color: #e0b88a;
  }
`;

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [certificationCode, setCertificationCode] = useState("");
  const [isCertifying, setIsCertifying] = useState(false);
  const navigate = useNavigate();
  const userSeq = useSelector(state => state.userEmail);

  const handleEditClick = () => {
    navigate("/info/:userId");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userSeq = localStorage.getItem("userSeq");
      const token = localStorage.getItem("token");

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
          `http://localhost:3000/api/user/${userSeq}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log(response.data);
        setUserData(response.data.resultData);
      } catch (error) {
        console.error("유저 정보 가져오기 오류:", error);
        if (error.response && error.response.status === 401) {
          alert("정보를 가져오는 것에 실패했습니다. 다시 로그인해주세요.");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, userSeq]);

  const handleCertificationSend = async () => {
    try {
      setLoading(true); // 로딩 상태 시작
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/user/mailSend",
        {
          email: userData.userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        },
      );
      console.log(response.data);
      alert("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
      setIsCertifying(true);
    } catch (error) {
      console.error("인증번호 발송 오류", error);
      alert("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  const handleCertificationCheck = async () => {
    try {
      setLoading(true); // 로딩 상태 시작
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/user/mailauthCheck",
        {
          code: certificationCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        },
      );
      console.log(response.data);
      alert("인증번호가 일치합니다. 인증이 완료되었습니다!");
      setIsCertifying(false);
      setCertificationCode("");
    } catch (error) {
      console.error("인증번호 입력 오류", error);
      alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!userData) {
    return <div>사용자 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <MyPageStyle>
      <MyPageWrapStyle>
        <MyPageInnerStyle>
          <div className="mypage-container">
            <form>
              <div className="profile-picture-container">
                <img
                  src={`http://localhost:3000/images/${userData.userPic}`}
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
                    <button type="button" onClick={handleCertificationCheck}>
                      인증하기
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="certification_button"
                  onClick={handleCertificationSend}
                  disabled={userData.userGb === 0}
                >
                  {userData.userGb === 1 ? "미인증" : "인증완료"}
                </button>
              </label>
              <label>
                <span>이름</span>
                <input type="text" value={userData.userName} readOnly />
              </label>
              <label>
                <span>비밀번호</span>
                <input type="password" placeholder="비밀번호" readOnly />
              </label>
              <label>
                <span>비밀번호 확인</span>
                <input type="password" placeholder="비밀번호 확인" readOnly />
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
                <input type="date" value={userData.userBirth} readOnly />
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
            </form>
            <div className="mypage-buttons">
              <button
                type="button"
                className="edit-button"
                onClick={handleEditClick}
              >
                정보 수정
              </button>
              <UserDelete />
            </div>
          </div>
        </MyPageInnerStyle>
      </MyPageWrapStyle>
    </MyPageStyle>
  );
};

export default MyPage;
