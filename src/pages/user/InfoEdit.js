import styled from "@emotion/styled";
import mainlogo from "../../images/logo2.png";

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
                        src={mainlogo}
                        alt="프로필 사진"
                        className="profile-picture"
                        id="profilePreview"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        id="profilePicture"
                        className="create-profile-picture-input"
                      />
                    </div>
                    <label htmlFor="nickname">닉네임</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="nickname"
                        className="info-i-nick"
                      />
                      <button type="button" className="info-n-button">
                        중복 확인
                      </button>
                    </div>
                    <label htmlFor="address">주소</label>
                    <input type="text" id="address" className="info-i-add" />
                    <label htmlFor="interests">관심 분야</label>
                    <input
                      type="text"
                      id="interests"
                      className="info-in-intere"
                    />
                    <label htmlFor="phone_number">전화번호</label>
                    <input
                      type="text"
                      id="phone_number"
                      className="info-number"
                    />
                    <label htmlFor="introduction">자기소개</label>
                    <input
                      type="text"
                      id="introduction"
                      className="info-introd-g"
                    />
                    <div className="button-group">
                      <button type="button" className="info-s-button">
                        저장
                      </button>
                      <button type="button" className="info-e-button">
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
