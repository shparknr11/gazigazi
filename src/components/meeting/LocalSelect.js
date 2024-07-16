import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getLocalDetail } from "../../apis/meeting/meetingapi";

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
  .local-select-btn {
    padding: 10px 15px;
    border: 1px solid #000;
    border-radius: 25px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const LocalSelect = ({
  localList,
  setSelectorOpen,
  setLocalList,
  setLocalData,
  setLocaDetaillData,
  partyLocation,
  setPartyLocation,
}) => {
  const [localDetailOpen, setLocalDetailOpen] = useState(false);
  const [localDetailList, setLocalDetailList] = useState([]);
  const [localRadioChecked, setLocalRadioChecked] = useState(null);

  const handleClickLocalDetail = async (_cdGbNm, _cdGb) => {
    setLocalDetailOpen(true);
    setLocalData(_cdGbNm);
    setLocaDetaillData("");
    setLocalRadioChecked(null);

    const data = { cdSub: parseInt(_cdGb), cdGb: 0 };
    const result = await getLocalDetail(data);
    // console.log(result);
    if (result.code !== 1) {
      alert(result.resultMsg);
      return;
    }
    setLocalDetailList(result.resultData);
  };

  const handleClickLocalComplete = () => {
    if (localRadioChecked === null) {
      alert("지역을 선택해주세요.");
      return;
    }
    setLocalDetailList([]);
    setLocalDetailOpen(false);
    setLocalList([]);
    setSelectorOpen(false);
  };

  const handleRadioChange = item => {
    // console.log(item);
    const locationForInt = `${item.cdSub}${item.cdGb}`;
    // console.log(locationForInt);
    const cdInt = parseInt(locationForInt);
    // console.log(cdInt);
    setPartyLocation(cdInt);
    setLocaDetaillData(item.cdGbNm);
    setLocalRadioChecked(item.cdGbNm);
  };

  useEffect(() => {
    console.log("partyLocation", partyLocation);
  }, [partyLocation]);
  return (
    <LocalSelectWrapStyle>
      <div className="local-select-box">
        <ul className="local-select-list">
          {localList.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                handleClickLocalDetail(item.cdGbNm, item.cdGb);
              }}
            >
              <span>{item.cdGbNm}</span>
            </li>
          ))}
          <li>
            <span style={{ visibility: "hidden" }}>기타</span>
          </li>
        </ul>
      </div>
      <div className="local-select-detail-box">
        {localDetailOpen ? (
          <ul className="local-select-detail-list">
            {localDetailList.map((item, index) => (
              <li key={index}>
                <div className="local-select-div">
                  <input
                    type="radio"
                    id={item.cdGbNm}
                    name="local-select"
                    checked={localRadioChecked === item.cdGbNm} // 상태에 따라 체크 여부 결정
                    onChange={() => handleRadioChange(item)}
                  />
                  <label htmlFor={item.cdGbNm}>{item.cdGbNm}</label>
                </div>
              </li>
            ))}
            <div
              className="local-select-btn"
              onClick={() => {
                handleClickLocalComplete();
              }}
            >
              확인
            </div>
          </ul>
        ) : (
          <h1>지역을 선택해 주세요</h1>
        )}
      </div>
    </LocalSelectWrapStyle>
  );
};

export default LocalSelect;
