import React, { useState } from "react";
import urlAPI from "./services/axiosConfig";
import { Route, Router, Navigate, Routes } from "react-router-dom"; // Pour la redirection après la connexion
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Login from "./Login";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher des messages d'erreur
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    urlAPI({
      url: "/inscription",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.data.success) {
          setName("");
          setEmail("");
          setPassword("");
          setRedirect(true);
        } else {
          // Si la connexion échoue, affichez un message d'erreur
          setError("Remplir tout les champs svp!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return redirect ? (
    <Routes>
      <Route exact path="/connexion" element={<Login />} />
    </Routes>
  ) : (
    <form onSubmit={handleSubmit} className="registerForm">
      <TextField
        type="text"
        label="Nom/Prenom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="registerInput"
      />
      <TextField
        type="email"
        label="Adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="registerInput"
      />
      <TextField
        type="password"
        label="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="registerInput"
      />
      <div className="btnSignUpContainer">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          className="btnSignUp"
        >
          {" "}
          S'inscrire
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
