import mongoose from "mongoose";

mongoose.Promise = global.Promise;

//schema
const UserSchema = new mongoose.Schema({
  userName: String,
  password: String
});

//model
const User = mongoose.model("User", UserSchema);

//export model
export default User;
