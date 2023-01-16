const ProductDao = require("../models/dao/ProductDao");

exports.getProduct = async (productName) => {
  try {
    let productInfo = await ProductDao.getProduct(productName);
    if (productInfo && productInfo.status == "Failed") {
      return {
        statusCode: productInfo.statusCode,
        status: "Falied",
        message: productInfo.message,
      };
    } else if (!productInfo) {
      return {
        statusCode: 200,
        status: "Allowed",
        message: "Product is allowed to be added",
      };
    } else {
      return {
        statusCode: 200,
        status: "Failed",
        data: productInfo,
        message: "Product is already exists with same name",
      };
    }
  } catch (e) {
    console.log("Error in fetching product info in productServices:", e);
    return {
      statusCode: 500,
      status: "Falied",
      message: "Failed to fetch product info",
    };
  }
};

exports.addProduct = async (productData) => {
  try {
    let result = await ProductDao.addProduct(productData);
    if (result && result.status == "Failed") {
      return {
        statusCode: result.statusCode,
        status: result.status,
        message: result.message,
      };
    } else {
      return {
        statusCode: 200,
        status: "Success",
        message: "Product info saved successfully",
      };
    }
  } catch (e) {
    console.log("Error in adding product in productServices:", e);
    return {
      statusCode: 500,
      status: "Failed",
      message: "Failed to add product info",
    };
  }
};

exports.getAllProducts = async () => {
  try {
    let result = await ProductDao.getAllProducts();
    if (result && result.status == "Failed") {
      return {
        statusCode: result.statusCode,
        status: result.status,
        message: result.message,
      };
    } else if (result && !result.length) {
      return {
        statusCode: 404,
        status: "Failed",
        message: "No products found",
      };
    } else {
      return {
        statusCode: 200,
        status: "Success",
        message: "Product list fetched successfully",
        data: result,
      };
    }
  } catch (e) {
    console.log("Error in getting product list in productServices:", e);
    return {
      statusCode: 500,
      status: "Failed",
      message: "Failed to fetch product list",
    };
  }
};
