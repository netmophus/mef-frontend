'use client';

import { useMemo, useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, Chip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import { COLORS } from '@/theme';

// Couleur d'accent par type de document.
const TYPE_COLORS = {
  Bulletin: { main: COLORS.blue, dark: COLORS.blue },
  Arrêté: { main: COLORS.gold, dark: COLORS.goldDark },
  Décret: { main: COLORS.green, dark: COLORS.greenDark },
  Synthèse: { main: COLORS.orange, dark: '#C4611E' },
  Rapport: { main: '#6FB3E0', dark: '#1F6E9E' },
  Document: { main: COLORS.green, dark: COLORS.greenDark },
  'Compte rendu': { main: COLORS.gold, dark: COLORS.goldDark },
  Plan: { main: COLORS.orange, dark: '#C4611E' },
  Étude: { main: COLORS.orange, dark: '#C4611E' },
  Projet: { main: COLORS.green, dark: COLORS.greenDark },
  Loi: { main: COLORS.blueDark, dark: COLORS.blueDark },
  Communiqué: { main: COLORS.gold, dark: COLORS.goldDark },
  FMI: { main: '#6FB3E0', dark: '#1F6E9E' },
};
// Palette tournante pour les libellés numériques (années), afin de les distinguer.
const YEAR_PALETTE = [
  { main: COLORS.blue, dark: COLORS.blue },
  { main: COLORS.green, dark: COLORS.greenDark },
  { main: COLORS.orange, dark: '#C4611E' },
  { main: COLORS.gold, dark: COLORS.goldDark },
];
const colorOf = (t) => {
  if (TYPE_COLORS[t]) return TYPE_COLORS[t];
  if (/^\d{4}$/.test(t)) return YEAR_PALETTE[Number(t) % YEAR_PALETTE.length];
  return { main: COLORS.blue, dark: COLORS.blue };
};

export default function PublicationsList({ items = [] }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Tous');

  // Types présents, avec leur effectif.
  const types = useMemo(() => {
    const map = new Map();
    items.forEach((it) => map.set(it.type, (map.get(it.type) || 0) + 1));
    return [{ label: 'Tous', n: items.length }, ...[...map.entries()].map(([label, n]) => ({ label, n }))];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (it) => (type === 'Tous' || it.type === type) && (q === '' || it.titre.toLowerCase().includes(q))
    );
  }, [items, query, type]);

  return (
    <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        {/* Recherche */}
        <TextField
          fullWidth
          placeholder="Rechercher une publication…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: COLORS.muted }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 2.5,
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
            '& fieldset': { borderColor: COLORS.border },
          }}
        />

        {/* Filtres par type */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {types.map((t) => {
            const active = type === t.label;
            const c = t.label === 'Tous' ? { main: COLORS.blue, dark: COLORS.blue } : colorOf(t.label);
            return (
              <Chip
                key={t.label}
                label={`${t.label} (${t.n})`}
                onClick={() => setType(t.label)}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  border: `1px solid ${active ? c.main : COLORS.border}`,
                  backgroundColor: active ? c.main : '#fff',
                  color: active ? '#fff' : COLORS.ink,
                  '&:hover': { backgroundColor: active ? c.main : COLORS.bg, borderColor: c.main },
                }}
              />
            );
          })}
        </Box>

        <Typography sx={{ color: COLORS.muted, fontWeight: 600, fontSize: '0.9rem', mb: 2 }}>
          {filtered.length} publication{filtered.length > 1 ? 's' : ''}
        </Typography>

        {filtered.length === 0 ? (
          <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Typography sx={{ color: COLORS.muted }}>Aucune publication ne correspond à votre recherche.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {filtered.map((it, i) => {
              const c = colorOf(it.type);
              const href = it.pdf || '#';
              return (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1.25, md: 2 },
                    backgroundColor: '#fff',
                    border: `1px solid ${COLORS.border}`,
                    borderLeft: `5px solid ${c.main}`,
                    borderRadius: 2,
                    p: { xs: 1.5, md: 2 },
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 22px rgba(0,0,0,0.08)' },
                  }}
                >
                  <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: 1.5, backgroundColor: 'rgba(211,47,47,0.10)', color: '#d32f2f', display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 25 } }}>
                    <PictureAsPdfIcon />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Chip
                      label={it.type}
                      size="small"
                      sx={{ height: 20, mb: 0.6, fontWeight: 800, fontSize: '0.66rem', backgroundColor: `${c.main}1F`, color: c.dark }}
                    />
                    <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: '0.9rem', lineHeight: 1.4 }}>
                      {it.titre}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                    <IconButton component="a" href={href} target="_blank" rel="noopener noreferrer" aria-label="Consulter" size="small" sx={{ color: COLORS.blue }}>
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                    <IconButton component="a" href={href} download aria-label="Télécharger" size="small" sx={{ color: '#fff', backgroundColor: COLORS.blue, '&:hover': { backgroundColor: COLORS.blueHover } }}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}
