const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

mongoose.connect("mongodb://localhost:27017/Auction", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/", productRoutes);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
