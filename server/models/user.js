const { Long, Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the User schema
const UserSchema = new Schema({
  id: {type: Number, required: true},
  username: { type: String, required: true },
  password: { type: String, required: true },
  class: [{ type: Schema.Types.ObjectId, ref: 'Class'}]
});


// Exports the PostSchema for use elsewhere.
module.exports = mongoose.model('users', UserSchema);
