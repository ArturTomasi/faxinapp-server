const { Datastore } = require("@google-cloud/datastore");
const database = new Datastore();

const PATH = "dones";

class DoneController {
  async done(req, res) {
    try {
      var key = await database.key([PATH, req.params.id]);

      await database.save({
        key: key,
        data: req.body
      });

      res.status(200).json({ message: "Sucess!" });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async obtain(req, res) {
    try {
      const [result] = await database.get(
        await database.key([PATH, req.params.id])
      );

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "UUID not foud" });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async all(req, res) {
    try {
      var result = await database.runQuery(database.createQuery(PATH));

      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new DoneController();
