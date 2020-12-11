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
    store.STORE.adding = true;
    store.STORE.filtering = false;
    index.render();
  });
};

const handleFilterClick = function () {
  $("main").on("click", ".filter", function () {
    store.STORE.adding = false;
    store.STORE.filtering = true;
    index.render();
  });
};

const handleFilterDropdown = function () {
  $("main").on("change", ".ratings", function () {
    store.STORE.filter = $(".ratings option:selected").val();
    index.render();
  });
};

const handleDeleteItemClick = function () {
  $("main").on("click", ".delete", function () {
    event.preventDefault();
    store.STORE.adding === false;
    store.STORE.filtering === false;
    store.STORE.error === null;
    const DeleteId = $(this).attr("data-clicked-id");
    store.deleteBookmarkObject(DeleteId);
    api.deleteBookmarkAPI(DeleteId);
    templates.generateBookmarksString();
    index.render();
  });
};

const handleClearFilterClick = function () {
  $("main").on("click", ".clear-filter", function () {
    store.STORE.adding = false;
    store.STORE.filtering = false;
    store.STORE.filter = 0;
    index.render();
  });
};

const handleBookmarkClick = function () {
  $("main").on("click", ".item-title", function () {
    event.preventDefault();
    store.STORE.adding === false;
    store.STORE.filtering === false;
    store.STORE.error === null;
    const clickedId = $(this).attr("data-clicked-id");
    store.expandBookmarkToggle(clickedId);
    templates.generateBookmarksString();
    index.render();
  });
};

const handleCancelClick = function () {
  $("main").on("click", ".cancel", function () {
    store.STORE.adding = false;
    store.STORE.filtering = false;
    store.STORE.error = null;
    index.render();
  });
};

const handleCreateItemClick = function () {
  $("main").on("submit", ".form-submit", function (event) {
    event.preventDefault();
    store.STORE.error = null;
    // store.formErrorState();
    store.STORE.adding = false;
    store.STORE.filtering = false;
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
