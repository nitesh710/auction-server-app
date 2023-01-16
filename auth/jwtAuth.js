const jwt = require('jsonwebtoken');
const UserDao = require('../models/dao/UserDao');

const jwtVerify = async (req, res, next) => {
    try {
        const { headers } = req;
        if(!headers.authorization) {
            return res.status(401).send({status: 'Failed', message: 'Unauthorized access'});
        } else if(headers.authorization) {
            let [bearer, token] = headers.authorization.split(' ');
            if(!bearer) {
                return res.status(401).send({status: 'Failed', message: 'Invalid token'});
            } else if(!token) {
                return res.status(401).send({status: 'Failed', message: 'Invalid token'});
            }
            let decoded = jwt.verify(token, 'secret');
            if(decoded != undefined && decoded != null) {
                let userInfo = await UserDao.getUser(decoded.userName);
                if(userInfo && !userInfo.status){
                    req.user = userInfo;
                } else {
                    return res.status(500).send({status: 'Failed', message: 'Key services are down'});
                }
            } else {
                return res.status(401).send({status: 'Failed', message: 'Invalid token'});
            }
        }
    } catch(e) {
        console.log('Error in verifying jwt token:', e);
        if(e.message.includes('invalid token')) {
            return res.status(401).send({status: 'Failed', message: 'Invalid token'});
        }
        return res.status(500).send({status: 'Failed', message: 'Failed to verify token'});
    }
    return next();
}

module.exports = jwtVerify;