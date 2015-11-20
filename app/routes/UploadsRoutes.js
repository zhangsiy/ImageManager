var Upload= require('../models/upload');

module.exports = function(app) {

	app.get('/api/uploads', function(req, res) {

		Upload
        .find()
        .sort('-timestamp')
        .exec(function(err, uploads) {
            if (err) {
                res.send(err);
            }

            res.json(uploads);
        });

	});

	app.post('/api/uploads', function(req, res) {
		Upload.create(req.body, function(err, upload) {
			if (err) {
				res.send(err);
			}

            res.json({ message: 'Successfully created' });
    	});
	});

    app.delete('/api/uploads/:id', function(req, res) {
        Upload.remove({ _id: req.params.id}, function(err, upload) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        })
    });
};