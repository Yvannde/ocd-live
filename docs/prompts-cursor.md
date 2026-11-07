# Prompts Cursor, dans l'ordre

Colle chaque prompt dans le chat Cursor (mode Agent). Attends la fin, vérifie, lance `pixel-polish-review`, puis passe au suivant. Les règles de `.cursor/rules/` s'appliquent automatiquement.

---
## 1. Fondations
```
Lis AGENTS.md, docs/design-spec.md et docs/design-tokens.css.
Mets en place les fondations du projet : import des tokens dans globals.css, mapping Tailwind des tokens (bg, ink, ink-muted, line, accent, rounded-card), police via next/font avec la variable --font-sans, shadcn/ui initialisé, lucide-react, src/config/site.ts (voir docs/demo-seed-data.md) et src/config/copy.fr.ts.
Crée le layout global : navigation sticky, pied de page, bouton WhatsApp flottant.
Termine par le bilan demandé dans la règle de qualité.
```

## 2. Landing page
```
Utilise le skill build-landing-page.
Construis toute la landing page selon docs/design-spec.md sections 3 à 12, avec les textes de la règle 04-copywriting-fr. Branche les packages sur des données locales de repli (la base arrive à l'étape suivante).
```

## 3. Base de données
```
Utilise le skill setup-database-supabase.
Prépare l'intégration Supabase : clients serveur et navigateur, types, .env.example. Branche la landing sur les vues public_packages et public_programme avec repli sur les données locales si la base est vide.
Je m'occupe de créer le projet Supabase et d'exécuter schema.sql et seed.sql.
```

## 4. Parcours de réservation
```
Utilise le skill build-booking-flow.
Construis le parcours complet en 6 étapes avec calcul de disponibilités, retenue de 15 minutes, formulaire business validé avec Zod, upload des photos et page de confirmation avec ticket, fichier .ics et lien WhatsApp. Écris les tests listés dans le skill.
```

## 5. Vitrine vendeur et programme
```
Construis la page /v/[slug] (docs/design-spec.md section 14) avec QR code, et la page /programme avec filtre par mode et par catégorie. Les vendeurs sans consentement n'apparaissent nulle part.
```

## 6. Notifications et paiement
```
Utilise le skill notifications-and-payments.
Implémente notify() avec email (Resend), Telegram et journalisation, l'interface PaymentProvider avec SimulatedProvider, le webhook idempotent et les routes cron expire-holds et reminders protégées par CRON_SECRET.
```

## 7. Recrutement
```
Construis la page /recrutement et le formulaire de candidature : nom, téléphone, ville, message, et un pitch audio ou vidéo d'une minute maximum envoyé dans le bucket privé candidate-pitches. Texte : pas besoin de diplôme, il faut savoir parler, convaincre et vendre. Confirmation claire après envoi.
```

## 8. Administration
```
Utilise le skill build-admin-dashboard.
Construis l'espace admin complet : connexion par lien magique avec ADMIN_EMAILS, tableau de bord, réservations, calendrier avec blocages, packages modifiables, vendeurs avec export CSV, candidatures, réglages. Journalise les modifications dans audit_log.
```

## 9. Finitions
```
Utilise le skill pixel-polish-review sur la landing, /reserver (chaque étape), /v/[slug], /programme, /recrutement et /admin.
Corrige tous les écarts, passe en revue accessibilité, performance mobile, métadonnées (OG, favicon, sitemap, robots), pages 404 et erreur.
```

## 10. Déploiement
```
Utilise le skill deploy-vercel-demo.
Prépare vercel.json avec les crons, la checklist des variables d'environnement et un script de données de démo. Donne-moi la liste exacte des étapes à faire dans Vercel et Supabase.
```
