const controllersdb = require('../controllers/controllerDb')
const config = require('../options/config')
const logger = require('../utils/logger')

function connectarDb() {
    controllersdb.connectDb(config.URL_MONGODB, (err) => {
        if (err) return logger.error("db error");
        logger.info("Base de datos conectada");
      });
}

module.exports = connectarDb