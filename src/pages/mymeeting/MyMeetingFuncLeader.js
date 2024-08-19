import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteBudget,
  getMemberBudget,
  getMonthBudget,
  getMonthCalculateBudget,
  patchBudget,
} from "../../apis/mymeetingapi/budget/budgetapi";
import { getNoticeAll } from "../../apis/mymeetingapi/meetingnotice/meetingnotice";
import Loading from "../../components/common/Loading";
import MyMeetingBudgetResister from "../../components/mymeeting/MyMeetingBudgetResister";
import userReducer from "../../redux/UserRedux/Reducers/userReducer";
import MyMeetingCalendar from "./MyMeetingCalendar";
import "./common.js";
import MyMeetingBoard from "./jfs/MyMeetingBoard.js";
import "./printledger.css";

const MyMeetingFuncLeaderStyle = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
  transition: width 0.3s;
  margin-bottom: 40px;

  .meeting-wrap {
    display: flex;
    width: 100%;
    text-align: center;
  }

  .item-wrap {
    display: flex;
    width: 20%;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #f7ebd5;
    border-radius: 4px 0px 0px 0px;
    flex-direction: column;
    justify-content: start;
  }
  @media (max-width: 1340px) {
    width: 100%;
    transition: width 0.3s;
    .meeting-wrap {
      /* flex-direction: column !important; */
    }
    .item-wrap {
      /* width: 100%; */
      /* justify-content: center !important; */
    }
  }
  @media (max-width: 1024px) {
    width: 100%;
    transition: width 0.3s;
    .meeting-wrap {
      flex-direction: column !important;
    }
    .item-wrap {
      width: 100% !important;
      justify-content: center !important;
      flex-direction: row !important;
    }
  }

  .item {
    width: 100%;
    padding: 10px;
    color: #383737;
    cursor: pointer;
  }
  .item-border {
    /* border-right: 1px solid #f7ebd5;
    border-bottom: 1px solid #f7ebd5; */
  }
  .func-main {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .func-main-inner {
    width: 98%;
    height: 98%;
    border-radius: 4px;
    background-color: white;
    margin: 0 auto;
  }
  .divButtonStyle {
    transition: background-color 0.5s ease;
    background-color: #f8ebd6;
    color: #c5861f;
  }
  .main-notice-ul {
    display: flex;
    flex-direction: column;
    border: 1px solid #f8ebd6;
    border-radius: 6px;
  }
  .main-notice-li {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #f8ebd6;
    padding: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
  }
  .cut-text {
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const LedgerStyle = styled.div`
  .select-box-style {
    height: 30px;
    border: 1px solid antiquewhite;
    text-align: center;
    width: 50px;
    vertical-align: middle;
    border-radius: 15px;
  }
  .select-box-style:hover {
    box-shadow: 1px 1px 1px 1px inset gray;
    background-color: #f8ebd6;
  }
  .ledger-ul {
    border: 1px solid antiquewhite;
  }
  .ledger-li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      height: 65px;
      border: 1px solid rgb(248, 235, 214);
      width: 25%;
      padding: 20px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 4px !important;
  }
  .cut-text {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding: 20px 0px 20px 5px;
`;
const MyMeetingFuncLeader = () => {
  const [isClicked, setIsClicked] = useState(0);
  const [monthValue, setMonthValue] = useState("01");
  const [budgetList, setBudgetList] = useState([]);
  const [depositSum, setDepositSum] = useState(0);
  const [budgetListLength, setBudgetListLength] = useState(0);
  const [depositMember, setDepositMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null); // 수정할 예산 데이터
  const funcRef = useRef();
  const itemRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    //console.log(noticeList);
  }, [noticeList]);

  useEffect(() => {
    // console.log("isClicked : ", isClicked);
  }, [isClicked]);
  useEffect(() => {}, [monthValue]);
  useEffect(() => {}, [isPopup]);
  useEffect(() => {
    document.getElementById(1).click();
  }, []);
  // 버튼 2개로 움직일 거임
  // 그 전에 태그를 담아 두는거
  let activeItem = null;
  // onclick 형태로 고쳐야함
  window.addEventListener("click", e => {
    const a = document.querySelector(".func-main");
    const titletext = document.querySelector("#titletext");
    if (e.target.classList.contains("item")) {
      const clickedItem = e.target;
      if (activeItem) {
        activeItem.classList.remove("divButtonStyle");
      }

      clickedItem.classList.add("divButtonStyle");
      if (titletext) {
        //   titletext.innerHTML =
        //     "Blog" + "(" + document.getElementById(e.target.id).innerText + ")";
        activeItem = clickedItem;
        // 이벤트 걸곳 axios 여기다 걸자
        switch (clickedItem.id) {
          case "1":
            a.style.backgroundColor = "#f8ebd6";

            break;
          case "2":
            a.style.backgroundColor = "#f8ebd6";
            break;
          case "3":
            a.style.backgroundColor = "#f8ebd6";
            break;
          default:
            break;
        }
      }
    }
  });

  // let resetHtml = document.body.innerHTML;
  // const a = document.querySelector("#printTagId").innerHTML;
  // const b = () => {
  //   document.body.innerHTML = a;
  // };
  // window.onbeforeprint = b();
  // window.print();
  // window.onafterprint = document.body.innerHTML = resetHtml;
  useEffect(() => {}, [isPopup]);
  const handleBudgetClick = async _monthValue => {
    setIsLoading(true);
    const budgetObj = {
      budgetPartySeq: params?.meetingId,
      month:
        _monthValue === undefined && _monthValue == "22" ? "01" : _monthValue,
    };
    try {
      const res = await getMonthBudget(budgetObj);
      const resData = await getMonthCalculateBudget(budgetObj);
      const resDataMember = await getMemberBudget(budgetObj);
      setDepositSum(resData?.depositSum.toLocaleString());
      setDepositMember(resDataMember);
      setBudgetListLength(res?.length);
      let i = res?.length ? res?.length : 0;
      for (i; i <= 9; i++) {
        res?.push([]);
      }

      setBudgetList(res);
      toast.success(`${budgetObj.month}월 데이터가 조회되었습니다.`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setTimeout(() => {
      funcRef.current.style.backgroundColor = "#f8ebd6";
      itemRef.current.classList.add("divButtonStyle");
      activeItem = itemRef.current;
    }, 100);
  };

  const handleEditBudget = budget => {
    setIsEditPopup(true);
    setSelectedBudget(budget);
  };

  const handleBudgetUpdate = async () => {
    const updateBudget = {
      ...selectedBudget,
      budgetPic: selectedBudget.budgetPic || "",
      budgetSeq: selectedBudget.budgetSeq,
      budgetMemberSeq: selectedBudget.budgetMemberSeq,
      budgetGb: selectedBudget.type === "입금" ? 1 : 2,
      budgetDt: selectedBudget.budgetDt,
      budgetAmount: parseInt(selectedBudget.budgetAmount, 10),
      budgetText: selectedBudget.budgetText,
      cdNm: selectedBudget.cdNm,
    };
    console.log("Selected Budget:", selectedBudget);
    console.log("Update Budget:", updateBudget);

    try {
      await patchBudget(updateBudget);
      console.log(updateBudget);
      toast.success("회계 내역이 수정되었습니다.");
      handleBudgetClick(monthValue); // 데이터 새로 고침
      setIsEditPopup(false); // 수정 폼 닫기
    } catch (error) {
      console.error(error);
      toast.error("수정 중 오류가 발생했습니다.");
    }
  };

  const handleBudgetDelete = async budgetSeq => {
    if (confirm("삭제하시겠습니까?")) {
      try {
        await deleteBudget(budgetSeq);
      } catch (error) {
        console.log(error);
      }
      toast.success("회계 내역이 삭제되었습니다.");
      handleBudgetClick(monthValue);
    }
  };

  const handleNoticeList = async (pages = 1) => {
    setIsLoading(true);
    try {
      const res = await getNoticeAll(
        params?.meetingId,
        pages,
        userReducer.token,
      );
      setNoticeList(res.list);
    } catch (error) {
      console.log(error);
    }
    toast.success("게시글이 조회되었습니다.");
    setIsLoading(false);
    setTimeout(() => {
      funcRef.current.style.backgroundColor = "#f8ebd6";
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <MyMeetingFuncLeaderStyle>
      {isPopup && (
        <MyMeetingBudgetResister
          setIsPopup={setIsPopup}
          handleBudgetClick={handleBudgetClick}
          monthValue={monthValue}
        />
      )}
      {isEditPopup && selectedBudget && (
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <TextField
            label="금액"
            variant="outlined"
            fullWidth
            value={selectedBudget.budgetAmount}
            onChange={e =>
              setSelectedBudget({
                ...selectedBudget,
                budgetAmount: e.target.value,
              })
            }
            type="number"
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="상세내역"
            variant="outlined"
            fullWidth
            value={selectedBudget.budgetText}
            onChange={e =>
              setSelectedBudget({
                ...selectedBudget,
                budgetText: e.target.value,
              })
            }
            sx={{ marginBottom: "10px" }}
          />
          <FormControl fullWidth>
            <InputLabel id="budget-type-label">회계 구분</InputLabel>
            <Select
              labelId="budget-type-label"
              id="budget-type"
              value={selectedBudget.type}
              label="회계 구분"
              onChange={e =>
                setSelectedBudget({ ...selectedBudget, type: e.target.value })
              }
            >
              <MenuItem value="입금">입금</MenuItem>
              <MenuItem value="출금">출금</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="일자"
            fullWidth
            type="date"
            value={selectedBudget.budgetDt}
            onChange={e =>
              setSelectedBudget({ ...selectedBudget, budgetDt: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: "10px" }}
          />
          <Box sx={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBudgetUpdate}
            >
              수정
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditPopup(false)}
              sx={{ marginLeft: "10px" }}
            >
              취소
            </Button>
          </Box>
        </Box>
      )}

      <TitleDivStyle id="titletext">게시판</TitleDivStyle>
      <div className="meeting-wrap">
        <div className="item-wrap">
          <div
            id="1"
            className={`item item-border cut-text ${isClicked === 1 ? "divButtonStyle" : ""}`}
            onClick={() => setIsClicked(1)}
          >
            일정 관리
          </div>
          <div
            id="2"
            className={`item item-border cut-text ${isClicked === 2 ? "divButtonStyle" : ""}`}
            onClick={() => {
              setIsClicked(2);
              handleNoticeList();
            }}
          >
            모임 게시판
          </div>
          <div
            id="3"
            className={`item item-border cut-text ${isClicked === 3 ? "divButtonStyle" : ""}`}
            onClick={() => {
              setIsClicked(3);
              handleBudgetClick(monthValue);
            }}
            ref={itemRef}
          >
            가계부
          </div>
        </div>
        <div className="func-main" style={{ width: "100%" }} ref={funcRef}>
          <div className="func-main-inner">
            {isClicked === 1 ? (
              <MyMeetingCalendar isClicked={isClicked} />
            ) : isClicked === 2 ? (
              <MyMeetingBoard noticeList={noticeList} />
            ) : isClicked === 3 ? (
              <div id="printTagId">
                <LedgerStyle>
                  <TitleDivStyle id="title-print">
                    {monthValue} 월 명세자료
                  </TitleDivStyle>
                  <div
                    id="printDeleteTag"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "right",
                      padding: "30px 10px",
                      gap: "20px",
                    }}
                  >
                    <Box sx={{ minWidth: 80 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          months
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="monthselect"
                          name="monthselect"
                          value={monthValue}
                          label="Age"
                          onChange={e => {
                            setMonthValue(e.target.value);
                            handleBudgetClick(e.target.value);
                          }}
                        >
                          <MenuItem value={"01"}>01</MenuItem>
                          <MenuItem value={"02"}>02</MenuItem>
                          <MenuItem value={"03"}>03</MenuItem>
                          <MenuItem value={"04"}>04</MenuItem>
                          <MenuItem value={"05"}>05</MenuItem>
                          <MenuItem value={"06"}>06</MenuItem>
                          <MenuItem value={"07"}>07</MenuItem>
                          <MenuItem value={"08"}>08</MenuItem>
                          <MenuItem value={"09"}>09</MenuItem>
                          <MenuItem value={"10"}>10</MenuItem>
                          <MenuItem value={"11"}>11</MenuItem>
                          <MenuItem value={"12"}>12</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Button variant="outlined" onClick={handlePrint}>
                      출력
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setIsPopup(true)}
                    >
                      등록
                    </Button>
                  </div>
                  <ul className="ledger-ul">
                    <li className="ledger-li">
                      <span>번호</span>
                      <span>회계 구분</span>
                      <span>상세내역</span>
                      <span>금액</span>
                      <span>일자</span>
                      <span>관리</span>
                    </li>
                    {budgetList?.map((item, index) => (
                      <li className="ledger-li" key={item?.budgetSeq}>
                        <span>{index + 1}</span>
                        <span>{item.budgetGb}</span>
                        <span>{item.budgetText}</span>
                        <span>
                          {item?.budgetAmount !== undefined
                            ? Number(item.budgetAmount).toLocaleString()
                            : null}
                        </span>
                        <span>{item.budgetDt}</span>
                        <span
                          className="print-delete"
                          style={{ paddingTop: "17px" }}
                        >
                          {item?.budgetSeq ? (
                            <>
                              <button
                                className="edit-btn"
                                onClick={() => handleEditBudget(item)}
                              >
                                수정
                              </button>
                              /
                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleBudgetDelete(item.budgetSeq)
                                }
                              >
                                삭제
                              </button>
                            </>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </LedgerStyle>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </MyMeetingFuncLeaderStyle>
  );
};

export default MyMeetingFuncLeader;
