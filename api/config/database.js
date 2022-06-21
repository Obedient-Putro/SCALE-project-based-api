import sequelize from "sequelize";

export const db = new sequelize('scale_db', 'root', 'learndb', {
    host: "localhost",
    dialect: "mysql"
});
