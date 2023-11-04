const { Long, Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Class schema
const ClassSchema = new Schema({
  id: {type: Number, required: true},
  name: { type: String, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}]
});


// Exports the PostSchema for use elsewhere.
module.exports = mongoose.model('Class', ClassSchema);
