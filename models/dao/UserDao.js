const User = require("../schema/users");

exports.addUser = async (userObject) => {
    try {
        let userModel = new User(userObject);
        return await userModel.save();
    } catch(e) {
        console.log("Error in UserDao, adding user", e.message);
        return {statusCode: 500, status: "Failed", message: "Failed to sign up user"};
    }
}

exports.getUser = async(userName) => {
    try {
        return await User.findOne({"userName": userName});
    } catch(e) {
        console.log("Error in UserDao, getting user", e.message);
        return {statusCode: 500, status: "Failed", message: "Failed to fetch user"};
    }
}