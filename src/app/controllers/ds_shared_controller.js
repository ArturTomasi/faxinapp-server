const { Datastore } = require('@google-cloud/datastore');

class CleaningController {

    static PATH = 'shared';

    constructor() {
        this.database = new Datastore();
    }

    async share(req, res) {
        try {
            var entity = req.body;

            entity.key = await this.database.key([PATH, req.params.id]);

            await this.database.save(entity);

            res.status(200).json({ message: 'Sucess!' });
        }
        catch (e) {
            res.status(500).json(e);
        }
    }

    async obtain(req, res) {
        try {
            var result = this.database.get(await this.database.key([PATH, req.params.id]));

            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'UUID not foud' });
            }
        }
        catch (e) {
            res.status(500).json(e);
        }
    }

    async all(req, res) {

        var result = this.database.get(await this.database.key([PATH]));

        res.status(200).json(result);
    }

    async remove(req, res) {
        try {

            await this.database.delete([
                await this.database.key([PATH, req.params.id]),
                await this.database.key(['dones', req.params.id])
            ]);

            res.status(200).json({ message: 'Sucesso' });
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new CleaningController();