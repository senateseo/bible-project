const { Op } = require("sequelize");
const { Bible } = require("../models");
const { BibleKJV } = require("../models");
const { Key } = require("../models");
const { parseText } = require("../utils/bible");

const getphrase = async (req, res) => {
  let countsPerPage = 20;

  try {
    const { keyword, lang, page } = req.query;

    let offset;

    if (page > 1) {
      offset = countsPerPage * (page - 1);
    }

    const parsedResult = parseText(keyword, lang);

    if (
      Object.keys(parsedResult).length === 0 &&
      parsedResult.constructor === Object
    ) {
      res.status(200).json({});
      return;
    } else if (parsedResult.hasOwnProperty("text")) {
      const { text, version } = parsedResult;

      let result = await findVerseByKeyword(
        version,
        text,
        offset,
        countsPerPage
      );

      res.status(200).json({
        bible: result,
        mode: "include",
      });
      return;
    } else {
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

    switch (lang) {
      case "ko":
        Bible.findAll({
          attributes: [
            "book",
            "chapter",
            "verse",
            "sentence",
            "long_label",
            "short_label",
          ],
          where: {
            [Op.and]: [
              { book: book + 1 },
              { chapter },
              {
                verse: verseOption,
              },
            ],
          },
        }).then((bible) => {
          res.status(200).json({
            bible,
            mode: "range",
          });
        });
        break;
      case "en":
        BibleKJV.findAll({
          attributes: ["book", "chapter", "verse", "sentence"],
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
              model: Key, // Book

              attributes: ["n"],
            },
          ],
        }).then((bible) => {
          const data = bible.map((el) => {
            const dataToUpdate = el.dataValues;
            dataToUpdate["long_label"] = dataToUpdate.key.n;
            delete dataToUpdate["key"];
            return dataToUpdate;
          });

          res.status(200).json({
            bible: data,
            mode: "range",
          });
        });
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const findVerseByKeyword = async (version, text, offset, countsPerPage) => {
  let result;

  switch (version) {
    case "ko":
      result = await Bible.findAndCountAll({
        attributes: [
          "book",
          "chapter",
          "verse",
          "sentence",
          "long_label",
          "short_label",
        ],
        where: {
          sentence: { [Op.like]: "%" + text + "%" },
        },
        offset,
        limit: countsPerPage,
      });
      break;
    case "en":
      result = await BibleKJV.findAndCountAll({
        attributes: ["book", "chapter", "verse", "sentence"],
        where: {
          sentence: { [Op.like]: "%" + text + "%" },
        },
        offset,
        limit: countsPerPage,
      });
      break;
    default:
      break;
  }

  return result;
};

module.exports = { getphrase };
