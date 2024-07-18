const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.pugachovwtwr.jumpingcrab.com"
    : "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Something went wrong: ${res.status}`);
}

function getClothingItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addClothingItem(values, token) {
  //values = inputValues I recieve from the form
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: values.nameInputValue,
      imageUrl: values.urlInputValue,
      weather: values.weatherInputValue,
    }),
  }).then(checkResponse);
}

function deleteClothingItem(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function getUserInfo(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function updateUserInfo(values, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: values.name,
      avatar: values.avatar,
    }),
  }).then(checkResponse);
}

function likeClothingItem(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function unlikeClothingItem(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  checkResponse,
  getUserInfo,
  updateUserInfo,
  likeClothingItem,
  unlikeClothingItem,
};
