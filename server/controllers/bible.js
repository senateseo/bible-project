const { Op } = require("sequelize");
const { Bible } = require("../models");

const getphrase = async (req, res) => {
  try {
    const { book, chapter, from, to } = req.body;

    let paragraphOption = to
      ? {
          [Op.between]: [from, to],
        }
      : {
          [Op.eq]: from,
        };
    Bible.findAll({
      attributes: [
        "book",
        "chapter",
        "paragraph",
        "sentence",
        "long_label",
        "short_label",
      ],
      where: {
        [Op.and]: [
          { book },
          { chapter },
          {
            paragraph: paragraphOption,
          },
        ],
      },
    }).then((bible) => {
      res.status(200).json({
        bible,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { getphrase };
