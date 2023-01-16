const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  imageUrl: {
    type: String,
  },
  dealId: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel'
  }
});

const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
