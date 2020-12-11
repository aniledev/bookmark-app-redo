# API Powered Bookmark Application

## User Stories

#### As a user:

- I can add bookmarks to my bookmark list. Bookmarks contain a title (required), URL (required), description (optional), and rating 1 to 5 (optional).
- I can see a list of my bookmarks when I first open the app.
- When I first open the application, all bookmarks in the list default to a "condensed" view showing only title and rating.
- I can click on a bookmark to display the "detailed" view.
- When I expand a bookmark, the detailed view expands to additionally display description and a "Site" link.
- I can remove bookmarks from my bookmark list.
- I receive appropriate feedback when I cannot submit a bookmark.
- I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection.

## Technical Aspects

- Use fetch for AJAx calls and jQuery for DOM manipulation
- Use ES6 namespacing principles to adhere to good architecture practices
- Minimal global variables
- Create modules in separate files to organize your code
- Follows the React-ful design pattern
- Responsive and mobile-first design
- Follows a11y best practices

## Upcoming Features

- User can update rating and description input
- Expand all/Collapse all button at the top of the home page
