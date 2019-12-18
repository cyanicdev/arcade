const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userid: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  highScore: {
    type: Number,
    default: 0
  }
}, { collection: 'fruitain' });

const UserModel = mongoose.model('fruitain', UserSchema);

module.exports = UserModel;