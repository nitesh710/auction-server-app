const Product = require("../schema/products");

exports.addProduct = async (productData) => {
  try {
    let productModel = new Product(productData);
    return await productModel.save();
  } catch (e) {
    return {
      statusCode: 500,
      status: "Failed",
      message: "Failed to add product info",
    };
  }
};

exports.getProduct = async (productName) => {
  try {
    return Product.findOne({ name: productName }).select({ _id: 1, name: 1 });
  } catch (e) {
    return {
      statusCode: 500,
      status: "Failed",
      message: "Failed to fetch product info",
    };
  }
};

exports.getAllProducts = async () => {
  try {
    return await Product.find({});
  } catch (e) {
    return {
      statusCode: 500,
      status: "Failed",
      message: "Failed to fetch product list"
    };
  }
};
