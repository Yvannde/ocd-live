---
name: build-admin-dashboard
description: Construire le tableau de bord d'administration d'OCD Live (réservations, calendrier, packages et prix, vendeurs, candidatures, réglages, statistiques). À utiliser pour tout ce qui concerne l'espace équipe Bovane, la gestion des créneaux, la modification des prix ou l'export des contacts.
---

# Construire l'administration

## Avant de commencer
Lis `docs/design-spec.md` (section 15) et `.cursor/rules/03-booking-domain.mdc`.

## Accès
- Supabase Auth par lien magique (email). Seules les adresses listées dans `ADMIN_EMAILS` (variable d'environnement) accèdent à `/admin`. Middleware qui redirige tout le reste vers `/admin/connexion`.
- Toutes les actions admin passent par des Server Actions qui revérifient l'accès côté serveur.

## Pages
1. **Tableau de bord** : réservations du mois, chiffre d'affaires confirmé, taux de remplissage, lives à venir (5 prochains).
2. **Réservations** : tableau filtrable (statut, mode, date), recherche par nom ou téléphone, détail avec historique, boutons « Confirmer le paiement », « Annuler », « Marquer absent », « Écrire sur WhatsApp ».
3. **Calendrier** : vue semaine et mois, bloc de blocage de plage, affectation de la régie et de l'assistante à chaque live à distance.
4. **Packages** : création, modification, activation, ordre d'affichage, prix. Un changement de prix ne touche pas les réservations existantes (le prix est copié dans la réservation).
5. **Vendeurs** : liste, vitrine publique activable ou masquable, export CSV des contacts.
6. **Candidatures** : liste, lecture du pitch audio ou vidéo, statuts (nouvelle, à contacter, retenue, refusée).
7. **Réglages** : horaires d'ouverture, pourcentage d'acompte, durée de retenue, numéro WhatsApp, destinataires des notifications, textes des chiffres de la landing.

## Critères de réussite
- Chaque tableau a états chargement, vide et erreur.
- Les actions destructrices demandent une confirmation qui dit ce qui va se passer.
- L'admin est utilisable sur téléphone (tableaux en cartes sous 768 px).
- Chaque modification de prix ou de statut est tracée (qui, quand, ancienne valeur).
