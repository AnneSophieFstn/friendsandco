import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Demande from "./demande.model.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le nom ne peut pas être vide.",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: "L'adresse email ne peut pas être vide.",
      },
      isEmail: {
        args: true,
        msg: "Veuillez entrer une adresse email valide.",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le mot de passe ne peut pas être vide.",
      },
    },
  },
});

//User.hasMany(Demande);

export default User;
