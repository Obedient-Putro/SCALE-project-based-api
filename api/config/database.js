import sequelize from "sequelize";

export const db = new sequelize('sql6500598', 'sql6500598', 'Ve5f2K8RZS', {
    host: "sql6.freemysqlhosting.net",
    dialect: "mysql"
});