const router = require("./routes");
const { route } = require("./routes");

module.exports = (app) => {
 app.use("", router);
};
