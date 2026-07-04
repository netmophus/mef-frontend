'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  Tabs,
  Tab,
  Drawer,
  IconButton,
  Divider,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { COLORS } from '@/theme';

// === ACTUALITÉS DE DÉMO (placeholder) ========================================
// À remplacer par l'API Django plus tard (ex. /api/actualites/ ou /api/onglets/).
// `rubrique` sert au filtrage par onglet ; `categorie` est l'étiquette affichée.
// `image` = visuel officiel à venir (public/actualites/...), `secours` = secours Unsplash.
const PARAS = [
  "Cette actualité s'inscrit dans la dynamique de l'action du Ministère des Finances, au service de la transparence et du développement national.",
  "Le Ministère réaffirme sa détermination à conduire les réformes prioritaires et à renforcer la mobilisation des ressources publiques.",
  "Les services concernés assureront le suivi de la mise en œuvre, en lien avec l'ensemble des parties prenantes.",
];

const ARTICLES = [
  {
    categorie: 'Activités',
    rubrique: 'Activités du Ministre',
    date: '12 juin 2026',
    titre: 'Le Ministre des Finances signe de nouveaux accords de financement',
    extrait:
      'Plusieurs conventions ont été paraphées avec les partenaires pour appuyer les projets prioritaires de développement du pays.',
    secours: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
  },
  {
    categorie: 'Événement',
    rubrique: 'Événements',
    date: '10 juin 2026',
    titre: "Communication en Conseil des Ministres sur le budget de l'État",
    extrait: "Le Ministre a présenté l'état d'exécution du budget et les perspectives.",
    secours: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorie: 'Audience',
    rubrique: 'Audiences & Rencontres',
    date: '6 juin 2026',
    titre: 'Audience avec la délégation du Fonds Monétaire International',
    extrait: 'Les échanges ont porté sur la coopération et les réformes en cours.',
    secours: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorie: 'Activités',
    rubrique: 'Activités du Ministre',
    date: '2 juin 2026',
    titre: "Discours d'ouverture du forum économique national",
    extrait: "Le Ministre a appelé à la mobilisation de tous pour la relance.",
    secours: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorie: 'Événement',
    rubrique: 'Événements',
    date: '28 mai 2026',
    titre: 'Adoption du projet de loi de finances 2026',
    extrait: 'Le projet de budget a été adopté et sera transmis à l\'Assemblée.',
    secours: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorie: 'Audience',
    rubrique: 'Audiences & Rencontres',
    date: '21 mai 2026',
    titre: 'Rencontre avec les acteurs du secteur privé national',
    extrait: 'Le dialogue public-privé au service de la croissance.',
    secours: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorie: 'Activités',
    rubrique: 'Activités du Ministre',
    date: '14 mai 2026',
    titre: "Visite de terrain : suivi des projets d'investissement",
    extrait: 'Le Ministre a constaté l\'avancement des chantiers prioritaires.',
    secours: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorie: 'Audience',
    rubrique: 'Audiences & Rencontres',
    date: '7 mai 2026',
    titre: 'Audience avec les partenaires techniques et financiers',
    extrait: 'Renforcement de la coopération autour des réformes des finances publiques.',
    secours: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorie: 'Événement',
    rubrique: 'Événements',
    date: '29 avril 2026',
    titre: 'Examen du cadrage macroéconomique à moyen terme',
    extrait: 'Les grandes orientations budgétaires pour les prochaines années.',
    secours: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorie: 'Activités',
    rubrique: 'Activités du Ministre',
    date: '22 avril 2026',
    titre: 'Lancement de la campagne de mobilisation des recettes',
    extrait: 'Une stratégie renforcée pour élargir l\'assiette fiscale.',
    secours: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
];

// Onglets de filtrage (1er = tout afficher) — convention Primature
const TABS = ['Toutes', 'Activités du Ministre', 'Événements', 'Audiences & Rencontres'];

// Disposition bento : motif [colSpan, rowSpan] répété (grid-auto-flow: dense).
const LAYOUT = [
  [2, 2], [2, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1],
];
// =============================================================================

function bg(item) {
  const couches = [];
  if (item?.image) couches.push(`url(${item.image})`);
  if (item?.secours) couches.push(`url(${item.secours})`);
  return couches.join(', ');
}

function Tile({ item, index, onOpen }) {
  const featured = index === 0;
  const [c, r] = LAYOUT[index % LAYOUT.length];

  return (
    <Box
      onClick={() => onOpen(item)}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 2,
        backgroundColor: COLORS.blueDark,
        gridColumn: { xs: 'span 1', sm: featured ? 'span 2' : 'span 1', md: `span ${c}` },
        gridRow: { xs: featured ? 'span 2' : 'span 1', sm: featured ? 'span 2' : 'span 1', md: `span ${r}` },
        '&:hover .tile-img': { transform: 'scale(1.07)' },
        '&:hover .tile-title': { color: COLORS.gold },
        '&:hover .tile-go': { opacity: 1, transform: 'translateX(0)' },
      }}
    >
      <Box
        className="tile-img"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: bg(item),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.6s ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(0deg, rgba(0,28,56,0.92) 0%, rgba(0,40,80,0.35) 55%, rgba(0,40,80,0) 100%)',
        }}
      />
      <Chip
        label={item.categorie}
        size="small"
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          backgroundColor: COLORS.gold,
          color: COLORS.blueDark,
          fontWeight: 800,
          textTransform: 'uppercase',
          fontSize: '0.68rem',
          borderRadius: 1,
        }}
      />
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: featured ? { xs: 2.5, md: 3.5 } : 2, color: '#fff' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.75rem',
            fontWeight: 600,
            mb: 0.75,
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: 13 }} />
          {item.date}
        </Box>
        <Typography
          className="tile-title"
          component="h3"
          sx={{
            fontWeight: 800,
            lineHeight: 1.18,
            fontSize: featured ? { xs: '1.4rem', md: '2rem' } : '1.02rem',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            transition: 'color 0.25s ease',
          }}
        >
          {item.titre}
        </Typography>
        {featured && item.extrait && (
          <Typography sx={{ color: 'rgba(255,255,255,0.9)', mt: 1, maxWidth: 620, display: { xs: 'none', sm: 'block' } }}>
            {item.extrait}
          </Typography>
        )}
        <Box
          className="tile-go"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
            color: COLORS.gold,
            fontWeight: 700,
            fontSize: '0.82rem',
            mt: 1,
            opacity: { xs: 1, md: 0 },
            transform: { md: 'translateX(-8px)' },
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          Lire la suite <ArrowForwardIcon sx={{ fontSize: 17 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default function NewsHighlights({ hideHeader = false, articles = ARTICLES }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState(null);

  const visibles =
    activeTab === 0 ? articles : articles.filter((a) => a.rubrique === TABS[activeTab]);

  return (
    <Box
      sx={{
        backgroundColor: COLORS.bg,
        pt: { xs: 4, md: 5 },
        pb: { xs: 5, md: 7 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {!hideHeader && (
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 1.5,
          }}
        >
          <Box>
            <Typography
              sx={{ color: COLORS.gold, fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}
            >
              Actualités
            </Typography>
            <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.7rem', md: '2.1rem' }, lineHeight: 1.1 }}>
              À la une
            </Typography>
            <Box sx={{ width: 64, height: 4, background: COLORS.gold, borderRadius: 2, mt: 1.5 }} />
          </Box>

          <Button
            component={Link}
            href="/actualites/a-la-une"
            endIcon={<ArrowForwardIcon />}
            variant="outlined"
            sx={{
              borderColor: COLORS.blue,
              color: COLORS.blue,
              fontWeight: 700,
              '&:hover': { backgroundColor: COLORS.blue, color: '#fff', borderColor: COLORS.blue },
            }}
          >
            Toutes les actualités
          </Button>
        </Box>
      )}

      {/* Onglets de catégories */}
      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          mb: 2.5,
          minHeight: 0,
          '& .MuiTabs-indicator': { backgroundColor: COLORS.gold, height: 3 },
          '& .MuiTab-root': {
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '0.95rem',
            color: COLORS.muted,
            minHeight: 44,
            px: 2,
          },
          '& .Mui-selected': { color: `${COLORS.blue} !important` },
        }}
      >
        {TABS.map((t) => (
          <Tab key={t} label={t} />
        ))}
      </Tabs>

      {/* Mosaïque bento */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gridAutoRows: { xs: 180, sm: 200, md: 215 },
          gridAutoFlow: 'dense',
          gap: 1.5,
        }}
      >
        {visibles.map((item, i) => (
          <Tile key={item.titre} item={item} index={i} onOpen={setSelected} />
        ))}
      </Box>
      </Box>

      {/* Panneau article (glisse depuis la droite) — convention Primature */}
      <Drawer
        anchor="right"
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        sx={{ zIndex: 1500 }}
        slotProps={{ paper: { sx: { width: { xs: '100%', md: '55%' } } } }}
      >
        {selected && (
          <Box>
            {/* Couverture */}
            <Box sx={{ position: 'relative', aspectRatio: '16 / 9', backgroundColor: COLORS.blueDark }}>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: bg(selected),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))' }} />
              <Chip
                label={selected.categorie}
                size="small"
                sx={{ position: 'absolute', bottom: 12, left: 16, backgroundColor: COLORS.gold, color: COLORS.blueDark, fontWeight: 800 }}
              />
              <IconButton
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                sx={{ position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.9)', '&:hover': { backgroundColor: '#fff' } }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Corps */}
            <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, color: COLORS.muted, mb: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>{selected.date}</Typography>
              </Box>
              <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.4rem', md: '1.7rem' }, lineHeight: 1.25, mb: 2 }}>
                {selected.titre}
              </Typography>
              <Typography sx={{ fontSize: '1.05rem', fontWeight: 600, color: COLORS.ink, borderLeft: `4px solid ${COLORS.gold}`, pl: 2, mb: 2.5 }}>
                {selected.extrait}
              </Typography>
              {((selected.paragraphes && selected.paragraphes.length ? selected.paragraphes : PARAS)).map((p, idx) => (
                <Typography key={idx} sx={{ color: '#455a64', lineHeight: 1.8, mb: 2, textAlign: 'justify' }}>
                  {p}
                </Typography>
              ))}
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" sx={{ color: COLORS.muted }}>
                ⚠️ Contenu de démonstration — l'article complet sera fourni par l'administration.
              </Typography>
              <Button
                onClick={() => setSelected(null)}
                fullWidth
                variant="outlined"
                sx={{ mt: 2, fontWeight: 700, borderColor: COLORS.blue, color: COLORS.blue }}
              >
                Fermer
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
