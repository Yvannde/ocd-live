# OCD Live

Plateforme de réservation de lives de vente (Bovane Group, Lomé).

**Vague actuelle** : démo pitch (UI mock) pour présenter le produit — pas encore branchée sur Supabase.

## Démarrage

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Parcours démo (5 minutes)

1. **Landing** `/` — hero dual Lomé / distance, packages, aperçu programme.
2. **Programme** `/programme` — lives planifiés, détail, pas de réservation ici.
3. **Réserver** `/reserver` — calendrier mock + paiement simulé.
4. **Vitrine** `/v/saveurs-de-tokoin` — page vendeur + QR code.
5. **Admin** `/admin` → bouton **Entrer en démo** (cookie local, pas d’Auth réelle).

Lien discret vers l’admin : pied de page → « Espace équipe ».

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · données seed locales · schéma Supabase prêt dans `supabase/` (non branché).

## Config

- Marque, WhatsApp, packages : `src/config/site.ts`
- Textes FR : `src/config/copy.fr.ts`
- Programme / vitrines / admin seed : `src/config/programme.ts`, `vitrines.ts`, `demo-admin.ts`
- URL publique (QR, sitemap) : `NEXT_PUBLIC_SITE_URL` dans `.env.example`

## Suite (hors démo pitch)

Supabase Auth + données réelles, notifications, paiements, recrutement complet — `docs/prompts-cursor.md` étapes 3, 6–10.
