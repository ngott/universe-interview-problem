// This file is used to seed the SQLite database with fake test data, to be used after having ran ~/db/create.sql.

import sqlite3 from "sqlite3";
import { faker } from "@faker-js/faker";
import { open } from "sqlite";
import { xrIMGs } from "./constants/extintion-rebellion-g-search";
import { xrQuotes } from "./constants/exintiction-rebellion-website-quotes";
import { sunriseIMGs } from "./constants/sunrise-movement-g-search";
import { jvpIMGs } from "./constants/jvp-g-search";
import { aptpIMGs } from "./constants/aptp-g-search";
import { idleNoMoreIMGS } from "./constants/idle-no-more-g-search";
import { sunriseQuotes } from "./constants/sunrise-movement-website-quotes";
import { jvpQuotes } from "./constants/jvp-website-quotes";
import { aptpQuotes } from "./constants/aptp-website-quotes";
import { idelNoMoreQuotes } from "./constants/idle-no-more-website-quotes";
import { famousQuotes } from "./constants/famous-social-justice-quotes";

const POST_COUNT = 2000;
const USERS_COUNT = 500;

const db = await open({
  filename: "./db/app.db",
  driver: sqlite3.Database,
});

const ORGANIZATIONS = ["XR", "SM", "JVP", "APTP", "IDNM"];
const IMG_LISTS = [xrIMGs, sunriseIMGs, jvpIMGs, aptpIMGs, idleNoMoreIMGS];
const QUOTE_LISTS = [
  xrQuotes,
  sunriseQuotes,
  jvpQuotes,
  aptpQuotes,
  idelNoMoreQuotes,
];

for (let i = 0; i < POST_COUNT; i++) {
  const randomOrgIndex = Math.floor(Math.random() * 5);
  const quoteList = QUOTE_LISTS[randomOrgIndex];
  const imgList = IMG_LISTS[randomOrgIndex];
  await db.run(
    "INSERT INTO POSTS (id, user_id, post, image, organization) VALUES (?, ?, ?, ?, ?)",
    i,
    Math.floor(Math.random() * USERS_COUNT),
    quoteList[Math.floor(Math.random() * (quoteList.length - 1))],
    imgList[Math.floor(Math.random() * (imgList.length - 1))],
    ORGANIZATIONS[randomOrgIndex],
  );
}

for (let i = 0; i < USERS_COUNT; i++) {
  await db.run(
    "INSERT INTO USERS (id, display_name, description, profile_pic) VALUES (?, ?, ?, ?)",
    i,
    `${faker.person.firstName()}-${faker.person.lastName()}`,
    famousQuotes[Math.floor(Math.random() * (famousQuotes.length - 1))],
    faker.image.url(),
  );
}

await db.close();
