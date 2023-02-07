# MVC Express

## Description

This repository is a simple Express MVC structure from scratch.

## Steps

1. Clone the repo from Github.
2. Run `npm install` or `yarn install`.
3. Create _.env_ from _.env.sample_ file and add your DB parameters. Don't delete the _.sample_ file, it must be kept.

```
APP_PORT=5000
FRONTEND_URL="http://localhost:3000"
DB_HOST=localhost
DB_PORT=3306
DB_USER=notroot
DB_PASSWORD=helloworld
DB_NAME=mvc_express
# Warning the COOKIE_NAME has to be the same as frontend app
NAME_COOKIE="RepoBase"
JWT_SECRET="RepoBase"
# API Any Anime (free on rapid API)
API_KEY=your_api_key
API_HOST=your_api_host
API_URL=your_api_url
```

4. Adapt _database.sql_ with your own tables. Import the script in your SQL server. You can do it manually or run _migrate_ script (either using `npm run migrate` or `yarn run migrate`).
5. Start the server in dev mode with `npm run dev` or `yarn run dev`. This will run `index.js` using _nodemon_.
6. Go to `localhost:5000` with your favorite browser.
7. From this starter kit, create your own web application.

### Windows Users

If you develop on Windows, you should edit you git configuration to change your end of line rules with this command :

`git config --global core.autocrlf true`

You can find all these routes declared in the file `src/router.js`. You can add your own new routes, controllers and models.
