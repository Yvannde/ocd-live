# Capture de référence — meetsponsors.com

Mesures prises le **2026-11-07** à partir de :
- la capture plein écran `docs/Capture d’écran_…_meetsponsors.com.jpeg` (1763 × 9260)
- le CSS live du site (`--ms2-*` dans le HTML)

On reprend **structure, proportions, polices, couleurs, rayons**. On ne copie ni textes, ni images, ni logo, ni nom.

## Tableau mesuré

| Élément | Valeur mesurée |
|---|---|
| Police display (titres) | **Big Shoulders Display**, weight **800**, Google Fonts / self-host woff2 |
| Police corps | **Geist**, ui-sans-serif, system-ui |
| Police mono (labels UI, placeholders) | **Geist Mono** |
| H1 display | MAJUSCULES condensées, interligne ~0.92, très large (clamp ~48→120 px) |
| H2 sections | Même famille display 800, un peu plus petit |
| Texte courant | Geist 16 px, muted `#45453F` |
| Fond de page (papier) | `#F6F6F3` |
| Texte principal (encre) | `#0E0E0C` |
| Texte secondaire | `#2E2E2A` / muted `#45453F` |
| Bordures soft | `#D4D3CD` (1 px) |
| Vert (CTA mode A) | `#13784A` |
| Bleu (CTA mode B) | `#1D4ED8` |
| Fond section sombre | `#0E0E0C` |
| Texte sur sombre | `#F2F0EA` / body `#CFCCC4` |
| Vert / bleu sur sombre | `#4CC88A` / `#86A6FF` |
| Largeur conteneur | ~1120 px |
| Nav | ~64 px, logo gauche, liens centre, CTA droit noir rectangulaire |
| Boutons / inputs | Hauteur ~48 px, **coins carrés** |
| Rayon des cartes | **0** (la ref force `border-radius: 0`) |
| Ombres | Aucune (plat) |
| Hero | Titre display centré/gauche massif + **deux blocs pleine largeur** vert/bleu côte à côte |
| Alternance | Sections papier ↔ noir franc, sans dégradé |
| Pricing | 2 cartes : outline 1 px vs fond noir plein |
| FAQ | Titre display à gauche, accordéon filet 1 px à droite, icône `+` |
| Footer | Bandeau noir, colonnes mono/Geist, reprise des 2 CTA vert/bleu au-dessus |

## Mapping OCD Live

| Référence | Chez nous |
|---|---|
| Bloc vert « Pour un talent ? » | **Live à Lomé** (`--mode-a`) |
| Bloc bleu « Pour une marque ? » | **Live à distance** (`--mode-b`) |
| Cartes pricing Creator / Agent | Packages (outline vs mis en avant noir) |
| Bandeau chiffres colorés | Lives / vendeurs / vues |
| Sections sombres feature | « Comment ça marche », preuves, programme |

## Règle police

Big Shoulders Display et Geist / Geist Mono sont libres (Google Fonts / Vercel Fontsource). Les charger via `next/font` (display 800 uniquement pour les titres).

## Valider

Comparer OCD Live et la capture à 1280 px et 360 px, côte à côte. Skill `pixel-polish-review` ensuite.
