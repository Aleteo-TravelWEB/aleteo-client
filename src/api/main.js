import { apiInstance } from '@/api/index';

const api = apiInstance();

// 관광지 info 목록 반환
async function listAttraction(success, fail) {
  api.get(`/attraction/list`).then(success).catch(fail);
}

export { listAttraction };

