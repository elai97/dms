/* eslint-env es6 */
const Documents = require("../models/storage");

// Create Documents to the database. 
const post_documents = async (req, res) => {
  
  // Validate request
  if (!req.body.dUser) {
    res.status(400).send({ status: 400, message: "Content can not be empty!" });
    return;
  }

  // Create a Documents
  const documents = Documents({
    dUser: req.body.dUser,
    dDocTitle: req.body.dDocTitle,
    dDocAuthor: req.body.dDocAuthor,
    primaryFile: req.body.primaryFile,
    content: req.body.content,
    xCustomer_ID: req.body.xCustomer_ID,
    xCustomer_Photo_Type: req.body.xCustomer_Photo_Type,
    xBiometric_Type: req.body.xBiometric_Type,
    xSubmission_Date: req.body.xSubmission_Date,
    xChannel: req.body.xChannel,
    xDocument_Name: req.body.xDocument_Name,
    xChannel_Ref_ID: req.body.xChannel_Ref_ID,
    xCustomer_MSISDN: req.body.xCustomer_MSISDN,
    xUpdate_Date: req.body.xUpdate_Date,
    xFingerprint_Number: req.body.xFingerprint_Number,
    content_ID: req.body.content_ID
  });

  // Save Documents in the database
  documents
    .save(documents)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message:
          err.message || "Server error while uploading the documents."
      });
    });
};


// Download file
const download_file = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/files/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err
      });
    }
  });
};


// Retrieve all Documents from the database.
const get_documents = async (req, res) => {
  await Documents.find()
    .sort({ createdAt: "desc" })
    .limit(100)
    // .select("-fParentGUID") // Or just 'fParentGUID' to include the field
    .exec((err, documents) => {
      try {
        res
          .status(200)
          .send([{ message: "Successful", count: documents.length, documents }]);
      } catch (error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while retrieving the uploads"
        });
      }
    });
};

// Retrieve document by id
const get_documentsById = async (req, res) => {
  Documents.findOne({
    id: req.body.id
  }).exec(function (err, documents) {
    if (err) {
      res.send("Error has occured");
    } else {
      res.status(200).send(documents);
    }
  });
};

// Search documents
// TODO add pagination to search
const get_searchDocuments = async (req, res) => {

  try {
    let documents = await Documents.find(
      {
        "$or": [
          { dDocTitle: { $regex: req.params.key } },
          { dDocAuthor: { $regex: req.params.key } }
        ]
      }
    )
    res.status(200).send([{ message: "Successful", count: documents.length, documents }]);
  } catch (error) {
    res.status(500).send("Something went wrong...");
  }
};

module.exports = {
  post_documents,
  download_file,
  get_documents,
  get_documentsById,
  get_searchDocuments
};
