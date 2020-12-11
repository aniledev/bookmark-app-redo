import $ from "jquery";
import cuid from "cuid";
import api from "./api";
import events from "./events";
import index from "./index";
import store from "./store";
import templates from "./templates";

// THIS MODULE ONLY CONTAINS STORE VARIABLE AND FUNCTIONS THAT CHANGE THE STATE OF THE STORE
let STORE = {
  bookmarks: [],
  adding: false,
  filtering: false,
  filter: 0,
  error: null,
};

const createBookmarkObject = function () {
  const rating = $(".rating").val();
  const url = $(".url").val();
  const description = $(".description").val();
  const bookmarkTitle = $(".bookmark-title").val();

  let object = {
    title: bookmarkTitle,
    url: url,
    rating: rating,
    desc: description,
  };

  return object;
};

const addNewBookmark = function () {
  if (store.STORE.error != "title") {
    let newBookmark = store.createBookmarkObject();

    api.postBookmarkAPI(newBookmark).then((data) => {
      data.expanded = false;
      data.filtered = false;
      store.STORE.bookmarks.push(data);
      index.render();
    }); // once the object is created the bookmark can be stringified and sent as a post requeest in the proper format
    // once the object is created then send a post request to the api
    // push the new bookmark to the STORE using .push()

    // call the render function to show the new state of the STORE
    // add a try catch block to handle errors
  }
};

// const formErrorState = function () {
//   if ($(".bookmark-title").val() === "") {
//     store.STORE.error = "title";
//   }
//   if ($(".bookmark-title").val() != "") {
//     store.STORE.error = null;
//   }
// };

const findBookmarkById = function (id) {
  let found = store.STORE.bookmarks.find((bookmark) => bookmark.id == id);
  return found;
};

const expandBookmarkToggle = function (id) {
  let found = store.findBookmarkById(id);
  found.expanded = !found.expanded;
};

const deleteBookmarkObject = function (id) {
  debugger;
  let bookmarkRemove = store.findBookmarkById(id);
  let remove = JSON.stringify(bookmarkRemove);
  let index = store.STORE.bookmarks.indexOf(bookmarkRemove);

  store.STORE.bookmarks.splice(index, 1);
};

export default {
  STORE,
  createBookmarkObject,
  addNewBookmark,
  // formErrorState,
  findBookmarkById,
  expandBookmarkToggle,
  deleteBookmarkObject,
};
