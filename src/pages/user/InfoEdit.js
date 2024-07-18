import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
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
    token: sessionStorage.getItem("token") || "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null); // 파일 상태 추가

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
      } else if (response.data.code === 0) {
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
    // 새로운 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const { token } = userInfo;

    // JWT 토큰에서 payload 추출
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    const payload = JSON.parse(jsonPayload);
    const userSeq = payload.pk; // payload에서 pk 값 추출

    try {
      const response = await axios.patch(
        "/api/user/update/pw",
        {
          userSeq,
          userPw: password,
          userNewPw: newPassword,
          userPwCheck: confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 추가
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

  const handleUpload = async () => {
    if (!file) {
      alert("프로필 사진을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("userSeq", userInfo.userSeq);
    formData.append("pic", file);

    try {
      const response = await axios.patch("/api/user/pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.code === 1) {
        console.log(response.data);
        alert("프로필 사진이 성공적으로 변경되었습니다.");
      } else {
        console.log(response.data);
        alert("프로필 사진 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 사진 변경 오류:", error);
      alert("프로필 사진 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCancel = () => {
    navigate("/myprofile/:userId/userInfo");
  };

  return (
    <InfoEditStyle>
      <InfoEditWrapStyle>
        <InfoEditInnerStyle>
          <div className="info-container">
            <label>프로필 이미지</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewImage && (
              <img
                src={previewImage}
                alt="미리보기"
                className="image-preview"
              />
            )}
            <button onClick={handleUpload}>프로필 사진 변경</button>
            <button onClick={() => setShowPasswordModal(true)}>
              비밀번호 변경
            </button>
            <label>닉네임</label>
            <input
              type="text"
              name="userNickname"
              value={userInfo.userNickname}
              onChange={handleInputChange}
            />
            <label>주소</label>
            <input
              type="text"
              name="userAddr"
              value={userInfo.userAddr}
              onChange={handleInputChange}
            />
            <label>관심 분야</label>
            <input
              type="text"
              name="userFav"
              value={userInfo.userFav}
              onChange={handleInputChange}
            />
            <label>전화번호</label>
            <input
              type="text"
              name="userPhone"
              value={userInfo.userPhone}
              onChange={handleInputChange}
            />
            <label>소개</label>
            <input
              type="text"
              name="userIntro"
              value={userInfo.userIntro}
              onChange={handleInputChange}
            />
            <button onClick={handleSave}>저장</button>
            <button onClick={handleCancel}>취소</button>
          </div>

          {showPasswordModal && (
            <ModalStyle>
              <div className="modal">
                <div className="modal-content">
                  <h2>비밀번호 변경</h2>
                  <label>현재 비밀번호</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <label>새 비밀번호</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                  <label>새 비밀번호 확인</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                  />
                  <button onClick={handlePasswordChange}>변경</button>
                  <button onClick={() => setShowPasswordModal(false)}>
                    취소
                  </button>
                </div>
              </div>
            </ModalStyle>
          )}
        </InfoEditInnerStyle>
      </InfoEditWrapStyle>
    </InfoEditStyle>
  );
};

export default InfoEdit;
