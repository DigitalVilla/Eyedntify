const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
 user:{type: Schema.Types.ObjectId, ref: 'User'},
 text: {type: String, max: 144}
}) 

module.exports = mongoose.model('Comment', CommentSchema)