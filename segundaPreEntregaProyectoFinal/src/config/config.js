import  dotenv from "dotenv";

dotenv.config({
  path: `.env`,
});
const DB_URL=process.env.DB_URL
const DB_NAME=process.env.DB_NAME
const GITHUB_CLIENT_ID =process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const PORT = process.env.PORT
export {DB_URL, DB_NAME,GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, PORT}