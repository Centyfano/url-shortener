const express = require("express");
const conn = require("./config/db");
require("dotenv").config({ path: "config/config.env" });
const mount = require("./routes");
const app = express();
conn();
app.use(express.json());
mount(app);

const port = process.env.PORT;

app.listen(port, () => {
 console.log(`Server started on port ${port}`);
});
