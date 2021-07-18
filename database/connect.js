const logger = require('../logging/logger');
/**
 * Connect to database
 * @param {Object} mongoose The database object holding the connection
 * @returns Boolean - If connection was successfull or not
 * @author Alle
 */
 exports.connectToDatabase = function(mongoose) {
    return mongoose
    .connect(process.env.MONGO_DB_URL || "mongodb://localhost:27017/usn", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((_) => {
        logger.info('Successfully connected to database!');
        return true;
    })
    .catch((err) => {
        logger.error(err);
        return false;
    });
}