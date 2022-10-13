require("dotenv").config();

var multer = require('multer');
module.exports.files={
    storage:function(){
        var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/files/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
      })
      
      return storage;
},
allowedFiles:function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(process.env.FILE_FORMAT)) {
        req.fileValidationError = 'File type not allowed!';
        return cb(new Error('File type  are allowed!'), false);
    }
    cb(null, true);
}
}