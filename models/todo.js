var mongoose =require("mongoose");

var todoSchema = new mongoose.Schema({

	name:{
		type:String,
		required:"name can not be blank"
	},
	completed:{
		type:Boolean,
		default:false
	},
	create_data:{
		type:Date,
		default:Date.now
	}
});

var Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;
//name
//completed
//create_data