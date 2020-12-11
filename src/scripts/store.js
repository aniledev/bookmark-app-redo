import $ from "jquery";
import cuid from "cuid";
import api from "./api";
import events from "./events";
import index from "./index";
import store from "./store";
import templates from "./templates";

// THIS MODULE ONLY CONTAINS STORE VARIABLE AND FUNCTIONS THAT CHANGE THE STATE OF THE STORE
//  EXAMPLE STORE DATA SINGLE SOURCE OF TRUTH
let STORE = {
  bookmarks: [],
  adding: false, // is the new bookmark form showing or not?
  filtering: false, // is the dropdown box for filtering showing or not?
  filter: 0, // what rating  are we filtering for?
  error: null, // is there an error on the new bookmark form or not?
};

const createBookmarkObject = function () {
  // this function will take in values from the form and create a new object that can be pushed to the STORE data
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
  // this function needs to push the API data not the const STORE data
  if (store.STORE.error != "title") {
    console.log("add bookmark function invoked");
    // invoke factory function when submit is clicked, factory function returns an object to push to the STORE
    let newBookmark = store.createBookmarkObject(); // object needs tp be created first

    console.log(newBookmark);
    api.postBookmarkAPI(newBookmark).then((data) => {
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

const formErrorState = function () {
  if ($(".bookmark-title").val() === "") {
    store.STORE.error = "title";
  }
  if ($(".bookmark-title").val() != "") {
    store.STORE.error = null;
  }
};

const findBookmarkById = function (id) {
  // using the find array method to find where in the bookmarks array the bookmark.id matches the passed in id
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
  formErrorState,
  findBookmarkById,
  expandBookmarkToggle,
  deleteBookmarkObject,
};
