# Type API

Welcome to your new API! [**Read the docs.**](./docs/)

>TODO:
>- Context-based authorization on subscriptions.

To get started:

1. Clone this repository.

2. Remove `.git`.
```cli
rm -rf .git
```

3. Initialize a new git repository.
```cli
git init
git remote add origin <your-new-git-repo>
```

4. Push to your new repo.
```cli
git add .
git commit -m "First commit"
git push --set-upstream origin master
```

## About this API

This API generator uses [yarn](https://www.npmjs.com/package/yarn) along with [package.json](./package.json) to manage much of the scaffolding and service of the API. For example, running `yarn cli create:entity book` will create a GraphQL schema and a database entity for the `book` object.

This API has a number of relevant, life-enhancing features:

- Authentication
  - Username/password login
  - Password reset via email
  - JWT auth in the GraphQL routes
  - JWT invalidation after password resets
- Authorization
  - Role-based permissions
- Docker
  - [Dockerfile](./Dockerfile)
  - Multiple docker-compose files for ease of development
- [Cron jobs](./src/config/cron.ts)
- Logging
  - Uses a [logger](./src/config/logger/index.ts) instead of `console.log`; no more writing and deleting logs, just keep them in the code and adjust them according to the log level
- Environment variables
  - Set in development using the `.env` file
  - Interface with the application using a single [settings](./src/config/settings.ts) file
- [Global settings](./src/config/settings.ts)
- Tests!
- Documentation! (You're looking at it.)

## Routes

- `/auth/*` - standard express routes handling authentication on the `User` entity.
- `/graphql` - graphql endpoint

## Getting Started

After cloning the repository, install all dependencies:

```bash
yarn

# or

npm install
```

### Development

Running the dev server is simply:

```cli
yarn dev
```

There is also a full [docker-compose](https://docs.docker.com/compose/) development file ([docker-compose.development.yml](./docker-compose.development.yml)). Running this will spin up a full development environment. **All code will be tested against this dev environment.**

```cli
docker-compose up
```

#### Adding a new entity

Run the following from the root of the api:

```cli
yarn cli create:entity <entityName>
```

This will add a new directory under [/src/api/data](./src/api/data/) containing a new, working entity. GraphQL will automagically pick it up and register it with the schema.
