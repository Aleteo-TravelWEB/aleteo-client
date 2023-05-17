import { apiInstance } from './index.js';

const api = apiInstance();

// 게시판 글 목록 반환
function listBoard(param, success, fail) {
  api.get(`/board`, { params: param }).then(success).catch(fail);
  console.log(param);
}

// 게시글 상세 조회
function viewBoard(boardId, success, fail) {
  api.get(`/board/${boardId}`).then(success).catch(fail);
}

// 게시글 작성
function writeBoard(board, success, fail) {
  api.post(`/board`, JSON.stringify(board)).then(success).catch(fail);
}

// 게시글 수정
function modifyBoard(board, success, fail) {
  api.put(`/board`, JSON.stringify(board)).then(success).catch(fail);
}

// 게시글 삭제
function deleteBoard(boardId, success, fail) {
  api.delete(`/board/${boardId}`).then(success).catch(fail);
}


export { listBoard, viewBoard, writeBoard, modifyBoard, deleteBoard };