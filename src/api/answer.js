import { apiInstance } from './index.js';

const api = apiInstance();

// 답변 목록 반환
function listAnswer(boardId, success, fail) {
  api.get(`/board/answer/${boardId}`).then(success).catch(fail);
}

// 답변 작성
function writeAnswer(answer, success, fail) {
  api.post(`/board/answer`, JSON.stringify(answer)).then(success).catch(fail);
}

// 답변 수정
function modifyAnswer(answer, success, fail) {
  api.put(`/board/answer`, JSON.stringify(answer)).then(success).catch(fail);
}

// 답변 삭제
function deleteAnswer(answerId, success, fail) {
  api.delete(`/board/answer/${answerId}`).then(success).catch(fail);
}

export { listAnswer, writeAnswer, modifyAnswer, deleteAnswer };