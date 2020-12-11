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
  console.log("create object function working");
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

  console.log(object);
  return object;
};

console.log(createBookmarkObject());

const addNewBookmark = function () {
  if (store.STORE.error != "title") {
    console.log("add bookmark function invoked");
    let newBookmark = store.createBookmarkObject();

    console.log(newBookmark);
    api.postBookmarkAPI(newBookmark).then((data) => {
      console.log(data);
      data.expanded = false;
      data.filtered = false;
      store.STORE.bookmarks.push(data);
      console.log(store.STORE.bookmarks);
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
  console.log("find bookmark by id function working");
  let found = store.STORE.bookmarks.find((bookmark) => bookmark.id == id);
  console.log(`this is before the click: ${found.expanded}`);
  return found;
};

const expandBookmarkToggle = function (id) {
  console.log("expand book function called");
  let found = store.findBookmarkById(id);
  found.expanded = !found.expanded;
  console.log(`this is after the click: ${found.expanded}`);
  console.log("bookmark expand toggled");
};

const deleteBookmarkObject = function (id) {
  console.log("delete bookmark function called");
  debugger;
  let bookmarkRemove = store.findBookmarkById(id);
  let remove = JSON.stringify(bookmarkRemove);
  let index = store.STORE.bookmarks.indexOf(bookmarkRemove);
  console.log(index);
  console.log(`this is the bookmark to remove ${remove}`);

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
