import { apiInstance } from './index.js';

const api = apiInstance();


// Hotplace 목록 반환
function listHotplace(success, fail) {
  api.get(`/hotplace`).then(success).catch(fail);
}
// Hotplace id 별로 가져오기
function viewHotplace(hotplaceId, success, fail) {
  api.get(`/hotplace/${hotplaceId}`).then(success).catch(fail);
}

// Hotplace 글 작성


// Hotplace 글 수정


// Hotplace 글 삭제
function deleteHotplace(hotplaceId, success, fail) {
  api.get(`/hotplace/${hotplaceId}`).then(success).catch(fail)
}

export { listHotplace, viewHotplace, deleteHotplace };