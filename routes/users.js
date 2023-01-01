const express = require("express");
const router = express.Router();
const UserService = require("../services/userServices");

router.get("/", (req, res) => {
  res.status(200).send("App is running successfully");
})

router.post("/signup", async (req, res) => {
  try {
    const { userName, password } = req.body;
    let userResponse = await UserService.getUser(userName);
    if (userResponse && userResponse.data) {
      res.status(400).send({ status: "Failed", message: "User is already exists" });
    } else if(userResponse && userResponse.statusCode == 500) {
        res.status(userResponse.statusCode).send({ status: userResponse.status, message: userResponse.message });
    } else {
      let response = await UserService.addUser(req.body);
      if (response && response.status == "Success") {
        res.status(response.statusCode).send({ status: response.status, message: response.message });
      } else {
        res.status(response.statusCode).send({ status: response.status, message: response.message });
      }
    }
  } catch (e) {
    console.log("Error in signup: ", e.message);
    res.status(500).send({ status: "Failed", message: "Failed to sign up user" });
  }
});

router.post("/login", async (req, res) => {
    try {
        let {userName, password} = req.body;
        let response = await UserService.login(userName, password);
        if(response && response.status == "Success") {
            res.status(response.statusCode).send({status: response.status, message: response.message});
        } else {
            res.status(response.statusCode).send({status: response.status, message: response.message});
        }
    } catch (e) {
        console.log("Error in login: ", e.message)
        res.status(500).send({ status: "Failed", message: "Failed to login user" });
    }
})

module.exports = router;