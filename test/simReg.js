// /* eslint-disable no-unused-vars */
// //During the test the env variable is set to test
// process.env.NODE_ENV = "test";

// let mongoose = require("mongoose");
// let Documents = require("../models/document");

// //Require the dev-dependencies
// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../index");
// let should = chai.should();

// chai.use(chaiHttp);
// //Our parent block
// describe(
//   "Documents",
//   () => {
//     beforeEach((done) => {
//       //Before each test we empty the database
//       Documents.deleteMany({}, (err) => {
//         done();
//       });
//     });

//     /*
//      * Test the /getdocuments route
//      */
//     describe("/GET documents", () => {
//       it("it should GET all the documents", (done) => {
//         chai
//           .request(server)
//           .get("/getdocuments")
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("array");
//             //   res.body.length.should.be.eql(0);
//             done();
//           });
//       });
//     });
//   },

//   /*
//   * Test the /POST route
//   */
//   describe('/POST document', () => {
//     it('it should not POST a document without dSecurityGroup field', (done) => {
//         let documents = {
//           dUser: "John Doe",
//           dDocTitle:
//             "BIOMETRIC_TYPE_CUSTOMER_ID_CUSTOMERPHOTO_TYPE_xCHANNEL_REF_ID",
//           dDocAuthor: "John Doe"
//         }
//           chai.request(server)
//           .post('/documents')
//           .send(documents)
//           .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('errors');
//                 res.body.errors.should.have.property('dDocAuthor');
//                 res.body.errors.dSecurityGroup.should.have.property('kind').eql('required');
//             done();
//           }).catch(done);
//     });
//     it('it should POST a document ', (done) => {
//       let documents = {
//         dUser: "John Doe",
//         dDocTitle:
//           "BIOMETRIC_TYPE_CUSTOMER_ID_CUSTOMERPHOTO_TYPE_xCHANNEL_REF_ID",
//         dDocAuthor: "John Doe"
//       }
//           chai.request(server)
//           .post('/documents')
//           .send(documents)
//           .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message').eql('Documents successful...');
//                 res.body.book.should.have.property('dUser');
//                 res.body.book.should.have.property('dDocTitle');
//                 res.body.book.should.have.property('dDocAuthor');
//             done();
//           }).catch(done);
//     });
// }),

//   /*
//    * Test the /getdocuments/:id route
//    */
//   describe("/GET/:id documents", () => {
//     it("it should GET a documents by the given id", (done) => {
//       let documents = new Documents({
//         dUser: "John Doe",
//         dDocTitle:
//           "BIOMETRIC_TYPE_CUSTOMER_ID_CUSTOMERPHOTO_TYPE_xCHANNEL_REF_ID",
//         dDocAuthor: "John Doe"
//       });
//       documents.save((err, documents) => {
//         chai
//           .request(server)
//           .get("/getdocuments/" + documents.id)
//           .send(documents)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//             res.body.should.have.property("dUser");
//             res.body.should.have.property("dDocTitle");
//             res.body.should.have.property("dDocAuthor");
//             res.body.should.have.property("_id").eql(documents.id);
//             done();
//           });
//       });
//     });
//   }),

//   /*
//    * Test the /getdocuments/:key route
//    */
//   describe("/GET/:key documents", () => {
//     it("it should GET a documents by the given key", (done) => {
//       let documents = new Documents({
//         dUser: "John Doe",
//         dDocTitle:
//           "BIOMETRIC_TYPE_CUSTOMER_ID_CUSTOMERPHOTO_TYPE_xCHANNEL_REF_ID",
//         dDocAuthor: "John Doe"
//       });
//       documents.save((err, documents) => {
//         chai
//           .request(server)
//           .get("/getdocuments/John Doe")
//           .send(documents)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//             res.body.should.have.property("dUser");
//             res.body.should.have.property("dDocTitle");
//             res.body.should.have.property("dDocAuthor");
//             done();
//           });
//       });
//     });
//   })
// );
