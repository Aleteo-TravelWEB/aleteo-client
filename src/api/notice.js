import { apiInstance } from './index.js';

const api = apiInstance();

// 게시판 글 목록 반환
function listNotice(param, success, fail) {
  api.get(`/notice/list`, { params: param }).then(success).catch(fail);
}

// 게시글 상세 조회
function viewNotice(noticeId, success, fail) {
  api.get(`/notice/${noticeId}`, { headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") } }).then(success).catch(fail);
}

// 게시글 작성
function writeNotice(notice, success, fail) {
  api.post(`/notice`, JSON.stringify(notice), { headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") } }).then(success).catch(fail);
}

// 게시글 수정
function modifyNotice(notice, success, fail) {
  api.put(`/notice`, JSON.stringify(notice), { headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") } }).then(success).catch(fail);
}

// 게시글 삭제
function deleteNotice(noticeId, success, fail) {
  api.delete(`/notice/${noticeId}`, { headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") } }).then(success).catch(fail);
}

export {listNotice, viewNotice, writeNotice, modifyNotice, deleteNotice};