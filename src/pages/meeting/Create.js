import styled from "@emotion/styled";

const CreateInnerStyle = styled.div`
  width: calc(100% - 720px);
  max-width: 1200px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
`;
const CreateCheckStyle = styled.div`
  width: 100%;
  height: 100px;
  background-color: beige;
  margin-bottom: 25px;
`;
const CreateFormDivStyle = styled.div`
  width: 100%;
  padding: 20px;
  height: 3000px;
  background-color: beige;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .create-form-group {
    display: flex;
    flex-direction: column;
    > select,
    > input {
      padding: 10px;
      width: 500px;
      height: 40px;
    }
    textarea {
      /* resize: none; */
    }
  }
`;

const LocalSelectWrapStyle = styled.div`
  display: flex;
  flex: 1;
  padding: 20px 0px;

  .local-select-box {
    width: 285px;
  }
  .local-select-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
  }
  .local-select-list > li {
    padding: 5px 50px;
    cursor: pointer;
    text-align: left;
    margin: 10px 0px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .local-select-detail-box {
    border: 1px solid #000;
  }
  .local-select-detail-list {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Create = () => {
  const handleLocalClick = () => {};
  return (
    <CreateInnerStyle>
      <h1>모임 등록하기</h1>
      <CreateCheckStyle>
        <div>
          <h1>모임등록 전 숙지사항</h1>
        </div>
      </CreateCheckStyle>
      <CreateFormDivStyle>
        <div>
          <h1>모임 등록양식</h1>
        </div>
        <div className="create-form-group">
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
        <div className="create-form-group">
          <label htmlFor="meetname">모임의 제목을 지어주세요.</label>
          <input type="text" id="meetname" />
        </div>
        <div className="create-form-group">
          <label htmlFor="meetplace">모임지역을 선택해 주세요.</label>
          <input type="text" id="meetplace" />
        </div>
        <div className="create-form-group">
          <label htmlFor="meetplace">모임장소명을 입력해 주세요.</label>
          <input type="text" id="meetplace" />
          <LocalSelectWrapStyle>
            <div className="local-select-box">
              <ul className="local-select-list">
                <li>서울</li>
                <li>경기</li>
                <li>대구</li>
                <li>대전</li>
                <li>세종</li>
                <li>부산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
                <li>울산</li>
              </ul>
            </div>
            <div className="local-select-detail-box">
              <ul className="local-select-detail-list">
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox"> 북구</label>
                </li>
                <li>
                  <input type="checkbox" />
                  동구
                </li>
                <li>
                  <input type="checkbox" />
                  남구
                </li>
                <li>
                  <input type="checkbox" />
                  강남
                </li>
                <li>
                  <input type="checkbox" />
                  중앙로
                </li>
                <li>
                  <input type="checkbox" />
                  반월당
                </li>
                <li>
                  <input type="checkbox" />
                  동대구
                </li>
                <li>
                  <input type="checkbox" />
                  해운대
                </li>
              </ul>
            </div>
          </LocalSelectWrapStyle>
        </div>
        <div className="create-form-group">
          <label htmlFor="meetfile">더 상세히 모임을 소개해 주세요.</label>
          <input type="file" id="meetfile" />
        </div>
        <div className="create-form-group">
          <label htmlFor="meettext">더 상세히 모임을 소개해 주세요.</label>
          <textarea type="" id="meettext" />
        </div>
        <div className="create-form-group"></div>
        <div className="create-form-group"></div>
        <div className="create-form-group"></div>
      </CreateFormDivStyle>
    </CreateInnerStyle>
  );
};

export default Create;
