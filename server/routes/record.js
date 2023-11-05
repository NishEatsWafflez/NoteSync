const express = require("express");
const {PineconeClient} = require('@pinecone-database/pinecone');
const { Configuration, OpenAI, OpenAIApi } = require("openai");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
const Class = require('../models/class');
const Note = require('../models/notes');
const User = require('../models/user');

 
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

// This section will help you create a new class.
recordRoutes.route("/class/new").post(async function (req, res) {
  try {

    // Create a new Class instance
    const newClass = new Class({
      name: req.body.name,
      notes: []
    });

    // Save the new Class instance
    const savedClass = await newClass.save();

    res.json(savedClass); // Respond with the saved Class object
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
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
 


// This section will help you create a new note.
recordRoutes.post('/note/new', async (req, res, next) => {
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API,
  });
  const openai = new OpenAIApi(configuration);
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: "gcp-starter",
    apiKey: process.env.PINECONE_KEY,
  });
  const index = pinecone.Index("class-notes-data");
  // recordRoutes.route("/note/new").post(async function (req, res) {
  try {
    let userId = req.body.userId;
    let classId = req.body.classId;
    
    // Find the User and Class using their ID
    const foundUser = await User.findOne({_id: userId});
    const foundClass = await Class.findOne({_id: classId});

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!foundClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    // Create a new Class instance
    const newNote = new Note({
      title: req.body.title,
      text: req.body.text,
      user: foundUser,
      class: foundClass
    });

    

    // Save the new Class instance
    const savedNote = await newNote.save();

    const embedNote = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: savedNote.title + " - " + savedNote.text
    }).catch((err) => {
      console.log(err.data.error);
    });
    let savedNoteId = savedNote._id;

    const vectors = embedNote.data.data[0].embedding;
      const upsertRequest = {
        vectors: [
          {
            id: `${savedNoteId}`,
            values: vectors
          }
        ]
        // namespace: foundClass._id
      };
      const upsertResponse = await index.upsert({ upsertRequest });
      // res.status(200).json({ message: 'New listing created', id:  })


    res.json(savedNote); // Respond with the saved Class object
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// This section will help you update a note by id.
recordRoutes.route("note/:id").put(function (req, response) {
  const { id } = req.params;
  const { title, text } = req.body;

  try {
    const updatedNote = await Note.findOne(_id: req.params.id);

    if (updatedNote) {
      updatedNote.title = req.body.title;
      updatedNote.text = req.body.text;
      res.json({ message: 'Note updated successfully', updatedNote });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ message: 'Server error' });
  }
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
