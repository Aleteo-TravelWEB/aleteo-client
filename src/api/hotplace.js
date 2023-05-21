import { apiInstance } from "./index.js";

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
function writeHotplace([hotplace, image, blob], success, fail) {
  const formData = new FormData();
  console.log("-----------------");
  console.log(hotplace);
  console.log(image);
  console.log(blob);
  formData.append("userId", hotplace.userId);
  formData.append("title", hotplace.title);
  formData.append("joinDate", hotplace.joinDate);
  formData.append("description", hotplace.description);
  formData.append("tag1", hotplace.tag1);
  formData.append("tag2", hotplace.tag2);
  formData.append("latitude", hotplace.latitude);
  formData.append("longitude", hotplace.longitude);
  formData.append("mapUrl", hotplace.mapUrl);
  formData.append("image", image);
  formData.append("imageUrl", blob);

  api
    .post(`/hotplace`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}
// Hotplace 글 수정
async function modifyHotplace1([hotplace, image, imageUrl], success, fail) {
  const formData = new FormData();
  console.log(imageUrl);
  formData.append("userId", hotplace.userId);
  formData.append("title", hotplace.title);
  formData.append("num", hotplace.num);
  formData.append("joinDate", hotplace.joinDate);
  formData.append("description", hotplace.description);
  formData.append("tag1", hotplace.tag1);
  formData.append("tag2", hotplace.tag2);
  formData.append("latitude", hotplace.latitude);
  formData.append("longitude", hotplace.longitude);
  formData.append("mapUrl", hotplace.mapUrl);
  formData.append("image", image);
  formData.append("imageUrl", imageUrl);

  await api
    .put(`/hotplace`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}
async function modifyHotplace2(hotplace, success, fail) {
  await api.put(`/hotplace/${hotplace.num}`, JSON.stringify(hotplace)).then(success).catch(fail);
}

// Hotplace 글 삭제
function deleteHotplace(hotplaceId, success, fail) {
  api.delete(`/hotplace/${hotplaceId}`).then(success).catch(fail);
}

export {
  listHotplace,
  viewHotplace,
  deleteHotplace,
  writeHotplace,
  modifyHotplace1,
  modifyHotplace2,
};
