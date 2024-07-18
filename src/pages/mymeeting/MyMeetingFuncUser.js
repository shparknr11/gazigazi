import styled from "@emotion/styled";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import "../mymeeting/common.js";
import {
  deleteBudget,
  getMemberBudget,
  getMonthBudget,
  getMonthCalculateBudget,
} from "../../apis/mymeetingapi/budget/budgetapi";
import Loading from "../../components/common/Loading";
import MyMeetingCalendar from "./MyMeetingCalendar";
import "./printledger.css";
const MyMeetingFuncUserStyle = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
  transition: width 0.3s;
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
    .item-wrap {
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

  .meeting-wrap {
    display: flex;
    width: 100%;
    text-align: center;
  }

  .item {
    width: 100%;
    padding: 10px;
    color: #383737;
    cursor: pointer;
  }
  .item-border-right {
    /* border-right: 1px solid #f7ebd5; */
  }
  .func-main {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .func-main-active {
    transition: background-color 1s ease;
    background-color: #f8ebd6;
  }
  .func-main-inner {
    width: 98%;
    height: 98%;
    border-radius: 4px;
    background-color: white;
    margin: 0 auto;
  }
  .divButtonStyle {
    transition: background-color 0.2s ease;
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
    font-size: 18px;
    font-weight: bold;
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
      border: 1px solid rgb(248, 235, 214);
      width: 25%;
      height: 61px;
      padding: 20px;
      font-weight: bold;
    }
  }
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 4px !important;
  }
`;

const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding: 20px 0px 20px 5px;
`;
const MyMeetingFuncUser = () => {
  const [isClicked, setIsClicked] = useState();
  const [monthValue, setMonthValue] = useState("01");
  const [isDisplayNone, setIsDisplayNone] = useState(0);
  const [budgetList, setBudgetList] = useState([]);
  const [depositSum, setDepositSum] = useState(0);
  const [depositMember, setDepositMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const funcRef = useRef();
  const itemRef = useRef();
  console.log(params);
  useEffect(() => {}, [isClicked]);
  useEffect(() => {}, [monthValue]);
  useEffect(() => {
    document.getElementById(1).click();
  }, []);
  // 버튼 2개로 움직일 거임
  // 그 전에 태그를 담아 두는거
  let activeItem = null;
  // onclick 형태로 고쳐야함
  window.addEventListener("click", e => {
    const item = document.querySelector(".func-main");
    const titletext = document.querySelector("#titletext");
    if (e.target.classList.contains("item")) {
      const clickedItem = e.target;
      if (activeItem) {
        activeItem.classList.remove("divButtonStyle");
      }
      clickedItem.classList.add("divButtonStyle");
      if (titletext) {
        titletext.innerHTML =
          "Blog" + "(" + document.getElementById(e.target.id).innerText + ")";
        activeItem = clickedItem;
        // 이벤트 걸곳 axios 여기다 걸자
        switch (clickedItem.id) {
          case "1":
            item.classList.add("func-main-active");
            break;
          case "2":
            item.classList.add("func-main-active");
            break;
          case "3":
            item.classList.add("func-main-active");
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
  const handlePrint = () => {
    window.print();
  };
  // let currentPage = 1;
  // const todosPerPage = 9;
  // const handleNextScroll = currentTodos => {
  //   // 다음페이지 가기
  //   console.log(currentPage);
  //   console.log(currentTodos);
  // };
  const handleBudgetClick = async e => {
    setIsLoading(true);
    const budgetObj = {
      budgetPartySeq: params?.meetingId,
      month: e?.target.value === undefined ? "01" : e?.target.value,
    };
    try {
      const res = await getMonthBudget(budgetObj);
      // window.addEventListener("scroll", () => {
      //   // 스크롤 값 구해서 내릴 때 마다 + 하면서 위로 쏘면됨.
      //   let WscrollY = 100 * currentPage;
      //   const totalPages = Math.ceil(res.length / todosPerPage);
      //   const indexStart = (currentPage - 1) * todosPerPage;
      //   const currentTodos = res.slice(indexStart, indexStart + todosPerPage);
      //   console.log(window.scrollY >= WscrollY);
      //   if (window.scrollY <= WscrollY) return;
      //   currentPage = currentPage + 1;
      //   if (currentTodos.length > 0) {
      //     // TODO: 중요 사항 : ...currentTodos로 뜯어서 넣을 경우 넣는 데이터가 2배로 들어감 이거만 해결하면 끝
      //     console.log(currentTodos);
      //     const daats = [...currentTodos, ...currentTodos];
      //     setBudgetList(daats);
      //     console.log(budgetList);
      //   }
      //   // else {
      //   //   alert("더이상 정보가 없어요.");
      //   // }
      // });
      const resData = await getMonthCalculateBudget(budgetObj);
      const resDataMember = await getMemberBudget(budgetObj);
      setBudgetList(res);
      setDepositSum(resData?.depositSum.toLocaleString());
      setDepositMember(resDataMember);
      toast.success(`${budgetObj.month}월 데이터가 조회되었습니다.`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    // 일반 js가 시점을 못잡음
    setTimeout(() => {
      funcRef.current.style.backgroundColor = "#f8ebd6";
      itemRef.current.classList.add("divButtonStyle");
      activeItem = itemRef.current;
    }, 100);

    // funcRef.current.style.backgroundColor = "#f8ebd6";
  };
  const handleBudgetDelete = async budgetSeq => {
    if (confirm("삭제하시겠습니까?")) {
      try {
        await deleteBudget(budgetSeq);
        handleBudgetClick();
      } catch (error) {
        console.log(error);
      }
      toast.success("회계내역이 삭제되었습니다.");
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <MyMeetingFuncUserStyle id="aaaaa">
      <TitleDivStyle id="titletext">Blog</TitleDivStyle>
      <div className="meeting-wrap">
        {/* <!-- 일단 누르면 이벤트 나오게 해놓음. --> */}
        <div className="item-wrap">
          <div
            id="1"
            className="item item-border-right"
            onClick={() => {
              setIsClicked(1);
            }}
          >
            일정 관리
          </div>
          <div
            style={{ display: "none" }}
            id="2"
            className="item item-border-right"
            onClick={() => {
              setIsClicked(2);
            }}
          >
            모임 게시판
          </div>
          <div
            id="3"
            className="item item-border-right"
            onClick={() => {
              setIsClicked(3);
              handleBudgetClick();
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
              <MyMeetingCalendar />
            ) : isClicked === 2 ? (
              // li map 돌릴거임
              // 컴포넌트로 빠질애들임
              <div style={{ display: "none" }}>
                <div>
                  <TitleDivStyle>모임 게시판</TitleDivStyle>
                  <div style={{ textAlign: "right", paddingRight: "10px" }}>
                    <button className="resister-btn">등록</button>
                  </div>
                </div>
                <div>
                  <ul className="main-notice-ul">
                    <li className="main-notice-li">
                      <div>글쓴이</div>
                      <div>제목</div>
                      <div>내용</div>
                      <div>날짜</div>
                    </li>
                    <Link to={"/mymeeting/mymeetingnotice/${pk}"}>
                      <li className="main-notice-li">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
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
                            setMonthValue(prevCount => {
                              return e.target.value;
                            });
                            handleBudgetClick(e);
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
                      <span>멤버명</span>
                      <span>금액</span>
                      <span>일자</span>
                      <span>삭제</span>
                    </li>
                    {budgetList?.map((item, index) => (
                      <li className="ledger-li" key={item?.budgetSeq}>
                        <span>
                          {index}
                          {/* <img src={`../../images/${item.budgetPic}`} /> */}
                        </span>
                        <span>{item.cdNm}</span>
                        {/* 일단 해둠 */}
                        <span>{item.budgetText}</span>
                        <span>{item.budgetAmount}</span>
                        <span>{item.budgetDt}</span>
                        <span
                          style={{ paddingTop: "13px", paddingBottom: "13px" }}
                        >
                          <button
                            className="delete-btn"
                            onClick={() => {
                              handleBudgetDelete(item.budgetSeq);
                            }}
                          >
                            내역삭제
                          </button>
                        </span>
                      </li>
                    ))}
                    <li className="ledger-li">
                      {/* 영수증 이미지의 값이 있을 시 ... 이미지  */}
                      <span style={{ display: "inline-block", width: "100%" }}>
                        납입 내역(미납입: {depositMember?.unDepositedMember}명)
                      </span>
                      <div style={{ width: "100%" }}>
                        <span
                          style={{ display: "inline-block", width: "100%" }}
                        >
                          {depositMember?.depositedMember}
                          /&nbsp;
                          {depositMember?.memberSum}명
                        </span>
                      </div>
                      <div style={{ width: "100%" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "100%",
                          }}
                        >
                          {monthValue} 월 금액 내역
                        </span>
                      </div>
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
    </MyMeetingFuncUserStyle>
  );
};

export default MyMeetingFuncUser;
