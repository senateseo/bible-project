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
const BibleKJV = require("./biblekjv")(sequelize, Sequelize);
const Key = require("./key")(sequelize, Sequelize);
db.Bible = Bible;
db.BibleKJV = BibleKJV;
db.Key = Key;

BibleKJV.belongsTo(Key, {
  foreignKey: "book",
});

module.exports = db;
