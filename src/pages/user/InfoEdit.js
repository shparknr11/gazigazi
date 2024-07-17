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
    width: 150%;
    box-sizing: border-box;
    margin-top: -480px;
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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
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
                    <button
                      type="button"
                      className="info-s-button"
                      onClick={handleSave}
                    >
                      저장
                    </button>
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
