import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Demande = sequelize.define("Demande", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_destinataire_user: {
    type: DataTypes.INTEGER,
    references: "User", // <<< Note, its table's name, not object name
    referencesKey: "id", // <<< Note, its a column name
  },
  id_receveur_user: {
    type: DataTypes.INTEGER,
    references: "User", // <<< Note, its table's name, not object name
    referencesKey: "id", // <<< Note, its a column name
  },
  statut: {
    type: DataTypes.STRING,
    defaultValue: "En attente",
  },
});

export default Demande;
