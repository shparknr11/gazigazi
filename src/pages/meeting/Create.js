import styled from "@emotion/styled";

const CreateInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1300px;
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
  > h1 {
    font-size: 28px;
    margin-bottom: 40px;
  }
`;
const CreateCheckStyle = styled.div`
  width: 100%;
  margin-bottom: 25px;
  padding: 15px;
  box-shadow: 0.5px 1px 3px 0px;
  /* background-color: #fefbf7; */

  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */

  h1 {
    margin-bottom: 10px;
    font-size: 18px;
  }
  .create-check-div {
    /* width: calc(100% - 40px); */
    width: 100%;

    margin: 0 auto;
    margin-bottom: 10px;
  }
  .create-check-btn-div {
    /* display: flex;
    align-items: center;
    justify-content: center; */
  }
  .create-check-btn {
    text-align: center;
    /* width: calc(100% - 40px); */
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: wheat;
    }
  }
`;
const CreateFormDivStyle = styled.div`
  width: 100%;
  padding: 15px;
  box-shadow: 0.5px 1px 3px 0px;
  /* background-color: #fefbf7; */

  margin-bottom: 25px;
  > h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .create-option-group,
  .create-input-group,
  .create-form-group,
  .create-file-group,
  .create-textarea-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
  }
  .create-radio-group {
    margin-bottom: 40px;
  }
`;

const LocalSelectWrapStyle = styled.div`
  display: flex;

  .local-select-box {
    width: 285px;
    border: 1px solid #000;
  }
  .local-select-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .local-select-list > li {
    margin: 5px 0px;
    padding: 5px 50px;
    cursor: pointer;
    text-align: left;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .local-select-detail-box {
    width: 500px;
    border: 1px solid #000;
  }
  .local-select-detail-list {
    display: flex;
    flex-wrap: wrap;
  }
  .local-select-detail-list li {
    width: 33.33%;
  }

  .local-select-detail-list label {
  }

  /* .local-select-detail-list li {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
 */
  /* 
  .local-select-detail-box {
    border: 1px solid #000;
  }
  .local-select-detail-list {
    display: flex;
    flex-wrap: wrap;
  }

  .local-select-detail-list li {
    padding: 20px;
    width: 33%;
    display: flex;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid #000;
    }
  }

  .local-select-detail-list label {
    display: block;
    width: 100%;
    height: 100%;
  } */
`;
const CreateBtnWrapStyle = styled.div`
  display: flex;
  justify-content: end;
  gap: 25px;
  .create-button {
    padding: 10px 20px;
    border: 1px solid;
    border-radius: 25px;
  }
`;

const Create = () => {
  return (
    <CreateInnerStyle>
      <h1>모임 등록신청</h1>
      <CreateCheckStyle>
        <div className="create-check-div">
          <h1>📝모임등록 전 숙지사항</h1>
          <p>1. 모임 신청 확인 후 3일 이내 모임승인여부를 알려드립니다</p>
          <p>
            2. 이미지를 저해시키는 모임을 신청했을 경우, 사전 통보없이 모임이
            삭제 처리될 수 있습니다.
          </p>
        </div>
        <div className="create-check-btn-div">
          <div className="create-check-btn">확인</div>
        </div>
      </CreateCheckStyle>
      <CreateFormDivStyle>
        <h1>모임 등록양식</h1>

        <div className="create-option-group">
          <label htmlFor="level">모임의 카테고리를 선정해 주세요.</label>
          <select id="level">
            <option value="1">스포츠</option>
            <option value="2">게임</option>
            <option value="3">맛집</option>
            <option value="4">스터디</option>
            <option value="5">패션</option>
            <option value="6">문화•예술</option>
            <option value="7">Bar</option>
            <option value="8">기타</option>
          </select>
        </div>
        <div className="create-input-group">
          <label htmlFor="meetname">모임의 제목을 지어주세요.</label>
          <input type="text" id="meetname" />
        </div>

        <div className="create-form-group">
          <label htmlFor="meetplace">모임지역을 선택해 주세요.</label>
          <input type="text" id="meetplace" />
          <LocalSelectWrapStyle>
            <div className="local-select-box">
              <ul className="local-select-list">
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
                <li>
                  <span>서울</span>
                </li>
              </ul>
            </div>
            <div className="local-select-detail-box">
              <ul className="local-select-detail-list">
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox1" name="local-select" />
                    <label htmlFor="checkbox1">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox2" name="local-select" />
                    <label htmlFor="checkbox2">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox3" name="local-select" />
                    <label htmlFor="checkbox3">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox4" name="local-select" />
                    <label htmlFor="checkbox4">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox5" name="local-select" />
                    <label htmlFor="checkbox5">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox6" name="local-select" />
                    <label htmlFor="checkbox6">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox7" name="local-select" />
                    <label htmlFor="checkbox7">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox8" name="local-select" />
                    <label htmlFor="checkbox8">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox9" name="local-select" />
                    <label htmlFor="checkbox9">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox10" name="local-select" />
                    <label htmlFor="checkbox10">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox11" name="local-select" />
                    <label htmlFor="checkbox11">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox12" name="local-select" />
                    <label htmlFor="checkbox12">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox13" name="local-select" />
                    <label htmlFor="checkbox13">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox14" name="local-select" />
                    <label htmlFor="checkbox14">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox15" name="local-select" />
                    <label htmlFor="checkbox15">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox16" name="local-select" />
                    <label htmlFor="checkbox16">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox17" name="local-select" />
                    <label htmlFor="checkbox17">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox18" name="local-select" />
                    <label htmlFor="checkbox18">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox19" name="local-select" />
                    <label htmlFor="checkbox19">북구</label>
                  </div>
                </li>
                <li>
                  <div className="local-select-div">
                    <input type="radio" id="checkbox20" name="local-select" />
                    <label htmlFor="checkbox20">북구</label>
                  </div>
                </li>
              </ul>
            </div>
          </LocalSelectWrapStyle>
        </div>

        <div className="create-radio-group">
          <h1>모집 성별조건</h1>
          <input type="radio" id="meetgenderm" name="gender-select" />
          <label htmlFor="meetgenderm">남자만</label>

          <input type="radio" id="meetgenderw" name="gender-select" />
          <label htmlFor="meetgenderw">여자만</label>

          <input type="radio" id="meetgender" name="gender-select" />
          <label htmlFor="meetgender">성별무관</label>
        </div>

        <div className="create-input-group">
          <label htmlFor="meetage">모집 연령조건</label>
          <input type="text" id="meetage" />
        </div>
        <div className="create-file-group">
          <label htmlFor="meetfile">더 상세히 모임을 소개해 주세요.</label>
          <input type="file" id="meetfile" />
        </div>
        <div className="create-textarea-group">
          <label htmlFor="meettext">더 상세히 모임을 소개해 주세요.</label>
          <textarea type="" id="meettext" />
        </div>
        <div className="create-radio-group">
          <h1>허용/비허용</h1>
          <input type="radio" id="meetad" name="ad-select" />
          <label htmlFor="meetad">허용</label>

          <input type="radio" id="meetad" name="ad-select" />
          <label htmlFor="meetad">비허용</label>
        </div>
      </CreateFormDivStyle>
      <CreateBtnWrapStyle>
        <div className="create-button">취소</div>
        <div className="create-button">등록신청</div>
      </CreateBtnWrapStyle>
    </CreateInnerStyle>
  );
};

export default Create;
