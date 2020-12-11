// THIS MODULE ONLY CONTAINS EVENT HANDLERS
import $ from "jquery";
import cuid from "cuid";
import api from "./api";
import events from "./events";
import index from "./index";
import store from "./store";
import templates from "./templates";

const handleNewButtonClick = function () {
  $("main").on("click", ".new", function () {
    console.log("new item button clicked");
    store.STORE.adding = true;
    store.STORE.filtering = false;
    index.render();
  });
};

const handleFilterClick = function () {
  $("main").on("click", ".filter", function () {
    console.log("filter button clicked");
    store.STORE.adding = false;
    store.STORE.filtering = true;
    index.render();
  });
};

const handleFilterDropdown = function () {
  $("main").on("change", ".ratings", function () {
    console.log("user selected filter");
    store.STORE.filter = $(".ratings option:selected").val();
    console.log(`the rating is ${store.STORE.filter}`);
    index.render();
  });
};

const handleDeleteItemClick = function () {
  $("main").on("click", ".delete", function () {
    console.log("user clicked delete button");
    event.preventDefault();
    store.STORE.adding === false;
    store.STORE.filtering === false;
    store.STORE.error === null;
    const DeleteId = $(this).attr("data-clicked-id");
    console.log(DeleteId);
    store.deleteBookmarkObject(DeleteId);
    console.log(store.STORE.bookmarks);
    api.deleteBookmarkAPI(DeleteId);
    templates.generateBookmarksString();
    index.render();
  });
};

const handleClearFilterClick = function () {
  $("main").on("click", ".clear-filter", function () {
    console.log("clear filter button clicked");
    store.STORE.adding = false;
    store.STORE.filtering = false;
    store.STORE.filter = 0;
    index.render();
  });
};

const handleBookmarkClick = function () {
  $("main").on("click", ".item-title", function () {
    event.preventDefault();
    console.log("expand bookmark clicked");
    store.STORE.adding === false;
    store.STORE.filtering === false;
    store.STORE.error === null;
    const clickedId = $(this).attr("data-clicked-id");
    console.log(clickedId);
    store.expandBookmarkToggle(clickedId);
    templates.generateBookmarksString();
    index.render();
  });
};

const handleCancelClick = function () {
  $("main").on("click", ".cancel", function () {
    console.log("cancel button clicked");
    store.STORE.adding = false;
    store.STORE.filtering = false;
    store.STORE.error = null;
    index.render();
  });
};

const handleCreateItemClick = function () {
  $("main").on("click", ".create", function () {
    store.STORE.error = null;
    event.preventDefault();
    console.log("create bookmark button clicked");
    event.preventDefault();
    event.preventDefault();
    console.log("form submitted");
    // store.formErrorState();
    store.STORE.adding = false;
    store.STORE.filtering = false;
    console.log(store.STORE.error);
    console.log(store.STORE.adding);
    store.addNewBookmark(); // this fucntion will call addNewBookmark() as well as createBookmarkObject()
  });
};

function eventHandlers() {
  handleNewButtonClick();
  handleFilterClick();
  handleFilterDropdown();
  handleDeleteItemClick();
  handleClearFilterClick();
  handleBookmarkClick();
  handleCancelClick();
  handleCreateItemClick();
}

export default {
  eventHandlers,
};
