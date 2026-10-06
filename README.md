# Harbour Night Market · starter

The Harbour Night Market website from Lecture 5. It still reads its vendors
from a hand-typed `starter/js/data.js`. **Your job: connect it to the
Harbour Market API.**

## Your market on the course server

The API runs on the course's server, https://harbour-api.lopin.me. Everyone
has their own copy of the market, named after their GitHub username:

```
https://harbour-api.lopin.me/<your-github-username>/api/stalls
```

Put that base URL (ending in `/api`) into `API` at the top of
`starter/js/api.js`. The control page at https://harbour-api.lopin.me checks
your URL, turns **chaos** on and off (slow responses, 503s) and **resets** your
market to the seed data. Nobody else's market is affected by yours.

The API is documented at
https://lopin.me/harbour/programming-interactivity-8-fetch/api.html.

## Run the website

```sh
npm start            # http://localhost:8080
```

No `npm install`: `npm start` runs live-server through `npx`. The page is on
`localhost:8080`, the API on `harbour-api.lopin.me`: a cross-origin request,
which the API allows (it sends `Access-Control-Allow-Origin: *`).

## The task · connect the market

The full brief, with the steps, the checks and hints:
https://lopin.me/harbour/programming-interactivity-8-fetch/team/connect.html

1. **`starter/js/api.js`**: set `API`, write `request()`, `HttpError` and
   `describe()`. Every request goes through it; nothing else calls `fetch`.
2. **The stalls move into `state`**: `GET /stalls` replaces `data.js`.
   Delete `data.js` when nothing imports it any more.
3. **Loading, error, ready, empty**: a status line, an error message with a
   Try again button, all drawn by `render()` from `state.status`.
4. **Ratings**: every card shows `★ 4.7 · 3 reviews` from the API.
5. **Chaos**: everything above still works with chaos on (control page).

`starter/css/fetch.css` already styles the loading message, the error box and
the ratings; the class names it expects are at the top of the file.

## Hand it in · a pull request

1. **Fork** this repository on GitHub, and clone your fork.
2. Create a branch: `git switch -c connect-the-market`.
3. Commit as you go: small commits with messages that say what changed.
4. Push the branch to your fork and open a **pull request** against this
   repository's `main`.
5. In the PR description: what works, what doesn't yet, and how you tested it
   with chaos on. Screenshots of the Network panel are welcome.

Keep the PR to this task. A brief from the team build (reviews, orders,
search…) goes in a second branch and a second PR, on top of the first.
`package.json` and `.github/` belong to the course: a PR that changes them
fails its check. All your code goes in `starter/`.

## Where things are

```
starter/js/api.js      every request: API, request(), getJSON(), postJSON(), HttpError (to write)
starter/js/state.js    the state, and what's visible
starter/js/render.js   draws everything from state
starter/js/main.js     events and the start
starter/js/data.js     the hand-typed stalls: to replace
starter/css/fetch.css  styles for loading, errors, ratings (ready)
starter/admin.html     starter for team brief 5 (+ js/admin.js, css/admin.css)
```
