const mongoose = require("mongoose");
const { Schema } = mongoose;

const userInfoSchema = new Schema({
  userName: {
    type: String
  },
  hashPassword: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  }
})

const UserModel = mongoose.model("user", userInfoSchema);
module.exports = UserModel;