import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import UserDelete from "./UserDelete";
import LogOut from "./LogOut";
// import { setUser, clearUser } from "../../redux/UserRedux/Actions/userActions";
import { setUser, clearUser } from "../../slices/userSlice";

const UserInfoStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
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
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 500px;
    height: auto;
    margin-bottom: 130px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
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
    background-color: #e6e2d5;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    width: 30%;
    font-size: 12pt;
    margin: 5px;
    transition: background-color 0.3s;
  }

  .button:hover {
    background-color: #dcd8c5;
  }
`;

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [certificationCode, setCertificationCode] = useState("");
  const [isCertifying, setIsCertifying] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailCompleted, setIsEmailCompleted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 스토어에서 사용자 정보 가져옴
  // const userSeq = useSelector(state => state.user.userSeq);
  const userEmail = useSelector(state => state.user.userEmail);
  // const token = useSelector(state => state.user.token);
  const userData = useSelector(state => state.user);
  const userSeq = userData.userSeq;
  // const userData = JSON.parse(sessionStorage.getItem("userData"));
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setIsEmailCompleted(userData.isEmailCompleted);
  }, [userData]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userSeq) {
        navigate("/login");
        return;
      }

      if (!token) {
        console.error("Token이 없습니다.");
        return;
      }

      try {
        const response = await axios.get(`/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);

        dispatch(setUser(response.data.resultData));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("정보를 가져오는 것에 실패했습니다. 다시 로그인해주세요.");
          dispatch(clearUser());
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigate, userSeq, token, dispatch]);

  const sendCertificationCode = async () => {
    try {
      const response = await axios.post(
        `/mailSend`,
        { userEmail },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // 서버 응답의 data 속성을 사용하여 처리
      if (response.status === 200) {
        alert(
          response.data.message || "인증 코드가 성공적으로 발송되었습니다.",
        );
        setIsCertifying(true);
        setIsEmailCompleted(false);
      }
    } catch (error) {
      console.error("Error during sendCertificationCode:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          alert(data.message || "이미 인증을 완료한 계정입니다."); // 서버에서 반환한 메시지를 표시
        } else if (status === 400) {
          alert(data.message || "잘못된 요청입니다. 다시 시도해주십시오.");
        } else {
          alert(
            data.message ||
              "인증 코드 발송에 실패했습니다. 다시 시도해주십시오.",
          );
        }
      }
    }
  };

  const verifyCertificationCode = async () => {
    try {
      const response = await axios.post(
        `/mailauthCheck`,
        {
          userEmail,
          authNum: certificationCode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.code === 1) {
        alert("이메일 인증이 완료되었습니다.");
        setIsEmailVerified(true);
        setIsCertifying(false);
        setIsEmailCompleted(true);
        dispatch(setUser({ isEmailCompleted: true })); // Redux 상태 업데이트
      } else {
        // 서버 응답의 code 값에 따라 메시지 처리
        alert("인증 코드가 잘못되었습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          // 유효 시간 만료 등의 에러 처리
          alert(
            data.message ||
              "인증번호의 유효 시간이 만료되었습니다. 새로운 인증코드를 발급해주세요.",
          );
        } else {
          alert(
            data.message || "인증 코드 검증에 실패했습니다. 다시 시도해주세요.",
          );
        }
      }
    }
  };

  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  if (!userSeq) {
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
              <input type="email" value={userEmail} readOnly />
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
            {/* <label>
              <span>비밀번호</span>
              <input type="password" value={userData.userPw} readOnly />
            </label>
            <label>
              <span>비밀번호 확인</span>
              <input type="password" value={userData.userPwCheck} readOnly />
            </label> */}
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
