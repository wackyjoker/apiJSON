var mongoose = require("mongoose");

mongoose.set("debug",true);

mongoose.connect("mongodb://localhost/api-todo");

mongoose.Promise = Promise;


module.exports.Todo = require("./Todo");