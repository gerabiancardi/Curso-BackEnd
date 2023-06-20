import { connect } from "mongoose";
import DB_URL from "../config/config.js"

const configConnection = {
  url: `${DB_URL}ecommerce`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const mongoDBConnection = async () => {
  try {
    await connect(configConnection.url, configConnection.options);
    console.log(`connection succesfull`);

  } catch (err) {
    console.log("Erorr al conectar db", err);
  }
};

export default mongoDBConnection;