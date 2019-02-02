/**
 * @param {String} URL 
 * @param {String} HTTP method 
 * @param {Object} Body of the message 
 */
export default function API(url, HTTPmethod, JsonMsg = null) {
  const method = HTTPmethod ? HTTPmethod.toUpperCase() : "GET";
  const params = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-type': "application/json; charset=utf-8"
    },
    mode: "cors",
  };

  if (method !== 'GET')
    params.body = (JsonMsg) ? JSON.stringify(JsonMsg) : "empty";
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
  return new Promise((resolve, reject) => {
    fetch(url, params)
      .then((response) => handleError(response))
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

  function handleError(response) {
    if (!response.ok) {
      throw Error(`Fetcher encountered a ${response.status} error.`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("json") !== -1)
      return response.json();
    else
      return response.text();
  }
}

///Utility PROTOTYPES
export function isNumber(value) {
  if (typeof value !== "string") return false
  return !isNaN(value) && !isNaN(parseFloat(value))
}

export function isEmpty(obj) {
  if (obj === "" || obj === null || obj === {} || obj === [])
    return true;
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export function capsWord(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}