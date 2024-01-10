import express from "express";
import sqlite3 from "sqlite3";
import ViteExpress from "vite-express";
import { open } from "sqlite";

const db = await open({
  filename: "./db/app.db",
  driver: sqlite3.Database,
});

const app = express();

const PAGE_SIZE = 15;

/** Selects the count of all posts
 * @returns A JSON object of the form:
 * {
 *    data: 2000
 * }
 */
app.get("/api/all-posts-count", async (req, res) => {
  const postsCount = await db
    .all(
      `
  SELECT COUNT(*) as count FROM Posts;`,
    )
    .then((results) => {
      return {
        data: results[0].count,
      };
    });

  res.status(200).json(postsCount);
});

/** Selects one page of Posts from the database and returns them as JSON
 * @returns A JSON object of the form:
 * {
 *    data: [
 *      { id: 0, post: 'We fight for justice', postImage: 'https://...', ... },
 *      ...
 *    ]
 * }
 */
app.get("/api/paged-posts/:page", async (req, res) => {
  const pageNumber = parseInt(req.params.page);

  if (isNaN(pageNumber)) {
    res.status(500).send(`Invalid page number provided: ${pageNumber}`);
    return;
  }

  const offset = (pageNumber - 1) * PAGE_SIZE;

  let orgFilter = "";
  if (req.query.org && req.query.org !== "ALL") {
    orgFilter = `WHERE organization = '${req.query.org}'`;
  }

  const posts = await db
    .all(
      `
  SELECT
    p.id as profileId,
    p.post,
    p.image as postImage,
    u.id as userId,
    u.display_name as userName,
    u.description,
    u.profile_pic as profilePic,
    p.organization
  FROM POSTS p
  Join USERS u
  On p.user_id = u.id
  ${orgFilter}
  ORDER BY p.id
  LIMIT ${PAGE_SIZE} 
  OFFSET ${offset};`,
    )
    .then((results) => {
      return {
        data: results,
      };
    });

  res.status(200).json(posts);
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
