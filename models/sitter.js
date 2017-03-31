var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SitterSchema = new Schema({
  name: String,
  age: Number,
  rate: Number,
  stars: Number,
  comments: String,
});


var SitterModel = mongoose.model('Sitter', SitterSchema);

module.exports = {
  schema: SitterSchema,
  model: SitterModel
};
