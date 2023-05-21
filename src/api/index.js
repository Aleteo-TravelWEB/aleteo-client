import axios from "axios";

// local vue api axios instance
function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

// attraction image api axios instance
function attrImageInstance() {
  const instance = axios.create({
    baseURL: "https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { apiInstance, attrImageInstance };
