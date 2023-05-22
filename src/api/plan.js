import { apiInstance, attrImageInstance } from "@/api/index";

const api = apiInstance();
const imgApi = attrImageInstance();

// 여행 계획 글 목록 반환
function listPlan(param, success, fail) {
  // console.log(sessionStorage.getItem("refresh-token"));
  api.get(`/plan/list`, { params: param }).then(success).catch(fail);
}

// 여행 계획 등록
async function regist([plan, places], success, fail) {
  const data = {
    planDto: plan,
    placeDtoList: places
  };
  console.log("regist plan >> refresh-token check")
  console.log(sessionStorage.getItem("refresh-token"));
  await api.post(`/plan`, data, { headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token")}}).then(success).catch(fail);
}

// 여행 계획 상세 조회
function viewPlan(planId, success, fail) {
  console.log("view plan >> refresh-token check");
  console.log(sessionStorage.getItem("refresh-token"));
  api.get(`/plan/${planId}`, { headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token")}}).then(success).catch(fail);
}

// 여행 계획 수정
async function modify([plan, places], success, fail) {
  const data = {
    planDto: plan,
    placeDtoList: places
  };

  // console.log(data);
  console.log(data);
  await api.put(`/plan`, data, { headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token")}}).then(success).catch(fail);
}

// 여행 계획 삭제
function deletePlan(planId, success, fail) {
  api.delete(`/plan/${planId}`, { headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token")}}).then(success).catch(fail);
}

// 관광지 이미지 정보 가져오기
// {serviceKey}&keyword=서울%20야경%20축제&_type=json"
function getAttrImg(title, success, fail) {
  const SERVICE_KEY = process.env.VUE_APP_TRIP_API_KEY;
  const encode = encodeURI(title);
  console.log("encode :: " + encode);
  imgApi.get(`${SERVICE_KEY}&keyword=${encode}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&_type=json`).then(success).catch(fail);
}

// 좋아요한 여행 게획 불러오기
function viewGoodPlan(userId, success, fail) {
  api.get(`/plan/good/${userId}`, { headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token")}}).then(success).catch(fail);
}

export { listPlan, regist, viewPlan, modify, deletePlan, getAttrImg, viewGoodPlan };