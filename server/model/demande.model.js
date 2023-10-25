import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import User from "./user.model.js";

const Demande = sequelize.define("Demande", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_destinataire_user: {
    type: DataTypes.INTEGER,
    references: {
      model: "User", // Nom de la table du modèle "User"
      key: "id", // Nom de la colonne d'ID dans le modèle "User"
    },
  },
  id_receveur_user: {
    type: DataTypes.INTEGER,
    references: {
      model: "User", // Nom de la table du modèle "User"
      key: "id", // Nom de la colonne d'ID dans le modèle "User"
    },
  },
  statut: {
    type: DataTypes.STRING,
    defaultValue: "Attente",
  },
});

Demande.belongsTo(User, {
  foreignKey: "id_receveur_user",
  as: "Receveur",
});

Demande.belongsTo(User, {
  foreignKey: "id_destinataire_user",
  as: "Destinataire",
});

export default Demande;
