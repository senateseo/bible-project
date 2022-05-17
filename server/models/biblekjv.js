module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "biblekjv",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      book: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      verse: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sentence: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
      },
    },
    {
      tableName: "t_kjv",
      timestamps: false,
    }
  );
};
