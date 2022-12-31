const mongoose = require("mongoose");
const { Schema } = mongoose;

const userInfoSchema = new Schema({
  userName: {
    type: String
  },
  password: {
    type: String
  }
})

const UserModel = mongoose.model("user", userInfoSchema);
module.exports = UserModel;