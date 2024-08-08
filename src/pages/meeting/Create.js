import styled from "@emotion/styled";
import LocalSelect from "../../components/meeting/LocalSelect";
import { useEffect, useState } from "react";
import { getLocal, postParty } from "../../apis/meeting/meetingapi";
import { useNavigate } from "react-router-dom";
import GuideTitle from "../../components/common/GuideTitle";
import { useSelector } from "react-redux";

// react Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../css/quill.css";
import { modules } from "../../components/modules/quill";

const CreateInnerStyle = styled.div`
  width: calc(100% - 30px);
  max-width: 1280px;
  margin: 0 auto;
  height: auto;
  margin-top: 40px;
  > h1 {
    font-size: 28px;
    margin-bottom: 40px;
  }

  label {
    margin-bottom: 20px;
  }

  select {
    height: 35px;
    width: 50%;
    font-size: 0.8rem;
  }

  input,
  textarea,
  select {
    padding: 0px 10px;
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
    font-weight: 600;
  }
  .create-check-div {
    /* width: calc(100% - 40px); */
    width: 100%;
    margin: 0 auto;
    margin-bottom: 10px;

    p {
      line-height: 1.5rem;
    }
  }
  .create-check-btn-div {
    /* display: flex;
    align-items: center;
    justify-content: center; */
  }
`;
const CreateCheckBtn = styled.div`
  user-select: none;
  text-align: center;
  /* width: calc(100% - 40px); */
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  color: ${props => (props.isChecked ? "#f9f8f5" : "#999")};
  background-color: ${props =>
    props.isChecked ? "#c9c2a5" : "rgba(0,0,0,0.05)"};
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
    font-weight: 600;
    margin-bottom: 30px;
    border-bottom: 2px solid black;
    width: fit-content;
    padding-bottom: 5px;
  }
  .create-option-group,
  .create-input-group,
  .create-form-group,
  .create-file-group,
  .create-textarea-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

    textarea {
      width: 50%;
      height: 100px;
    }
  }
  .create-radio-group {
    margin-bottom: 40px;

    p {
      margin-bottom: 20px;
    }

    input {
      margin-right: 5px;
    }

    label {
      margin-right: 10px;
    }
  }

  .create-form-group {
    > input {
      height: 35px;
      width: 50%;
    }
  }

  .create-input-group {
    input {
      height: 35px;
      width: 50%;
    }

    p {
      margin-bottom: 20px;
    }

    .party-Maximum {
      width: 10%;
    }

    .party-Maximum-group {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .minage-label {
      margin-bottom: 5px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .maxage-label {
      font-size: 0.85rem;
      margin: 10px 0 5px 0;
      font-weight: 600;
    }
  }
`;

const CreateBtnWrapStyle = styled.div`
  display: flex;
  justify-content: end;
  gap: 25px;
  .create-button {
    padding: 10px 20px;
    border: 1px solid #999;
    color: #999;
    border-radius: 25px;
    margin-bottom: 40px;
    &:hover {
      background-color: #c9c2a5;
      color: #f9f8f5;
    }
  }
`;

const Create = () => {
  const [isChecked, setIsChecked] = useState(false);
  // form
  const [partyName, setPartyName] = useState("");
  const [partyGenre, setPartyGenre] = useState(null);
  const [partyLocation, setPartyLocation] = useState("");
  const [partyMinAge, setPartyMinAge] = useState(1901);
  const [partyMaxAge, setPartyMaxAge] = useState(2155);
  const [partyMaximum, setPartyMaximum] = useState("");
  const [partyGender, setPartyGender] = useState("");
  const [partyIntro, setPartyIntro] = useState("");
  const [partyJoinForm, setPartyJoinForm] = useState("");

  // local
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [localList, setLocalList] = useState([]);
  const [localData, setLocalData] = useState("");
  const [localDetailData, setLocaDetaillData] = useState("");
  // file
  const [partyPic, setPartyPic] = useState(null);
  const [previewImg, setPreviewImg] = useState("");

  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  // useEffect(() => {
  //   // console.log(localList);
  //   console.log(partyMinAge);
  //   console.log(partyMaxAge);
  // }, [partyMaxAge, partyMinAge]);

  // useEffect(() => {
  //   // console.log(localList);
  //   // console.log(localData);
  //   // console.log(localDetailData);
  // }, [localList, localData, localDetailData]);

  // 년도
  const years = Array.from({ length: 2009 - 1970 + 1 }, (v, i) => 1970 + i);

  // 이용약관 동의
  const handleClickCheck = () => {
    setIsChecked(!isChecked);
  };

  // 모임 명 작성
  const handleChangePartyName = e => {
    setPartyName(e.target.value);
  };

  // 카테고리 선택
  const handleChangeGenre = e => {
    // console.log(e.target.value);
    const genre = parseInt(e.target.value);
    if (!genre) {
      alert("장르를 선택해 주세요");
    }
    setPartyGenre(genre);
  };
  // 지역 선택(도시 불러오기)
  const handleClickLocal = async () => {
    setSelectorOpen(true);

    const data = { cdSub: 0, cdGb: 0 };

    const result = await getLocal(data);
    if (result.code !== 1) {
      alert(result.resultMsg);
      return;
    }
    // console.log("result", result);
    // console.log("resultData", result.resultData);
    setLocalList(result.resultData);
  };
  // 성별 선택
  const handleChangeGender = e => {
    const gender = parseInt(e.target.value);
    setPartyGender(gender);
  };
  // 연령제한 선택
  const handleChangeMinAge = e => {
    // console.log("min", e.target.value);
    const minAge = parseInt(e.target.value);
    setPartyMinAge(minAge);
    if (minAge > partyMaxAge) {
      alert("최대년도보다 낮게 설정해 주세요.");
    }
  };
  const handleChangeMaxAge = e => {
    // console.log("max", e.target.value);
    const maxAge = parseInt(e.target.value);
    setPartyMaxAge(maxAge);
    if (partyMinAge > maxAge) {
      alert("최소년도보다 높게 설정해 주세요.");
    }
  };

  // 파일 선택
  const handleFileChange = e => {
    const tempFile = e.target.files[0];
    // console.log(e.target.files[0]);

    if (tempFile) {
      setPartyPic(tempFile);
      const tempUrl = URL.createObjectURL(tempFile);
      setPreviewImg(tempUrl);
    } else {
      setPartyPic(null);
      setPreviewImg("");
    }
  };

  // 최대인원 선택
  const handleChangeMaximum = e => {
    // console.log(e.target.value);
    const maximumCondition = e.target.value;

    // 숫자가 아닌 경우
    if (!/^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/.test(maximumCondition)) {
      e.target.value = "";
      alert("최대인원은 숫자만 입력해 주세요.");
      return;
    }

    const maximum = parseInt(e.target.value);
    setPartyMaximum(maximum);
  };

  // // 모임소개 작성
  // const handleChangeIntro = e => {
  //   setPartyIntro(e.target.value);
  // };
  // 모임 신청양식 작성
  const handleChangeJoinForm = e => {
    setPartyJoinForm(e.target.value);
  };

  const handSubmitCreate = async e => {
    e.preventDefault();
    if (!isChecked) {
      alert("숙지사항을 확인해 주세요(필수)");
      return;
    }
    if (!partyGenre) {
      alert("카테고리를 선택해 주세요(필수)");
      return;
    }
    if (!partyName) {
      alert("모임 제목을 작성해 주세요(필수)");
      return;
    }
    if (!partyLocation) {
      alert("지역을 선택해 주세요(필수)");
      return;
    }
    if (selectorOpen) {
      alert("지역을 선택후 확인해 주세요(필수)");
      return;
    }
    if (!partyGender) {
      alert("성별조건을 선택해 주세요(필수)");
      return;
    }
    if (partyMinAge > partyMaxAge) {
      alert("모집 연령조건 다시확인해 주세요.");
      return;
    }
    if (!partyMaximum) {
      alert("허용인원을 작성해 *숫자*(필수)");
      return;
    }
    if (partyMaximum < 2) {
      alert("허용인원은 2명이상으로 작성하셔야 합니다.*숫자*(필수)");
      return;
    }
    if (!partyPic) {
      alert("사진을 선택해 주세요(필수)");
      return;
    }
    if (!partyIntro) {
      alert("상세모임소개를 작성해 주세요(필수)");
      return;
    }
    if (!partyJoinForm) {
      alert("모임 신청양식을 작성해 주세요(필수)");
      return;
    }

    const formData = new FormData();
    const infoData = JSON.stringify({
      partyName,
      partyGenre,
      partyLocation,
      partyMinAge,
      partyMaxAge,
      partyGender,
      partyMaximum,
      partyJoinGb: 1,
      partyJoinForm,
      partyIntro,
    });
    // console.log("infoData", infoData);
    const data = new Blob([infoData], { type: "application/json" });
    formData.append("p", data);
    formData.append("partyPic", partyPic);

    // await postParty(formData);

    // navigate(`/admin`);
    try {
      const result = await postParty(formData, token);
      // console.log(result);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      // setPartyName("");
      // setPartyGenre(null);
      // setPartyLocation("");
      // setPartyMinAge(1901);
      // setPartyMaxAge(2155);
      // setPartyGender("");
      // setPartyMaximum("");
      // setPartyJoinForm("");
      // setPartyIntro("");
      // setPartyPic(null);
      // setPreviewImg("");
      // setLocalData("");
      // setLocaDetaillData("");
      navigate(`/admin`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CreateInnerStyle>
      <GuideTitle guideTitle="모임 등록" subTitle="모임 등록신청" />
      <CreateCheckStyle>
        <div className="create-check-div">
          <h1>📝모임등록 전 숙지사항</h1>
          <p>1. 모임 신청 확인 후 3일 이내 모임승인여부를 알려드립니다</p>
          <p>
            2. 이미지를 저해시키는 요소가 포함되어 있을 경우, 사전 통보없이
            모임이 삭제 처리될 수 있습니다.
          </p>
        </div>
        <div className="create-check-btn-div">
          <CreateCheckBtn
            onClick={() => {
              handleClickCheck();
            }}
            isChecked={isChecked}
          >
            확인했습니다.
          </CreateCheckBtn>
        </div>
      </CreateCheckStyle>

      <CreateFormDivStyle>
        <h1>모임 등록양식</h1>

        <div className="create-option-group">
          <label htmlFor="partygenre">모임의 카테고리를 선정해 주세요*</label>
          <select
            id="partygenre"
            onChange={e => {
              handleChangeGenre(e);
            }}
          >
            <option value="">---카테고리를 선택해 주세요---</option>
            <option value="1">스포츠</option>
            <option value="2">게임</option>
            <option value="3">맛집</option>
            <option value="4">패션</option>
            <option value="5">자기개발</option>
            <option value="6">문화•예술</option>
            <option value="7">Bar</option>
            <option value="8">기타</option>
          </select>
        </div>
        <div className="create-input-group">
          <label htmlFor="partyname">모임의 제목을 지어 주세요*</label>
          <input
            autoComplete="off"
            type="text"
            id="partyname"
            value={partyName}
            onChange={e => {
              handleChangePartyName(e);
            }}
          />
        </div>

        <div className="create-form-group">
          <label htmlFor="partyplace">모임 지역을 선택해 주세요*</label>
          <input
            type="text"
            id="partyplace"
            value={`✔ ${localData} ${localDetailData}`}
            onClick={() => {
              handleClickLocal();
            }}
            autoComplete="off"
            readOnly
          />
          {selectorOpen ? (
            <LocalSelect
              localList={localList}
              setSelectorOpen={setSelectorOpen}
              setLocalList={setLocalList}
              setLocalData={setLocalData}
              setLocaDetaillData={setLocaDetaillData}
              setPartyLocation={setPartyLocation}
            />
          ) : null}
        </div>

        <div className="create-radio-group">
          <p>모집 성별조건을 선택해 주세요*</p>
          <input
            type="radio"
            id="partygenderm"
            name="gender-select"
            value="1"
            onChange={e => {
              handleChangeGender(e);
            }}
          />
          <label htmlFor="partygenderm">남성</label>

          <input
            type="radio"
            id="partygenderw"
            name="gender-select"
            value="2"
            onChange={e => {
              handleChangeGender(e);
            }}
          />
          <label htmlFor="partygenderw">여성</label>

          <input
            type="radio"
            id="partygendero"
            name="gender-select"
            value="3"
            onChange={e => {
              handleChangeGender(e);
            }}
          />
          <label htmlFor="partygendero">성별무관</label>
        </div>

        <div className="create-input-group">
          <div>
            <p>모집 연령조건을 선택해 주세요*</p>
          </div>
          <label className="minage-label" htmlFor="partyminage">
            최소
          </label>
          <select
            id="partyminage"
            onChange={e => {
              console.log(e.target.value);
              handleChangeMinAge(e);
            }}
          >
            <option value="1901">
              --- 최소 연령을 선택해 주세요 (연령무관)---
            </option>
            {years.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="maxage-label" htmlFor="partymaxage">
            최대
          </label>
          <select
            id="partymaxage"
            onChange={e => {
              handleChangeMaxAge(e);
            }}
          >
            <option value="2155">
              --- 최대 연령을 선택해 주세요 (연령무관)---
            </option>
            {years.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="create-input-group">
          <label htmlFor="partyMaximum">모임의 허용인원을 설정해 주세요*</label>
          <div className="party-Maximum-group">
            <input
              className="party-Maximum"
              autoComplete="off"
              type="number"
              id="partyMaximum"
              onChange={e => {
                handleChangeMaximum(e);
              }}
            />
            <span>명</span>
          </div>
        </div>

        <div className="create-file-group">
          <label htmlFor="partyfile">사진으로 모임을 소개해 주세요*</label>
          <input
            type="file"
            id="partyfile"
            accept="image/jpeg, image/png, image/gif"
            onChange={e => {
              handleFileChange(e);
            }}
          />
          {previewImg ? (
            <img style={{ width: "50%" }} src={previewImg} />
          ) : null}
        </div>
        <div className="create-textarea-group">
          <label htmlFor="partytext">더 상세히 모임을 소개해 주세요*</label>
          {/* <textarea
            type="textfield"
            id="partytext"
            autoComplete="off"
            value={partyIntro}
            onChange={e => {
              handleChangeIntro(e);
            }}
          /> */}
          <ReactQuill onChange={setPartyIntro} modules={modules} />
        </div>
        <div className="create-textarea-group">
          <label htmlFor="partyform">
            모임원의 모임 신청양식을 작성해 주세요*
          </label>
          <textarea
            type="textfield"
            id="partyform"
            autoComplete="off"
            value={partyJoinForm}
            onChange={e => {
              handleChangeJoinForm(e);
            }}
          />
        </div>
        {/* <div className="create-radio-group">
          <h1>허용/비허용</h1>
          <input type="radio" id="partyadd" name="add-select" />
          <label htmlFor="partyadd">허용</label>

          <input type="radio" id="partyadd" name="add-select" />
          <label htmlFor="partyadd">비허용</label>
        </div> */}
      </CreateFormDivStyle>
      <CreateBtnWrapStyle>
        <div className="create-button">취소</div>
        <div
          className="create-button"
          onClick={e => {
            handSubmitCreate(e);
          }}
        >
          등록신청
        </div>
      </CreateBtnWrapStyle>
    </CreateInnerStyle>
  );
};

export default Create;
