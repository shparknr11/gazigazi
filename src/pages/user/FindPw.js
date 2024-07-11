import styled from "@emotion/styled";
import mainlogo from "../../images/logo2.png";

const FindPwStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
`;

const FindPwWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FindPwInnerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .pw-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 500px;
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  .form-group {
    margin-bottom: 15px;
    text-align: center;
  }
  .form-group-email {
    display: block;
    width: 50%;
    margin: 0 auto;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  .form-group input {
    width: 65%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .button-container {
    text-align: center;
    margin-top: 20px;
  }
  .button-container button {
    width: 100px;
    height: auto;
    padding: 10px;
    background-color: #ebddcc;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    margin: 0 10px;
  }
  .button-container button:hover {
    background-color: #e0b88a;
  }
  #result {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #333;
  }
`;

const FindPw = () => {
  return (
    <FindPwStyle>
      <FindPwWrapStyle>
        <FindPwInnerStyle>
          <div className="wrap">
            <main className="main">
              <div className="main-inner">
                <div className="pw-container">
                  <form id="find-password-form">
                    <div className="form-group">
                      <img src={mainlogo} alt="pw 찾기" className="logo" />
                      <label htmlFor="email">
                        <span className="form-group-email">이메일</span>
                      </label>
                      <input type="email" id="email" name="email" required />
                    </div>
                    <div className="button-container">
                      <button type="submit">비밀번호 발급</button>
                    </div>
                  </form>
                  <p id="result"></p>
                </div>
              </div>
            </main>
          </div>
        </FindPwInnerStyle>
      </FindPwWrapStyle>
    </FindPwStyle>
  );
};

export default FindPw;
