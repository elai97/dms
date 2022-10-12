/* eslint-env es6 */
const Documents = require("../models/simReg");

const home = async (req, res) => {
  res.send("Welcome...")
}

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
  const directoryPath = __basedir + "/resources/uploads/";
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


// const get_searchUploads = async (req, res) => {

//     try {

//         // Check if "?q=value" has a value to start search in multiple fields "title" and "description"
//         if (req.query.key || req.query.limit)
//         {
//             // Convert "q" query to regex and insensitive useing "i" flag
//             // let qRegex = new RegExp(req.query.q, "i");
//             var regex = new RegExp('noodles', 'i');  // 'i' makes it case insensitive

//             // Start search in database
//             const productsFind = await Uploads.find()
//                 .where("price")
//                 .gte(req.query.min || 0 ) // if "req.query.min" is empty set 0 as min value
//                 .lte(req.query.max || 100000) // if "req.query.max" is empty set a big number as max value
//                 .limit( !req.query.limit ? 10 : parseInt( (req.query.limit * req.query.page) ) )
//                 .skip( !req.query.limit ? 0 : ( ( parseInt(req.query.page) - 1) * req.query.limit ) ) // search in title or description
//                 .or([ { title: regex }, { description: regex } ]);

//                 let totalProducts = await Uploads.countDocuments({});
//                 let totalPages = Math.ceil( ( totalProducts / req.query.limit ) );

//                 let data = {
//                     totalProducts: totalProducts,
//                     totalPages, // total products/limit
//                     previewPage: req.query.page == 1 ? false : ( parseInt( req.query.page ) - 1 ),
//                     currentPage: parseInt( req.query.page ),
//                     nextPage: req.query.page == totalPages ? false : ( parseInt( req.query.page ) + 1 ),
//                     products: productsFind
//                 }

//             // Show success message with data of products and total of products
//             res.status(200).send({ success: true, data });
//         }

//         // Check if ":category" and "?q=value" has a value to start search by category in multiple field "title" and "description"
//         else if (req.params.category || req.query.q)
//         {
//             // Convert ":category" param to regex and insensitive useing "i" flag
//             let catRegex = new RegExp(req.params.category, "i");

//             // Convert "q" query to regex and insensitive useing "i" flag
//             let qRegex = new RegExp(req.query.q, "i");

//             // Start search in database
//             const productsFind = await Uploads.find()
//                 .and([ { category: catRegex } ]) // select category
//                 .where("price")
//                 .gte(req.query.min || 0 ) // if "req.query.min" is empty set 0 as min value
//                 .lte(req.query.max || 100000) // if "req.query.max" is empty set a big number as max value
//                 .or([ { title: qRegex }, { description: qRegex } ]); // search in title or description

//             // Show success message with data of products and total of products
//             res.status(200).json({ success: true, total: productsFind.length, data: productsFind });
//         }

//         // Check if "?min=value&max=value" has a value
//         else if (req.query.min || req.query.max)
//         {
//             // Start filter product by price
//             productsFiltered = await Uploads.find()
//             .where("price")
//             .gte(req.query.min || 0 ) // if "req.query.min" is empty set 0 as min value
//             .lte(req.query.max || 100000); // if "req.query.max" is empty set a big number as max value

//             // Show success message and send data
//             res.status(200).json({ success: true, total: productsFiltered.length, data: productsFiltered });
//         }

//         // In this case return all products
//         else {
//             // Get all products
//             getAllProducts(res, Uploads);
//         }

//     } catch (error) {

//         res.status(500).send({ success: false, message: error.message });
//     }

// }


module.exports = {
  home,
  post_documents,
  download_file,
  get_documents,
  get_documentsById,
  get_searchDocuments
};
