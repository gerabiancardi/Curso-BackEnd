import mongoose from 'mongoose';

const collectionName = "Usuarios";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role:String,
});

const userModel = mongoose.model(collectionName, userSchema);
export default userModel;