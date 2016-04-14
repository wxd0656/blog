var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var _ = require('lodash');
var config = require('../config.js');


var ArticleSchema = new Schema({
	title: { type:String },
	content: { type:String },
	author_id: { type:ObjectId },
	top: { type:Boolean, default:false },
	tag: { type:String },
	type: { type:String }, //文章类型
	visit_count: { type:Number ,default:0},
	reply_count: { type:Number ,default:0},

	create_at: { type:Date, default:Date.now },
	update_at: { type:Date, default:Date.now },
	last_reply: { type:ObjectId },
	last_reply_at: { type:Date, default:Date.now },

	deleted: { type:Boolean, default:false }
});


ArticleSchema.index({create_at: -1});
ArticleSchema.index({tag: 1});
ArticleSchema.index({type: 1});

ArticleSchema.virtual('article_type').get(function () {
	var type = this.type;
	var pair = _.find(config.article_type, function(_type) {
		return type === _type[0];
	});

	if (pair) {
		return pair[1];
	} else {
		return '';
	}
});


mongoose.model('article', ArticleSchema);
