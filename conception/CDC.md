# 📌 Cahier des charges - Site vitrine La Lunetterie du Coin

## 1. Présentation du projet

**Nom du projet** : Site vitrine de La Lunetterie du Coin

**Client** : La Lunetterie du Coin

**Contexte** : La Lunetterie du Coin est un magasin d’optique indépendant souhaitant moderniser sa communication et améliorer la gestion des rendez-vous en ligne. Actuellement, les clients doivent appeler ou se rendre en boutique pour prendre rendez-vous, ce qui limite la flexibilité du service. Ce projet vise à digitaliser le processus en proposant une plateforme intuitive et efficace.

**Objectif** :
- Offrir une vitrine en ligne pour le magasin.
- Permettre aux clients de prendre rendez-vous pour un examen de vue.
- Automatiser la gestion des rendez-vous avec des confirmations par email/SMS.
- Fournir à l’opticien un espace de gestion des rendez-vous.
- Permettre à l’opticien de bloquer des créneaux ou des journées non disponibles.
- Mettre en place des rappels automatiques aux patients et à l’opticien.
- Ajouter une option d'annulation automatique via un lien dans l’email/SMS.
- Permettre au client d'accepter ou refuser une modification de RDV via un lien.

**Public cible** :
- Clients du magasin (particuliers recherchant un opticien).  
- Potentiels nouveaux clients souhaitant découvrir les services.  
- L’opticien pour gérer et consulter les rendez-vous.  

---

## 2. Expérience utilisateur

- **Navigation fluide et intuitive**, en suivant les maquettes Figma.
- **Design épuré et ergonomique**, respectant l’identité visuelle de La Lunetterie du Coin.
- **Formulaire de prise de rendez-vous simplifié** avec un calendrier interactif.
- **Affichage clair des offres et services** avec des appels à l’action bien visibles.
- **Affichage distinct des créneaux bloqués et réservés**.
- **Possibilité pour l’opticien de bloquer une journée complète en un clic**.

---

## 3. Périmètre fonctionnel

### 🎯 Fonctionnalités principales
- ✅ **Page d’accueil** : Présentation du magasin et de ses services.
- ✅ **Carte des services** : Détails sur les prestations proposées (examens de vue, conseils, etc.).
- ✅ **Prise de rendez-vous** :
  - Sélection d’un créneau disponible.
  - Confirmation et rappel (email et SMS).
  - Ajout au calendrier (Google, Outlook, Apple).
  - Interface dédiée pour que l’opticien puisse consulter et gérer les rendez-vous.
  - L’opticien peut **bloquer un créneau ou une journée** pour indiquer une indisponibilité.
  - **Annulation automatique possible via un lien dans l’email/SMS**.
  - **Possibilité d’accepter/refuser une modification via un lien dans l’email/SMS**.
  - Le client peut **refuser une modification proposé par l'opticien** en annulant le RDV. Une notification sera envoyée à l’opticien.
- ✅ **Formulaire de contact** : Envoi de messages au magasin avec **captcha** et **filtrage anti-spam**.

### 📌 Fonctionnalités exclues
- 🚫 Vente en ligne (pas de e-commerce).
- 🚫 Gestion des stocks ou des produits.
- 🚫 Compte utilisateur (pas de connexion requise côté client).

---

## 4. Notifications et rappels

- **Envoi automatique d’un email/SMS** à l’opticien pour chaque demande de rendez-vous.
- **Confirmation envoyée au patient** après validation par l’opticien.
- **Rappels automatiques** envoyés aux patients et à l’opticien avant chaque rendez-vous.
- **Possibilité d’activer un second rappel 2h avant le rendez-vous** (opticien).
- Dans le cas d'un client qui refuse une modification, il reçoit une **invitation à prendre un nouveau RDV**.

---

## 5. Outils de suivi et d’analyse

- **Google Analytics ou Plausible** pour suivre le trafic sur le site.
- **Suivi des conversions** pour la prise de rendez-vous et les contacts.
- **Optimisation SEO** avec un Sitemap, des balises méta et des URLs propres.

---

## 6. Gestion des erreurs et logs

- **Surveillance des erreurs back-end** avec Winston ou Pino.
- **Suivi des erreurs en production** avec Sentry.
- **Logs détaillés** pour suivre les événements importants (demandes de rendez-vous, erreurs système).
- **Rate-limiting du formulaire de contact** (1 requête par minute).

---

## 7. Architecture générale

### Stack Technique
- **Backend :**
  - Node.js avec Express.js (TypeScript)
  - Prisma pour les interactions avec PostgreSQL
  - Zod pour la validation des données
  - Sécurité : Helmet, Rate-Limit, CORS
  - Logs : Winston ou Pino
  - Tests : Jest, Supertest
  - Documentation API : Swagger
- **Frontend :**
  - React.js avec TypeScript
  - TailwindCSS pour le styling
  - Gestion de l’état : React Query
  - Formulaires : React Hook Form
- **Base de données :**
  - PostgreSQL
  - Prisma pour les migrations et interactions
- **Services tiers :**
  - Emails : SendGrid
  - SMS : Twilio

### 📌 Schéma du fonctionnement global
- Un visiteur peut voir les services et prendre rendez-vous.
- Le rendez-vous est stocké en base de données.
- Un email/SMS est envoyé automatiquement pour confirmation.
- Un fichier `.ics` est généré pour ajout au calendrier.
- L’opticien peut accéder à un espace d’administration pour consulter et modifier les rendez-vous.
- L’opticien peut bloquer des créneaux ou journées non disponibles.
- Des rappels sont envoyés aux patients et à l’opticien avant les rendez-vous.

### 📌 API REST : Routes principales

| Méthode  | Endpoint              | Description                             |
| -------- | --------------------- | --------------------------------------- |
| `GET`    | `/services`           | Liste des services du magasin           |
| `POST`   | `/appointments`       | Prise de rendez-vous                    |
| `GET`    | `/appointments/:id`   | Récupérer un rendez-vous                |
| `DELETE` | `/appointments/:id`   | Annuler un rendez-vous                  |
| `POST`   | `/contact`            | Envoi d'un message                      |
| `GET`    | `/admin/appointments` | Consultation des rendez-vous (opticien) |
| `POST`   | `/admin/block-slot`   | Bloquer un créneau de rendez-vous       |
| `GET`    | `/admin/reminders`    | Gestion des rappels de rendez-vous      |

---

## 8. Déploiement et maintenance

📌 **Déploiement** :
- Front-end : **Vercel / Netlify**
- Back-end : **Railway / Render / VPS**
- Base de données : **Hébergée sur un service cloud PostgreSQL**

📌 **Maintenance** :
- Suivi des logs et erreurs via **LogRocket ou Sentry**.
- Mises à jour régulières des dépendances.

---

## 9. Budget et maintenance

📌 **Budget estimé** :
- Hébergement (back, front, DB) : coût à estimer selon l’option choisie.
- Frais éventuels pour l’envoi de SMS (Twilio ou autre service).
- Maintenance et mises à jour : prévoir un suivi technique.

📌 **Coût de maintenance** :
- Vérification des mises à jour de sécurité.
- Support et corrections en cas de problème technique.

---

## 10. Structure des pages du site

📌 **Pages principales** :
- Accueil
- Les offres
- Les services
- Le concept
- Les réseaux
- Contact
- Administration

---
