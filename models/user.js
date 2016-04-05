var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var UserSchema = new Schema({
	ncikname: { type:String },
	loginname: { type:String },
	password: { type:String },
	email: { type:String },
	score: { type:Number, default: 0 },

	create_at: { type:Date, default:Date.now },
	uddate_at: { type:Date, default:Date.now },

	receive_reply_mail: {type: Boolean, default: false },
});