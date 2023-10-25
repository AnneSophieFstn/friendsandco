import express from "express";

import {
  getDemandeAmisRecu,
  createDemande,
  accepterDemande,
  refuserDemande,
  getDemandeAmisEnvoyer,
  getAmis,
} from "../controller/demande.controller.js";

const DemandeRoutes = express.Router();
//
DemandeRoutes.get("/demandes-recu/:id", getDemandeAmisRecu);
DemandeRoutes.post("/demandes", createDemande);
DemandeRoutes.put("/accepter", accepterDemande);
DemandeRoutes.put("/refuser", refuserDemande);
DemandeRoutes.get("/demandes-envoye/:id", getDemandeAmisEnvoyer);
DemandeRoutes.get("/amis/:id", getAmis);

export default DemandeRoutes;
