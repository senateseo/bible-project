module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "bible_en",
    {
      idx: {
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
      v_KJV: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "t_en",
      timestamps: false,
    }
  );
};
