// THIS MODULE ONLY CONTAINS FUNCTIONS THAT DEAL WITH API REQUESTS AND RESPONSES
import index from "./index";
import store from "./store";

const BASE_URL = "https://thinkful-list-api.herokuapp.com/elina/bookmarks";

const deleteBookmarkAPI = function (id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

const getBookmarksAPI = function () {
  fetch(BASE_URL)
    .then((response) => {
      return response.json();
    })
    .then((responseJSON) => {
      for (let i = 0; i < responseJSON.length; i++) {
        responseJSON[i].expanded = false;
        responseJSON[i].filtered = false;
        store.STORE.bookmarks.push(responseJSON[i]);
        index.render();
      }
    })

    .catch((error) => console.log(error));
};

// write a function that sends a post request to the api, that stores bookmark in the server
const postBookmarkAPI = function (newBookmark) {
  let newBookmarkJSON = JSON.stringify(newBookmark);
  const params = {
    headers: { "Content-Type": "application/json" },
    body: newBookmarkJSON,
    method: "POST",
  };

  return fetch(BASE_URL, params)
    .then((data) => {
      if (data.ok == false) {
        alert("Title and https:// URL are required");
      } else {
        return data.json();
      }
    })
    .catch((error) => console.log(error));
};

export default {
  BASE_URL,
  deleteBookmarkAPI,
  getBookmarksAPI,
  postBookmarkAPI,
};
