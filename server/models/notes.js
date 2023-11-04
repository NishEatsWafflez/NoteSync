const { Long, Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Note schema
const NoteSchema = new Schema({
  id: {type: Number, required: true},
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  class: { type: Schema.Types.ObjectId, ref: 'Class'}
});


// Exports the PostSchema for use elsewhere.
module.exports = mongoose.model('Note', NoteSchema);
