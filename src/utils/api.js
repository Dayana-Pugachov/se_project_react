const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Something went wrong: ${res.status}`);
}

function getClothingItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addClothingItem(values) {
  //values = inputValues I recieve from the form
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: values.nameInputValue,
      imageUrl: values.urlInputValue,
      weather: values.weatherInputValue,
    }),
  }).then(checkResponse);
}

function deleteClothingItem(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);
}

export { getClothingItems, addClothingItem, deleteClothingItem, checkResponse };
