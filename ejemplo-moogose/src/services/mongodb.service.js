import mongoose from "mongoose";

const mongoUrl = "";
const mongoDbName = "";

const init = async () => {
  try {
    mongoose.connect(mongoUrl, {
      dbName: mongoDbName,
    });
    console.log("🗝️+ Connection with mongodb established 🙃");
  } catch (error) {
    throw new Error(error);
  }
};

export const MongoDBService = {
  init,
};