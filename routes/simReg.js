const {
  post_documents,
  download_file,
  get_documents,
  get_documentsById,
  get_searchDocuments
} = require("../controllers/simReg");
const authJwt = require("../utils/authJWT");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/");

  app.post("/api/simreg/documents", [authJwt.verifyToken, authJwt.isSimReg_Storage], post_documents);

  app.get("/api/simreg/download/:name", [authJwt.verifyToken, authJwt.isSimReg_Storage], download_file);

  app.get("/api/simreg/getdocuments", [authJwt.verifyToken, authJwt.isSimReg_Storage], get_documents);

  app.get("/api/simreg/getdocuments/:id", [authJwt.verifyToken, authJwt.isSimReg_Storage], get_documentsById);

  app.get("/api/simreg/search/:key", [authJwt.verifyToken, authJwt.isSimReg_Storage], get_searchDocuments);

};
