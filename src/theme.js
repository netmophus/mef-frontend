'use client';

import { createTheme } from '@mui/material/styles';

// Palette institutionnelle du Ministère des Finances du Niger.
// Bleu d'État commun + accent OR (identité « Finances / Trésor »).
// Charte graphique inspirée des armoiries de la République du Niger :
// vert de l'écu, or du soleil, orange des fanions (drapeau), sur base bleu d'État.
export const COLORS = {
  blue: '#004080', // Bleu institutionnel (base d'État)
  blueDark: '#002B55', // Bleu nuit (bandeau d'annonces)
  blueHover: '#003366',
  green: '#2E8B57', // Vert de l'écu des armoiries
  greenDark: '#1F6E42',
  gold: '#E0A92E', // Or du soleil des armoiries
  goldDark: '#B5841F',
  orange: '#E07B2C', // Orange des fanions / du drapeau
  ink: '#37474F', // Texte principal
  muted: '#90A4AE', // Texte secondaire
  bg: '#EEF1F5', // Fond neutre clair des sections
  card: '#FFFFFF', // Cartes internes en blanc (ressortent sur les cadres colorés)
  border: '#DCE3EC',
};

// Filet tricolore (orange · blanc · vert) — rappel du drapeau du Niger.
export const TRICOLOR =
  `linear-gradient(90deg, ${COLORS.orange} 0 33.33%, #ffffff 33.33% 66.66%, ${COLORS.green} 66.66% 100%)`;

const theme = createTheme({
  palette: {
    primary: { main: COLORS.blue, dark: COLORS.blueHover },
    secondary: { main: COLORS.green, dark: COLORS.greenDark },
    warning: { main: COLORS.gold, dark: COLORS.goldDark },
    text: { primary: COLORS.ink, secondary: COLORS.muted },
    background: { default: COLORS.bg },
  },
  typography: {
    fontFamily: 'var(--font-roboto), Roboto, Arial, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999 },
      },
    },
  },
});

export default theme;
