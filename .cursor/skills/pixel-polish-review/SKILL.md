---
name: pixel-polish-review
description: Contrôle visuel et qualité d'une page ou d'un composant d'OCD Live par rapport à docs/design-spec.md et aux tokens (captures à 360, 768, 1280 et 1536 px, espacements, police, contrastes, états). À utiliser après chaque étape de construction et avant tout déploiement, ou quand l'utilisateur parle de finitions, de fidélité au design, de « pixel perfect » ou de comparaison avec la référence.
---

# Contrôle visuel « au pixel près »

## Méthode
1. Lance le site en local (`npm run dev`).
2. Prends des captures avec Playwright aux largeurs **360, 768, 1280 et 1536 px** pour la page contrôlée :
```ts
// scripts/screenshots.ts
import { chromium } from 'playwright';
const widths = [360, 768, 1280, 1536];
const url = process.argv[2] ?? 'http://localhost:3000';
const browser = await chromium.launch();
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `screenshots/${w}.png`, fullPage: true });
}
await browser.close();
```
3. Compare chaque capture à la section correspondante de `docs/design-spec.md`.

## Liste de contrôle
**Typographie** : la police chargée est bien celle de `--font-sans` (onglet réseau, pas de police de secours visible) ; tailles et interlignes conformes aux tokens ; pas de ligne de plus de 70 caractères ; pas de mot orphelin dans les titres.

**Espacements** : tous les espaces sont des multiples de 4 px ; marges de section 96 px (64 px mobile) ; padding de carte 28 px ; gouttière de grille 24 px.

**Composants** : rayons identiques pour un même type de composant ; bordures 1 px `--line` ; boutons de 48 px (40 px en navigation) ; un seul bouton principal visible par écran ; survols de 150 ms.

**Couleurs** : seulement les tokens ; un seul accent ; contraste AA (4,5:1 pour le texte courant) vérifié sur le texte secondaire et sur les boutons.

**Responsive** : aucun défilement horizontal à 360 px ; zones tactiles ≥ 44 px ; images sans déformation ; tableaux de l'admin repliés en cartes sous 768 px.

**États** : chargement, vide, erreur, focus clavier, désactivé.

**Mouvement** : seul le hero s'anime au chargement ; `prefers-reduced-motion` coupe tout.

**Performance** : `next/image` partout, LCP < 2,5 s, aucun décalage de mise en page (CLS < 0,1).

## Sortie attendue
Un court rapport : ce qui est conforme, la liste numérotée des écarts (élément, valeur actuelle, valeur attendue), puis les corrections appliquées. Corrige les écarts avant de conclure, sans modifier `docs/design-tokens.css` sauf décision explicite de l'utilisateur.
