import { apiInstance } from "./index.js";

const api = apiInstance();

function listPlan(param, success, fail) {
  api.get(`/plan`, { params: param }).then(success).catch(fail);
}

async function regist([plan, places], success, fail) {
  const data = {
    planDto: plan,
    placeDtoList: places
  };

  // console.log(data);
  console.log(data);
  await api.post(`/plan`,data).then(success).catch(fail);
}

export { listPlan, regist };