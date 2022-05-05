const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./mongoConfig");
const config = require("./config");
const songRouter = require("./song/song.router");

const path = require("path");
global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("."));

app.disable("x-powered-by");

app.use("/csv", songRouter);

const check = app.get('/', function (req, res) {
    return res.status(200).send("If you see this everything should working fine.");
})

const start = async () => {
    try {
        app.listen(config.port, () => {
            console.log(`REST API on http://localhost:${config.port}`);
        });
        if (check) console.log(':)');
        else console.log(':(');
    } catch (e) {
        console.error(e);
    }
};


module.exports = {
    start,
    app
};
