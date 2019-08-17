const Shared = require('../models/shared');
const Done = require('../models/done');

class CleaningController {

    async share(req, res) {
        try {
            await Shared.create({
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
            var result = await Shared.findById(req.params.id);

            if (result && result.content) {
                res.status(200).json(result.content);
            }
            else {
                res.status(404).json({ message: 'UUID not foud' });
            }
        }
        catch (e) {
            res.status(500).json(e);
        }
    }

    async all(req, res) {
        var result = await Shared.find();

        res.status(200).json(result);
    }

    async remove(req, res) {
        try {
            await Shared.findByIdAndDelete(req.params.id);
            await Done.findByIdAndDelete(req.params.id);

            res.status(200).json({ message: 'Sucesso' });
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new CleaningController();