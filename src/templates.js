import store from "./store";

const generateAddForm = function () {
  return `<div>
    <h1>myMarks</h1>
  </div><div id="form" class="form">
    <h3>Add a new bookmark</h3>
    <form id="form-submit" class="form-submit" >
      <label for="bookmark-title">Title</label>
      <input
       type="text"
        id="bookmark-title"
        class="bookmark-title"
        name="bookmark-title" minlength="1"
        placeholder="Awesome Bookmark Site" required
      />
      <label for="url">URL</label>
      <input
       type="text"
        id="url"
        class="url"
        name="url" minlength="5"
        placeholder="https://www.samplesite.com" 
        required/>
      <label for="rating">Rating</label>
      <select
       id="rating"
        name="rating"
        class="rating"
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
      <div class="bottom-button">
    <button type="submit" id="cancel" class="cancel">Cancel</button>
    <input type="submit" id="create" class="create" value="Create"/>
  </div>
    </form>
  </div>
  `;
};

const generateFilterDropdown = function () {
  const bookmarks = store.STORE.bookmarks.map((element) => {
    if (element.expanded === false) {
      return generateNewBookmark(element);
    } else {
      return generateNewBookmarkExpanded(element);
    }
  });
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
  <div id="ratings-selection" class="ratings">
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

const generateFilterList = function () {
  const filteredBookmarks = store.STORE.bookmarks.filter(
    (element) => element.rating >= store.STORE.filter
  );

  const filteredBookmarkString = filteredBookmarks.map((element) => {
    if (element.expanded === false) {
      return generateNewBookmark(element);
    } else {
      return generateNewBookmarkExpanded(element);
    }
  });

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
  <div id="ratings-selection" class="ratings">
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
  let starRating = generateStars(object);
  return `<div>
    <div tabindex="0" id="item-title" class="item-title" data-clicked-id="${object.id}">
    <div id="title-rating" class="title-rating flex">
    <h3>${object.title}</h3>
    <p>${starRating}</p>
    </div>
    </div>
    </div>`;
};

const generateNewBookmarkExpanded = function (object) {
  let starRating = generateStars(object);
  return `<div>
    <div tabindex="0" id="item-title" class="item-title" data-clicked-id="${object.id}">
    <div id="title-rating" class="title-rating flex">
    <h3>${object.title}</h3>
    <p>${starRating}</p>
    </div>
    
    </div>
      <div class="indented" id="indented">
      <a id="link" class="link" href="${object.url}" target="_blank">Site</a>
        <button id="delete" class="delete" data-clicked-id="${object.id}">Delete</button>
        <p id="description-text">${object.desc}</p>
      </div>
    </div>`;
};

const generateBookmarksString = function () {
  const bookmarks = store.STORE.bookmarks.map((element) => {
    if (element.expanded === false) {
      return generateNewBookmark(element);
    } else {
      return generateNewBookmarkExpanded(element);
    }
  });
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
  return starRating;
};

export default {
  generateAddForm,
  generateFilterDropdown,
  generateFilterList,
  generateNewBookmark,
  generateNewBookmarkExpanded,
  generateBookmarksString,
  generateStars,
};
