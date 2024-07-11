import axios from "axios";

// 월 별 회계 내역 조회
// /api/budget?budgetPartySeq=1&month=1
export const getMonthBudget = async ({ budgetPartySeq, month }) => {
  try {
    const res = await axios.get(
      `/api/budget?budgetPartySeq=${budgetPartySeq}&month=${month}`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// 월 별 정산 내역 출력
// /api/budget/month?budgetPartySeq=1&month=1
export const getMonthCalculateBudget = async ({ budgetPartySeq, month }) => {
  try {
    const res = await axios.get(
      `/api/budget/month?budgetPartySeq=${budgetPartySeq}&month=${month}`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};
