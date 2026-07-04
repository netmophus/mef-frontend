'use client';

import { useState } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { COLORS } from '@/theme';

// === ÉVÉNEMENTS À VENIR (démo) ===============================================
// ⚠️ Contenu de démonstration — à brancher sur la source réelle.
const EVENTS = [
  { date: '30 juin 2026', tag: 'Échéance', titre: 'Déclaration et paiement (DGI)', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80' },
  { date: '15 juil. 2026', tag: 'Conseil', titre: "Communication sur l'exécution du budget", image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80' },
  { date: '20 juil. 2026', tag: 'Forum', titre: 'Forum économique national', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80' },
  { date: '31 juil. 2026', tag: 'Marchés', titre: "Clôture d'appel d'offres (e-SECeF)", image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80' },
  { date: '5 août 2026', tag: 'Atelier', titre: 'Atelier sur la dette publique', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
  { date: '12 août 2026', tag: 'Réunion', titre: "Comité de trésorerie de l'État", image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80' },
  { date: '25 août 2026', tag: 'Échéance', titre: 'Échéance de paiement de la TVA', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80' },
  { date: '3 sept. 2026', tag: 'Conférence', titre: 'Cadrage budgétaire 2027', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80' },
];

// =============================================================================

function EventCard({ e }) {
  return (
    <Box
      component="a"
      href="/le-ministere/evenements"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        textDecoration: 'none',
        backgroundColor: '#fff',
        border: `1px solid ${COLORS.border}`,
        borderRadius: 2.5,
        overflow: 'hidden',
        boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 14px 28px rgba(0,0,0,0.12)' },
        '&:hover .ev-img': { transform: 'scale(1.06)' },
        '&:hover .ev-titre': { color: COLORS.blue },
      }}
    >
      <Box sx={{ position: 'relative', flex: 1, minHeight: 70, overflow: 'hidden' }}>
        <Box className="ev-img" sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${e.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: COLORS.blueDark, transition: 'transform 0.5s ease' }} />
        <Chip label={e.tag} size="small" sx={{ position: 'absolute', top: 8, left: 8, backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.58rem', height: 19, borderRadius: 0.6 }} />
      </Box>
      <Box sx={{ p: 1.25, flexShrink: 0 }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: COLORS.muted, fontSize: '0.68rem', fontWeight: 600, mb: 0.3 }}>
          <CalendarTodayIcon sx={{ fontSize: 11 }} /> {e.date}
        </Box>
        <Typography className="ev-titre" sx={{ fontWeight: 700, color: COLORS.ink, fontSize: '0.8rem', lineHeight: 1.25, transition: 'color 0.2s ease', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {e.titre}
        </Typography>
      </Box>
    </Box>
  );
}

export default function AgendaBlock({ events }) {
  // Données de l'API si fournies (forme { date, tag, titre, image }),
  // sinon repli sur les événements de démo.
  const source = events && events.length ? events : EVENTS;
  const PAGES = [];
  for (let i = 0; i < source.length; i += 4) PAGES.push(source.slice(i, i + 4));
  const N = PAGES.length;

  const [page, setPage] = useState(0);
  const go = (dir) => setPage((p) => (p + dir + N) % N);

  return (
    <Box sx={{ height: { xs: 'auto', md: '100%' }, display: 'flex', flexDirection: 'column' }}>
      {/* En-tête + flèches */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography sx={{ color: COLORS.goldDark, fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}>
            Le Ministère
          </Typography>
          <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.6rem', md: '2rem' }, lineHeight: 1.1 }}>
            Événements
          </Typography>
          <Box sx={{ width: 72, height: 4, background: 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)', borderRadius: 2, mt: 1.5 }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[{ dir: -1, icon: <ArrowBackIosNewIcon fontSize="small" />, label: 'Précédent' }, { dir: 1, icon: <ArrowForwardIosIcon fontSize="small" />, label: 'Suivant' }].map((b) => (
            <IconButton key={b.label} onClick={() => go(b.dir)} aria-label={b.label} sx={{ width: 42, height: 42, border: `1px solid ${COLORS.border}`, backgroundColor: '#fff', color: COLORS.blue, '&:hover': { backgroundColor: COLORS.blue, color: '#fff', borderColor: COLORS.blue } }}>
              {b.icon}
            </IconButton>
          ))}
        </Box>
      </Box>

      {/* Fenêtre — hauteur fixe (pleine largeur sous le bloc Ministre) */}
      <Box sx={{ minHeight: 0, height: { xs: 430, sm: 360, md: 300 }, overflow: 'hidden' }}>
        {/* Piste : N pages côte à côte, déplacée par translateX */}
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: `${N * 100}%`,
            transform: `translateX(-${(page * 100) / N}%)`,
            transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {PAGES.map((p, pi) => (
            <Box
              key={pi}
              sx={{
                width: `${100 / N}%`,
                height: '100%',
                display: 'grid',
                gap: 1.5,
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gridTemplateRows: { xs: '1fr 1fr', md: '1fr' },
              }}
            >
              {p.map((e, i) => (
                <EventCard key={i} e={e} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Pastilles */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1.5 }}>
        {PAGES.map((_, i) => (
          <Box
            key={i}
            component="button"
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
            sx={{
              p: 0,
              border: 'none',
              cursor: 'pointer',
              width: i === page ? 22 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === page ? '#E0A92E' : COLORS.border,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
