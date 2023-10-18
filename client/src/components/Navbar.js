import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navBar">
      <div className="connexion">
        <Link to="/connexion">Connexion</Link>
      </div>
      <div className="stocks">
        <Link to="/">Accueil</Link>
      </div>
    </div>
  );
};

export default Navbar;
