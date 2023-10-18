import DemandeModel from "../model/demande.model.js";
import UserModel from "../model/user.model.js";

async function getAmis(req, res) {
  // AVOIR LES DEMANDES D'AMIS QUE LES PERSONNES NOUS A ENVOYÉS
  try {
    const amis = await DemandeModel.findAll({
      where: { statut: "Amis", id_receveur_user: 1 },
    });

    const amisWithName = await Promise.all(
      amis.map(async (ami) => {
        const user = await UserModel.findByPk(ami.id_receveur_user);
        return {
          ...ami.toJSON(),
          user,
        };
      })
    ); //test

    res.status(200).json(amisWithName);
  } catch (error) {
    console.log(error);
  }
}
async function getDemandeAmisRecu(req, res) {
  // AVOIR LES DEMANDES D'AMIS QUE LES PERSONNES NOUS A ENVOYÉS
  try {
    const demandes = await DemandeModel.findAll({
      where: { id_receveur_user: 1, statut: "En attente" },
    });

    const demandesWithName = await Promise.all(
      demandes.map(async (demandes) => {
        const user = await UserModel.findByPk(demandes.id_receveur_user);
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
  try {
    const demandes = await DemandeModel.findAll({
      where: { id_destinataire_user: 1 },
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
      statut: "En Attente",
    });

    res.status(200).json({ message: "Demande d'amitié créée avec succès" });
  } catch (error) {
    console.log(error);
  }
}

export { getDemandeAmisRecu, createDemande, getDemandeAmisEnvoyer, getAmis };
