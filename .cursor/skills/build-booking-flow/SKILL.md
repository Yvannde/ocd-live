---
name: build-booking-flow
description: Construire le parcours de réservation en 6 étapes (mode, package, date et heure, infos business, paiement, confirmation), avec créneaux sans double réservation et fuseaux horaires. À utiliser pour tout ce qui touche à la réservation, au calendrier, aux créneaux, au formulaire vendeur, à l'acompte ou à la page de confirmation.
---

# Construire le parcours de réservation

## Avant de commencer
Lis `docs/design-spec.md` (section 13), `.cursor/rules/03-booking-domain.mdc` et `supabase/schema.sql`. La base doit exister (skill `setup-database-supabase`).

## Architecture
- Route `/reserver` avec `?step=mode|package|date|business|payment|done`. L'état du brouillon est conservé côté serveur (table `bookings` en `draft`) et un identifiant dans un cookie, pour qu'un rechargement ne fasse rien perdre.
- Composants dans `src/components/booking/` : `StepIndicator`, `ModeStep`, `PackageStep`, `DateTimeStep`, `BusinessStep`, `PaymentStep`, `Confirmation`, `SummaryCard`.
- Logique dans `src/lib/` : `availability.ts` (calcul des créneaux), `pricing.ts` (prix, acompte, conversion EUR), `time.ts` (UTC ↔ fuseau client).

## Étapes de construction
1. **Disponibilités** : fonction serveur `getAvailableSlots(date, durationMinutes)` qui part des horaires d'ouverture (`settings`), retire les créneaux actifs et les blocages, ajoute la marge de 15 minutes, renvoie des créneaux en UTC.
2. **Retenue du créneau** : à l'entrée de l'étape paiement, insère le créneau en `pending` avec `expires_at = now + 15 min`. Si la contrainte d'exclusion échoue, affiche « Ce créneau vient d'être pris. Choisis un autre horaire. » et ramène à l'étape date.
3. **Expiration** : tâche planifiée (Vercel Cron toutes les 5 minutes) qui passe les `pending` expirés en `expired` et libère leurs créneaux.
4. **Formulaire business** : react-hook-form + Zod (même schéma côté serveur). Photos envoyées vers Supabase Storage (6 max, 5 Mo chacune, JPEG/PNG/WebP, redimensionnées).
5. **Paiement** : `PaymentProvider` (voir skill `notifications-and-payments`). Démo : `SimulatedProvider`.
6. **Confirmation** : génère le ticket (numéro `OCD-AAAA-NNNN`), fichier `.ics` à télécharger, lien `wa.me` pré-rempli, lien vers la vitrine.

## Tests à écrire
- Deux réservations simultanées du même créneau : une seule réussit.
- Un package de 4 h ne propose pas de créneau qui dépasse l'heure de fermeture.
- Un client à Douala voit 11 h 00 pour un live à 10 h 00 à Lomé.
- Une retenue expirée libère le créneau.
- Le total et l'acompte sont des entiers corrects (30 % arrondi au multiple de 100 FCFA supérieur).

## Critères de réussite
- Le bouton retour du navigateur fonctionne à chaque étape.
- Parcours complet réalisable avec un pouce sur un écran de 360 px.
- Aucun champ n'est demandé deux fois.
