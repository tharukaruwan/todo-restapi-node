const log4js = require('log4js');

module.exports = (req, res, next) => {
    try {
        var logger = log4js.getLogger();
        log4js.configure({
            appenders: { cheese: { type: "file", filename: "./log/cheese.log" } },
            categories: { default: { appenders: ["cheese"], level: "info" } }
        });
        logger.error("Cheese is too ripe!");
        next();
    } catch (error) {
        next();
    }
};