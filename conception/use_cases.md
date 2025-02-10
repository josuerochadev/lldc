# 📌 Use Cases - Site vitrine La Lunetterie du Coin

## **🎯 Cas d'utilisation 1 : Prise de rendez-vous**
### **Acteurs** : Client, Opticien, Système
### **Préconditions** : Le client accède à la page de réservation et sélectionne un créneau disponible.
### **Scénario principal** :
1. Le client consulte les créneaux disponibles.
2. Il choisit une date et un horaire.
3. Il remplit ses informations personnelles (nom, email, téléphone, choix de notification : email/SMS/both).
4. Il soumet la demande de rendez-vous.
5. Le système enregistre la demande en attente.
6. L’opticien reçoit une notification de nouvelle demande.
7. L’opticien accepte ou refuse la demande de RDV.
8. Le système met à jour le statut du RDV.
9. Le client reçoit une confirmation ou un refus.
10. Un rappel automatique est envoyé 24h avant le rendez-vous.
11. Un deuxième rappel **optionnel** peut être envoyé **2h avant le rendez-vous**, selon les préférences définies par l’opticien.

### **Scénario alternatif** :
- **Créneau indisponible** → Le client est informé et doit choisir un autre créneau.

---

## **🎯 Cas d'utilisation 2 : Modification d'un rendez-vous par l'opticien**
### **Acteurs** : Opticien, Client, Système
### **Préconditions** : Un rendez-vous confirmé existe.
### **Scénario principal** :
1. L’opticien modifie la date ou l’heure d’un RDV.
2. Le système met à jour le statut du RDV en base de données.
3. Le client est informé de la modification par email/SMS.
4. Le client peut **accepter ou refuser** la modification via un lien dans l’email/SMS.
5. Si le client **accepte**, aucune action supplémentaire n'est requise.
6. Si le client **refuse** la modification, le RDV peut être automatiquement annulé et le client reçoit un message l’invitant à prendre un nouveau RDV. L’opticien est notifié.

### **Scénario alternatif** :
- **Le client refuse la modification** → Il suit le lien pour annuler et reprogrammer un RDV.

---

## **🎯 Cas d'utilisation 3 : Annulation d'un rendez-vous**
### **Acteurs** : Opticien, Client, Système
### **Préconditions** : Un rendez-vous confirmé existe.
### **Scénario principal** :
1. L’opticien décide d’annuler un RDV.
2. Le système met à jour le statut du RDV en base de données.
3. Le client reçoit une notification d’annulation.
4. Si un client refuse une modification, le statut du RDV passe automatiquement à ‘Annulé par le client’ et une notification est envoyée à l’opticien.

### **Scénario alternatif** :
- **Le client veut annuler son RDV** → Un **lien d’annulation automatique** est inclus dans l’email/SMS de confirmation.
- **Si le client clique sur le lien d’annulation**, le RDV est marqué comme **“Annulé par le client”** et l’opticien est notifié.
- **L’opticien annule suite à la demande du client** → Il suit le processus d’annulation normal.

---

## **🎯 Cas d'utilisation 4 : Blocage de créneaux par l'opticien**
### **Acteurs** : Opticien, Système
### **Préconditions** : L’opticien accède à l’interface de gestion.
### **Scénario principal** :
1.	L’opticien sélectionne une plage horaire spécifique ou une période entière à bloquer.
2.	Il définit une heure de début et une heure de fin pour un blocage précis (ex. : 14h-16h).
3.	Le système enregistre l’indisponibilité en base de données.
4. Les créneaux bloqués ne sont plus affichés aux clients.
5. **Affichage distinct des créneaux bloqués et réservés** sur l’interface de gestion.
6. L’opticien peut **bloquer une journée complète en un clic**.

---

## **🎯 Cas d'utilisation 5 : Formulaire de contact**
### **Acteurs** : Visiteur, Opticien, Système
### **Préconditions** : Le visiteur accède à la page de contact.
### **Scénario principal** :
1. Le visiteur remplit le formulaire avec son message et ses coordonnées.
2. Il soumet le formulaire.
3. Le système envoie le message par email à l’opticien.
4. Un captcha est utilisé pour éviter les spams.
5. Une **limitation de 1 requête par minute** est mise en place pour éviter le spam.
6. Un **filtrage des emails suspects ou spam** est effectué avant transmission.
7. Une confirmation de soumission est affichée.

---

## **🎯 Cas d'utilisation 6 : Rappels automatiques**
### **Acteurs** : Client, Opticien, Système
### **Préconditions** : Un rendez-vous confirmé est enregistré.
### **Scénario principal** :
1. 24h avant le rendez-vous, le système exécute un processus automatique.
2. Un email/SMS est envoyé au client pour lui rappeler son RDV.
3. Un email/SMS est envoyé à l’opticien avec le récapitulatif des rendez-vous du lendemain.
4. **Un second rappel 2h avant le RDV** peut être envoyé **si l’opticien l’active** dans ses paramètres.
