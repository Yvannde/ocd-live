---
name: setup-database-supabase
description: Mettre en place la base de données Supabase d'OCD Live (schéma, contrainte anti-chevauchement des créneaux, sécurité par lignes, stockage des photos et pitchs, données de démo). À utiliser pour toute création de table, migration, politique d'accès, requête de disponibilité ou donnée de démonstration.
---

# Base de données

## Fichiers de référence
- `supabase/schema.sql` : schéma complet à exécuter dans l'éditeur SQL de Supabase.
- `docs/demo-seed-data.md` : packages, réglages et données de démonstration.

## Étapes
1. Crée un projet Supabase, récupère l'URL, la clé `anon` et la clé `service_role`. Place-les dans `.env.local` (jamais dans le dépôt) et documente-les dans `.env.example`.
2. Exécute `supabase/schema.sql`.
3. Crée les buckets de stockage : `vendor-photos` (public en lecture), `candidate-pitches` (privé).
4. Insère les données de départ à partir de `docs/demo-seed-data.md`.
5. Génère les types TypeScript (`supabase gen types typescript`) dans `src/types/database.ts`.

## Règles de sécurité
- Row Level Security activée sur toutes les tables.
- Lecture publique uniquement via les vues `public_packages` et `public_programme` (aucune donnée de contact).
- Les écritures publiques (réservation, candidature) passent par le serveur avec la clé `service_role`, jamais directement depuis le navigateur.
- La clé `service_role` n'est jamais importée dans un composant client.

## Contrainte essentielle
La table `booking_slots` porte une contrainte d'exclusion sur la plage horaire pour les créneaux actifs. C'est elle, pas l'interface, qui garantit qu'aucun créneau n'est réservé deux fois. Ne la contourne jamais.

## Critères de réussite
- Deux insertions simultanées de plages qui se chevauchent : la seconde échoue avec le code Postgres `23P01`, traduit en message utilisateur.
- Les vues publiques ne renvoient ni téléphone, ni adresse, ni email.
