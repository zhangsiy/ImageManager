var BmLog = require('../models/bm_log');

module.exports = function(app) {

	app.get('/api/bm_log', function(req, res) {

		BmLog
        .find()
        .sort('-timestamp')
        .exec(function(err, bm_logs) {
            if (err) {
                res.send(err);
            }

            res.json(bm_logs);
        });

	});

	app.post('/api/bm_log', function(req, res) {

		BmLog.create(req.body, function(err, bm_log) {
			if (err) {
				res.send(err);
			}

			BmLog
            .find()
            .sort('-timestamp')
            .exec(function(err, bm_logs) {
                if (err) {
                    res.send(err);
                }

                res.json(bm_logs);
            });
    	});

	});

    app.delete('/api/bm_log/clear_all', function(req, res) {
        BmLog.remove({}, function(err, bm_log) {
            if (err) {
                res.send(err);
            }

            BmLog
            .find()
            .sort('-timestamp')
            .exec(function(err, bm_logs) {
                if (err) {
                    res.send(err);
                }

                res.json(bm_logs);
            });
        })
    });
};