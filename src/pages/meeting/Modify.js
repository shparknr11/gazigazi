import styled from "@emotion/styled";
import LocalSelect from "../../components/meeting/LocalSelect";
import { useEffect, useState } from "react";
import {
  getLocal,
  getPartyOne,
  postParty,
} from "../../apis/meeting/meetingapi";
import { useParams } from "react-router-dom";

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

const CreateBtnWrapStyle = styled.div`
  display: flex;
  justify-content: end;
  gap: 25px;
  .create-button {
    padding: 10px 20px;
    border: 1px solid;
    border-radius: 25px;
    &:hover {
      background-color: wheat;
    }
  }
`;

const Modify = () => {
  const { partySeq } = useParams();
  // form
  const [partyName, setPartyName] = useState("");
  const [partyGenre, setPartyGenre] = useState("");
  const [partyLocation, setPartyLocation] = useState("");
  const [partyMinAge, setPartyMinAge] = useState(1940);
  const [partyMaxAge, setPartyMaxAge] = useState(2024);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPartyOne(partySeq); // API에서 기존 모임 데이터 가져오기
        console.log("result", result);

        // // 가져온 데이터를 상태 변수에 설정
        setPartyName(result.resultData.partyName);
        setPartyGenre(result.resultData.partyGenre);
        // setPartyLocation(partyDetails.partyLocation);
        setPartyMinAge(result.resultData.partyMinAge);
        setPartyMaxAge(result.resultData.partyMaxAge);
        // setPartyMaximum(partyDetails.partyMaximum);
        // setPartyGender(partyDetails.partyGender);
        // setPartyIntro(partyDetails.partyIntro);
        // setPartyJoinForm(partyDetails.partyJoinForm);
        // setLocalData(partyDetails.localData);
        // setLocalDetailData(partyDetails.localDetailData);
        // setPreviewImg(partyDetails.previewImg);
        // setSelectorOpen(true); // 필요에 따라 Selector를 열거나 닫을 수 있습니다.
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   // console.log(localList);
  //   // console.log(localData);
  //   // console.log(localDetailData);
  // }, [localList, localData, localDetailData]);

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
    console.log(genre);
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
    console.log("result", result);
    console.log("resultData", result.resultData);
    setLocalList(result.resultData);
  };
  // 성별 선택
  const handleChangeGender = e => {
    const gender = parseInt(e.target.value);
    setPartyGender(gender);
  };
  // 연령제한 선택
  const handleChangeMinAge = e => {
    console.log("min", e.target.value);
    const minAge = parseInt(e.target.value);
    setPartyMinAge(minAge);
    if (minAge > partyMaxAge) {
      alert("최대년도보다 낮게 설정해주세요.");
    }
  };
  const handleChangeMaxAge = e => {
    console.log("max", e.target.value);
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

  // 모임소개 작성
  const handleChangeIntro = e => {
    setPartyIntro(e.target.value);
  };
  // 모임 신청양식 작성
  const handleChangeJoinForm = e => {
    setPartyJoinForm(e.target.value);
  };

  const handSubmitCreate = e => {
    e.preventDefault();
    if (selectorOpen) {
      alert("상세 모임을 선택해주세요");
    }
    const formData = new FormData();
    const infoData = JSON.stringify({
      userSeq: 1010,
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

    postParty(formData);
  };

  return (
    <CreateInnerStyle>
      <h1>내 모임 수정</h1>

      <CreateFormDivStyle>
        <h1>모임 등록양식</h1>

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
            value={`${localData}${localDetailData}`}
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
          <label htmlFor="partytext">더 상세히 모임을 소개해 주세요.</label>
          <textarea
            type="textfield"
            id="partytext"
            autoComplete="off"
            value={partyIntro}
            onChange={e => {
              handleChangeIntro(e);
            }}
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
        <div className="create-button">취소</div>
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
