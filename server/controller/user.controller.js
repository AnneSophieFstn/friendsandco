import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../model/user.model.js";
import Demande from "../model/demande.model.js";

async function getUserNotFriend(req, res) {
  try {
    /*
     * 1) Liste les demandes qui comprend l'utilisateur connecter
     * 2) On parcours la liste de l'étape 1 est on retourne les id des utilisateurs qui on recu ou envoye une demande
     * 3) On parcours la liste de tout les utilisateurs et on exclus l'id de la personne connecter ainsi que les id de l'étape 2.
     */

    const userId = req.params.id; // Remplacez 1 par l'ID de l'utilisateur connecté

    // 1) Liste les demandes qui comprend l'utilisateur connecter

    const userDemandeCreer = await Demande.findAll({
      where: {
        [Op.or]: [
          {
            id_destinataire_user: userId,
          },
          {
            id_receveur_user: userId,
          },
        ],
      },
    });

    // 2) On parcours la liste de l'étape 1 est on retourne les id des utilisateurs qui on recu ou envoye une demande

    const usersInDemandes = userDemandeCreer.map((demande) => {
      return demande.id_destinataire_user == userId
        ? demande.id_receveur_user
        : demande.id_destinataire_user;
    });

    // 3) On parcours la liste de tout les utilisateurs et on exclus l'id de la personne connecter ainsi que les id de l'étape 2.
    const utilisateursNonAmis = await User.findAll({
      where: {
        id: {
          [Op.ne]: userId, // Exclut l'utilisateur actuel
          [Op.notIn]: usersInDemandes, // Exclut les utilisateurs impliqués dans des demandes
        },
      },
    });

    return res.status(200).json(utilisateursNonAmis);
  } catch (error) {
    console.log(error);
  }
}

async function createUser(req, res) {
  console.log("createUser ok");
  try {
    const saltRounds = 10;
    //
    if (req.body.name || req.body.email || req.body.password) {
      const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Utilisateur ajouté avec succès" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations!" });
    }

    const user = await User.findOne({ where: { email: req.body.email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("connexion réussi", user);

      // Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // user
      return res.status(200).json({
        success: true,
        message: "Vous êtes connecté(e)",
        token,
        user,
      });
    }
    res.status(400).json("Identifiants invalides");
  } catch (error) {
    return res.status(500).json({
      message: "Erreur: ",
      error,
    });
  }
}

export { getUserNotFriend, createUser, signIn };
