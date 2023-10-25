# Application sous Nodejs et React

## Description

Créer une application sécurisée qui permet de gérer la gestion des tickets c'est-à-dire les réparation à faire sur un véhicule. Ici on prend le cas d'un garage comme la **sogecore**.

## Fonctionnalités

- Enregistrement utilisateur (**BACKEND//FRONTEND - OK**)
- Connexion utilisateur (**BACKEND//FRONTEND - OK**)
- Page accueil (si pas connecté redirige vers login) (**OK**)
- Ajouter les autres utilisateurs en amis (**BACKEND//FRONTEND - OK**)
- Voir les demandes en cours que j'ai faite (**BACKEND//FRONTEND - OK**)
- Voir les demandes que les autres ont fait (pouvoir l'accepter ou refuser) (**BACKEND//FRONTEND - OK**)
- Voir les amis (**BACKEND//FRONTEND - OK**)

- Supprimer les amis
- Revoir le token
- Refresh after CRUD

**TOUTE LA PARTIE AUTHENTIFICATION N'EST PAS OPERATIONNEL SUR LE FRONT**

## Technologies

**Backend:**

- Node Js

**Base de données:**

- MYSQL

**Frontend:**

- React

## Installer et exécuter le projet

- Dans le fichier server:
  $ npm install
  $ npm start

  Dans le dossier ;env, vous devez modifier les infromations en fonction de votre base de données

- Dans le fichier client:
  $ npm install

  Dans le fichier src/services/axiosConfig.js, vous devez remplacer les informations en fonction de vos informations a vous.

  Ensuite:
  $ npm start
