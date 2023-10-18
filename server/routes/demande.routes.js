import express from "express";

import {
  getDemandeAmisRecu,
  createDemande,
  getDemandeAmisEnvoyer,
  getAmis,
} from "../controller/demande.controller.js";

const DemandeRoutes = express.Router();
//
DemandeRoutes.get("/demandes-recu", getDemandeAmisRecu);
DemandeRoutes.post("/demandes", createDemande);
DemandeRoutes.get("/demandes-envoye", getDemandeAmisEnvoyer);
DemandeRoutes.get("/amis", getAmis);

export default DemandeRoutes;
