import { apiInstance } from "./index.js";

const api = apiInstance();

function listPlan(param, success, fail) {
  api.get(`/plan`, { params: param }).then(success).catch(fail);
}

export { listPlan };