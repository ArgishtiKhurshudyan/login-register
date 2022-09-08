import sequelize from "../db.js";
import {DataTypes} from "sequelize";

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    required: true
  },
  password: {
    type: DataTypes.STRING,
    required: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    default: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER"
  }
})


export default User