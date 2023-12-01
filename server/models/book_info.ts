import { Sequelize } from "sequelize";

export const BookInfo = (sequelize: Sequelize, DataTypes: any) => {
    return sequelize.define(
        "book_info",
        {
            order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            title_short: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title_full: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            abbreviation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            otnt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            chapters: {
                type: DataTypes.INT,
                allowNull: false,
            },
        }
    )
}