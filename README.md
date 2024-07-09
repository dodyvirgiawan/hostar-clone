# Disney Hotstar+ Clone

This is a disney hotstar+ clone app that is built using Next.js to leverage `SSR (Server Side Rendering)` for `SEO (Search Engine Optimization)`. Website was ensured to have both good SEO best practices, good performance, while also taking careful optimizations measure to conform with `CWV (Core Web Vitals)` standards.

You can visit the [live demo](https://hotstar-clone-mu.vercel.app/)

**Features:**
- Browse top rated movies & tv series
- Browse trending movies & tv series
- Search for movies & tv series
- Add to watchlist
- Delete from watchlist (with bulk delete)

## Installation Steps

This installation process require you to already have Node.js and npm installed on your machine. 

### 1. Install required dependencies

First, install the required dependencies with `npm` by running the following command

```bash
npm install
```

### 2. Create environment variables

Second, you have to create a new `.env` file in root directory, with the following format. Or you can copy paste also from `.env.template`

```env
NEXT_PUBLIC_TMDB_API_URL=https://api.themoviedb.org
NEXT_PUBLIC_TMDB_API_KEY=<fill this with your TMDB API key>
NEXT_PUBLIC_TMDB_IMG_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_SITE_URL=<fill this with the domain url you wish to deploy it to>
```

Note: 
- You can get your TMDB API key by following [this instruction](https://developer.themoviedb.org/docs/getting-started)
- Example for `NEXT_PUBLIC_SITE_URL` = `https://hotstar-clone-mu.vercel.app`


### 3. Run the development server

If you wish to start the development server, you can run this command

```bash
npm run dev
```

If you want to view the production build, run:

```bash
npm run build
```

### 4. Tests

This application is built with component unit tests, you can run this command to run unit tests:

```bash
npm run test
```

## Tech Stack & Libraries

- **Next.js (React)**: 
I used Next.js for its powerful features like SSR (Server Side Rendering), and many built in SEO optimizations.
- **Typescript**:
I opted for Typescript to improve code quality and maintainability, making the development process more safe and prevent and/or reduce runtime errors.
- **Redux Toolkit**
I selected Redux Toolkit for its structured approach managing state in a React application. Throughout the app I also implemented data normalizations using `normalizr`. In redux, I implemented different layers that handle different thing (i.e services for API calls, slices for storing normalized state, and selectors). `next-redux-wrapper` was also used to hydrate server side states to client
- **Normalizr**
I used normalizr to efficiently normalize TMDB API's nested JSON data, making state management in Redux more scalable in terms of performance, while also reduce redundancy by integrating this with the concept of slice in redux.
- **SASS**
I selected SASS for styling due to its additional powerful feature compared to normal css, like storing variables and mixins, which greatly helps the mantainability of the project.
- **(Other libraries)**
  - `clsx` for conditionally joining class names efficiently for my components
  - `dayjs` for handling fast date and time manipulations
  - `lodash/memoize` for memoizing redux selectors (to increase performance)
  - `next-redux-wrapper` to integrate redux with Next.js, especially when handling SSR.
  - `next-sitemap` to automate sitemap and robots.txt generation (+ provide server side sitemap)
  - `nextjs-progressbar` to prevent page from feeling like unresponsive by showing page load progress.
  - `@testing-library`, `jest` for unit component tests.
  - `husky`, `eslint`, `lint-staged` for automation in quality check of my code by doing pre-commit hooks

