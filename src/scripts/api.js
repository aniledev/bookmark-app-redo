// THIS MODULE ONLY CONTAINS FUNCTIONS THAT DEAL WITH API REQUESTS AND RESPONSES
import $ from "jquery";
import cuid from "cuid";
import api from "./api";
import events from "./events";
import index from "./index";
import store from "./store";
import templates from "./templates";

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
      // this data comes back in an array
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
  // this function needs to be triggered when the form is submitted
  // this function needs to take in the object data when the input form is submitted
  // the data from the object needs to be converted to JSON
  let newBookmarkJSON = JSON.stringify(newBookmark);
  // using the base url and fetch, a post request needs to be sent to the API server with the correct headers and request body in the form of JSON data
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
