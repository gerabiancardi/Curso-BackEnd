import  dotenv from "dotenv";

dotenv.config({
  path: `.env`,
});
const DB_URL=process.env.DB_URL
const DB_NAME=process.env.DB_NAME
const GITHUB_CLIENT_ID = "90bd86b084ed09b2fbe5";
const GITHUB_CLIENT_SECRET = "396a779acde21e6cb4752d5f6624bc8db11d1b1d";
export {DB_URL, DB_NAME,GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET}