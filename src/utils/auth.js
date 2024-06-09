import { checkResponse } from "./api";

const baseUrl = "http://localhost:3001";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function register(email, password, name, avatar) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
}

function authorize(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export { register, authorize };
