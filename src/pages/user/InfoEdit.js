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
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userNickname: sessionStorage.getItem("userNickname") || "",
    userAddr: sessionStorage.getItem("userAddr") || "",
    userFav: sessionStorage.getItem("userFav") || "",
    userPhone: sessionStorage.getItem("userPhone") || "",
    userIntro: sessionStorage.getItem("userIntro") || "",
    userSeq: sessionStorage.getItem("userSeq"),
  });

  const originalInfo = { ...userInfo };

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

      if (response.data.status === 1) {
        console.log(response.data);
        alert(response.data.message || "정보가 성공적으로 수정되었습니다!");
        navigate(`/myprofile/${userInfo.userSeq}`);
      } else {
        alert(response.data.message || "정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("정보 수정 오류:", error);
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

  const handleCancel = () => {
    setUserInfo(originalInfo);
    navigate(`/myprofile/${userInfo.userSeq}`);
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
                        onClick={handleCancel}
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
