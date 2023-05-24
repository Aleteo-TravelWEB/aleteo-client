import { apiInstance } from "@/api/index";

const api = apiInstance();

// 여행 계획 중 등록된 관광지 TOP TEN 리스트 반환
function viewTopTenPlanPlaces(success, fail) {
  api.get(`/plan/top`).then(success).catch(fail);
}

export { viewTopTenPlanPlaces };