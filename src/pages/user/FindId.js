import styled from "@emotion/styled";
import mainlogo from "../../images/logo2.png";

const FindIdStyle = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
`;

const FindIdWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FindIdInnerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .id-container {
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
  .logo {
    display: block;
    margin: 0 auto 20px;
  }
  .form-group {
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  .form-group label {
    width: 100px;
    margin-right: 0px;
    font-weight: 700;
  }
  .form-group input {
    flex: 0.87;
    padding: 6px;
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
    padding: 10px;
    background-color: #ebddcc;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
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

const FindId = () => {
  return (
    <FindIdStyle>
      <FindIdWrapStyle>
        <FindIdInnerStyle>
          <div className="wrap">
            <main className="main">
              <div className="main-inner">
                <div className="id-container">
                  <form id="find-email-form">
                    <img src={mainlogo} alt="mainlogo" className="logo" />
                    <div className="form-group">
                      <label htmlFor="name">이름</label>
                      <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone_number">전화번호</label>
                      <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="birth_date">생년월일</label>
                      <input
                        type="date"
                        id="birth_date"
                        name="birth_date"
                        required
                      />
                    </div>
                    <div className="button-container">
                      <button type="submit">이메일 찾기</button>
                      <button type="button">취소</button>
                    </div>
                  </form>
                  <p id="result"></p>
                </div>
              </div>
            </main>
          </div>
        </FindIdInnerStyle>
      </FindIdWrapStyle>
    </FindIdStyle>
  );
};

export default FindId;
