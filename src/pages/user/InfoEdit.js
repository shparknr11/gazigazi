import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InfoEditStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: transparent;
`;

const InfoEditWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const InfoEditInnerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  padding: 20px;

  .info-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
    margin-top: -200px;
  }

  .info-container label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 12pt;
  }

  .info-container input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 12pt;
  }

  .info-container button {
    width: 100%;
    padding: 10px;
    background-color: #ebddcc;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    cursor: pointer;
    margin: 5px 0;
    margin-top: 10px;
  }

  .info-container button:hover {
    background-color: #e0b88a;
  }

  .info-container .image-preview {
    max-width: 200px; /* 이미지의 최대 너비 설정 */
    height: auto; /* 이미지 높이 자동 조정 */
    margin-top: 10px;
    border-radius: 4px;
    object-fit: cover; /* 이미지를 요소에 꽉 채우기 */
  }
`;

const ModalStyle = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
  }

  .modal-content label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .modal-content input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .modal-content button {
    width: 100%;
    padding: 10px;
    background-color: #ebddcc;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    cursor: pointer;
    margin: 5px 0;
  }

  .modal-content button:hover {
    background-color: #e0b88a;
  }
`;

const InfoEdit = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userNickname: sessionStorage.getItem("userNickname") || "",
    userAddr: sessionStorage.getItem("userAddr") || "",
    userFav: sessionStorage.getItem("userFav") || "",
    userPhone: sessionStorage.getItem("userPhone") || "",
    userIntro: sessionStorage.getItem("userIntro") || "",
    userSeq: sessionStorage.getItem("userSeq"),
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSave = async () => {
    const { userSeq } = userInfo;
    try {
      const response = await axios.patch(
        "/api/user/update/myInfo",
        {
          userNickname: userInfo.userNickname,
          userAddr: userInfo.userAddr,
          userFav: userInfo.userFav || null,
          userPhone: userInfo.userPhone,
          userIntro: userInfo.userIntro || null,
          userSeq,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        },
      );

      if (response.data.code === 1) {
        console.log(response.data);
        alert(response.data.message || "정보가 성공적으로 수정되었습니다!");
        navigate(`/myprofile/:userId/userInfo`);
      } else if (response.data === 0) {
        console.log(response.data);
        alert(response.data.message || "정보 수정에 실패했습니다.");
      } else {
        console.log(response.data);
        alert("예상하지 못한 응답이 반환되었습니다.");
      }
    } catch (error) {
      console.error("정보 수정 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const { userSeq } = userInfo;
    try {
      const response = await axios.patch(
        "/api/user/update/pw",
        {
          userEmail: sessionStorage.getItem("userEmail"), // 유저 이메일
          userPw: password, // 현재 비밀번호
          userNewPw: newPassword, // 새로운 비밀번호
          userPwCheck: confirmNewPassword, // 새로운 비밀번호 확인
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        },
      );

      if (response.data.code === 1) {
        console.log(response.data);
        alert(response.data.message || "비밀번호가 성공적으로 변경되었습니다!");
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowPasswordModal(false);
      } else {
        console.log(response.data);
        alert(response.data.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(selectedFile);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("프로필 사진을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("pic", file);

    try {
      const response = await axios.patch("/api/user/pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("프로필 사진이 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("프로필 사진 변경 오류:", error);
      alert("프로필 사진 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setFile(null);
      setPreviewImage(null);
    }
  };

  return (
    <InfoEditStyle>
      <InfoEditWrapStyle>
        <InfoEditInnerStyle>
          <div className="wrap">
            <main className="main">
              <div className="main-inner">
                <div className="info-container">
                  <form>
                    <label htmlFor="profilePic">프로필 사진 선택:</label>
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={handleUpload}
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="프로필 사진 미리보기"
                        className="image-preview"
                      />
                    )}
                    <label htmlFor="userNickname">닉네임</label>
                    <input
                      type="text"
                      id="userNickname"
                      name="userNickname"
                      value={userInfo.userNickname}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="userAddr">주소</label>
                    <input
                      type="text"
                      id="userAddr"
                      name="userAddr"
                      value={userInfo.userAddr}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="userFav">관심 분야</label>
                    <input
                      type="text"
                      id="userFav"
                      name="userFav"
                      value={userInfo.userFav}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="userPhone">전화번호</label>
                    <input
                      type="text"
                      id="userPhone"
                      name="userPhone"
                      value={userInfo.userPhone}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="userIntro">자기소개</label>
                    <input
                      type="text"
                      id="userIntro"
                      name="userIntro"
                      value={userInfo.userIntro}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="info-s-button"
                      onClick={handleSave}
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      className="info-s-button"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      비밀번호 변경
                    </button>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </InfoEditInnerStyle>
      </InfoEditWrapStyle>

      {showPasswordModal && (
        <ModalStyle>
          <div className="modal">
            <div className="modal-content">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="password">현재 비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <label htmlFor="confirmNewPassword">새 비밀번호 확인</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="info-s-button"
                onClick={handlePasswordChange}
              >
                비밀번호 변경
              </button>
              <button
                type="button"
                className="info-s-button"
                onClick={() => setShowPasswordModal(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </ModalStyle>
      )}
    </InfoEditStyle>
  );
};

export default InfoEdit;
