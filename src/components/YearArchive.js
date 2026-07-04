'use client';

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Chip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { COLORS } from '@/theme';

// Archive par année réutilisable.
// props :
//   intro    : texte d'introduction
//   annees   : [{ annee, n }]
//   basePath : préfixe des liens
//   variant  : 'grid' (cartes par année) | 'list' (liste avec statut)
export default function YearArchive({ intro, annees = [], basePath = '#', variant = 'grid', accent = null }) {
  const [tab, setTab] = useState(0);

  const starts = [...new Set(annees.map((a) => Math.floor(a.annee / 10) * 10))].sort((a, b) => b - a);
  const decennies = [
    { label: 'Toutes', min: 0, max: 9999 },
    ...starts.map((s) => {
      const ys = annees.filter((a) => Math.floor(a.annee / 10) * 10 === s).map((a) => a.annee);
      return { label: `${Math.min(...ys)} – ${Math.max(...ys)}`, min: Math.min(...ys), max: Math.max(...ys) };
    }),
  ];
  const d = decennies[tab] || decennies[0];
  const liste = annees.filter((a) => a.annee >= d.min && a.annee <= d.max);

  return (
    <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        {intro && (
          <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', p: { xs: 2.5, md: 3 }, mb: { xs: 3, md: 3.5 } }}>
            <Typography sx={{ color: '#455a64', lineHeight: 1.75 }}>{intro}</Typography>
          </Box>
        )}

        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            mb: 3,
            minHeight: 0,
            '& .MuiTabs-indicator': { backgroundColor: '#E0A92E', height: 3 },
            '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: '0.92rem', color: COLORS.muted, minHeight: 42 },
            '& .Mui-selected': { color: `${COLORS.blue} !important` },
          }}
        >
          {decennies.map((x) => <Tab key={x.label} label={x.label} />)}
        </Tabs>

        {variant === 'list' ? (
          /* === Présentation LISTE avec statut (Lois de règlement) === */
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, maxWidth: 820, mx: 'auto' }}>
            {liste.map(({ annee, n }) => {
              const adoptee = n > 0;
              return (
                <Box
                  key={annee}
                  component={adoptee ? 'a' : 'div'}
                  href={adoptee ? `${basePath}/${annee}` : undefined}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    textDecoration: 'none',
                    backgroundColor: '#fff',
                    border: `1px solid ${COLORS.border}`,
                    borderLeft: `5px solid ${adoptee ? COLORS.green : COLORS.orange}`,
                    borderRadius: 2,
                    px: { xs: 2, md: 2.5 },
                    py: 1.75,
                    cursor: adoptee ? 'pointer' : 'default',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    ...(adoptee && { '&:hover': { transform: 'translateX(4px)', boxShadow: '0 10px 24px rgba(0,0,0,0.10)' } }),
                  }}
                >
                  <Typography sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.4rem', minWidth: 64, flexShrink: 0 }}>{annee}</Typography>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Chip
                      icon={adoptee ? <CheckCircleIcon sx={{ fontSize: '16px !important' }} /> : <ScheduleIcon sx={{ fontSize: '16px !important' }} />}
                      label={adoptee ? 'Adoptée' : "En cours d'élaboration"}
                      size="small"
                      sx={{
                        height: 22,
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        backgroundColor: adoptee ? 'rgba(46,139,87,0.14)' : 'rgba(224,123,44,0.14)',
                        color: adoptee ? COLORS.greenDark : '#B85E18',
                        '& .MuiChip-icon': { color: adoptee ? COLORS.greenDark : '#B85E18' },
                      }}
                    />
                    <Typography sx={{ color: COLORS.muted, fontSize: '0.82rem', mt: 0.4 }}>
                      {adoptee ? `${n} document${n > 1 ? 's' : ''} disponible${n > 1 ? 's' : ''}` : 'Texte non encore adopté'}
                    </Typography>
                  </Box>
                  {adoptee && <ChevronRightIcon sx={{ color: COLORS.muted, flexShrink: 0 }} />}
                </Box>
              );
            })}
          </Box>
        ) : (
          /* === Présentation GRILLE de cartes (Lois de finances) === */
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }, gap: 2 }}>
            {liste.map(({ annee, n }) => {
              const vide = n === 0;
              return (
                <Box
                  key={annee}
                  component={vide ? 'div' : 'a'}
                  href={vide ? undefined : `${basePath}/${annee}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    backgroundColor: '#fff',
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 2.5,
                    p: 2,
                    opacity: vide ? 0.55 : 1,
                    cursor: vide ? 'default' : 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                    ...(!vide && { '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 28px rgba(0,0,0,0.10)', borderColor: accent ? accent.main : '#E0A92E' } }),
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: 1.5, backgroundColor: accent ? `${accent.main}1A` : 'rgba(0,64,128,0.08)', color: accent ? accent.dark : COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 20 } }}>
                      <DescriptionIcon />
                    </Box>
                    <Chip label={n} size="small" sx={{ height: 22, minWidth: 28, backgroundColor: vide ? COLORS.bg : (accent ? `${accent.main}2E` : 'rgba(224,169,46,0.18)'), color: vide ? COLORS.muted : (accent ? accent.dark : COLORS.goldDark), fontWeight: 800, fontSize: '0.72rem' }} />
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: accent ? accent.dark : COLORS.blue, fontSize: '1.5rem', lineHeight: 1 }}>{annee}</Typography>
                  <Typography sx={{ color: COLORS.muted, fontSize: '0.76rem', mt: 0.4 }}>
                    {n === 0 ? 'Aucun document' : `${n} document${n > 1 ? 's' : ''}`}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}
