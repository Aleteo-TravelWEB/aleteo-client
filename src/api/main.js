import { apiInstance, kakaoImageInstance } from "@/api/index";

const api = apiInstance();
const kakao = kakaoImageInstance();

// 여행 계획 중 등록된 관광지 TOP TEN 리스트 반환
function viewTopTenPlanPlaces(success, fail) {
  api.get(`/plan/top`).then(success).catch(fail);
}

async function viewPlaceImg(keyword, success, fail) {
  await kakao.get(`/image?query=${keyword}&sort=accuracy&page=1&size=1`).then(success).catch(fail);
}

// 핫플레이스 중 등록된 Top

export { viewTopTenPlanPlaces, viewPlaceImg };
