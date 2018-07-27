const root = "http://localhost:3000";

export function fetchGet(route) {
  let url = root.concat(route);
  return fetch(url, {
    credentials: 'include'
  });
}

export function fetchPost(route, data) {
  let url = root.concat(route);
  return fetch(url, {
    method: 'POST', // or 'PUT'
    credentials: 'include',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  })
}
