import styled from "@emotion/styled";
import LocalSelect from "../../components/meeting/LocalSelect";
import { useEffect, useState } from "react";
import {
  getLocal,
  getPartyOne,
  patchParty,
  postParty,
} from "../../apis/meeting/meetingapi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  .subtitle-h1 {
    margin-bottom: 0px !important;
  }
  .modify-subtitle {
    font-weight: bold;
    font-size: 18px;
    text-decoration: underline;
    margin-bottom: 40px;
  }
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
  .create-del-button-div {
    display: flex;
    justify-content: end;
  }
  .create-del-button {
    padding: 10px 20px;
    border: 1px solid #999;
    color: #999;
    background-color: #c9c2a5;
    color: #f9f8f5;
    border-radius: 25px;
    margin-bottom: 10px;
    &:hover {
      border: 1px solid #999;
      color: #999;
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

const Modify = () => {
  const { partySeq } = useParams();
  // form
  const [partyName, setPartyName] = useState("");
  const [partyGenre, setPartyGenre] = useState("");
  const [partyLocation, setPartyLocation] = useState("");
  const [partyMinAge, setPartyMinAge] = useState(1901);
  const [partyMaxAge, setPartyMaxAge] = useState(2155);
  const [partyMaximum, setPartyMaximum] = useState("");
  const [partyGender, setPartyGender] = useState("");
  const [partyIntro, setPartyIntro] = useState("");
  const [partyJoinForm, setPartyJoinForm] = useState("");

  const [partyPrevLocation, setpartPrevLocation] = useState("");

  // local
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [localList, setLocalList] = useState([]);
  const [localData, setLocalData] = useState("");
  const [localDetailData, setLocaDetaillData] = useState("");
  // file
  const [partyPic, setPartyPic] = useState(null);
  const [originPartyPic, setOriginPartyPic] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate();
  // const userSeq = parseInt(sessionStorage.getItem("userSeq"));
  const user = useSelector(state => state.user);
  const userSeq = parseInt(user.userSeq);

  const getData = async () => {
    try {
      // 기존 모임 데이터 가져오기
      const result = await getPartyOne(partySeq);
      if (result.code !== 1) {
        alert(result.resultMsg);
        return;
      }
      // console.log("result", result);
      // console.log(result.resultData);
      // // 가져온 데이터를 상태 변수에 설정
      setPartyName(result.resultData.partyName);
      setPartyGenre(parseInt(result.resultData.partyGenre));
      setPartyLocation(parseInt(result.resultData.partyLocation));
      setPartyMinAge(parseInt(result.resultData.partyMinAge));
      setPartyMaxAge(parseInt(result.resultData.partyMaxAge));
      setPartyMaximum(parseInt(result.resultData.partyMaximum));
      setPartyGender(parseInt(result.resultData.partyGender));
      setPartyIntro(result.resultData.partyIntro);
      setPartyJoinForm(result.resultData.partyJoinForm);
      setLocalData(result.resultData.setPartyPic);
      setpartPrevLocation(
        result.resultData.partyLocation1 + result.resultData.partyLocation2,
      );
      setOriginPartyPic(result.resultData.partyPic);
      // setSelectorOpen(true); // 필요에 따라 Selector를 열거나 닫을 수 있습니다.
    } catch (error) {
      console.error(error);
      alert("에러가발생했습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // 년도
  const years = Array.from({ length: 2009 - 1924 + 1 }, (v, i) => 1924 + i);

  // 모임 명 작성
  const handleChangePartyName = e => {
    setPartyName(e.target.value);
  };

  // 카테고리 선택
  const handleChangeGenre = e => {
    // console.log(e.target.value);
    const genre = parseInt(e.target.value);
    // console.log(genre);
    if (!genre) {
      alert("장르를 선택해주세요");
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
      alert("최대년도보다 낮게 설정해주세요.");
    }
  };
  const handleChangeMaxAge = e => {
    // console.log("max", e.target.value);
    const maxAge = parseInt(e.target.value);
    setPartyMaxAge(maxAge);
    if (partyMinAge > maxAge) {
      alert("최소년도보다 높게 설정해주세요.");
    }
  };

  // 파일 선택
  const handleFileChange = e => {
    const tempFile = e.target.files[0];
    console.log(e.target.files[0]);

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
    if (selectorOpen) {
      alert("상세 모임을 선택해주세요");
    }
    const formData = new FormData();
    const infoData = JSON.stringify({
      partySeq: parseInt(partySeq),
      partyName,
      partyGenre,
      partyLocation,
      partyMinAge,
      partyMaxAge,
      partyGender,
      partyMaximum,
      partyJonGb: 1,
      partyJoinForm,
      partyIntro,
    });
    console.log("infoData", infoData);
    const data = new Blob([infoData], { type: "application/json" });
    formData.append("p", data);
    formData.append("partyPic", partyPic);

    // if (partyPic) {
    //   formData.append("partyPic", partyPic);
    // } else {
    //   formData.append("partyPic", originPartyPic);
    // }
    const result = await patchParty(formData, user.token);

    if (result.code != 1) {
      toast.warning(result.resultMsg);
      return;
    }
    toast.success("수정이 완료되었습니다.");

    navigate(-1);
  };

  // 모임 지역 설정 value값
  const inputValue =
    localData && localDetailData
      ? `${localData}${localDetailData}`
      : partyPrevLocation;
  return (
    <CreateInnerStyle>
      <GuideTitle guideTitle="모임 수정" subTitle="모임 수정/삭제" />
      <div className="create-del-button-div">
        <button className="create-del-button">삭제</button>
      </div>
      <CreateFormDivStyle>
        <p className="modify-subtitle">모임 수정</p>

        <div className="create-option-group">
          <label htmlFor="partygenre">모임의 카테고리를 선정해 주세요.</label>
          <select
            id="partygenre"
            onChange={e => {
              handleChangeGenre(e);
            }}
            value={partyGenre}
          >
            <option value="">---카테고리를 선택해주세요---</option>
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
          <label htmlFor="partyname">모임의 제목을 지어주세요.</label>
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
          <label htmlFor="partyplace">모임지역을 선택해 주세요.</label>
          <input
            type="text"
            id="partyplace"
            value={inputValue}
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
              partyLocation={partyLocation}
              setPartyLocation={setPartyLocation}
            />
          ) : null}
        </div>

        <div className="create-radio-group">
          <h1>모집 성별조건</h1>
          <input
            type="radio"
            id="partygenderm"
            name="gender-select"
            value="1"
            checked={partyGender === 1}
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
            checked={partyGender === 2}
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
            checked={partyGender === 3}
            onChange={e => {
              handleChangeGender(e);
            }}
          />
          <label htmlFor="partygendero">성별무관</label>
        </div>

        <div className="create-input-group">
          <div>
            <p>연령 제한</p>
          </div>
          <label htmlFor="partyminage">최소</label>
          <select
            id="partyminage"
            value={partyMinAge}
            onChange={e => {
              console.log(e.target.value);
              handleChangeMinAge(e);
            }}
          >
            <option value="1940">
              --- 최소 연령을 선택해주세요 (연령무관)---
            </option>
            {years.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="partymaxage">최대</label>
          <select
            id="partymaxage"
            value={partyMaxAge}
            onChange={e => {
              handleChangeMaxAge(e);
            }}
          >
            <option value="2024">
              --- 최대 연령을 선택해주세요 (연령무관)---
            </option>
            {years.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="create-input-group">
          <label htmlFor="partyMaximum">모임의 허용인원을 설정해 주세요</label>
          <input
            autoComplete="off"
            type="number"
            id="partyMaximum"
            value={partyMaximum}
            onChange={e => {
              handleChangeMaximum(e);
            }}
          />
          명
        </div>

        <div className="create-file-group">
          <label htmlFor="partyfile">사진으로 모임을 소개해 주세요.</label>
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
          <label htmlFor="partytext">더 상세히 모임을 소개해 주세요.</label>
          {/* <textarea
            type="textfield"
            id="partytext"
            autoComplete="off"
            value={partyIntro}
            onChange={e => {
              handleChangeIntro(e);
            }}
          /> */}
          <ReactQuill
            value={partyIntro}
            onChange={setPartyIntro}
            modules={modules}
          />
        </div>
        <div className="create-textarea-group">
          <label htmlFor="partyform">모임의 신청양식을 작성해 주세요.</label>
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
        <div
          className="create-button"
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </div>
        <div
          className="create-button"
          onClick={e => {
            handSubmitCreate(e);
          }}
        >
          수정하기
        </div>
      </CreateBtnWrapStyle>
    </CreateInnerStyle>
  );
};

export default Modify;
