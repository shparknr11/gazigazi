import styled from "@emotion/styled";
import LocalSelect from "../../components/meeting/LocalSelect";
import { useEffect, useState } from "react";
import { getLocal } from "../../apis/meeting/createapi";

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
  .create-clubplace {
    width: 785px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
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
  // form
  // const [clubCate, setclubCate] = useState("");
  const [clubName, setclubName] = useState("");

  // local
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [localList, setLocalList] = useState([]);
  const [localData, setLocalData] = useState("");
  const [localDetailData, setLocaDetaillData] = useState("");
  // file
  const [imgFile, setImgFile] = useState(null);
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    // console.log(localList);
    // console.log(localData);
    // console.log(localDetailData);
  }, [localList, localData, localDetailData]);

  // 도시 불러오기
  const handleClickLocal = async () => {
    setSelectorOpen(true);

    const data = { cd: "LO-00", cd_gb: "00" };

    const result = await getLocal(data);
    if (result.code !== "SU") {
      alert(result.resultMsg);
      return;
    }
    // console.log("result", result);
    console.log("resultData", result.resultData);
    setLocalList(result.resultData);
  };

  // 파일 인풋
  const handleFileChange = e => {
    const tempFile = e.target.files[0];
    console.log(e.target.files[0]);

    if (tempFile) {
      setImgFile(tempFile);
      const tempUrl = URL.createObjectURL(tempFile);
      setPreviewImg(tempUrl);
    } else {
      setPreviewImg("");
      setImgFile(null);
    }
  };

  // 모임 생성 신청
  const handleClickCreate = () => {
    console.log("모임생성 신청");
  };
  const handSubmitCreate = e => {
    e.preventDefault();
    const formData = new FormData();
    const infoData = JSON.stringify({
      // 보낼 input 데이터 담기
      // 속성명: 속성값,
      // 속성명: 속성값,
    });
    const data = new Blob([infoData], { type: "application/json" });
    formData.append("p", data);
    formData.append("키명", imgFile);
  };

  return (
    <CreateInnerStyle
      onSubmit={() => {
        handSubmitCreate();
      }}
    >
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
          <select
            id="level"
            onChange={() => {
              console.log("카테고리");
            }}
          >
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
          <label htmlFor="clubname">모임의 제목을 지어주세요.</label>
          <input
            type="text"
            id="clubname"
            value={clubName}
            onChange={e => {
              setclubName(e.target.value);
            }}
          />
        </div>

        <div className="create-form-group">
          <label htmlFor="clubplace">모임지역을 선택해 주세요.</label>
          <input
            type="text"
            id="clubplace"
            value={`${localData}${localDetailData}`}
            onClick={() => {
              handleClickLocal();
            }}
            readOnly
          />
          {selectorOpen ? (
            <LocalSelect
              localList={localList}
              setSelectorOpen={setSelectorOpen}
              setLocalList={setLocalList}
              setLocalData={setLocalData}
              setLocaDetaillData={setLocaDetaillData}
            />
          ) : null}
        </div>

        <div className="create-radio-group">
          <h1>모집 성별조건</h1>
          <input type="radio" id="clubgenderm" name="gender-select" />
          <label htmlFor="clubgenderm">남자만</label>

          <input type="radio" id="clubgenderw" name="gender-select" />
          <label htmlFor="clubgenderw">여자만</label>

          <input type="radio" id="clubgender" name="gender-select" />
          <label htmlFor="clubgender">성별무관</label>
        </div>

        <div className="create-input-group">
          <label htmlFor="clubage">모집 연령조건</label>
          <input type="text" id="clubage" />
        </div>
        <div className="create-file-group">
          <label htmlFor="clubfile">파일점부</label>
          <input
            type="file"
            id="clubfile"
            accept="image/jpg, image/png, image/gif"
            onChange={e => {
              handleFileChange(e);
            }}
          />
          {previewImg ? (
            <img style={{ width: "50%" }} src={previewImg} />
          ) : null}
        </div>
        <div className="create-textarea-group">
          <label htmlFor="clubtext">더 상세히 모임을 소개해 주세요.</label>
          <textarea type="textfield" id="clubtext" />
        </div>
        <div className="create-radio-group">
          <h1>허용/비허용</h1>
          <input type="radio" id="clubadd" name="add-select" />
          <label htmlFor="clubadd">허용</label>

          <input type="radio" id="clubadd" name="add-select" />
          <label htmlFor="clubadd">비허용</label>
        </div>
      </CreateFormDivStyle>
      <CreateBtnWrapStyle>
        <div className="create-button">취소</div>
        <div className="create-button" onClick={handleClickCreate()}>
          등록신청
        </div>
      </CreateBtnWrapStyle>
    </CreateInnerStyle>
  );
};

export default Create;
