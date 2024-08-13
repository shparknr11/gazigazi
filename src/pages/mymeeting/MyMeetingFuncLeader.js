import styled from "@emotion/styled";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteBudget,
  getMemberBudget,
  getMonthBudget,
  getMonthCalculateBudget,
} from "../../apis/mymeetingapi/budget/budgetapi";
import Loading from "../../components/common/Loading";
import MyMeetingBudgetResister from "../../components/mymeeting/MyMeetingBudgetResister";
import "./common.js";
import MyMeetingCalendar from "./MyMeetingCalendar";
import "./printledger.css";
import { getNoticeAll } from "../../apis/mymeetingapi/meetingnotice/meetingnotice";
import { useSelector } from "react-redux";
import MyMeetingBoard from "./jfs/MyMeetingBoard.js";

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
  const user = useSelector(state => state.user);
  const [isClicked, setIsClicked] = useState(0);
  const [monthValue, setMonthValue] = useState("01");
  const [budgetList, setBudgetList] = useState([]);
  const [depositSum, setDepositSum] = useState(0);
  const [budgetListLength, setBudgetListLength] = useState(0);
  const [depositMember, setDepositMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [noticeList, setNoticeList] = useState([]);
  // const [subTitle, setSubTitle] = useState("일정관리");
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
  const handleBudgetDelete = async budgetSeq => {
    if (confirm("삭제하시겠습니까?")) {
      try {
        await deleteBudget(budgetSeq);
      } catch (error) {
        console.log(error);
      }
      toast.success("회계내역이 삭제되었습니다.");
      handleBudgetClick(monthValue);
    }
  };

  const handleNoticeList = async (pages = 1) => {
    setIsLoading(true);
    try {
      const res = await getNoticeAll(params?.meetingId, pages, user.token);
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
      {isPopup ? (
        <MyMeetingBudgetResister
          setIsPopup={setIsPopup}
          handleBudgetClick={handleBudgetClick}
          monthValue={monthValue}
        />
      ) : null}
      <TitleDivStyle id="titletext">Blog</TitleDivStyle>
      <div className="meeting-wrap">
        {/* <!-- 일단 누르면 이벤트 나오게 해놓음. --> */}
        <div className="item-wrap">
          <div
            id="1"
            className={`item item-border cut-text ${isClicked === 1 ? "divButtonStyle" : null}`}
            onClick={() => {
              setIsClicked(1);
              // setSubTitle("일정관리");
            }}
          >
            일정 관리
          </div>
          <div
            id="2"
            className={`item item-border cut-text ${isClicked === 2 ? "divButtonStyle" : null}`}
            onClick={() => {
              setIsClicked(2);
              // setSubTitle("모임게시판");
              handleNoticeList();
            }}
          >
            모임 게시판
          </div>
          <div
            id="3"
            className={`item item-border cut-text ${isClicked === 3 ? "divButtonStyle" : null}`}
            onClick={() => {
              setIsClicked(3);
              // setSubTitle("가계부");
              handleBudgetClick(monthValue);
            }}
            ref={itemRef}
          >
            가계부
          </div>
        </div>
        {/*  height: "600px */}
        <div className="func-main" style={{ width: "100%" }} ref={funcRef}>
          <div className="func-main-inner">
            {/* <!-- 삼항 연산자 들어올 자리 지금은 조건값 1,2임 --> */}
            {isClicked === 1 ? (
              <MyMeetingCalendar isClicked={isClicked} />
            ) : isClicked === 2 ? (
              // li map 돌릴거임
              // 컴포넌트로 빠질애들임
              <MyMeetingBoard noticeList={noticeList} />
            ) : isClicked === 3 ? (
              // 가계부가 추가되서 여기다가 해야될듯
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
                          <MenuItem value={"01"}>1월</MenuItem>
                          <MenuItem value={"02"}>2월</MenuItem>
                          <MenuItem value={"03"}>3월</MenuItem>
                          <MenuItem value={"04"}>4월</MenuItem>
                          <MenuItem value={"05"}>5월</MenuItem>
                          <MenuItem value={"06"}>6월</MenuItem>
                          <MenuItem value={"07"}>7월</MenuItem>
                          <MenuItem value={"08"}>8월</MenuItem>
                          <MenuItem value={"09"}>9월</MenuItem>
                          <MenuItem value={"10"}>10월</MenuItem>
                          <MenuItem value={"11"}>11월</MenuItem>
                          <MenuItem value={"12"}>12월</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <button
                      type="button"
                      className="resister-btn"
                      onClick={() => {
                        setIsPopup(true);
                      }}
                    >
                      등록
                    </button>
                    <button
                      className="etc-btn"
                      onClick={() => {
                        handlePrint();
                      }}
                    >
                      출력
                    </button>
                  </div>

                  {/* 권한 나왔을 때.... 조건 걸어서 보여주고 안보여주고 해야함. */}
                  <ul className="ledger-ul">
                    <li className="ledger-li">
                      <span>순서</span>
                      <span>회계 구분</span>
                      {/* 일단 해둠 */}
                      <span>상세내역</span>
                      <span>금액</span>
                      <span>일자</span>
                      <span className="print-delete">삭제</span>
                    </li>
                    {budgetList?.map((item, index) => (
                      <li className="ledger-li" key={item?.budgetSeq}>
                        <span>
                          {index + 1}
                          {/* <img src={`../../images/${item.budgetPic}`} /> */}
                        </span>
                        <span>{item.cdNm}</span>
                        {/* 일단 해둠 */}
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
                            <button
                              className="delete-btn"
                              onClick={() => {
                                handleBudgetDelete(item.budgetSeq);
                              }}
                            >
                              내역삭제
                            </button>
                          ) : null}
                        </span>
                      </li>
                    ))}
                    <li className="ledger-li">
                      {/* 영수증 이미지의 값이 있을 시 ... 이미지  */}
                      <span style={{ display: "inline-block", width: "100%" }}>
                        납입 내역
                      </span>
                      {/* (미납입: {depositMember?.unDepositedMember}명) */}
                      <span style={{ display: "inline-block", width: "100%" }}>
                        {budgetListLength} 건
                        {/* {depositMember?.depositedMember}
                        /&nbsp;
                        {depositMember?.memberSum}명 */}
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: "100%",
                        }}
                      >
                        {monthValue} 월 금액 내역
                      </span>
                      <span style={{ display: "inline-block", width: "100%" }}>
                        {depositSum} 원
                      </span>
                    </li>
                    <li className="ledger-li"></li>
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
