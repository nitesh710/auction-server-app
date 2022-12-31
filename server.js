const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserDao = require("./models/dao/UserDao");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/Auction", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("App is running successfully");
});

app.post("/signup", async (req, res) => {
  try {
    const { userName, password } = req.body;
    let user = await UserDao.getUser(userName);
    if(user && user.data){
        res.status(400).send({status: "Failed", message: "User is already exists"});
    } else {
        let response = await UserDao.addUser(req.body);
        if(response && response.status == "Success"){
            res.status(response.statusCode).send({status: response.status, message: response.message});
        } else {
            res.status(response.statusCode).send({status: response.status, message: response.message});
        }
    }
  } catch (e) {
    console.log("Error in signup: ",e.message);
    res.status(500).send({status: "Failed", message: "Failed to sign up user"});
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
