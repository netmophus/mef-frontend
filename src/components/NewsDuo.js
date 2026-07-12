'use client';

import { Box, Typography, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CampaignIcon from '@mui/icons-material/Campaign';
import { COLORS } from '@/theme';

// === COMMUNIQUÉS (démo) ======================================================
const COMMUNIQUES = [
  { date: '13 juin 2026', titre: "Le Bénin, premier émetteur souverain d'Afrique en 2026 (émission Sukuk)" },
  { date: '9 juin 2026', titre: 'Calendrier prévisionnel des émissions de titres publics' },
  { date: '5 juin 2026', titre: 'Avis aux contribuables : prochaines échéances fiscales' },
  { date: '30 mai 2026', titre: "Publication du rapport d'exécution budgétaire du 1ᵉʳ trimestre" },
];
// =============================================================================

function DatePastille({ date, grand }) {
  const [jour, mois] = date.split(' ');
  return (
    <Box
      sx={{
        width: grand ? 56 : 48,
        flexShrink: 0,
        textAlign: 'center',
        borderRadius: 1.5,
        backgroundColor: grand ? 'rgba(255,255,255,0.16)' : 'rgba(12,116,73,0.06)',
        py: grand ? 1 : 0.75,
      }}
    >
      <Typography sx={{ fontWeight: 800, color: grand ? '#fff' : COLORS.blue, fontSize: grand ? '1.4rem' : '1.15rem', lineHeight: 1 }}>{jour}</Typography>
      <Typography sx={{ fontSize: '0.58rem', color: grand ? 'rgba(255,255,255,0.85)' : COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{mois}</Typography>
    </Box>
  );
}

export default function NewsDuo() {
  const dernier = COMMUNIQUES[0];
  const autres = COMMUNIQUES.slice(1);

  return (
    <Box>
      {/* En-tête */}
      <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
        <Typography sx={{ color: COLORS.goldDark, fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}>
          Le Ministère
        </Typography>
        <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.6rem', md: '2rem' }, lineHeight: 1.1 }}>
          Salle de presse
        </Typography>
        <Box sx={{ width: 72, height: 4, background: 'linear-gradient(90deg, #FB9344 0 33.33%, #ffffff 33.33% 66.66%, #00B16C 66.66% 100%)', borderRadius: 2, mt: 1.5 }} />
      </Box>

      <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
        {/* En-tête de carte */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}` }}>
          <Box sx={{ width: 32, height: 32, borderRadius: 1.5, backgroundColor: 'rgba(12,116,73,0.08)', color: COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 19 } }}>
            <CampaignIcon />
          </Box>
          <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.05rem', flex: 1 }}>Communiqués</Typography>
          <Box component="a" href="/actualites/revue-de-presse" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, textDecoration: 'none', color: COLORS.goldDark, fontWeight: 700, fontSize: '0.78rem', '&:hover': { gap: '8px' }, transition: 'gap 0.2s ease' }}>
            Voir tout <ArrowForwardIcon sx={{ fontSize: 15 }} />
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          {/* Dernier communiqué — mis en avant */}
          <Box
            component="a"
            href="#"
            sx={{
              display: 'flex',
              gap: 1.5,
              alignItems: 'center',
              textDecoration: 'none',
              p: 1.75,
              borderRadius: 2.5,
              mb: 1.5,
              color: '#fff',
              background: 'linear-gradient(135deg, #002B55 0%, #0a5ca8 100%)',
              boxShadow: '0 8px 20px rgba(0,43,85,0.25)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 14px 28px rgba(0,43,85,0.35)' },
              '&:hover .d-go': { gap: '10px' },
            }}
          >
            <DatePastille date={dernier.date} grand />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Chip label="Dernier communiqué" size="small" sx={{ height: 19, mb: 0.6, backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800, fontSize: '0.58rem', textTransform: 'uppercase', borderRadius: 0.6 }} />
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{dernier.titre}</Typography>
              <Box className="d-go" sx={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E0A92E', fontWeight: 700, fontSize: '0.78rem', mt: 0.6, transition: 'gap 0.25s ease' }}>
                Lire le communiqué <ArrowForwardIcon sx={{ fontSize: 15 }} />
              </Box>
            </Box>
          </Box>

          {/* Autres communiqués */}
          {autres.map((c, i) => (
            <Box
              key={i}
              component="a"
              href="#"
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'center',
                textDecoration: 'none',
                py: 1.1,
                px: 1,
                borderRadius: 1.5,
                borderBottom: i < autres.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                transition: 'background-color 0.2s ease, padding-left 0.2s ease',
                '&:hover': { backgroundColor: COLORS.bg, pl: 1.5 },
                '&:hover .c-titre': { color: COLORS.blue },
              }}
            >
              <DatePastille date={c.date} />
              <Typography className="c-titre" sx={{ fontWeight: 700, color: COLORS.ink, fontSize: '0.85rem', lineHeight: 1.3, transition: 'color 0.2s ease', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.titre}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
