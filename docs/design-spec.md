# Spécification visuelle — OCD Live

Toutes les valeurs numériques viennent de `docs/design-tokens.css` (calibrés sur meetsponsors). Structure et proportions uniquement : jamais de copie de textes, images, logo ou nom de la référence.

Mesures à 1280 px de large ; variante mobile 360 px indiquée.

## 1. Grille et conteneur
- Conteneur centré, 1120 px max, marges 24 px (20 px sous 640 px).
- Points de rupture : 640, 768, 1024, 1280.
- Espacement en multiples de 4 : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Rayon partout = 0.** Pas d’ombre.

## 2. Barre de navigation (soft)
- Hauteur 64 px, `sticky`, fond papier à 70 % + `backdrop-blur-xl`, bordure basse 1 px `--line` à 60 % d’opacité.
- Gauche : logo texte « OCD Live », Geist medium, 18 px.
- Centre : liens Comment ça marche / Packages / Programme / Recrutement (14 px, 500, gap 32, couleur `--ink-muted`, hover `--ink`).
- Droite : bouton « Réserver » outline (`border-ink`, fond transparent) → fill encre au hover, hauteur 40 px, **rectangulaire**.
- Mobile : logo + Réserver + menu plein écran soft (fond papier/95 + blur, filets discrets).

## 3. Hero
```
┌──────────────────────────┬─────────────────────┐
│ Titre display (gauche)   │ Vidéo 16:9          │  grille 2 cols, gap 56–64
│ Lead + preuve mono       │ poster + play 64 px │  texte left-aligned
└──────────────────────────┴─────────────────────┘
┌────────── mode-a ────────┬─────── mode-b ──────┐
│ LIVE À LOMÉ              │ LIVE À DISTANCE     │  pleine largeur
│ desc + prix + CTA noir   │ idem                │
└──────────────────────────┴─────────────────────┘
```
- Titre clamp ~40→76 px (adapté à une demi-largeur).
- Vidéo : charge **au clic seulement** ; `brand.video` dans `site.ts`. Sans `src` : placeholder « Présentation Bovane ».
- Animation unique : titre → lead/vidéo → blocs CTA, fondu + 8 px, décalage 80 ms, 400 ms total.
- Mobile : texte → vidéo → blocs empilés.

## 4. Bandeau de chiffres
- Trois chiffres display colorés (bleu / vert / encre) + libellés mono 14 px.
- Séparateurs filet 1 px. Padding vertical ~48 px. Mobile : empilé.

## 5. « En 30 secondes »
- Titre display. Trois colonnes bordées (pas de vidéo autoplay) : Réserver / Passer en live / Être contacté.
- Si une vidéo arrive plus tard : 16:9, charge au clic seulement.

## 6. Blocs feature (fond sombre)
- Fond `--dark-bg`. Titres display blancs multi-lignes. Texte `--dark-body`.
- Alternance texte / panneau `--dark-surface` bordé `--dark-rule`, ratio 4:3.
- Mobile : panneau sous le texte.

## 7. Programme (aperçu)
- Titre display. Trois cartes outline 1 px : date mono, business, catégorie · mode, CTA « Me rappeler ».
- Lien « Voir tout le programme ». État vide : invitation à réserver.

## 8. Packages
- Titre display. Grille 3 ; bouton « Voir les 6 packages » déplie. Mobile : scroll horizontal snap, cartes 300 px.
- Carte normale : bordure `--line`, fond papier. Mise en avant : fond `--dark-bg`, bordure 2 px encre, pastille « Le plus choisi ».
- Prix display + FCFA + hint EUR mono. Liste avantages + coche. CTA 48 px rectangulaire.

## 9. Recrutement
- Deux colonnes : titre display + paragraphe + Postuler ; carte qualités (Parler / Convaincre / Vendre) filetés. Pas de diplôme.

## 10. FAQ
- Titre display à gauche. Accordéon à droite, filets 1 px, min-height 64 px, icône +/−. Ouverture 150 ms.

## 11. Appel final
- Titre « CHOISIS TON LIVE. » puis reprise des deux blocs vert/bleu pleine largeur.

## 12. Pied de page
- Fond `--dark-bg`, colonnes Réserver / Découvrir / Contact, mono pour meta. Pas de FAB WhatsApp si numéro vide.

## 13. Parcours `/reserver` (calendrier Google-style)
```
┌─ Titre display + lead ──────────────────────────────────────┐
│ RÉSERVE TON CRÉNEAU.                                        │
├─ Filtres sticky soft ───────────────────────────────────────┤
│ Mode · Package · Semaine ◀ ▶ · Plage horaire · Libres only │
├────────────────────────────┬────────────────────────────────┤
│ Vue semaine (65 %)         │ Récap sticky (35 %)            │
│ colonnes jours × heures    │ mode, package, slot, prix      │
│ rose = libre · gris = pris │ [Continuer]                    │
└────────────────────────────┴────────────────────────────────┘
```
- Ouverture 9 h–20 h (Lomé), pas de 30 min. Marge 15 min après chaque live.
- Créneaux : `--slot-free` / `--slot-free-strong` (hover) / `--slot-taken` / `--slot-selected`.
- Légende sous la grille. Heure locale du client + rappel « à Lomé ».
- Étapes URL : `?step=mode|package|date|business|payment|done`.
- Mobile : un jour à la fois, filtres en chips, récap barre basse.
- Paiement démo simulé. Pas de Supabase dans cette vague.

## 14. `/programme` (consultation publique)
- **Pas une réservation** : liste des lives déjà planifiés (vendeurs confirmés).
- Titre display + lead. Barre de filtres **compacte** (1 ligne) : recherche, date, mode, catégorie.
- Liste chronologique ; détail dépliable + page `/programme/[slug]`.
- CTA vendeur en bas seulement : lien vers `/reserver`.

## 15. Vitrine `/v/[slug]`
- Page publique d’un vendeur après live (consentement requis).
- Contenu : nom, catégorie, description, offre, WhatsApp, ville, créneau si connu, galerie (placeholders démo).
- QR code (bordure 1 px) pointant vers l’URL de la vitrine + hint « À afficher en boutique ».
- 404 si slug inconnu ou vitrine masquée.

## 16. Admin `/admin` (démo pitch)
- Accès : `/admin/connexion` → bouton « Entrer en démo » (cookie `ocd_admin_demo`). Pas dans la nav publique ; lien discret pied de page.
- Shell : nav latérale desktop (220 px) / onglets scrollables mobile ; fond papier, filets `--line`, pas d’ombre.
- Pages cœur : tableau de bord (KPI + 5 prochains lives), réservations (filtre + actions simulées), calendrier semaine + blocages, packages éditables en local, vendeurs (toggle vitrine).
- Stubs : candidatures, réglages.
- Tableaux → cartes sous 768 px. Toast « Simulé — démo » sur les actions.
