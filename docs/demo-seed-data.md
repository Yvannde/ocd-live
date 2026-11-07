# Données de démonstration

Les valeurs ci-dessous sont des **exemples** (voir `supabase/seed.sql`). Rien ne vient de l'influenceur, à part ce qu'il a dit dans la vidéo : lives d'1 h 30 autour de 15 000 FCFA (il a aussi cité 20 000), un package de 4 h moins cher par heure, un package avec annonce par Bovane, un package mensuel, début le 1er décembre.

| Package | Durée | Sessions | Prix démo (FCFA) |
|---|---|---|---|
| Flash | 1 h 30 | 1 | 15 000 |
| Demi-journée | 4 h | 1 | 35 000 (8 750 par heure) |
| Annonce (mis en avant) | 1 h 30 | 1 | 30 000 |
| Duo | 1 h 30 | 2 | 27 000 |
| Mensuel | 1 h 30 | 8 | 99 000 |
| VIP | 4 h | 1 | 75 000 |

Réglages de départ : ouverture 9 h à 20 h (heure de Lomé), créneaux toutes les 30 minutes, marge de 15 minutes, acompte 30 %, retenue de 15 minutes, lancement le 1er décembre 2026.

## Config de marque (`src/config/site.ts`)
```ts
export const brand = {
  name: 'OCD Live',                // à confirmer : la transcription audio est peu fiable
  owner: 'Bovane Group',
  channel: 'House of Challenge',
  studioCity: 'Lomé, Togo',
  whatsapp: '',                    // numéro à fournir
  stats: { lives: 0, vendors: 0, views: 0 }, // DEMO : à remplacer par les vrais chiffres
};
```
Tant que les vrais chiffres ne sont pas fournis, le bandeau de chiffres affiche des valeurs de démonstration, ou se masque si `stats` est à zéro.

## Vendeurs fictifs pour le programme (démo uniquement)
Trois vendeurs d'exemple avec `consent_showcase = true` : une cuisine (alimentation, Lomé), une boutique de mode (mode, Douala, à distance), une marque de soins (beauté, Lomé). Noms inventés, aucune coordonnée réelle.
