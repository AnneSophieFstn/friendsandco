import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function getAllUser(req, res) {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur: ",
      error,
    });
  }
}

async function createUser(req, res) {
  try {
    const saltRounds = 10;
    //
    if (req.query.name || req.query.email || req.query.password) {
      const createUser = await UserModel.create({
        name: req.query.name,
        email: req.query.email,
        password: bcrypt.hashSync(req.query.password, saltRounds),
      });
    }

    return res.status(200).json({ message: "Utilisateur ajouté avec succès" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.query;

    if (!req.query.email || !req.query.password) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations!" });
    }

    const user = await UserModel.findOne({ where: { email: req.query.email } });

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

export { getAllUser, createUser, signIn };
