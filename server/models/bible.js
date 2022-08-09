module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "bible",
    {
      idx: {
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
      verse: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      v_gaejung: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
      },
      v_hangeul: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
      },
    },
    {
      tableName: "t_kr",
      timestamps: false,
    }
  );
};
