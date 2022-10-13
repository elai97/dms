const {
  post_documents,
  download_file,
  get_documents,
  get_documentsById,
  get_searchDocuments
} = require("../controllers/storage");
const authJwt = require("../utils/authJWT");
const multer = require('multer');
const uploadMiddleware = require('../utils/upload-middleware');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const upload = multer({
                    storage: uploadMiddleware.files.storage(), 
                    allowedFiles:uploadMiddleware.files.allowedFiles 
                    }).any('files');

  app.post("/api/v1/documents", [authJwt.verifyToken],upload, post_documents);

  app.get("/api/v1/download/:name", [authJwt.verifyToken], download_file);

  app.get("/api/v1/getdocuments", [authJwt.verifyToken], get_documents);

  app.get("/api/v1/getdocuments/:id", [authJwt.verifyToken], get_documentsById);

  app.get("/api/v1/search/:key", [authJwt.verifyToken], get_searchDocuments);

};
