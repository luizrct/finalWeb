import { DataTypes, Model } from "sequelize"
import db from "../db.js"

class Finance extends Model {}

Finance.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false            
        }
    },
    {
        sequelize: db,
        modelName: "Finances",
        tableName: "finance"
    }
)

export default Finance