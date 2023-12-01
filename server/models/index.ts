import path from 'path';
import {Sequelize} from 'sequelize';
import { BookInfo } from './book_info';

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config.json"))[env];
const BookInfoTable = BookInfo;

/* DB TYpe */
interface DBType {
  sequelize?: any,
  Sequelize?: any,
  BookInfo?: any
}

let db:DBType = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.BookInfo = BookInfoTable

export default db;
