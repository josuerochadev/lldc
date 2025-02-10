# 📌 Dictionnaire des données - Site vitrine La Lunetterie du Coin

## **Table : `Clients`**

**Description** : Contient les informations des clients qui prennent des rendez-vous.

| **Colonne**   | **Type**      | **Contraintes**          | **Description**                                          |
|---------------|---------------|--------------------------|----------------------------------------------------------|
| `id`          | SERIAL        | PRIMARY KEY              | Identifiant unique du client.                           |
| `first_name`  | VARCHAR(100)  | NOT NULL                 | Prénom du client.                                       |
| `last_name`   | VARCHAR(100)  | NOT NULL                 | Nom de famille du client.                               |
| `email`       | VARCHAR(255)  | NOT NULL, UNIQUE         | Adresse email du client (utilisée pour les notifications). |
| `phone`       | VARCHAR(20)   | NOT NULL                 | Numéro de téléphone du client (utilisé pour les notifications par SMS). |

---

## **Table : `Appointments`**

**Description** : Gère les rendez-vous pris par les clients auprès de l’opticien.

| **Colonne**            | **Type**      | **Contraintes**          | **Description**                                          |
|-------------------------|---------------|--------------------------|----------------------------------------------------------|
| `id`                   | SERIAL        | PRIMARY KEY              | Identifiant unique du rendez-vous.                      |
| `client_id`            | INT           | NOT NULL, FOREIGN KEY    | Référence l’identifiant unique du client dans la table `Clients`. |
| `appointment_date`     | TIMESTAMP     | NOT NULL                 | Date et heure du rendez-vous.                           |
| `status`               | VARCHAR(20)   | CHECK (`status` IN ...)  | Statut du rendez-vous (`pending`, `confirmed`, `cancelled`). |
| `preferred_notification` | VARCHAR(20) | CHECK (`preferred_notification` IN ...) | Préférences de notification (`email`, `sms`, `both`). |
| `optician_notes`       | TEXT          | NULLABLE                 | Notes ajoutées par l’opticien pour le rendez-vous.      |

---

## **Table : `BlockedSlots`**

**Description** : Stocke les plages horaires ou périodes indisponibles définies par l’opticien.

| **Colonne**   | **Type**      | **Contraintes**          | **Description**                                          |
|---------------|---------------|--------------------------|----------------------------------------------------------|
| `id`          | SERIAL        | PRIMARY KEY              | Identifiant unique du créneau bloqué.                   |
| `start_date`  | TIMESTAMP     | NOT NULL                 | Début de la plage horaire ou période bloquée.           |
| `end_date`    | TIMESTAMP     | NOT NULL                 | Fin de la plage horaire ou période bloquée.             |

---

## **Table : `Notifications`**

**Description** : Stocke les notifications envoyées pour les rendez-vous.

| **Colonne**         | **Type**      | **Contraintes**          | **Description**                                          |
|----------------------|---------------|--------------------------|----------------------------------------------------------|
| `id`                | SERIAL        | PRIMARY KEY              | Identifiant unique de la notification.                  |
| `appointment_id`    | INT           | NOT NULL, FOREIGN KEY    | Référence l’identifiant unique du rendez-vous dans la table `Appointments`. |
| `notification_date` | TIMESTAMP     | NOT NULL                 | Date et heure d’envoi de la notification.               |
| `type`              | VARCHAR(20)   | CHECK (`type` IN ...)    | Type de notification (`rappel`, `confirmation`, `modification`). |

---

## **Table : `ContactMessages`**

**Description** : Stocke les messages envoyés par les visiteurs via le formulaire de contact.

| **Colonne**         | **Type**      | **Contraintes**          | **Description**                                          |
|----------------------|---------------|--------------------------|----------------------------------------------------------|
| `id`                | SERIAL        | PRIMARY KEY              | Identifiant unique du message.                          |
| `full_name`         | VARCHAR(200)  | NOT NULL                 | Nom complet de l’expéditeur.                            |
| `email`             | VARCHAR(255)  | NOT NULL                 | Adresse email de l’expéditeur.                          |
| `phone`             | VARCHAR(20)   | NULLABLE                 | Numéro de téléphone de l’expéditeur (optionnel).        |
| `message_content`   | TEXT          | NOT NULL                 | Contenu du message envoyé par l’expéditeur.             |
| `sent_at`           | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Date et heure d’envoi du message.                      |

---

### Notes supplémentaires :
1. **Indexes** :
   - Ajout des index sur les colonnes souvent utilisées dans les requêtes (`appointment_date`, `start_date`, etc.).
2. **Contraintes** :
   - Toutes les relations sont sécurisées par des clés étrangères avec des actions sur suppression (`ON DELETE CASCADE`).
3. **Extensions possibles** :
   - Possibilité d'ajouter d'autres colonnes ou relations en fonction des besoins futurs.