const UserDao = require("../models/dao/UserDao");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.getUser = async (userName) => {
  try {
    let result = await UserDao.getUser(userName);
    if (result != undefined && result != null && !result.status) {
      return {
        statusCode: 200,
        status: "Success",
        message: "User info fetched successfully",
        data: result,
      };
    } else if (result && result.status == "Failed") {
      return result;
    } else {
      return {
        statusCode: 400,
        status: "Failed",
        message: "User is not found",
      };
    }
  } catch (e) {
    console.log("Error in userServices, getting user:", e.message);
    return {
      statusCode: 500,
      status: "Failed",
      message: "Failed to fetch user",
    };
  }
};

exports.addUser = async (userObject) => {
  try {
    let hashPassword = await bcrypt.hash(userObject.password, saltRounds);
    userObject.hashPassword = hashPassword;
    delete userObject.password;
    let result = await UserDao.addUser(userObject);
    if (result && !result.status) {
      return {
        statusCode: 201,
        status: "Success",
        message: "User signed up successfully",
      };
    } else if (result && result.status == "Failed") {
      return result;
    } else {
      return {
        statusCode: 400,
        status: "Failed",
        message: "Failed to sign up user",
      };
    }
  } catch (e) {
    console.log("Error in userServices, adding user:", e.message);
    return {
      statusCode: 500,
      status: "Failed",
      message: "Failed to sign up user",
    };
  }
};

exports.login = async (userName, password) => {
  try {
    let userResponse = await UserDao.getUser(userName);
    if (userResponse != undefined && userResponse != null && !userResponse.status) {
      let isPasswordMatch = await bcrypt.compare(
        password,
        userResponse.hashPassword
      );
      if (isPasswordMatch) {
        let token = jwt.sign({ userName: userResponse.userName }, "secret", { expiresIn: "1h" });
        return {
          statusCode: 200,
          status: "Success",
          message: "User is loggedin successfully",
          data: { token },
        };
      } else {
        return {
          statusCode: 401,
          status: "Failed",
          message: "Username or password is not valid",
        };
      }
    } else {
      return {
        statusCode: 401,
        status: "Failed",
        message: "Unauthorized access to login",
      };
    }
  } catch (e) {
    console.log("Error in userServices, login user:", e.message);
    return {
      statusCode: 500,
      status: "Failed",
      message: "Failed to login user",
    };
  }
};
