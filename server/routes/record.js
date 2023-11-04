const express = require("express");
import { Pinecone } from '@pinecone-database/pinecone';

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
const Class = require('../models/class');
const Note = require('../models/notes');
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the classes.
recordRoutes.get('/class', async (req, res, next) => {
  console.log(Class);
  const classes = await Class.find();
  return res.status(200).json({
    statusCode: 200,
    message: 'Found ' + classes.length,
    data: { classes },
  });
});
 
// This section will help you get a single class by id
recordRoutes.get('/class/:id', async (req, res, next) => {
  let classes = [];
  classes = await Class.findOne({_id: req.params.id});
  return res.status(200).json({
    statusCode: 200,
    data: { classes },
  });
});

// This section will help you get a single note by id
recordRoutes.get('/notes/:id', async (req, res, next) => {
  let note;
  note = await Note.findOne({_id: req.params.id});
  return res.status(200).json({
    statusCode: 200,
    data: { note },
  });
 });
 
// This section will help you create a new record.
recordRoutes.route("/class/new").post(function (req, response) {
 let db_connect = dbo.getDb("class-notes-database");
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("Class").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;
