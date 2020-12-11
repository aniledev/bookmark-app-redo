// THIS MODULE ONLY CONTAINS FUNCTIONS THAT DEAL WITH API REQUESTS AND RESPONSES
import $ from "jquery";
import cuid from "cuid";
import api from "./api";
import events from "./events";
import index from "./index";
import store from "./store";
import templates from "./templates";

const BASE_URL = "https://thinkful-list-api.herokuapp.com/elina/bookmarks";

// write a function that sends a delete request to the server, that will delete the bookmark from the server
const deleteBookmarkAPI = function (id) {
  console.log("delete api function running");
  // creating necessary params for API call

  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  // .then((response) => {
  //   return response.json();
  // })
  // .catch((error) => console.log(error));
};

const getBookmarksAPI = function () {
  console.log("get api function running");
  fetch(BASE_URL)
    .then((response) => {
      console.log(response);
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
      console.log(responseJSON);
      console.log(store.STORE.bookmarks);
    })

    .catch((error) => console.log(error));
};

// write a function that sends a post request to the api, that stores bookmark in the server
const postBookmarkAPI = function (newBookmark) {
  console.log("post api function running", newBookmark);
  // this function needs to be triggered when the form is submitted
  // this function needs to take in the object data when the input form is submitted
  // the data from the object needs to be converted to JSON
  let newBookmarkJSON = JSON.stringify(newBookmark);
  console.log(newBookmarkJSON);
  // using the base url and fetch, a post request needs to be sent to the API server with the correct headers and request body in the form of JSON data
  const params = {
    headers: { "Content-Type": "application/json" },
    body: newBookmarkJSON,
    method: "POST",
  };

  return fetch(BASE_URL, params)
    .then((data) => {
      console.log(data);
      if (data.ok == false) {
        alert("Title and URL are required");
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
