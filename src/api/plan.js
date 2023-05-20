import { apiInstance } from "./index.js";

const api = apiInstance();

// 여행 계획 글 목록 반환
function listPlan(param, success, fail) {
  api.get(`/plan`, { params: param }).then(success).catch(fail);
}

// 여행 계획 등록
async function regist([plan, places], success, fail) {
  const data = {
    planDto: plan,
    placeDtoList: places
  };

  // console.log(data);
  console.log(data);
  await api.post(`/plan`, data).then(success).catch(fail);
}

// 여행 계획 상세 조회
function viewPlan(planId, success, fail) {
  api.get(`/plan/${planId}`).then(success).catch(fail);
}

// 여행 계획 수정
async function modify([plan, places], success, fail) {
  const data = {
    planDto: plan,
    placeDtoList: places
  };

  // console.log(data);
  console.log(data);
  await api.put(`/plan`, data).then(success).catch(fail);
}

// 여행 계획 삭제
function deletePlan(planId, success, fail) {
  api.delete(`/plan/${planId}`).then(success).catch(fail);
}

export { listPlan, regist, viewPlan, modify, deletePlan };