import axios from "axios";

let baseURL;

if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3025/";
} else {
  baseURL = "https://aqueous-wildwood-99814.herokuapp.com/";
}

const api = axios.create({
  baseURL,
});

function callAPI(url, method, data = {}, headers = {}) {
  let a = null;
  switch (method) {
    case "get":
      a = api.get(url, { params: data, headers });
      break;
    case "post":
      a = api.post(url, data, { headers });
      break;
    default:
  }
  if (a !== null) {
    return a;
  }
  return Promise.reject();
}

export { callAPI };

export default api;
