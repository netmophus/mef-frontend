'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, Chip, Button, Drawer, IconButton, Divider } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS, TRICOLOR } from '@/theme';

// Liste des « Dernières actualités » : à la une + grille filtrable par rubrique,
// avec panneau de lecture (Drawer). `articles` vient de l'API (repli côté page).
export default function LatestNews({ articles = [] }) {
  // Onglets = rubriques présentes + « Toutes ».
  const rubriques = useMemo(() => {
    const vues = [];
    articles.forEach((a) => {
      if (a.rubrique && !vues.includes(a.rubrique)) vues.push(a.rubrique);
    });
    return ['Toutes', ...vues];
  }, [articles]);

  const [filtre, setFiltre] = useState('Toutes');
  const liste = useMemo(
    () => (filtre === 'Toutes' ? articles : articles.filter((a) => a.rubrique === filtre)),
    [articles, filtre],
  );

  const [vedette, ...autres] = liste;

  const [selected, setSelected] = useState(null);
  const fermer = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return undefined;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const couverture = (a) => (a?.src ? `url(${a.src})` : 'none');

  return (
    <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Filtres par rubrique */}
        {rubriques.length > 2 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: { xs: 3, md: 4 } }}>
            {rubriques.map((r) => {
              const actif = r === filtre;
              return (
                <Box
                  key={r}
                  component="button"
                  onClick={() => setFiltre(r)}
                  sx={{
                    cursor: 'pointer',
                    font: 'inherit',
                    px: 2,
                    py: 0.8,
                    borderRadius: 999,
                    border: `1px solid ${actif ? COLORS.blue : COLORS.border}`,
                    backgroundColor: actif ? COLORS.blue : '#fff',
                    color: actif ? '#fff' : COLORS.ink,
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: COLORS.blue, color: actif ? '#fff' : COLORS.blue },
                  }}
                >
                  {r}
                </Box>
              );
            })}
          </Box>
        )}

        {/* À la une (article le plus récent du filtre) */}
        {vedette && (
          <Box
            onClick={() => setSelected(vedette)}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.15fr 1fr' },
              backgroundColor: '#fff',
              border: `1px solid ${COLORS.border}`,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 18px 40px rgba(0,0,0,0.10)',
              cursor: 'pointer',
              mb: { xs: 4, md: 5 },
              transition: 'box-shadow 0.25s ease, transform 0.25s ease',
              '&:hover': { boxShadow: '0 24px 50px rgba(0,0,0,0.16)' },
              '&:hover .ln-feat-img': { transform: 'scale(1.05)' },
            }}
          >
            <Box sx={{ position: 'relative', minHeight: { xs: 230, md: 360 }, overflow: 'hidden', backgroundColor: COLORS.blueDark }}>
              <Box className="ln-feat-img" sx={{ position: 'absolute', inset: 0, backgroundImage: couverture(vedette), backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s ease' }} />
              <Chip label={vedette.rubrique} size="small" sx={{ position: 'absolute', top: 14, left: 14, backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.66rem' }} />
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: TRICOLOR }} />
            </Box>
            <Box sx={{ p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, color: COLORS.goldDark, fontWeight: 700, fontSize: '0.8rem', mb: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: 15 }} /> {vedette.date}
              </Box>
              <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.4rem', md: '1.8rem' }, lineHeight: 1.18 }}>
                {vedette.titre}
              </Typography>
              {vedette.chapo && (
                <Typography sx={{ color: '#455a64', fontSize: '0.98rem', lineHeight: 1.7, mt: 1.5 }}>
                  {vedette.chapo}
                </Typography>
              )}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, color: COLORS.blue, fontWeight: 700, fontSize: '0.88rem', mt: 2 }}>
                Lire l'article <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Box>
            </Box>
          </Box>
        )}

        {/* Grille des autres actualités */}
        {autres.length > 0 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: { xs: 2, md: 3 } }}>
            {autres.map((a) => (
              <Box
                key={a.id}
                onClick={() => setSelected(a)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 18px 34px rgba(0,0,0,0.13)' },
                  '&:hover .ln-img': { transform: 'scale(1.07)' },
                }}
              >
                <Box sx={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', backgroundColor: COLORS.blueDark }}>
                  <Box className="ln-img" sx={{ position: 'absolute', inset: 0, backgroundImage: couverture(a), backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s ease' }} />
                  <Chip label={a.rubrique} size="small" sx={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(255,255,255,0.92)', color: COLORS.blue, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.6rem' }} />
                </Box>
                <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: COLORS.muted, fontSize: '0.76rem', mb: 0.75 }}>
                    <CalendarTodayIcon sx={{ fontSize: 13 }} /> {a.date}
                  </Box>
                  <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1rem', lineHeight: 1.3 }}>
                    {a.titre}
                  </Typography>
                  {a.chapo && (
                    <Typography sx={{ color: '#607d8b', fontSize: '0.86rem', lineHeight: 1.6, mt: 0.75, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {a.chapo}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Panneau de lecture */}
      <Drawer
        anchor="right"
        open={Boolean(selected)}
        onClose={fermer}
        sx={{ zIndex: 1500 }}
        slotProps={{ paper: { sx: { width: { xs: '100%', md: '55%' } } } }}
      >
        {selected && (
          <Box>
            <Box sx={{ position: 'relative', aspectRatio: '16 / 9', backgroundColor: COLORS.blueDark }}>
              <Box sx={{ position: 'absolute', inset: 0, backgroundImage: couverture(selected), backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))' }} />
              <Chip label={selected.rubrique} size="small" sx={{ position: 'absolute', bottom: 12, left: 16, backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800 }} />
              <IconButton onClick={fermer} aria-label="Fermer" sx={{ position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.9)', '&:hover': { backgroundColor: '#fff' } }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, color: COLORS.muted, mb: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>{selected.date}</Typography>
              </Box>
              <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.4rem', md: '1.7rem' }, lineHeight: 1.25, mb: 2 }}>
                {selected.titre}
              </Typography>
              {selected.chapo && (
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 600, color: COLORS.ink, borderLeft: '4px solid #E0A92E', pl: 2, mb: 2.5 }}>
                  {selected.chapo}
                </Typography>
              )}
              {(selected.paragraphes || []).map((p, idx) => (
                <Typography key={idx} sx={{ color: '#455a64', lineHeight: 1.8, mb: 2, textAlign: 'justify' }}>
                  {p}
                </Typography>
              ))}
              <Divider sx={{ my: 2 }} />
              <Button onClick={fermer} fullWidth variant="outlined" sx={{ mt: 1, fontWeight: 700, borderColor: COLORS.blue, color: COLORS.blue }}>
                Fermer
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
