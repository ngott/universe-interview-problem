# Staff Frontend Interview

Today we'll be building a better Twitter. Ideally, one without Nazis.

The first thing we'll need to build is the home feed. To get to launch faster, we'll focus on the slimmest possible MVP. This version of "Not Cesspool Twitter" should include:

- An infinitely scrolling home feed
- Profile "pop-over" cards when you hover on a name or profile photo
- A "New Post" form. Text only and no mentinos or hash tags are okay for the first version.
- The API endpoints for `/feed`, `/profile`, and `/post`.

This repo contains the bones we need to start a new project. Exciting! Let's work together to make this a reality.

Treat me as Google. If you would normally look something up in the process of development, ask me. If I don't know it, I'll look it up for you.

Here are a couple screenshots for visual reference:
<img width="1624" alt="Screenshot 2023-12-20 at 5 28 12 PM" src="https://github.com/universe/staff-frontend-interview/assets/7856443/e0e8ab05-6aa2-4315-b26a-60edec4d37ab">
<img width="1624" alt="Screenshot 2023-12-20 at 5 28 44 PM" src="https://github.com/universe/staff-frontend-interview/assets/7856443/7cbfc5c6-5a66-4480-a202-40ddb57dd573">

# Running

To run the app, `npm run dev`
Open up  `http://localhost:3000/`

# Generating new fake data

Delete `db/app.db`
Use `sqlite` to create a fresh `app.db`
With `npx ts-node` run `scripts/seed-fake-data.ts`

