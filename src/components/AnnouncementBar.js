'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import axios from 'axios';
import { API_URL } from '@/config';
import { COLORS } from '@/theme';

// === CONTENU DE DÉMO (placeholder) ===========================================
// Affiché tant que le backend Django ne renvoie pas d'annonces (/api/annonces/).
const ANNONCES_DEMO = [
  'Loi de finances 2025 : le texte adopté est disponible au téléchargement.',
  "Rapport d'exécution budgétaire du 1ᵉʳ trimestre désormais publié.",
  'e-SECeF : la plateforme des marchés publics est accessible en ligne.',
  'Mobilisation des recettes : la DGI dématérialise ses téléprocédures.',
  'Le Niger poursuit la mise en conformité avec les directives UEMOA.',
];
// =============================================================================

export default function AnnouncementBar() {
  const [annonces, setAnnonces] = useState(ANNONCES_DEMO);

  // Récupération des annonces réelles depuis l'API (branchement futur).
  useEffect(() => {
    axios
      .get(`${API_URL}/api/annonces/`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAnnonces(res.data.map((a) => a.texte));
        }
      })
      .catch(() => {
        /* silencieux : on garde le contenu de démo */
      });
  }, []);

  // On duplique la liste pour un défilement continu et sans couture.
  const piste = [...annonces, ...annonces];

  return (
    <Box
      sx={{
        backgroundColor: COLORS.blueDark,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        height: 40,
        overflow: 'hidden',
      }}
    >
      {/* Étiquette « À LA UNE » */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          height: '100%',
          px: { xs: 1.5, md: 3 },
          backgroundColor: COLORS.gold,
          color: COLORS.blueDark,
          fontWeight: 800,
          letterSpacing: 0.5,
          fontSize: '0.78rem',
          flexShrink: 0,
          clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
          pr: { xs: 2.5, md: 4 },
        }}
      >
        <CampaignIcon sx={{ fontSize: 18 }} />
        À LA UNE
      </Box>

      {/* Piste défilante (ticker continu) */}
      <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden', mx: 1 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            willChange: 'transform',
            animation: 'ticker 38s linear infinite',
            '&:hover': { animationPlayState: 'paused' },
            '@keyframes ticker': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-50%)' },
            },
          }}
        >
          {piste.map((texte, i) => (
            <Typography
              key={i}
              component="span"
              sx={{ fontSize: '0.9rem', fontWeight: 500, mx: 3 }}
            >
              <Box
                component="span"
                sx={{ color: COLORS.gold, mr: 1.5, fontWeight: 700 }}
              >
                •
              </Box>
              {texte}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
