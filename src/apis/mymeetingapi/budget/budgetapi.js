import axios from "axios";
import jwtAxios from "../../jwtAxios";

// Budget (회계 관리)
// Budget CRUD

// 월 별 회계 내역 조회
// /api/budget?budgetPartySeq=1&month=1
export const getMonthBudget = async ({ budgetPartySeq, month }) => {
  try {
    const res = await jwtAxios.get(
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
    const res = await jwtAxios.get(
      `/api/budget/month?budgetPartySeq=${budgetPartySeq}&month=${month}`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// DELETE
// /api/budget
// 회계 내역 삭제
export const deleteBudget = async budgetSeq => {
  try {
    const res = await jwtAxios.delete(`/api/budget?budget_seq=${budgetSeq}`);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// GET
// /api/budget/{budget_seq}
// 회계 사진 조회
export const getBudgetPhoto = async ({ budgetSeq, token }) => {
  try {
    const res = await jwtAxios.get(`/api/budget/${budgetSeq}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    console.log(res.data.resultData);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// GET
// /api/budget/member
// 멤버 별 회비 입금 내역 조회
export const getMemberBudget = async ({ budgetPartySeq, month }) => {
  try {
    const res = await jwtAxios.get(
      `/api/budget/member?budgetPartySeq=${budgetPartySeq}&month=${month}`,
    );
    console.log(res.data);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// PATCH /api/budget 회계 내역 수정
export const patchBudget = async budgetData => {
  try {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjQwNTAzNjEsImV4cCI6MTcyNDA1MjE2MSwic2lnbmVkVXNlciI6IntcInVzZXJJZFwiOjI1LFwicm9sZVwiOlwiUk9MRV9VU0VSXCJ9In0.TfXwE03cPzri-7ixVJa2nUwWX-xR0xAqH39LokYTUqpbwu1LEE926eHXbJNPRLWpH4k-9eMY5M7OrDUzwtWZng",
      },
    };
    const res = await jwtAxios.patch("/api/budget", budgetData, header);
    return res.data.resultData;
  } catch (error) {
    console.error(
      error.response?.data?.message || "회계 내역 수정 중 오류가 발생했습니다.",
    );
    throw error; // 에러를 상위로 전달
  }
};

// POST /api/budget 회계 내역 등록
export const postBudget = async formData => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.post("/api/budget", formData, header);
    return res.data.resultData;
  } catch (error) {
    error(
      error.response?.data?.message || "회계 내역 등록 중 오류가 발생했습니다.",
    );
    throw error; // 에러를 상위로 전달
  }
};

// 멤버들 정보 불러오기

// 입력한 모임의 모든 멤버의 정보를 불러옵니다

export const getMember = async budgetPartySeq => {
  try {
    const res = await jwtAxios.get(
      `/api/budget/memberlist?memberPartySeq=${budgetPartySeq}`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};
