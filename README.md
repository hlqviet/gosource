# GoSource

## Prerequisites

- Node.js >= 18
- Docker Engine >= 24 (tested version)

## Installation

- Clone this repository
- Run `npm install`
- Copy each .env.example in the root, backend and frontend directories into separate files in each directory
- The default ports being used are `5432` for PostgreSQL, `3000` for backend and `3001` for frontend. Change them in the `.env` files if you have any service running on those ports. The one in the root directory is used for Docker while those in backend and frontend directories are used for the app and CLI.
- Run `docker compose up -d`

## Running

Now that you have the database and all the apps up and running. Let's seed some data.

- Go to the backend directory
- Run `npm run db:migrate` then `npm run db:seed`
- Access the frontend by going to `http://localhost:3001`
- Enjoy
