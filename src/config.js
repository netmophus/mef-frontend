// Configuration globale du frontend.
// L'URL du backend Django (à brancher plus tard). Surcouchable via .env.local
// avec NEXT_PUBLIC_API_URL=https://...
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Coordonnées du Ministère (valeurs de démo tant que le backend ne les fournit pas).
export const INFOS_MINISTERE = {
  telephone: '+227 20 72 23 47',
  email: 'finances@finances.gov.ne',
  adresse: 'Avenue des ministères, BP 389 — Niamey Plateau',
  facebook: 'https://facebook.com',
  twitter: 'https://x.com',
  youtube: 'https://youtube.com',
};
