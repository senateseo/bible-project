module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "key",
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
      tableName: "k_kr",
      timestamps: false,
    }
  );
};
