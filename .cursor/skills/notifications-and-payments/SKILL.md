---
name: notifications-and-payments
description: Brancher les notifications (email client, Telegram équipe, lien WhatsApp, rappels) et l'abstraction de paiement (acompte Mobile Money simulé puis réel). À utiliser pour tout envoi de message, rappel, webhook de paiement, acompte ou intégration d'un fournisseur de paiement.
---

# Notifications et paiements

## Notifications
Événements : `booking_created`, `payment_confirmed`, `reminder_24h`, `reminder_1h`, `booking_cancelled`.

| Destinataire | Canal | Pourquoi ce choix |
|---|---|---|
| Client | Email (Resend) + lien `wa.me` pré-rempli | Fiable et gratuit au démarrage ; WhatsApp Business API demande une validation, on évite en démo |
| Équipe Bovane | Bot Telegram + email | Notification instantanée, simple à mettre en place |

Implémentation :
- `src/lib/notifications/index.ts` expose `notify(event, payload)`, qui appelle les canaux en parallèle et journalise chaque envoi dans `notifications_log` (événement, canal, statut, erreur).
- Un échec d'envoi ne bloque jamais la réservation : il est journalisé et réessayé.
- Modèle email : sobre, aux couleurs des tokens, avec ticket, date et heure locale du client + heure de Lomé, lien vers la vitrine, lien `.ics`.
- Message Telegram à l'équipe : « Nouvelle réservation — {business} ({catégorie}) — {mode} — {date et heure à Lomé} — {package} — acompte {statut} ».
- Rappels : Vercel Cron toutes les 15 minutes, qui cherche les créneaux confirmés dans 24 h et 1 h sans rappel déjà envoyé.

## Paiements
- Interface :
```ts
interface PaymentProvider {
  createCheckout(input: { bookingId: string; amountXof: number; customer: { name: string; phone: string; email?: string } }): Promise<{ checkoutUrl: string; reference: string }>;
  verifyWebhook(request: Request): Promise<{ reference: string; status: 'paid' | 'failed'; amountXof: number }>;
}
```
- `SimulatedProvider` (démo) : page de paiement fictive avec un bouton « Simuler le paiement » qui appelle le même webhook interne que les vrais fournisseurs. Un bandeau « Mode démo » est visible sur cette page.
- Fournisseurs réels à brancher plus tard (FedaPay, CinetPay, PayDunya) : un fichier par fournisseur dans `src/lib/payments/`, choisi par la variable `PAYMENT_PROVIDER`. Vérifie leur documentation actuelle avant d'implémenter.
- Règles : le statut ne passe à `confirmed` que depuis le webhook vérifié côté serveur, le montant reçu est comparé au montant attendu, le webhook est idempotent (rejouable sans effet double).

## Critères de réussite
- Une réservation de démo déclenche : email au client, message Telegram, confirmation visible dans l'admin.
- Rejouer deux fois le même webhook ne crée pas de double confirmation.
- Aucune clé d'API dans le code ou dans les journaux.
