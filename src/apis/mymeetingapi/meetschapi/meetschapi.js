import axios from "axios";

// GET
// /api/plan
// 모임 일정 전체 조회
// /api/plan?plan_party_seq=${}
export const getSchAll = async schMeetSeq => {
  try {
    const res = await axios.get(`/api/plan?plan_party_seq=${schMeetSeq}`);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// GET
// /api/plan/{plan_seq}
// 모임 일정 상세 조회
// /api/plan/${}
export const getSchOne = async schSeq => {
  try {
    const res = await axios.get(`/api/plan/${schSeq}`);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// GET
// /api/plan/member
// 일정 참가 멤버 조회
// /api/plan/member?planSeq=1
export const getSchMemberAll = async schSeq => {
  try {
    const res = await axios.get(`/api/plan/member?planSeq=${schSeq}`);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// POST
// /api/plan
// 모임 일정 등록
// /api/plan
// {
//     "planPartySeq": 1,
//     "planStartDt": "24-07-23",
//     "planStartTime": "12:00:00",
//     "planTitle": "정기 모임",
//     "planContents": "단체 회식"
//   }

export const postMonthCalculateBudget = async ({
  planPartySeq,
  planStartDt,
  planStartTime,
  planTitle,
  planContents,
  planLocation,
}) => {
  try {
    const res = await axios.post(`/api/plan`, {
      planPartySeq,
      planStartDt,
      planTitle,
      planContents,
      planStartTime,
      planLocation,
    });
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// DELETE
// /api/plan
// 모임 일정 삭제
// /api/plan?plan_seq=${}
// /api/plan?plan_seq=1032
export const deleteSchOne = async schSeq => {
  try {
    const res = await axios.delete(`/api/plan?plan_seq=${schSeq}`);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// PATCH
// /api/plan
// 모임 일정 수정
// /api/plan
// {
//     "planSeq": 1,
//     "planStartDt": "24-07-23",
//     "planStartTime": "12:00:00",
//     "planTitle": "정기 모임",
//     "planContents": "단체 회식"
//   }

export const patchSch = async ({
  planSeq,
  planStartDt,
  planStartTime,
  planLocation,
  planTitle,
  planContents,
}) => {
  try {
    const res = await axios.patch(`/api/plan`, {
      planSeq,
      planStartDt,
      planStartTime,
      planLocation,
      planTitle,
      planContents,
    });
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// PATCH
// /api/plan/{plan_seq}
// 모임 일정 완료
// /api/plan/234234
export const patchSchComp = async schSeq => {
  try {
    const res = await axios.patch(`/api/plan/${schSeq}`);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};
