import React, { useState, useEffect } from "react";
import Home from "../Home";
import Login from "../Login";
import { getToken } from "../services/tokenConfig";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "../SignUp";

function Navbar() {
  const [token, setToken] = useState(getToken());

  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Login />} />
      <Route
        path="/connexion"
        element={token ? <Navigate to="/" /> : <Login />}
      />
      <Route path="/inscription" element={<SignUp />} />
    </Routes>
  );
}

export default Navbar;
