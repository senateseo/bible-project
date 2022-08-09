const express = require("express");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv");
const app = express();
const http = require("http");
const https = require("https");
const sequelize = require("./models").sequelize;
const PORT = process.env.PORT || 3000;

const bibleRoutes = require("./routes/bible.js");

const options = {
  key: fs.readFileSync("./cert/private.key"),
  cert: fs.readFileSync("./cert/certificate.crt"),
};

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.use("/bible", bibleRoutes);
sequelize.sync();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(PORT);
httpsServer.listen(8443);
