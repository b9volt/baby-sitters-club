var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var SitterSchema = require('./sitter.js').schema;


var UserSchema = new Schema({
  username: String,
  password: String,
  todoList: [TodoSchema],
  done: [SitterSchema]
});

UserSchema.plugin(passportLocalMongoose);
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
