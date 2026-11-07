-- Données de DÉMONSTRATION. Prix et horaires à remplacer par ceux de l'influenceur (modifiables dans l'admin).
insert into settings (key, value) values
  ('studio_timezone', '"Africa/Lome"'),
  ('opening_hours', '{"start":"09:00","end":"20:00","days":[0,1,2,3,4,5,6]}'),
  ('slot_step_minutes', '30'),
  ('buffer_minutes', '15'),
  ('deposit_percent', '30'),
  ('hold_minutes', '15'),
  ('launch_date', '"2026-12-01"'),
  ('whatsapp_number', '""');

insert into packages (slug, name, tagline, duration_minutes, sessions_count, price_xof, modes, features, is_featured, sort_order) values
 ('flash', 'Flash', 'Ton premier live, simple et efficace', 90, 1, 15000, '{onsite,remote}',
  '["Live de 1 h 30 sur House of Challenge","Une régie dirige ton live","Ton numéro et ton adresse annoncés en direct","Vitrine en ligne avec QR code"]', false, 1),
 ('demi-journee', 'Demi-journée', 'Plus de temps, un meilleur prix par heure', 240, 1, 35000, '{onsite,remote}',
  '["Live de 4 heures","Tarif réduit par heure","Plusieurs produits présentés","Vitrine en ligne avec QR code"]', false, 2),
 ('annonce', 'Annonce', 'Ton live annoncé avant de démarrer', 90, 1, 30000, '{onsite,remote}',
  '["Live de 1 h 30","Ton live annoncé sur le compte de Bovane","Ta vidéo de présentation relayée","Vitrine en ligne avec QR code"]', true, 3),
 ('duo', 'Duo', 'Deux lives pour revenir devant l''audience', 90, 2, 27000, '{onsite,remote}',
  '["2 lives de 1 h 30","Deuxième session planifiée avec l''équipe","Vitrine en ligne avec QR code"]', false, 4),
 ('mensuel', 'Mensuel', 'Une présence régulière pendant un mois', 90, 8, 99000, '{onsite,remote}',
  '["8 lives de 1 h 30 sur le mois","Sessions planifiées avec l''équipe","Annonces régulières","Vitrine en ligne avec QR code"]', false, 5),
 ('vip', 'VIP', 'Le package complet, de l''annonce au replay', 240, 1, 75000, '{onsite,remote}',
  '["Live de 4 heures","Annonce sur le compte de Bovane","Replay monté","Vitrine en ligne mise en avant"]', false, 6);

insert into promo_codes (code, percent_off, max_uses) values ('BIENVENUE20', 20, 50);
