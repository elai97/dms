// const { authJwt } = require("../utils");
// const controller = require("../controllers/user");

// module.exports = function (app) {
//     app.use(function (req, res, next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });

//     app.get("/api/test/all", controller.allAccess);

//     app.get("/api/test/simReg", [authJwt.verifyToken], controller.userBoard);

//     app.get(
//         "/api/test/mtnf",
//         [authJwt.verifyToken, authJwt.isModerator],
//         controller.moderatorBoard
//     );

//     app.get(
//         "/api/test/ppk",
//         [authJwt.verifyToken, authJwt.isAdmin],
//         controller.adminBoard
//     );
// };