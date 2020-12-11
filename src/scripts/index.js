import $ from "jquery";
import cuid from "cuid";
//  EXAMPLE STORE DATA SINGLE SOURCE OF TRUTH
let STORE = {
  bookmarks: [],
  adding: false, // is the new bookmark form showing or not?
  filtering: false, // is the dropdown box for filtering showing or not?
  filter: 0, // what rating  are we filtering for?
  error: null, // is there an error on the new bookmark form or not?
};

// TEMPLATE GENERATION FUNCTIONS
const generateHomeScreen = function () {
  return `<div class="top-button button">
  <button id="new" class="new">
    <i class="fas fa-plus fa-xs"></i> New
  </button>
  <button id="filter" class="filter">
    <i class="fas fa-filter fa-xs"></i> Filter
  </button>
</div>
<div id="bookmarks" class="bookmarks">
  <h3>Title 11</h3>
    <div>Description</div>
  <h3>Title 10</h3>
    <div>Description</div>
  <h3>Title 9</h3>
    <div>Description</div>
  <h3>Title 8</h3>
    <div>Description</div>
  <h3>Title 7</h3>
    <div>Description</div>
  <h3>Title 6</h3>
    <div>Description</div>
</div>`;
};

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
  const bookmarks = STORE.bookmarks.map((element) =>
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
  // use filter array method to create filtered STORE.bookmarks based on STORE.filter selected value

  const filteredBookmarks = STORE.bookmarks.filter(
    (element) => element.rating >= STORE.filter
  );
  console.log(STORE.bookmarks);
  console.log(STORE.filter);
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

  //   if (STORE.bookmarks.rating >= STORE.filter) {
  //     const bookmarks = STORE.bookmarks.map((element) =>
  //       generateNewBookmark(element)
  //     );
  //     console.log(bookmarks.join(""));

  //     return `<div>
  //   <h1>myMarks</h1>
  // </div><div class="top-button button">
  //   <button id="new" class="new">
  //     <i class="fas fa-plus fa-xs"></i> New
  //   </button>
  //   <button id="filter" class="filter">
  //     <i class="fas fa-filter fa-xs"></i> Filter
  //   </button>
  // </div>
  // <div id="ratings" class="ratings">
  //   <label for="ratings" class="ratings">Select Filter</label>
  //   <select name="ratings" id="ratings">
  //     <option value="All">All</option>
  //     <option value="5">5</option>
  //     <option value="4">4</option>
  //     <option value="3">3</option>
  //     <option value="2">2</option>
  //     <option value="1">1</option>
  //   </select>
  // </div>
  // <div id="bookmarks" class="bookmarks">
  // ${bookmarks.join("")}
  // </div>
  // <div class="bottom-button">
  //   <button id="clear-filter" class="clear-filter">Clear</button>
  // </div>`;
  //   }
};

// this function generates the html for a single bookmark title
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

// this function generates the string for all the bookmarks to be rendered
const generateBookmarksString = function (object) {
  console.log("bookmark string function");
  const bookmarks = STORE.bookmarks.map((element) => {
    if (element.expanded === false) {
      return generateNewBookmark(element);
      // if the bookmark expanded === false, use the generateNewBookmark() to map over array
    } else {
      return generateNewBookmarkExpanded(element);
    }
    // if the bookmark expanded === true, use the generateNewBookmarkExpanded() to map over arrray
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
const generateFormError = function () {
  console.log("form error string function");
  return `<div>
  <h1>myMarks</h1>
</div>
<div id="form" class="form">
  <h3>Add a new bookmark</h3>
  <form action="">
    <label for="title">Title</label>
    <input
      type="text"
      id="title"
      class="error-placeholder"
      name="title"
      placeholder="Enter a bookmark title"
    />
    <label for="url">URL</label>
    <input
      type="text"
      id="url"
      class="error-placeholder"
      name="url"
      placeholder="Enter bookmark url"
    />
    <label for="rating">Rating</label>
    <select
      id="rating"
      name="rating"
      type="number"
      class="error-placeholder"
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
<div></div>
<div class="button">
<button type="text" id="cancel" class="cancel">Cancel</button>
  <button id="create" class="create">Create</button>
</div>`;
};

// EVENT HANDLER FUNCTIONS

const handleNewButtonClick = function () {
  $("main").on("click", ".new", function () {
    // code that you want to execute
    console.log("new item button clicked");
    // when user clicks button, change adding state to true
    STORE.adding = true;
    // when user clicks button, change filtering state to false
    STORE.filtering = false;
    // render new html for the form when adding state is true
    render();
  });
};

const handleFilterClick = function () {
  $("main").on("click", ".filter", function () {
    // console log to indicate user clicked the button
    console.log("filter button clicked");
    // when user clicks button, change addings state to false
    STORE.adding = false;
    // when user clicks button, change filtering state to true
    STORE.filtering = true;
    // render new html for the filter dropdown when filtering state is true
    render();
  });
};

const handleFilterDropdown = function () {
  $("main").on("change", ".ratings", function () {
    //code that you want to excute
    console.log("user selected filter");
    STORE.filter = $(".ratings option:selected").val();
    console.log(`the rating is ${STORE.filter}`);
    // hide all bookmarks that are less than this rating / show bookmarks that are equal or greater than this rating using the STORE data
    //render the html
    render();
  });
};

const handleDeleteItemClick = function () {
  $("main").on("click", ".delete", function () {
    //console log that user clicked button
    console.log("user clicked delete button");
    event.preventDefault();
    // change the state of the STORE
    STORE.adding === false;
    STORE.filtering === false;
    STORE.error === null;
    // // create a variable that is assigned to the data of the id gerenreate by the cuid
    const DeleteId = $(this).attr("data-clicked-id");
    console.log(DeleteId);
    deleteBookmarkObject(DeleteId);
    console.log(STORE.bookmarks);
    deleteBookmarkAPI(DeleteId);
    // when user clicks delete button, use splice to remove specific bookmark from STORE
    // create a function that removes that id from the bookmarks array
    // call the gnereateBookmarkString() and then
    generateBookmarksString();
    render();
  });
};

const handleClearFilterClick = function () {
  $("main").on("click", ".clear-filter", function () {
    console.log("clear filter button clicked");
    // change filtering state in STORE to false
    STORE.adding = false;
    STORE.filtering = false;
    STORE.filter = 0;
    // if filtering state is false generate html without dropdown box/home state of app
    render();
  });
};

const handleBookmarkClick = function () {
  // create on click event for the individual titles of the bookmarks
  $("main").on("click", ".item-title", function () {
    event.preventDefault();
    console.log("expand bookmark clicked");
    //change the state of the STORE
    STORE.adding === false;
    STORE.filtering === false;
    STORE.error === null;
    // create a variable that is assisgned to the data of the id generated by the cuid
    const clickedId = $(this).attr("data-clicked-id");
    console.log(clickedId);
    expandBookmarkToggle(clickedId);
    generateBookmarksString();
    render();
    // console log that user clicked button
    // for that item change expanded in STORE to true
    // render new html for expanded bookmark
    // render();
  });
};

const handleCancelClick = function () {
  $("main").on("click", ".cancel", function () {
    // code that you want to execute
    console.log("cancel button clicked");
    // when user clicks button, change adding state to false
    STORE.adding = false;
    // when user clicks button, change filtering state to false
    STORE.filtering = false;
    // render the home page html based on the condition
    STORE.error = null;
    render();
  });
};

const handleCreateItemClick = function () {
  //the purpose of this function is to capture the values from the input form to be able to use for the factory function

  $("main").on("click", ".create", function () {
    STORE.error = null;
    event.preventDefault();
    console.log("create bookmark button clicked");
    event.preventDefault();
    event.preventDefault();
    console.log("form submitted");
    formErrorState();
    STORE.adding = false;
    STORE.filtering = false;
    console.log(STORE.error);
    console.log(STORE.adding);
    addNewBookmark(); // this fucntion will call addNewBookmark() as well as createBookmarkObject()

    // when the user inputs information into the form, capture the info in way that can be added into the STORE
    // use .val to capture the input values and set to values to pass into factory function
    // call the addNewBookmark function to add bookmark and change the state of the STORE
  });
};

// FUNCTIONS THAT CHANGE THE STATE OF THE STORE

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
  if (STORE.error != "title") {
    console.log("add bookmark function invoked");
    // invoke factory function when submit is clicked, factory function returns an object to push to the STORE
    let newBookmark = createBookmarkObject(); // object needs tp be created first

    console.log(newBookmark);
    postBookmarkAPI(newBookmark).then((data) => {
      data.expanded = false;
      data.filtered = false;
      STORE.bookmarks.push(data);
      console.log(STORE.bookmarks);
      render();
    }); // once the object is created the bookmark can be stringified and sent as a post requeest in the proper format
    // once the object is created then send a post request to the api
    // push the new bookmark to the STORE using .push()

    // call the render function to show the new state of the STORE
    // add a try catch block to handle errors
  }
};

const formErrorState = function () {
  if ($(".bookmark-title").val() === "") {
    STORE.error = "title";
  }
  if ($(".bookmark-title").val() != "") {
    STORE.error = null;
  }
};

const findBookmarkById = function (id) {
  // using the find array method to find where in the bookmarks array the bookmark.id matches the passed in id
  console.log("find bookmark by id function working");
  let found = STORE.bookmarks.find((bookmark) => bookmark.id == id);
  console.log(`this is before the click: ${found.expanded}`);
  return found;
};

const expandBookmarkToggle = function (id) {
  console.log("expand book function called");
  let found = findBookmarkById(id);
  found.expanded = !found.expanded;
  console.log(`this is after the click: ${found.expanded}`);
  console.log("bookmark expand toggled");
};

const deleteBookmarkObject = function (id) {
  console.log("delete bookmark function called");
  debugger;
  let bookmarkRemove = findBookmarkById(id);
  let remove = JSON.stringify(bookmarkRemove);
  let index = STORE.bookmarks.indexOf(bookmarkRemove);
  console.log(index);
  console.log(`this is the bookmark to remove ${remove}`);

  STORE.bookmarks.splice(index, 1);
};

// API FUNCTIONS FOR GET AND POST REQUESTS

// declare and assign a variable for the api base url
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

// write a function that sends a get request to the api, to get the bookmarks
const getBookmarksAPI = function () {
  console.log("get api function running");
  fetch(BASE_URL)
    .then((response) => {
      return response.json(); // this data comes back in an array
    })
    .then((responseJSON) => {
      for (let i = 0; i < responseJSON.length; i++) {
        responseJSON[i].expanded = false;
        responseJSON[i].filtered = false;
        STORE.bookmarks.push(responseJSON[i]);
        render();
      }
      console.log(responseJSON);
      console.log(STORE.bookmarks);
    })
    // .then((bookmarkAPIList) => {
    //   for (let i = 0; i < bookmarkAPIList.length; i++) {
    //     STORE.bookmarks.push(bookmarkAPIList[i]);
    //   }
    // })
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
      return data.json();
    })
    .catch((error) => console.log(error));
};

// RENDER FUNCTION
const render = function () {
  // if there is an error on the form, generate and give to dom
  if (
    STORE.error === "title" &&
    STORE.adding === false &&
    STORE.filtering === false
  ) {
    console.log("render error form working");
    let html = "";
    html = generateFormError();
    $("section").html(html);
  }
  // if adding state is true, generate html for form and give to the dom
  if (STORE.adding === true) {
    console.log("render form function working");
    $(".top-button").empty();
    // create empty string for html
    let html = "";
    // set new html equal to the return string of generateAddForm()
    html = generateAddForm();
    // use jquery .replaceWith() to replace the current html with new html of the form
    $("section").html(html);
  }
  // if filter has been selected value would be greater than 0
  if (STORE.filtering === true && STORE.filter > 0) {
    console.log("rendering filter list function");
    let html = "";
    html = generateFilterList();
    $("section").html(html);
  }
  // if filtering state is true, generate html for dropdown and give to dom
  if (STORE.filtering === true && STORE.filter <= 0) {
    console.log("render filter function working");
    // set html to empty string
    let html = "";
    // assign html to filter dropdown template
    html = generateFilterDropdown();
    // use jquery to replace the old html with new html
    // $(".bookmarks").remove();
    // $(".bottom-button").remove();
    $("section").html(html);
  }
  // if adding state is false and filtering state is false, generate the home screen html
  if (
    STORE.adding === false &&
    STORE.filtering === false &&
    STORE.error === null
  ) {
    console.log("render home/bookmark STORE function working");
    // use jquery to replace existing html with html for the home state
    let html = "";
    html = generateBookmarksString();
    $("section").html(html);
  }
};

function main() {
  getBookmarksAPI();
  handleNewButtonClick();
  handleCancelClick();
  handleCreateItemClick();
  handleFilterClick();
  handleFilterDropdown();
  handleClearFilterClick();
  handleBookmarkClick();
  handleDeleteItemClick();
}

// this function is the only function that stays in the index.js file once you modularize the tile structure
$(main);
