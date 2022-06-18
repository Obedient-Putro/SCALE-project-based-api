import sequelize from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = sequelize;

export const Users = db.define('users', {
    username:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
}, {
    freezeTableName:true
});

export const Workspace = db.define('workspace', {
    email:{
        type: DataTypes.STRING
    },
    workspaceName:{
        type: DataTypes.STRING
    },
    workspacePath:{
        type: DataTypes.TEXT
    },
});
