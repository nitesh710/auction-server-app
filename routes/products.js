const express = require("express");
const router = express.Router();
const Joi = require("joi");
const ProductService = require("../services/productServices");

router.post("/products", async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      description: Joi.string().min(3).max(500).optional(),
      price: Joi.number().min(0).required(),
      quantity: Joi.number().min(1).max(50).integer().required(),
      imageUrl: Joi.string().uri().optional(),
    });
    const validation = schema.validate(req.body);
    if (validation && validation.error) {
      res.status(400).send({
        status: "Failed",
        message: validation.error.details[0].message,
      });
    } else {
      const { name } = req.body;
      let response = await ProductService.getProduct(name);
      if (response && response.status == "Failed") {
        res.status(response.statusCode).send({
          status: response.status,
          message: response.message,
        });
      } else {
        let response = await ProductService.addProduct(req.body);
        if (response && response.status == "Failed") {
          res
            .status(response.statusCode)
            .send({ status: response.status, message: response.message });
        } else {
          res
            .status(response.statusCode)
            .send({ status: response.status, message: response.message });
        }
      }
    }
  } catch (e) {
    console.log("Error in adding product:", e.message);
    res
      .status(500)
      .send({ status: "Failed", message: "Failed to add product" });
  }
});

router.get("/products", async (req, res) => {
  try {
    let response = await ProductService.getAllProducts();
    if (response && response.status == "Failed") {
      res.status(response.statusCode).send({
        status: response.status,
        message: response.message,
      });
    } else {
      res
        .status(response.statusCode)
        .send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
    }
  } catch (e) {
    console.log("Error in getting product list:", e.message);
    res
      .status(500)
      .send({ status: "Failed", message: "Failed to get product list" });
  }
});

module.exports = router;
