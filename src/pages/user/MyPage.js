import styled from "@emotion/styled";

const MyPageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
`;

const MyPageWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const MyPageInnerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .mypage-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 450px;
    width: 100%;
    height: 80vh;
    box-sizing: border-box;
  }
  .mypage-container .profile-picture-container {
    text-align: center;
    margin-bottom: 10px;
  }
  .mypage-container .profile-picture-container img {
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
    width: calc(100% - 20px);
    padding: 8px;
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
  .mypage-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .mypage-buttons button {
    padding: 8px 16px;
    font-size: 12pt;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .edit-button {
    background-color: #919bfa;
    color: white;
  }
  .edit-button:hover {
    background-color: #919bfa;
  }
  .delete-button {
    background-color: #919bfa;
    color: white;
  }
  .delete-button:hover {
    background-color: #919bfa;
  }
`;

const MyPage = () => {
  return (
    <MyPageStyle>
      <MyPageWrapStyle>
        <MyPageInnerStyle>
          <div className="mypage-container">
            <form>
              <div className="profile-picture-container">
                <img
                  src="https://via.placeholder.com/100"
                  alt="프로필 사진"
                  id="profilePreview"
                />
              </div>
              <label>
                <span>이름</span>
                <input type="text" value="홍길동" readOnly />
              </label>
              <label>
                <span>닉네임</span>
                <input type="text" value="길동이" readOnly />
              </label>
              <label>
                <span>주소</span>
                <input type="text" value="서울특별시 강남구" readOnly />
              </label>
              <label>
                <span>생년 월일</span>
                <input type="date" value="1990-01-01" readOnly />
              </label>
              <label>
                <span>전화번호</span>
                <input type="text" value="010-1234-5678" readOnly />
              </label>
              <label>
                <span>관심있는 분야</span>
                <input type="text" value="프로그래밍, 여행" readOnly />
              </label>
              <label>
                <span>성별</span>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="남성"
                    checked
                    disabled
                  />
                  남
                  <input type="radio" name="gender" value="여성" disabled /> 여
                </div>
              </label>
              <label>
                <span>자기 소개</span>
                <input type="text" value="안녕하세요, 홍길동입니다." readOnly />
              </label>
            </form>
            <div className="mypage-buttons">
              <button className="edit-button">정보 수정</button>
              <button className="delete-button">회원 탈퇴</button>
            </div>
          </div>
        </MyPageInnerStyle>
      </MyPageWrapStyle>
    </MyPageStyle>
  );
};

export default MyPage;
