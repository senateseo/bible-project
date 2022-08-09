module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "key_en",
    {
      b: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      n: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
      },
      t: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
      },
      g: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "k_en",
      timestamps: false,
    }
  );
};
