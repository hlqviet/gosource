# GoSource

## Prerequisites

- Node.js >= 18
- PostgreSQL >= 16 (\*)
- Docker Engine >= 24

## Installation

- Clone this repository
- Run `npm install`
- Copy each `.env.example` in the root, backend and frontend directories into separate `.env` files in each directory

From here you have two methods to run the project.

### The easy method

- Run `docker compose up -d` and everything will be ready in no time

### The traditional method

- Run PostpreSQL and create `gosource` database
- Run `npm run dev` in the backend project
- Run `npm start` in the frontend project

## Post-Installation

Now that you have the database and all the apps up and running. Let's seed some data.

- Run `npm run db:migrate` then `npm run db:seed` in the backend project to perform database migration and data seeding
- Access the frontend by going to `http://localhost:3001`
- Enjoy

## Notes

- (\*) Not required if you use Docker.
- The default ports being used are `5432` for PostgreSQL, `3000` for backend and `3001` for frontend. Change them in the `.env` files if you have any service already using those ports. The one in the root directory is used for Docker while those in backend and frontend directories are used for the apps and CLI.
- There is a unique constraint for Email column in the database table so data seeding may throw an error if it generates a duplicate email. You just need to run the command again in this case.
