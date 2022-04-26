const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const app = express();
const sequelize = require("./models").sequelize;
const PORT = process.env.PORT || 3000;

const bibleRoutes = require("./routes/bible.js");

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.use("/bible", bibleRoutes);
sequelize.sync();
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
