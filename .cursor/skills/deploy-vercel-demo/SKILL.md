---
name: deploy-vercel-demo
description: Déployer la démo d'OCD Live sur Vercel (variables d'environnement, base Supabase, cron, domaine, vérifications avant d'envoyer le lien). À utiliser quand l'utilisateur veut mettre le site en ligne, envoyer un lien de test à l'influenceur, configurer Vercel, les variables d'environnement ou les tâches planifiées.
---

# Déployer la démo sur Vercel

## Avant le déploiement
1. `npm run build` et `npm run lint` passent.
2. Le dépôt est sur GitHub, sans fichier `.env.local` ni clé secrète (vérifie l'historique).
3. Le skill `pixel-polish-review` a été passé sur la landing, le parcours de réservation et la page de confirmation.

## Variables d'environnement (Vercel → Settings → Environment Variables)
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `EMAIL_FROM`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `ADMIN_EMAILS`, `PAYMENT_PROVIDER=simulated`, `NEXT_PUBLIC_SITE_URL`, `CRON_SECRET`.

## Tâches planifiées (`vercel.json`)
```json
{ "crons": [
  { "path": "/api/cron/expire-holds", "schedule": "*/5 * * * *" },
  { "path": "/api/cron/reminders", "schedule": "*/15 * * * *" }
] }
```
Chaque route vérifie l'en-tête `Authorization: Bearer $CRON_SECRET`. Vérifie dans la documentation Vercel actuelle les limites de fréquence du plan utilisé.

## Après le déploiement
- Fais une réservation de démo complète depuis un téléphone, en 4G.
- Vérifie : email reçu, message Telegram reçu, réservation visible dans l'admin, créneau grisé ensuite dans le calendrier.
- Vérifie les aperçus de partage (WhatsApp, Facebook) avec l'image OG.
- Prépare un compte admin pour l'influenceur et un accès de démonstration.

## Pour la présentation à l'influenceur
- Utilise un lien court et propre (domaine ou sous-domaine du type `ocdlive.vercel.app`).
- Le bandeau « Mode démo » reste visible sur la page de paiement simulé.
- Utilise le message de `docs/pitch-message.md`.
