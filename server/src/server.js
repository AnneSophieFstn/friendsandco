import express from "express";
import cors from "cors";
import DemandeRoutes from "../routes/demande.routes.js";
import UserRoutes from "../routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use(UserRoutes);
app.use(DemandeRoutes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
