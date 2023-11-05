const { Long, Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notes = require("./notes")


// Defines the Class schema
const ClassSchema = new Schema({
  // id: {type: Number, required: true},
  name: { type: String, required: true },
  notes: [notes.schema]
});


// Exports the PostSchema for use elsewhere.
module.exports = mongoose.model('classes', ClassSchema);
