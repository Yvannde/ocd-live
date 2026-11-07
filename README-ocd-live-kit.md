# Kit Cursor — plateforme de réservation « OCD Live »

Ce kit cadre tout le projet pour que Cursor produise un site cohérent, du design aux règles métier, sans que tu aies à tout réexpliquer à chaque prompt.

## Installation
1. Crée le projet : `npx create-next-app@latest ocd-live --ts --tailwind --app --eslint`
2. Décompresse ce kit **à la racine du projet** (les dossiers `.cursor/`, `docs/`, `supabase/` et le fichier `AGENTS.md` doivent s'y trouver).
3. Ouvre le dossier dans Cursor. Les fichiers `.cursor/rules/*.mdc` sont lus automatiquement.
4. Les skills sont dans `.cursor/skills/*/SKILL.md`. Si ta version de Cursor ne les détecte pas, ils fonctionnent aussi comme documents de référence : cite-les dans le chat avec `@.cursor/skills/build-landing-page/SKILL.md`.

## Ordre de travail
1. **Fais `docs/reference-capture.md`** (15 minutes) : tu mesures la vraie police, les vraies couleurs et les vraies tailles du site de référence avec les outils de développement du navigateur, puis tu reportes les valeurs dans `docs/design-tokens.css`. C'est ce qui donne le rendu « au pixel près ». Sans cette étape, Cursor utilise les valeurs par défaut du kit (Geist, palette neutre + bleu cobalt).
2. Suis les prompts de `docs/prompts-cursor.md`, dans l'ordre.
3. À la fin de chaque étape, lance le skill `pixel-polish-review`.
4. Déploie avec le skill `deploy-vercel-demo`, puis envoie le message de `docs/pitch-message.md`.

## À confirmer avant d'envoyer la démo
- **Le nom exact** : la transcription audio écrit « OCD Live », ce qui ressemble à une erreur de transcription. Le nom est centralisé dans `src/config/site.ts` (`brand.name`), un seul endroit à changer.
- **Les prix** : les prix de `docs/demo-seed-data.md` sont des exemples. Il a cité 15 000 et 20 000 FCFA pour 1h30. Tout est modifiable depuis l'admin.
- **Les chiffres d'audience** : les valeurs de démo sont des exemples. Remplace-les par les vrais chiffres avant toute mise en ligne réelle.

## Contenu
- `AGENTS.md` : résumé du projet que tout agent lit en premier.
- `.cursor/rules/` : règles toujours actives (projet, design, architecture, métier, rédaction, qualité).
- `.cursor/skills/` : procédures par tâche (landing, réservation, admin, base de données, notifications et paiements, contrôle visuel, déploiement).
- `docs/` : spécification visuelle, tokens CSS, méthode de capture de la référence, prompts, données de démo, message de présentation.
- `supabase/schema.sql` : schéma de base de données prêt à exécuter.
