# OCD Live — brief projet (à lire en premier)

**Produit** : plateforme web où des vendeurs réservent un créneau de live de vente sur le compte de l'influenceur (Bovane Group, Lomé, Togo), soit en présentiel au studio de Lomé, soit à distance avec une assistante qui les accompagne depuis Lomé.

**Pourquoi ça existe** : le vrai produit vendu est de la visibilité auprès de l'audience de l'influenceur (placer son produit, son numéro, son adresse). Le site doit donner envie de réserver, pas seulement enregistrer une réservation.

**Utilisateurs**
- Vendeur (client) : majoritairement sur téléphone, connexion parfois lente, WhatsApp comme canal principal. Au Togo, au Cameroun, en Afrique francophone et dans la diaspora.
- Équipe Bovane (admin) : gère le planning, les paiements, la régie et l'assistante.
- Candidat(e) : postule au poste d'assistante, à l'éloquence, sans exigence de diplôme.

**Langue** : français d'abord. Prévoir l'anglais plus tard, sans le construire maintenant.

**Parcours client** : Mode (Lomé / distance) → Package → Date et heure → Infos du business → Paiement (acompte) → Confirmation.

**Règles non négociables**
1. Mobile d'abord (tester à 360 px).
2. Une seule source de vérité pour le design : `docs/design-tokens.css` et `docs/design-spec.md`.
3. Une seule source pour la marque et les chiffres : `src/config/site.ts`.
4. Les créneaux ne peuvent jamais se chevaucher (contrainte en base, pas seulement dans l'interface).
5. Toutes les heures sont stockées en UTC et affichées dans le fuseau du client.
6. Prix en FCFA (XOF), avec équivalent EUR affiché à titre indicatif.
7. Ne jamais copier textes, images, vidéos, logo ou nom du site de référence : on reprend la structure et les mesures, pas le contenu.

Détails : voir `.cursor/rules/` et `.cursor/skills/`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
