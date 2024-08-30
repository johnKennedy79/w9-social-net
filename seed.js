import { db } from "@/lib/db";

await db.query(`CREATE TABLE IF NOT EXISTS profiles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    clerk_id TEXT UNIQUE,
    btn_image TEXT,
    username TEXT,
    firstName TEXT,
    lastName TEXT,
    bio TEXT
)

CREATE TABLE IF NOT EXISTS rcposts (
id SERIAL PRIMARY KEY,
clerk_id TEXT REFERENCES profiles(clerk_id),
timestamp timestamp default now(),
post text
)

CREATE TABLE IF NOT EXISTS rccomments (
id SERIAL PRIMARY KEY,
clerk_id TEXT REFERENCES profiles(clerk_id),
rcposts_id INTEGER REFERENCES rcposts(id),
timestamp timestamp default now(),
comment text
)
`);
