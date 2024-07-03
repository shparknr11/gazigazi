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
    select,
    input {
      padding: 10px;
      width: 500px;
      height: 40px;
    }
    textarea {
      resize: none;
    }
  }
`;

const Create = () => {
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
          <label htmlFor="meetplace">모임장소명을 입력해 주세요.</label>
          <input type="text" id="meetplace" />
        </div>
        <div className="create-form-group">
          <label htmlFor="meetday">언제 만나나요?</label>
          <input type="datetime-local" id="meetday" />
        </div>

        <div className="create-form-group">
          <label htmlFor="meetplace">모임장소명을 입력해 주세요.</label>
          <input type="text" id="meetplace" />
        </div>
        <div className="create-form-group">
          <label htmlFor="meetplace">더 상세히 모임을 소개해 주세요.</label>
          <textarea type="" id="meetplace" />
        </div>
        <div className="create-form-group"></div>
        <div className="create-form-group"></div>
        <div className="create-form-group"></div>
      </CreateFormDivStyle>
    </CreateInnerStyle>
  );
};

export default Create;
