# 📌 Cahier des Charges Fonctionnel (CDCF) - Site vitrine La Lunetterie du Coin

## 1. Introduction

**Nom du projet** : Site vitrine de La Lunetterie du Coin  
**Client** : La Lunetterie du Coin  
**Objectif** : Décrire précisément le fonctionnement détaillé du site, les interactions entre les utilisateurs et les fonctionnalités, ainsi que les spécifications techniques nécessaires pour le développement.  

---

## 2. Parcours Utilisateur

### 🎯 **1. Prise de rendez-vous**
1. L’utilisateur arrive sur la page des services et clique sur « Prendre rendez-vous ».
2. Un modal s'affiche avec un calendrier et les créneaux disponibles.
3. L’utilisateur sélectionne un créneau et remplit ses informations (nom, email, téléphone, choix de notification : email, SMS ou les deux).
4. Il soumet la demande de rendez-vous.
5. L’opticien reçoit une notification par email/SMS et peut **accepter** ou **refuser** le rendez-vous.
6. Une confirmation ou un refus est envoyé automatiquement au client.
7. Un rappel automatique est envoyé **24h avant le rendez-vous**.
8. Un second rappel **optionnel** peut être envoyé **2h avant le rendez-vous** si activé par l’opticien.
9. Le client peut **annuler son rendez-vous via un lien dans l’email/SMS**.

### 🎯 **2. Gestion des rendez-vous par l’opticien**
1. L’opticien se connecte à son interface d’administration.
2. Il consulte la liste des rendez-vous en attente.
3. Il peut **accepter, modifier ou annuler** un rendez-vous.
4. Toute modification entraîne l’envoi d’un message au patient.
5. Le patient peut **accepter ou refuser la modification** via un lien reçu par email/SMS.
6. Si le client **refuse la modification**, le RDV est automatiquement annulé avec le statut ‘Annulé par le client’ et l’opticien est notifié. Le client est invité à prendre un nouveau RDV via un lien.
7. Si le client refuse la modification, il peut **annuler son rendez-vous et en réserver un nouveau**.
8. Le système permet à l’opticien de **bloquer des plages horaires** spécifiques en définissant une heure de début et une heure de fin. Ces créneaux sont exclus des créneaux disponibles pour les clients.
9. Les créneaux bloqués et réservés sont affichés **de manière distincte**.
10. L’opticien peut **bloquer une journée complète en un clic**.

### 🎯 **3. Formulaire de contact**
1. L’utilisateur remplit un formulaire avec son message.
2. Une notification est envoyée à l’opticien par email.
3. Ajout d’un **captcha léger** pour éviter le spam/trolling.
4. **Limitation des soumissions à 1 requête par minute**.
5. **Filtrage des messages suspects ou spam** avant transmission.

---

## 3. Architecture Fonctionnelle

### 📌 **Base de Données** (PostgreSQL)
- **Table `appointments` (rendez-vous)**
  - `id` (INT, PRIMARY KEY)
  - `client_name` (TEXT)
  - `email` (TEXT)
  - `phone` (TEXT)
  - `appointment_date` (DATETIME)
  - `status` (TEXT: `en attente`, `confirmé`, `annulé`, `modifié`)
  - `preferred_notification` (TEXT: `email`, `sms`, `both`)
  - `optician_notes` (TEXT, facultatif)

- **Table `blocked_slots` (créneaux bloqués)**
  - `id` (INT, PRIMARY KEY)
  - `start_date` (DATETIME)
  - `end_date` (DATETIME, facultatif, pour une période bloquée)
  - `reason` (TEXT, facultatif)

### 📌 **Endpoints API REST**

| Méthode  | Endpoint              | Description                       |
| -------- | --------------------- | --------------------------------- |
| `POST`   | `/appointments`       | Prendre un rendez-vous            |
| `GET`    | `/appointments/:id`   | Récupérer un rendez-vous          |
| `PATCH`  | `/appointments/:id`   | Modifier un rendez-vous           |
| `DELETE` | `/appointments/:id`   | Annuler un rendez-vous            |
| `POST`   | `/contact`            | Envoyer un message                |
| `GET`    | `/admin/appointments` | Liste des rendez-vous (opticien)  |
| `POST`   | `/admin/block-slot`   | Bloquer un créneau ou une période |
| `GET`    | `/admin/reminders`    | Gestion des rappels               |

- Une route pour la liste des services serta peut etre nécessaire.
- Le refus d’une modification par le client entraîne un appel automatique au serveur pour annuler le RDV.

---

## 4. Règles Métier

✅ Un rendez-vous ne peut être pris que si le créneau est disponible.  
✅ L’opticien est le seul à pouvoir **accepter, modifier ou annuler** un rendez-vous.  
✅ Un rendez-vous **modifié** doit être **confirmé ou refusé** par le client via un lien email/SMS.  
✅ L’opticien peut bloquer **un créneau spécifique ou une période de plusieurs jours**.  
✅ Les rappels sont envoyés **24h avant** le rendez-vous.  
✅ Un second rappel **optionnel** peut être envoyé **2h avant** si activé par l’opticien.  
✅ La prise de rendez-vous est possible jusqu’à **48h avant** la date choisie.  
✅ Un client peut annuler son RDV **via un lien d’annulation automatique** dans l’email/SMS.  
✅ Si un client refuse une modification, le RDV passe automatiquement à ‘Annulé par le client’ et l’opticien est notifié.

---

## 5. Notifications & Rappels

📌 **Emails** :
- Confirmation de rendez-vous.
- Modification ou annulation.
- Rappel automatique (opticien & patient).
- Lien d’annulation de RDV pour le client.
- Lien d’acceptation ou de refus d’une modification de RDV.

📌 **SMS** :
- Confirmation.
- Rappel 24h avant le rendez-vous.
- Rappel 2h avant le rendez-vous (optionnel).

---

## 6. Sécurité & Gestion des Erreurs

🔹 **Validation des entrées utilisateur** pour éviter les erreurs (ex. téléphone valide).  
🔹 **Protection des routes sensibles** avec JWT pour l’administration.  
🔹 **Logs d’erreurs** pour surveiller l’application (Sentry, Winston).  
🔹 **Chiffrement des données sensibles** (emails, téléphones).  
🔹 **Ajout d’un captcha léger sur le formulaire de contact** pour éviter les spams.  
🔹 **Rate-limiting sur le formulaire de contact** (1 requête par minute).  
🔹 **Filtrage des emails suspects ou spam** avant transmission.  
🔹 **Renforcement global de la sécurité** (protection contre injections SQL, validation côté client et serveur).  

---

## 7. Accessibilité & Éco-conception

🔹 Respect des normes WCAG pour une navigation inclusive.  
🔹 Optimisation des images et du code pour réduire l’empreinte carbone.  
🔹 Réduction du nombre de requêtes pour améliorer la performance.  

---
