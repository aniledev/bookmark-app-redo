import $ from "jquery";
import cuid from "cuid";
import api from "./api";
import events from "./events";
import index from "./index";
import store from "./store";
import templates from "./templates";
import "./styles.css";

// RENDER FUNCTION
const render = function () {
  // if there is an error on the form, generate and give to dom
  // if (
  //   store.STORE.error === "title" &&
  //   store.STORE.adding === false &&
  //   store.STORE.filtering === false
  // ) {
  //   console.log("render error form working");
  //   let html = "";
  //   html = templates.generateFormError();
  //   $("section").html(html);
  // }
  // if adding state is true, generate html for form and give to the dom
  if (store.STORE.adding === true) {
    $(".top-button").empty();
    // create empty string for html
    let html = "";
    // set new html equal to the return string of generateAddForm()
    html = templates.generateAddForm();
    // use jquery .replaceWith() to replace the current html with new html of the form
    $("section").html(html);
  }
  // if filter has been selected value would be greater than 0
  if (store.STORE.filtering === true && store.STORE.filter > 0) {
    let html = "";
    html = templates.generateFilterList();
    $("section").html(html);
  }
  // if filtering state is true, generate html for dropdown and give to dom
  if (store.STORE.filtering === true && store.STORE.filter <= 0) {
    // set html to empty string
    let html = "";
    // assign html to filter dropdown template
    html = templates.generateFilterDropdown();
    // use jquery to replace the old html with new html
    // $(".bookmarks").remove();
    // $(".bottom-button").remove();
    $("section").html(html);
  }
  // if adding state is false and filtering state is false, generate the home screen html
  if (
    store.STORE.adding === false &&
    store.STORE.filtering === false &&
    store.STORE.error === null
  ) {
    // use jquery to replace existing html with html for the home state
    let html = "";
    html = templates.generateBookmarksString();
    $("section").html(html);
  }
};

function main() {
  api.getBookmarksAPI();
  events.eventHandlers();
}
// this function is the only function that stays in the index.js file once you modularize the tile structure

export default {
  render,
};

$(main);
