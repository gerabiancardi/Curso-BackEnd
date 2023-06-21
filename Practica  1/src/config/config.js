import  dotenv from "dotenv";

dotenv.config({
  path: `.env`,
});
const DB_URL=process.env.DB_URL
export default DB_URL