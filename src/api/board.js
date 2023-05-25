import { apiInstance } from "./index.js";

const api = apiInstance();

// 게시판 글 목록 반환
function listBoard(param, success, fail) {
  api.get(`/board/list`, { params: param }).then(success).catch(fail);
}

// 게시글 상세 조회
function viewBoard(boardId, success, fail) {
  api
    .get(`/board/${boardId}`, {
      headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") },
    })
    .then(success)
    .catch(fail);
}

// 게시글 작성
function writeBoard([board, img], success, fail) {
  const formData = new FormData();
  console.log(board);
  console.log(img);

  formData.append("title", board.title);
  formData.append("content", board.content);
  formData.append("userId", board.userId);
  formData.append("userName", board.userName);
  if (img !== null) {
    formData.append("image", img);
  }

  console.log("formData :: ");
  console.log(formData);
  api
    .post(`/board`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token"),
      },
    })
    .then(success)
    .catch(fail);
}

// 게시글 수정
function modifyBoard1([board, img], success, fail) {
  const formData = new FormData();

  formData.append("title", board.title);
  formData.append("id", board.id);
  formData.append("content", board.content);
  formData.append("userId", board.userId);
  formData.append("userName", board.userName);
  formData.append("image", img);

  api
    .put(`/board`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token"),
      },
    })
    .then(success)
    .catch(fail);
}

function modifyBoard2(board, success, fail) {
  console.log(board);
  api.put(`/board/${board.id}`, JSON.stringify(board),
    {
      headers: {
        "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token")
      }
    }).
    then(success)
    .catch(fail);
}



// 게시글 삭제
function deleteBoard(boardId, success, fail) {
  api
    .delete(`/board/${boardId}`, {
      headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") },
    })
    .then(success)
    .catch(fail);
}

export { listBoard, viewBoard, writeBoard, modifyBoard1, modifyBoard2, deleteBoard };
