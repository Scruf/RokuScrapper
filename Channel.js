var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var chanelSchema = new Schema({
	name:String,
	url:String,
	description:String
});
var Channel = mongoose.model('RokuChannels',chanelSchema);
module.exports = Channel;