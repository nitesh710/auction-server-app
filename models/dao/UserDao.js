const User = require("../schema/userInfo");

exports.addUser = async (userObject) => {
    try {
        let userModel = new User(userObject);
        await userModel.save();
        return {statusCode: 201, status: "Success", message: "User signed up successfully"};
    } catch(e) {
        console.log("Error in UserDao, adding user", e.message);
        return {statusCode: 500, status: "Failed", message: "Failed to sign up user"};
    }
}

exports.getUser = async(userName) => {
    try {
        let result = await User.findOne({"userName": userName}).select({"_id": 1});
        return {statusCode: 200, status: "Success", message: "User info fetched successfully", data: result};
    } catch(e) {
        console.log("Error in UserDao, getting user", e.message);
        return {statusCode: 500, status: "Failed", message: "Failed to fetch user"};
    }
}