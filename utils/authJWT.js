const jwt = require("jsonwebtoken");
const config = require("../configs/auth");
const db = require("../models");
const User = db.user;
const Role = db.role;

const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const isSimReg_Storage = async (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "SimReg_Storage") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require SimReg_Storage authorization!" });
                return;
            }
        );
    });
};

// isModerator = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//         if (err) {
//             res.status(500).send({ message: err });
//             return;
//         }

//         Role.find(
//             {
//                 _id: { $in: user.roles }
//             },
//             (err, roles) => {
//                 if (err) {
//                     res.status(500).send({ message: err });
//                     return;
//                 }

//                 for (let i = 0; i < roles.length; i++) {
//                     if (roles[i].name === "moderator") {
//                         next();
//                         return;
//                     }
//                 }

//                 res.status(403).send({ message: "Require Moderator Role!" });
//                 return;
//             }
//         );
//     });
// };

module.exports = {
    verifyToken,
    isSimReg_Storage
};