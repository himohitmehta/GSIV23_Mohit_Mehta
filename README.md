## Movies Browser

How to run the project:

Install the dependencies with the following command:

```bash
npm install or yarn install or pnpm install
```

after installing dependencies, run the project with:

```bash
npm run dev or yarn dev or pnpm dev
```
the app will run on [http://localhost:5173](http://localhost:5173)

### Features

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
