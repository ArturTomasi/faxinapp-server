const mongoose = require('mongoose');

class Database {
    constructor() {
        if ( process.env.DATABASE_TYPE === 'mongodb' ) {
            this.mongo();
        }
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            process.env.MONGO_URL, {
                useNewUrlParser: true,
                useFindAndModify: true,
            }
        );
    }
}


module.exports = new Database();