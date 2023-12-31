import React, { useState } from "react";
import urlAPI from "./services/axiosConfig";
import { Route, Router, Navigate, Routes } from "react-router-dom"; // Pour la redirection après la connexion
import { setToken, setUserId } from "./services/tokenConfig";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Home from "./Home";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher des messages d'erreur
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    urlAPI({
      url: "/connexion",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.data.success) {
          setToken(response.data.token);
          setUserId(response.data.user.id);
          setRedirect(true);
          setEmail("");
          setPassword("");
        } else {
          // Si la connexion échoue, affichez un message d'erreur
          setError("Adresse email ou mot de passe incorrect.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return redirect ? (
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  ) : (
    <form onSubmit={handleSubmit} className="loginForm">
      <TextField
        type="email"
        label="Adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="loginInput"
      />
      <TextField
        type="password"
        label="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="loginInput"
      />
      <div className="btnLoginContainer">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          className="btnLogin"
        >
          {" "}
          Se connecter
        </Button>
      </div>
    </form>
  );
}
export default Login;
