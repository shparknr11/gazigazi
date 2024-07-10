import styled from "@emotion/styled";

const AccountStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #fff;
`;

const AccountWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const AccountInnerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .signup-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
  }
  .main-create-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .profile-picture-container {
    text-align: center;
    margin-bottom: 15px;
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
    display: none;
  }
  .main-create-detail label {
    display: block;
    width: 90%;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .main-create-detail input[type="email"],
  .main-create-detail input[type="password"],
  .main-create-detail input[type="text"],
  .main-create-detail input[type="date"] {
    width: 100%;
    padding: 10px;
    font-size: 10pt;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .create-email-button-group-1,
  .create-nickname-button-group {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  .create-email-button-group-1 input[type="email"] {
    flex: 1;
  }
  .main-create-detail button {
    width: 50%;
    padding: 10px;
    font-size: 10pt;
    margin-top: 10px;
    cursor: pointer;
    background-color: #ebddcc;
    color: white;
    border: none;
    border-radius: 4px;
    text-align: center;
  }
  .main-create-detail button:hover {
    background-color: #e0b88a;
  }
  .create-button-group {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  .create-button-group button {
    flex: 1;
  }
  .create-gender-group {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .create-gender-group .create-gender-item {
    flex: 1;
  }
`;

const CreateAccount = () => {
  return (
    <AccountStyle>
      <AccountWrapStyle>
        <AccountInnerStyle>
          <div className="wrap">
            <main className="main">
              <div className="main-inner">
                <div className="signup-container">
                  <form className="main-create-detail">
                    <div className="profile-picture-container">
                      <img
                        src="https://via.placeholder.com/100"
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
                    <label>
                      이메일
                      <div className="create-email-button-group-1">
                        <input type="email" className="create-email-1" />
                        <i className="create-eee">@</i>
                        <input type="email" className="create-email-2" />
                      </div>
                      <div className="create-button-group">
                        <button type="button">중복 확인</button>
                        <button type="button">인증</button>
                      </div>
                    </label>
                    <label>
                      비밀번호
                      <input type="password" className="create-password-1" />
                    </label>
                    <label>
                      비밀번호 확인
                      <input type="password" className="create-password-2" />
                    </label>
                    <label>
                      이름
                      <input type="text" className="create-name" />
                    </label>
                    <label>
                      닉네임
                      <div className="create-nickname-button-group">
                        <input type="text" className="create-nickname" />
                        <button type="button">중복 확인</button>
                      </div>
                    </label>
                    <label>
                      주소
                      <input
                        type="text"
                        id="postcode"
                        name="zipcode"
                        className="create-address"
                      />
                    </label>
                    <label>
                      생년 월일
                      <input type="date" className="create-birthday" />
                    </label>
                    <label>
                      전화번호
                      <input type="text" className="create-phone-number" />
                    </label>
                    <label>
                      관심있는 분야
                      <input type="text" className="create-interests" />
                    </label>
                    <label className="create-gender-group">
                      성별
                      <div className="create-gender-item">
                        <input
                          type="radio"
                          name="gender"
                          value="남성"
                          className="create-boy"
                        />
                        남
                      </div>
                      <div className="create-gender-item">
                        <input
                          type="radio"
                          name="gender"
                          value="여성"
                          className="create-girl"
                        />
                        여
                      </div>
                    </label>
                    <label>
                      자기 소개
                      <input type="text" className="create-introduction" />
                    </label>
                    <button type="submit">가입 완료</button>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </AccountInnerStyle>
      </AccountWrapStyle>
    </AccountStyle>
  );
};

export default CreateAccount;
