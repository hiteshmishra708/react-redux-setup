import { urls } from "./constants";
import { getToken } from "../components/Validator/Validator";
export const Api = (url, body, type, isFile, isExtUrl = false, hType = 1) => {
  const URL = isExtUrl ? url : urls.SERVER_URL + url
  const headers = {
    "Content-Type": "application/json",
    "access-token": getToken()
  }
  if (hType === 3) {
    delete headers['Content-Type'];
  } else {
    body = JSON.stringify(body);
  }

  let data = fetch(URL, {
    method: type,
    headers,
    // body: url === urls.PROJECT_DOCS_URL ? body : JSON.stringify(body)
    body: body
  })
    .then((response) => {
      //   if (response.status != 200) res.statusCode = response.status
      if (isFile) {
        return response.blob();
      }
      return response.json()
    })
    .then(response => {
      if (isFile) {
        let href = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.download = "d2b.csv";
        a.href = href;
        a.click();
        a.href = '';
        // res.data = response
      }
      return response
    })
    .catch(error => {
      throw new Error('Something went wrong');
    });
  return data;
}
