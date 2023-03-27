const mongoose = require('mongoose');

// document schema
const documentsSchema = new mongoose.Schema({
  "document_source": {
    "type": "String"
  },
  "dUser": {
    "type": "String"
  },
  "dDocTitle": {
    "type": "String"
  },
  "dDocAuthor": {
    "type": "String"
  },
  "primaryFile": {
    "type": "String"
  },
  "content": {
    "type": "String"
  },
  "xCustomer_ID": {
    "type": "String"
  },
  "xCustomer_Photo_Type": {
    "type": "String"
  },
  "xBiometric_Type": {
    "type": "String"
  },
  "xSubmission_Date": {
    "type": "Date"
  },
  "xChannel": {
    "type": "String"
  },
  "xDocument_Name": {
    "type": "String"
  },
  "xChannel_Ref_ID": {
    "type": "String"
  },
  "xCustomer_MSISDN": {
    "type": "String"
  },
  "xUpdate_Date": {
    "type": "Date"
  },
  "xFingerprint_Number": {
    "type": "String"
  },
  "content_ID": {
    "type": "String"
  }
},
  {
    timestamps: true
  }
);

// eslint-disable-next-line no-unused-vars
const Documents = module.exports = mongoose.model('documents', documentsSchema);
