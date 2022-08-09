const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config.json"))[env];

let db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Bible = require("./bible")(sequelize, Sequelize);
const BibleEN = require("./bible_en")(sequelize, Sequelize);
const Key = require("./key")(sequelize, Sequelize);
const KeyEN = require("./key_en")(sequelize, Sequelize);
db.Bible = Bible;
db.BibleEN = BibleEN;
db.Key = Key;
db.KeyEN = KeyEN;

Bible.belongsTo(Key, {
  foreignKey: "book",
});

BibleEN.belongsTo(KeyEN, {
  foreignKey: "book",
});

module.exports = db;
