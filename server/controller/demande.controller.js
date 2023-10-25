import { Op } from "sequelize";
import DemandeModel from "../model/demande.model.js";
import UserModel from "../model/user.model.js";

async function getAmis(req, res) {
  // AVOIR LES DEMANDES D'AMIS QUE LES PERSONNES NOUS A ENVOYÉS
  try {
    const userId = req.params.id; // ID de l'utilisateur connecté

    // Utilisez Sequelize pour effectuer une jointure entre les tables "Users" et "Demande d'amis"
    const amis = await DemandeModel.findAll({
      where: {
        statut: "Amis",
        [Op.or]: [
          { id_destinataire_user: userId },
          { id_receveur_user: userId },
        ],
      },
      include: [
        {
          model: UserModel,
          as: "Receveur", // Utilisez l'alias correct ici
          attributes: ["id", "name", "email"], // Inclure les attributs que vous souhaitez
        },
        {
          model: UserModel,
          as: "Destinataire", // Utilisez l'alias correct ici
          attributes: ["id", "name", "email"], // Inclure les attributs que vous souhaitez
        },
      ],
    });

    //console.log("amis: ", amis);

    res.status(200).json(amis);
  } catch (error) {
    console.log(error);
  }
}
async function getDemandeAmisRecu(req, res) {
  // AVOIR LES DEMANDES D'AMIS QUE LES PERSONNES NOUS A ENVOYÉS

  const userId = req.params.id;

  try {
    //console.log("getDemandeAmisRecu: ", req);
    const demandes = await DemandeModel.findAll({
      where: { id_receveur_user: userId, statut: "Attente" },
    });

    const demandesWithName = await Promise.all(
      demandes.map(async (demandes) => {
        const user = await UserModel.findByPk(demandes.id_destinataire_user);
        return {
          ...demandes.toJSON(),
          user,
        };
      })
    ); //test

    res.status(200).json(demandesWithName);
  } catch (error) {
    console.log(error);
  }
}

async function getDemandeAmisEnvoyer(req, res) {
  console.log("getDemandeAmisEnvoyer: ", req.params.id);

  const userId = req.params.id;

  try {
    const demandes = await DemandeModel.findAll({
      where: { id_destinataire_user: userId, statut: "Attente" },
    });

    const demandesWithName = await Promise.all(
      demandes.map(async (demande) => {
        const user = await UserModel.findByPk(demande.id_receveur_user);
        return {
          ...demande.toJSON(),
          user,
        };
      })
    ); //test

    res.status(200).json(demandesWithName);
  } catch (error) {
    console.log(error);
  }
}

async function createDemande(req, res) {
  try {
    // J'ai l'id de la personne qui est connecter (DESTINATAIRE)
    // L'id du USER de la personne qui RECOIT la demande
    // Statut "En Attente"

    const createDemande = await DemandeModel.create({
      id_destinataire_user: req.body.id_destinataire_user,
      id_receveur_user: req.body.id_receveur_user,
      statut: "Attente",
    });

    res.status(200).json({ message: "Demande d'amitié créée avec succès" });
  } catch (error) {
    console.log(error);
  }
}

async function accepterDemande(req, res) {
  try {
    /* console.log(req.params);
    console.log(req.body);
    console.log(req.query.id); */
    const accepterDemande = await DemandeModel.update(
      {
        id_destinataire_user: req.body.id_destinataire_user,
        id_receveur_user: req.body.id_receveur_user,
        statut: req.body.statut,
      },
      { where: { id: req.query.id } }
    );
    res.status(200).json({ message: "Demande d'amitié accepter avec succès" });
  } catch (error) {
    console.log(error);
  }
}

async function refuserDemande(req, res) {
  try {
    /* console.log(req.params);
    console.log(req.body);
    console.log(req.query.id); */
    const refuserDemande = await DemandeModel.update(
      {
        id_destinataire_user: req.body.id_destinataire_user,
        id_receveur_user: req.body.id_receveur_user,
        statut: req.body.statut,
      },
      { where: { id: req.query.id } }
    );
    res.status(200).json({ message: "Demande d'amitié refuser avec succès" });
  } catch (error) {
    console.log(error);
  }
}

export {
  getDemandeAmisRecu,
  createDemande,
  getDemandeAmisEnvoyer,
  getAmis,
  accepterDemande,
  refuserDemande,
};
