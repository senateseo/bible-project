const { Op } = require("sequelize");
const { Bible } = require("../models");
const { BibleKJV } = require("../models");
const { Key } = require("../models");

const getphrase = async (req, res) => {
  try {
    const { book, chapter, from, to, version } = req.body;

    // Version: 0 - 개역개정, 1-King James Version
    let verseOption = to
      ? {
          [Op.between]: [from, to],
        }
      : {
          [Op.eq]: from,
        };

    switch (version) {
      case 0:
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
              { book },
              { chapter },
              {
                verse: verseOption,
              },
            ],
          },
        }).then((bible) => {
          res.status(200).json({
            bible,
          });
        });
        break;
      case 1:
        BibleKJV.findAll({
          attributes: ["book", "chapter", "verse", "sentence"],
          where: {
            [Op.and]: [
              { book },
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

const getPhraseWithKeyword = async (req, res) => {
  try {
    const { q, version } = req.query;

    const keywords = q.split("+");

    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { getphrase, getPhraseWithKeyword };
