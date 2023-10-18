# Application sous Nodejs et React

## Description

Créer une application sécurisée qui permet de gérer la gestion des tickets c'est-à-dire les réparation à faire sur un véhicule. Ici on prend le cas d'un garage comme la **sogecore**.

## Fonctionnalités

- Enregistrement utilisateur (**BACKEND - OK**)
- Connexion utilisateur (**BACKEND - OK**)
- Page accueil (si pas connecté redirige vers login) (**NON**)
- Ajouter les autres utilisateurs en amis (**BACKEND - OK // FRONTEND uniquement en BRUT**)
- Voir les demandes en cours que j'ai faite (**BACKEND - OK // FRONTEND uniquement en BRUT**)
- Voir les demandes que les autres ont fait (pouvoir l'accepter ou refuser) (**BACKEND - OK // FRONTEND uniquement en BRUT**)
- Voir les amis (**BACKEND - OK // FRONTEND uniquement en BRUT**)

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
