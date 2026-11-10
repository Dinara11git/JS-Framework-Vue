# StudentHub — Vue Student Dashboard

A simple course project combining SIS 3 and SIS 4 requirements. Built with Vue 3, Vue Router, Vuex, Axios and Ant Design Vue.

## Requirements covered

### SIS 3 — API based multipage application
- Multiple pages: Dashboard, Students, Assignments, Assignment Details, Profile, Login and 404.
- Shared header and sidebar navigation.
- Vue Router navigation between pages.
- Demo authorization with a route guard.
- Dynamic route: `/assignments/:id`.
- Lazy-loaded page components using dynamic imports.
- Axios REST API requests.
- CRUD operations for assignments using POST, GET, PUT and DELETE.
- Loading, success and error states.
- Unknown paths show a 404 page.

### SIS 4 — Student Dashboard with a Vue UI Component Library
- Student Dashboard interface.
- Ant Design Vue components: Layout, Menu, Card, Statistic, Table, Form, Modal, Alert, Spin, etc.
- Axios requests to a public REST API.
- Loading, success and error handling.

## Technologies
- Vue 3 + Vite
- Ant Design Vue 4
- Vue Router 4
- Vuex 4
- Axios
- JSONPlaceholder (`https://jsonplaceholder.typicode.com`)

## Run locally

1. Install Node.js (LTS recommended).
2. Extract the ZIP and open the `studenthub-vue` folder in VS Code.
3. Open the terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL shown by Vite (usually `http://localhost:5173`).

## Demo login
- Email: `student@example.com`
- Password: `123456`

This is a frontend demonstration login only. It is not real server-side authentication.

## API and CRUD note
JSONPlaceholder is a public mock REST API. It accepts POST, PUT and DELETE requests and returns simulated responses, but it does not permanently save changes on its server. For the demo, successful create/update/delete responses are also reflected in the local Vuex state until the page is refreshed.

## Build
```bash
npm run build
```

## Upload to GitHub

Create a new repository on GitHub, then run these commands inside the project folder:

```bash
git init
git add .
git commit -m "Create StudentHub Vue dashboard"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_REPOSITORY_URL` with the URL of your own GitHub repository.
