import axios from "axios";
import React, { useEffect, useState } from "react";
import urlAPI from "./services/axiosConfig";
import { FaEdit } from "react-icons/fa";

function Home() {
  const [users, setUser] = useState([]);
  const [demandesAmisRecu, setDemandesAmisRecu] = useState([]);
  const [demandesAmisEnvoyer, setDemandesAmisEnvoyer] = useState([]);
  const [amis, setAmis] = useState([]);

  const demandeAmis = (id) => {
    urlAPI({
      url: "/demandes",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id_destinataire_user: 1,
        id_receveur_user: id,
        statut: "En attente",
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await urlAPI.get("/users");
      setUser(response.data);
    };

    const getDemandeAmisRecu = async () => {
      const response = await urlAPI.get("/demandes-recu");
      setDemandesAmisRecu(response.data);
    };

    const getDemandeAmisEnvoye = async () => {
      const response = await urlAPI.get("/demandes-envoye");
      setDemandesAmisEnvoyer(response.data);
    };

    const getAmis = async () => {
      const response = await urlAPI.get("/amis");
      setAmis(response.data);
    };

    getUser();
    getAmis();
    getDemandeAmisRecu();
    getDemandeAmisEnvoye();
  }, []);
  return (
    <>
      <header>
        <h1>AJOUTER EN AMIS</h1>
      </header>

      <section>
        <h2>Demander en amis ?</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <button onClick={() => demandeAmis(user.id)}>
                      Envoyer demande d'ami
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Demande en attente...</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demandesAmisRecu.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.id}</td>
                <td>{demande.user.name}</td>
                <td>{demande.statut}</td>
                <td>
                  <button onClick={() => console.log(demande.id)}>
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Demande d'ami envoyer...</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandesAmisEnvoyer.map((demandesAmisEnvoyer) => (
              <tr key={demandesAmisEnvoyer.id}>
                <td>{demandesAmisEnvoyer.id}</td>
                <td>{demandesAmisEnvoyer.user.name}</td>
                <td>{demandesAmisEnvoyer.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Mes amis !</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {amis.map((amis) => (
              <tr key={amis.id}>
                <td>{amis.user.name}</td>
                <td>{amis.statut}</td>
                <td>
                  <button onClick={() => console.log(amis.id)}>
                    Retirer de mes amis
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Home;
