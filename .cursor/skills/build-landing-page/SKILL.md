---
name: build-landing-page
description: Construire la landing page complète d'OCD Live (hero à deux cartes, chiffres, vidéo, blocs, programme, packages, recrutement, FAQ, pied de page). À utiliser dès qu'on parle de page d'accueil, hero, sections, packages affichés, FAQ ou navigation du site, même si la demande ne dit pas « landing ».
---

# Construire la landing page

## Avant de commencer
1. Lis `docs/design-spec.md` (sections 1 à 12) et `docs/design-tokens.css`.
2. Lis `.cursor/rules/04-copywriting-fr.mdc` pour les textes.
3. Vérifie que `src/config/site.ts` existe (marque, contacts, chiffres, WhatsApp). Sinon, crée-le avec des valeurs de démo clairement commentées `// DEMO : à remplacer`.

## Étapes
1. **Fondations** : `globals.css` importe les tokens ; police via `next/font` ; mapping Tailwind des tokens (`bg`, `ink`, `line`, `accent`, `rounded-card`).
2. **Layout** : navigation sticky + pied de page + bouton WhatsApp flottant.
3. **Sections**, dans `src/components/sections/`, une par fichier : `Hero`, `StatsBand`, `HowItWorksVideo`, `FeatureBlocks`, `ProgrammePreview`, `PackagesGrid`, `RecruitmentBand`, `Faq`, `FinalCta`.
4. **Données** : les packages viennent de la base (`packages` actifs, triés), avec repli sur `site.ts` si la base est vide. Le programme vient des créneaux confirmés à venir, sans données personnelles (nom du business et catégorie uniquement).
5. **Liens** : les cartes du hero mènent à `/reserver?mode=onsite` et `/reserver?mode=remote`. Le bouton d'un package mène à `/reserver?package=<slug>`.
6. **Métadonnées** : titre, description, Open Graph, favicon, JSON-LD `Organization`.

## Critères de réussite
- La page se lit en 5 secondes : qui, quoi, que faire (choisir un des deux boutons).
- Aucune section n'utilise une couleur ou un rayon qui ne vient pas des tokens.
- Score Lighthouse mobile : performance ≥ 90, accessibilité ≥ 95.
- À 360 px : aucun défilement horizontal, cartes empilées, zones tactiles ≥ 44 px.
- Un seul mouvement orchestré (hero), le reste répond à une action.

## Pièges à éviter
- Chiffres d'audience inventés sans les marquer comme démo.
- Vidéo qui se charge avant le clic.
- Plusieurs boutons principaux visibles en même temps.
