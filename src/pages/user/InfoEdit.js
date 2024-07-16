import styled from "@emotion/styled";
import mainlogo from "../../images/logo2.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InfoEditStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #fff;
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
  justify-content: center;
  align-items: center;
  padding: 20px;

  .info-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 125%;
    box-sizing: border-box;
  }
  .profile-picture-container {
    text-align: center;
    margin-bottom: 15px;
    position: relative;
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
    display: none; /* 파일 입력 요소를 숨김 */
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
  .info-container .input-group {
    display: flex;
    align-items: start;
    margin-bottom: 0px;
  }
  .info-container .input-group input {
    flex: 1;
    margin-right: 10px;
  }
  .info-container .input-group button {
    width: auto;
    padding: 10px;
    background-color: #ebddcc;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    cursor: pointer;
  }
  .info-container button {
    width: calc(50% - 80px);
    padding: 10px;
    background-color: #ebddcc;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    cursor: pointer;
    margin: 5px;
  }
  .info-container button:hover {
    background-color: #e0b88a;
  }
  .info-container .button-group {
    display: flex;
    justify-content: space-between;
  }
`;

const InfoEdit = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    address: "",
    interests: "",
    phone_number: "",
    introduction: "",
  });

  const navigate = useNavigate();
  const [originalInfo, setOriginalInfo] = useState({ ...userInfo });
  const [profilePic, setProfilePic] = useState(mainlogo);

  useEffect(() => {
    // 서버에서 기존 사용자 정보를 가져오는 코드
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/user/update/myInfo");
        setUserInfo(response.data);
        setOriginalInfo(response.data);
        setProfilePic(response.data.profilePic || mainlogo);
      } catch (error) {
        console.error("사용자 정보 가져오기 오류:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
        alert("유효한 이미지 파일을 업로드해주세요. (2MB 이하)");
        return;
      }
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (profilePic !== mainlogo) {
        formData.append("profilePic", profilePic);
      }
      formData.append(
        "userInfo",
        new Blob([JSON.stringify(userInfo)], { type: "application/json" }),
      );

      const response = await axios.post("/api/user/update/myInfo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("정보가 성공적으로 수정되었습니다!");
        setOriginalInfo(userInfo);
      } else {
        alert(response.data.message || "정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("정보 수정 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    setUserInfo(originalInfo);
    setProfilePic(originalInfo.profilePic || mainlogo);
  };

  const handleCancele = () => {
    navigate("/myprofile/:userId"); //
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
                    <div className="profile-picture-container">
                      <img
                        src={profilePic}
                        alt="프로필 사진"
                        className="profile-picture"
                        id="profilePreview"
                        onClick={() =>
                          document.getElementById("profilePicture").click()
                        }
                      />
                      <input
                        type="file"
                        accept="image/*"
                        id="profilePicture"
                        className="create-profile-picture-input"
                        onChange={handleImageChange}
                      />
                    </div>
                    <label htmlFor="nickname">닉네임</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={userInfo.nickname}
                        onChange={handleChange}
                      />
                      <button type="button" className="info-n-button">
                        중복 확인
                      </button>
                    </div>
                    <label htmlFor="address">주소</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={userInfo.address}
                      onChange={handleChange}
                    />
                    <label htmlFor="interests">관심 분야</label>
                    <input
                      type="text"
                      id="interests"
                      name="interests"
                      value={userInfo.interests}
                      onChange={handleChange}
                    />
                    <label htmlFor="phone_number">전화번호</label>
                    <input
                      type="text"
                      id="phone_number"
                      name="phone_number"
                      value={userInfo.phone_number}
                      onChange={handleChange}
                    />
                    <label htmlFor="introduction">자기소개</label>
                    <input
                      type="text"
                      id="introduction"
                      name="introduction"
                      value={userInfo.introduction}
                      onChange={handleChange}
                    />
                    <div className="button-group">
                      <button
                        type="button"
                        className="info-s-button"
                        onClick={handleSave}
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        className="info-e-button"
                        onClick={handleCancele}
                      >
                        취소
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </InfoEditInnerStyle>
      </InfoEditWrapStyle>
    </InfoEditStyle>
  );
};

export default InfoEdit;
