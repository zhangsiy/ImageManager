var mongoose = require('mongoose');

module.exports = mongoose.model('BmLog', {
	url : String,
    message: String,
	type: String,
    stackTrace: String,
    customData: Object,
    browser: String,
	timestamp: { type:Date, default: Date.now}
});