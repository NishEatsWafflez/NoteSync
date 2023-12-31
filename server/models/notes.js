const { Long, Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Note schema
const NoteSchema = new Schema({
  //id: {type: Number, required: true},
  title: { type: String, required: true },
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user'},
  class: { type: Schema.Types.ObjectId, ref: 'class'}
});


// Exports the PostSchema for use elsewhere.
module.exports = mongoose.model('notes', NoteSchema);
