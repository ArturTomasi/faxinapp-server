const Shared = require('../models/done');

class DoneController {

    async done(req, res) {
        try {
            await Done.create({
                _id: req.params.id,
                content: req.body
            });

            res.status(200).json({ message: 'Sucess!' });
        }

        catch (e) {
            res.status(500).json(e);
        }
    }

    async obtain(req, res) {
        try {
            var result = await Done.findById(req.params.id);

            if (result && result.content) {
                res.status(200).json(result.content);
            } else {
                res.status(404).json({ message: 'UUID not foud' });
            }

        }
        catch (e) {
            res.status(500).json(e);
        }
    }

    async all(req, res) {
        var result = await Done.find();

        res.status(200).json(result);
    }
}

module.exports = new DoneController();