const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const admin = require("../Models/User"); // Assuming there's a separate model for admin
const seller = require("../Models/User"); // Assuming there's a separate model for seller
const requireSignin = (req, res, next) => {
    const token =
        req.get("Authorization")?.split("Bearer ")[1] ||
        req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "no token provided! Access prohibited",
        });
    }

    jwt.verify(token, process.env.SECRETK, async (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({
                message: "UnAuthorised !",
            });
        }
        // console.log(decoded);
        const user = await User.findOne({ _id: decoded.id });
        const user1 = await User.findOne({ _id: decoded.id });
        if (!user && !user1) {
            return res.status(400).send({
                message: "The user that this token belongs to does not exist",
            });
        }
        req.user = user || user1;
        // console.log(user);
        next();
    });
};
const adminMiddleware = (req, res, next) => {
    const token =
        req.headers["x-access-token"] ||
        req.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
        return res.status(403).send({
            message: "no token provided! Access prohibited",
        });
    }

    jwt.verify(token, process.env.SECRETK, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "UnAuthorised ! Admin role is required! ",
            });
        }
        const user = await admin.findOne({ email: decoded.id });
        if (!user) {
            return res.status(400).send({ message: "The admin that this  token belongs to does not exist", });
        }
        req.user = user;

        next();
    });
};
const sellerSignin = (req, res, next) => {
    const token =
        req.headers["x-access-token"] ||
        req.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
        return res.status(403).send({
            message: "no token provided! Access prohibited",
        });
    }

    jwt.verify(token, process.env.SECRETK, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "UnAuthorised ! Admin role is required! ",
            });
        }
        console.log(decoded);
        const user = await seller.findOne({ email: decoded.id.email, userType: "seller" });

        if (!user) {
            return res.status(400).send({
                message: "The admin that this  token belongs to does not exist",
            });
        }
        req.user = user;

        next();
    });
};
module.exports = {
    requireSignin,
    adminMiddleware,
    sellerSignin
};
