import $ from "jquery";
import cuid from "cuid";
import api from "./api";
import events from "./events";
import index from "./index";
import store from "./store";
import templates from "./templates";

const generateAddForm = function () {
  return `<div>
    <h1>myMarks</h1>
  </div><div id="form" class="form">
    <h3>Add a new bookmark</h3>
    <form id="form" class="form" action="" method="" enctype="">
      <label for="bookmark-title">Title</label>
      <input
      required type="text"
        id="bookmark-title"
        class="bookmark-title"
        name="bookmark-title"
        placeholder="Awesome Bookmark Site" 
      />
      <label for="url">URL</label>
      <input
      required type="text"
        id="url"
        class="url"
        name="url"
        placeholder="https://www.samplesite.com" 
      />
      <label for="rating">Rating</label>
      <select
      required id="rating"
        name="rating"
        type="number"
        class="rating"
        placeholder="3" 
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        class="description"
        cols="30"
        rows="10"
        placeholder="Enter a description (optional)"
      ></textarea>
    </form>
  </div>
  <div class="bottom-button">
    <button type="text" id="cancel" class="cancel">Cancel</button>
    <input type="submit" id="create" class="create" value="Create"></input>
  </div>`;
};

const generateFilterDropdown = function () {
  const bookmarks = store.STORE.bookmarks.map((element) =>
    generateNewBookmark(element)
  );
  return `<div>
    <h1>myMarks</h1>
  </div><div class="top-button button">
    <button id="new" class="new">
      <i class="fas fa-plus fa-xs"></i> New
    </button>
    <button id="filter" class="filter">
      <i class="fas fa-filter fa-xs"></i> Filter
    </button>
  </div>
  <div id="ratings" class="ratings">
    <label for="ratings" class="ratings">Select Filter</label>
    <select name="ratings" id="ratings">
      <option value="All">All</option>
      <option value="5">5</option>
      <option value="4">4</option>
      <option value="3">3</option>
      <option value="2">2</option>
      <option value="1">1</option>
    </select>
  </div>
  <div id="bookmarks" class="bookmarks">
  ${bookmarks.join("")}
  </div>
  <div class="bottom-button">
    <button id="clear-filter" class="clear-filter">Clear</button>
  </div>`;
};

const generateFilterList = function (object) {
  console.log("filtered list function");

  const filteredBookmarks = store.STORE.bookmarks.filter(
    (element) => element.rating >= store.STORE.filter
  );
  console.log(store.STORE.bookmarks);
  console.log(store.STORE.filter);
  console.log(filteredBookmarks);

  const filteredBookmarkString = filteredBookmarks.map((element) =>
    generateNewBookmark(element)
  );
  console.log(filteredBookmarkString.join(""));
  return `<div>
    <h1>myMarks</h1>
  </div><div class="top-button button">
    <button id="new" class="new">
      <i class="fas fa-plus fa-xs"></i> New
    </button>
    <button id="filter" class="filter">
      <i class="fas fa-filter fa-xs"></i> Filter
    </button>
  </div>
  <div id="ratings" class="ratings">
    <label for="ratings" class="ratings">Select Filter</label>
    <select name="ratings" id="ratings">
      <option value="All">All</option>
      <option value="5">5</option>
      <option value="4">4</option>
      <option value="3">3</option>
      <option value="2">2</option>
      <option value="1">1</option>
    </select>
  </div>
  <div id="bookmarks" class="bookmarks">
  ${filteredBookmarkString.join("")}
  </div>
  <div class="bottom-button">
    <button id="clear-filter" class="clear-filter">Clear</button>
  </div>`;
};

const generateNewBookmark = function (object) {
  console.log("single bookmark generated function");
  let starRating = generateStars(object);
  return `<div >
    <div id="item-title" class="item-title" data-clicked-id="${object.id}">
    <div id="title-rating" class="title-rating flex">
    <h3>${object.title}</h3>
    <p>${starRating}</p>
    </div>
    </div>
    </div>`;
};

const generateNewBookmarkExpanded = function (object) {
  console.log("single expanded bookmark generated function");
  let starRating = generateStars(object);
  return `<div>
    <div id="item-title" class="item-title" data-clicked-id="${object.id}">
    <div id="title-rating" class="title-rating flex">
    <h3>${object.title}</h3>
    <p>${starRating}</p>
    </div>
    
    </div>
      <div class="indented" id="indented">
        <button id="site-link" class="site-link">
        <a id="link" class="link" href="${object.url}" target="_blank">Site</a></button>
        <button id="delete" class="delete" data-clicked-id="${object.id}">Delete</button>
        <p>${object.desc}</p>
      </div>
    </div>`;
};

const generateBookmarksString = function (object) {
  console.log("bookmark string function");
  const bookmarks = store.STORE.bookmarks.map((element) => {
    if (element.expanded === false) {
      return generateNewBookmark(element);
    } else {
      return generateNewBookmarkExpanded(element);
    }
  });
  console.log(bookmarks.join(""));
  return `<div><h1>myMarks</h1></div><div class="top-button button">
    <button id="new" class="new">
      <i class="fas fa-plus fa-xs"></i> New
    </button>
    <button id="filter" class="filter">
      <i class="fas fa-filter fa-xs"></i> Filter
    </button>
  </div>
  <div id="bookmarks" class="bookmarks">
  ${bookmarks.join("")}
  </div>`;
};

const generateStars = function (object) {
  let starRating;
  let starsChecked = object.rating;
  let starsUnchecked = 5 - object.rating;
  const starsCheckedTemplate = `<i class="fas fa-star fa-lg"></i>`;
  const starsUncheckedTemplate = `<i class="far fa-star fa-lg"></i>`;
  starRating =
    starsCheckedTemplate.repeat(starsChecked) +
    starsUncheckedTemplate.repeat(starsUnchecked);
  console.log(starRating);
  return starRating;
};

// this function generates the string for the form error
// const generateFormError = function () {
//   console.log("form error string function");
//   return `<div>
//     <h1>myMarks</h1>
//   </div>
//   <div id="form" class="form">
//     <h3>Add a new bookmark</h3>
//     <form action="">
//       <label for="title">Title</label>
//       <input
//         type="text"
//         id="title"
//         class="error-placeholder"
//         name="title"
//         placeholder="Enter a bookmark title"
//       />
//       <label for="url">URL</label>
//       <input
//         type="text"
//         id="url"
//         class="error-placeholder"
//         name="url"
//         placeholder="Enter bookmark url"
//       />
//       <label for="rating">Rating</label>
//       <select
//         id="rating"
//         name="rating"
//         type="number"
//         class="error-placeholder"
//         placeholder="3"
//       >
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//         <option value="5">5</option>
//       </select>
//       <label for="description">Description</label>
//       <textarea
//         name="description"
//         id="description"
//         class="description"
//         cols="30"
//         rows="10"
//         placeholder="Enter a description (optional)"
//       ></textarea>
//     </form>
//   </div>
//   <div></div>
//   <div class="button">
//   <button type="text" id="cancel" class="cancel">Cancel</button>
//     <button id="create" class="create">Create</button>
//   </div>`;
// };

export default {
  generateAddForm,
  generateFilterDropdown,
  generateFilterList,
  generateNewBookmark,
  generateNewBookmarkExpanded,
  generateBookmarksString,
  generateStars,
  // generateFormError,
};
