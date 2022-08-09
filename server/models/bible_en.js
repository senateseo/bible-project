module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "bible_en",
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
      t_KJV: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
      },
      t_NIV: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
      },
    },
    {
      tableName: "t_en",
      timestamps: false,
    }
  );
};
