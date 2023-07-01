const { Op } = require("sequelize");
const { Bible, BibleEN, Key, KeyEN } = require("../models");
const { parseText } = require("../utils/bible");

const version = {
  gaejung: "v_gaejung",
  hangeul: "v_hangeul",
  kjv: "v_KJV",
  niv: "v_NIV",
};

const getphrase = async (req, res) => {
  let countsPerPage = 20;

  try {
    const { keyword, lang, page, v } = req.query;

    let offset;

    if (page > 1) {
      offset = countsPerPage * (page - 1);
    }

    const parsedResult = parseText(keyword, lang);

    // config set by language
    let db;
    let modelForRefer;
    let columnName;
    let versionToQuery = version[v];

    switch (lang) {
      case "ko":
        db = Bible;
        modelForRefer = Key;
        columnName = "key";
        break;
      case "en":
        db = BibleEN;
        modelForRefer = KeyEN;
        columnName = "key_en";
        break;
      default:
        break;
    }

    // CASE : No Result
    if (
      Object.keys(parsedResult).length === 0 &&
      parsedResult.constructor === Object
    ) {
      res.status(200).json({});
      return;

      // CASE : Result => include.
    } else if (parsedResult.hasOwnProperty("text")) {
      const { text, version } = parsedResult;

      // let result = await findVerseByKeyword(
      //   db,
      //   versionToQuery,
      //   text,
      //   offset,
      //   countsPerPage
      // );

      db.findAndCountAll({
        attributes: ["book", "chapter", "verse", [versionToQuery, "sentence"]],
        where: {
          [versionToQuery]: { [Op.like]: "%" + text + "%" },
        },
        include: [
          {
            model: modelForRefer, // Book
            attributes: ["n"],
          },
        ],
        offset,
        limit: countsPerPage,
      }).then((bible) => {
        // Add book name into the result object.

        console.log(bible);
        const data = bible.rows.map((el) => {
          const dataToUpdate = el.dataValues;
          dataToUpdate["long_label"] = dataToUpdate[columnName].n;
          delete dataToUpdate[columnName];
          return dataToUpdate;
        });

        res.status(200).json({
          count: bible.count,
          bible: data,
          mode: "include",
        });
      });

      return;
    } else {
      // CASE : Result => Range
      Object.keys(parsedResult).forEach((key) => {
        parsedResult[key] = parseInt(parsedResult[key]);
      });
    }

    const { book, chapter, from, to, text } = parsedResult;

    let verseOption = to
      ? {
          [Op.between]: [from, to],
        }
      : {
          [Op.eq]: from,
        };

    db.findAll({
      attributes: ["book", "chapter", "verse", [versionToQuery, "sentence"]],
      where: {
        [Op.and]: [
          { book: book + 1 },
          { chapter },
          {
            verse: verseOption,
          },
        ],
      },
      include: [
        {
          model: modelForRefer, // Book
          attributes: ["n"],
        },
      ],
    }).then((bible) => {
      // Add book name into the result object.
      const data = bible.map((el) => {
        const dataToUpdate = el.dataValues;
        dataToUpdate["long_label"] = dataToUpdate[columnName].n;
        delete dataToUpdate[columnName];
        return dataToUpdate;
      });

      res.status(200).json({
        bible: data,
        mode: "range",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const findVerseByKeyword = async (
  db,
  versionToQuery,
  text,
  offset,
  countsPerPage
) => {
  let result;

  result = await db.findAndCountAll({
    attributes: ["book", "chapter", "verse", [versionToQuery, "sentence"]],
    where: {
      [versionToQuery]: { [Op.like]: "%" + text + "%" },
    },
    offset,
    limit: countsPerPage,
  });

  return result;
};

module.exports = { getphrase };
