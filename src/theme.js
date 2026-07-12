'use client';

import { createTheme } from '@mui/material/styles';

// Palette institutionnelle du Ministère des Finances du Niger.
// Bleu d'État commun + accent OR (identité « Finances / Trésor »).
// Charte graphique inspirée des armoiries de la République du Niger :
// vert de l'écu, or du soleil, orange des fanions (drapeau), sur base bleu d'État.
// Charte des armoiries de la République du Niger : le VERT de l'écu devient la
// couleur institutionnelle de base (l'emblème ne comporte aucun bleu).
// Les clés gardent leurs noms (blue/…) pour ne rien casser dans le code existant ;
// seules les VALEURS changent. `blueDark` et `gold` sont conservés tels quels pour
// laisser le bandeau sombre du haut + le ticker « À LA UNE » strictement inchangés.
export const COLORS = {
  blue: '#0C7449', // Vert profond de l'écu — couleur de base (ex-bleu d'État)
  blueDark: '#002B55', // CONSERVÉ : bandeau sombre du haut + éléments « noirs »
  blueHover: '#0A5C3A', // Survol de la couleur de base
  green: '#00B16C', // Vert vif de l'intérieur de l'écu (accents, tricolore)
  greenDark: '#0A5C3A', // Vert foncé (texte / survols)
  gold: '#E0A92E', // CONSERVÉ : or du soleil des armoiries
  goldDark: '#B5841F',
  orange: '#FB9344', // Orange des hampes / drapeaux des armoiries
  ink: '#37474F', // Texte principal
  muted: '#90A4AE', // Texte secondaire
  bg: '#EEF1F5', // Fond neutre clair des sections
  card: '#FFFFFF', // Cartes internes en blanc
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
  // Coins carrés sur tout le site : en sx, `borderRadius: n` vaut `n * shape.borderRadius`.
  // À 0, toutes les cartes/photos/cadres deviennent carrés. Les cercles ('50%') et les
  // boutons pilule (999px littéral) ne sont pas concernés.
  shape: { borderRadius: 0 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999 },
      },
    },
  },
});

export default theme;
