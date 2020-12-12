import $ from "jquery";
import api from "./api";
import index from "./index";
import store from "./store";

// THIS MODULE ONLY CONTAINS STORE VARIABLE AND FUNCTIONS THAT CHANGE THE STATE OF THE STORE
let STORE = {
  bookmarks: [],
  adding: false,
  filtering: false,
  filter: 0,
  error: null,
};

// factory function used to send form inputs to API
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

const addNewBookmarkStore = function () {
  if (store.STORE.error != "title") {
    let newBookmark = store.createBookmarkObject();

    api.postBookmarkAPI(newBookmark).then((data) => {
      data.expanded = false;
      data.filtered = false;
      store.STORE.bookmarks.push(data);
      index.render();
    });
  }
};

const findBookmarkById = function (id) {
  let found = store.STORE.bookmarks.find((bookmark) => bookmark.id == id);
  return found;
};

const expandBookmarkToggle = function (id) {
  let found = store.findBookmarkById(id);
  found.expanded = !found.expanded;
};

const deleteBookmarkStore = function (id) {
  let bookmarkRemove = store.findBookmarkById(id);
  let index = store.STORE.bookmarks.indexOf(bookmarkRemove);
  store.STORE.bookmarks.splice(index, 1);
};

export default {
  STORE,
  createBookmarkObject,
  addNewBookmarkStore,
  findBookmarkById,
  expandBookmarkToggle,
  deleteBookmarkStore,
};
