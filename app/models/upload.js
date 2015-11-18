var mongoose = require('mongoose');

module.exports = mongoose.model('Upload', {
	s3 : String,
    file_name: String,
    file_type: String,
	timestamp: { type:Date, default: Date.now}
});