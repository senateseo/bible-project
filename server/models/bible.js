module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "bible",
    {
      idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      book: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paragraph: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sentence: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
      },
      testament: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      long_label: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      short_label: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "bible2",
      timetamps: false,
    }
  );
};
