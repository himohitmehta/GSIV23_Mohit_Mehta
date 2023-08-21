## Movies Browser

### How to run the project:

Install the dependencies with the following command:

```bash
npm install or yarn install or pnpm install
```

after installing dependencies, run the project with:

```bash
npm run dev or yarn dev or pnpm dev
```

the app will run on [http://localhost:5173](http://localhost:5173)

### Navigating the project:

folder structure:

```bash

- assets
- components
- constants
- layout
- lib
- routes
- store
- theme

```

-   assets: contains the images and icons used in the project
-   components: contains the components used in the project
-   constants: contains the constants used in the project, e.g. TMDB API key and Access token
-   layout: contains the layout of the project, e.g. header
-   lib: contains the functions used in the project, e.g. `getMovieDetails()`, `getMovies()`, `getMovieCast()`
-   routes: contains the routes of the project, e.g. `/` and `/movie/:id`
-   store: contains the redux store, and the movies slice
-   theme: contains the theme of the project, e.g. colors, typography. Used with Material UI

### main.jsx

this file is used to render the whole app

### App.jsx

this file is used to render the routes of the app, wraps the redux provider and theme provider around the router provider. The Application code goes inside the `App` component.

### Features Implemented

-   [x] List of upcoming movies, with pagination. Each movie card displays:

    -   [x] Movie media (picture)
    -   [x] Movie Title
    -   [x] Rating (average vote)
    -   [x] Description

-   [x] Search for movies using the search API. Search results are displayed on the List page itself. When search is cancelled, it reverts to showing all movies again.
-   [x] Clicking on movie card takes to the movie details page. On clicking back button, it takes you to the page from where it came and on clicking home it takes you to the home page. Movie details page, with:
    -   [x] Movie Title
    -   [x] Rating (average vote)
    -   [x] Year of release
    -   [x] Length (HH:MM)
    -   [x] Director
    -   [x] Cast (Comma separated list of actors)
    -   [x] Description
-   [x] Responsive design
-   [x] Routing done with react-router and state management done with redux
-   [x] UI Styling is done with Material UI React components.

### Instructions to use the application

-   Open the Application and you will see the list of upcoming movies.
-   You can search for movies using the search bar.
-   Click on any movie card to see the movie details.
-   Click on the back button to go back to the previous page.
-   Click on the home button to go back to the home page.

### More Improvements that can be done

-   [ ] Add more categories for movies, to make the app more interesting. e.g. Top Rated, Popular, Now Playing, etc. It gives the users more options to choose from.
-   [ ] Add more details to the movie details page, actor details info. e.g. Actor name, image, character name, related movies list. Adding Actor profile image and character name will make the details page more attractive and informative.
    -   [ ] Actor card - name, image, character name
    -   [ ] related movies list
