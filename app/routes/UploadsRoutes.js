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

	});

    app.delete('/api/uploads/clear_all', function(req, res) {
        Upload.remove({}, function(err, upload) {
            if (err) {
                res.send(err);
            }

            Upload
            .find()
            .sort('-timestamp')
            .exec(function(err, uploads) {
                if (err) {
                    res.send(err);
                }

                res.json(uploads);
            });
        })
    });
};