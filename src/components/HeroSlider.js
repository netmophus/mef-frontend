'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation, A11y, Keyboard } from 'swiper/modules';
import { Box, Button, Chip, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';
import Link from 'next/link';
import { COLORS, TRICOLOR } from '@/theme';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// === SLIDES (placeholder) ====================================================
// `image`  = visuel officiel à venir (déposer dans public/slides/).
// `secours`= image de secours (Unsplash) affichée tant que `image` est absente.
//   -> Dès que tu déposes le bon fichier dans public/slides/, il s'utilise
//      automatiquement, sans modifier le code.
const SLIDES = [
  {
    categorie: 'Le Ministère',
    titre: 'Mot du Ministre',
    texte:
      "Le Ministre des Finances présente la vision et les priorités du Gouvernement pour des finances publiques saines et au service du développement.",
    image: '/slides/ministre.jpg',
    secours:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1920&q=80',
    position: 'center top',
    cta: { label: 'Lire le message', href: '/le-ministere/ministre', icon: 'arrow' },
  },
  {
    categorie: 'République du Niger',
    titre: 'Ministère des Finances',
    texte:
      "Au cœur de Niamey, le Ministère pilote la politique budgétaire, fiscale et financière de l'État au service des citoyens.",
    image: '/slides/immeuble-ministere.jpg',
    secours:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    position: 'center',
    cta: { label: 'Découvrir le Ministère', href: '/le-ministere', icon: 'arrow' },
  },
  {
    categorie: 'Loi de finances',
    titre: 'Loi de Finances 2025',
    texte:
      "Découvrez les grandes orientations budgétaires de l'État et les priorités d'investissement pour le développement du Niger.",
    secours:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80',
    cta: { label: 'Consulter le document', href: '/budget/lois-de-finances', icon: 'download' },
    cta2: { label: 'En savoir plus', href: '/budget' },
  },
  {
    categorie: 'Transparence',
    titre: "Rapports d'exécution budgétaire",
    texte:
      "Suivez l'exécution du budget de l'État en toute transparence, trimestre après trimestre.",
    secours:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
    cta: { label: 'Voir les rapports', href: '/budget/rapports-execution', icon: 'arrow' },
  },
  {
    categorie: 'Services en ligne',
    titre: 'La fiscalité se modernise',
    texte:
      'Téléprocédures, marchés publics dématérialisés (e-SECeF), DGI en ligne : des services plus simples et plus rapides.',
    secours:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    cta: { label: 'Accéder aux services', href: '/directions/directions-generales', icon: 'arrow' },
  },
];
// =============================================================================

const OVERLAY =
  'linear-gradient(90deg, rgba(7,58,38,0.94) 0%, rgba(10,80,52,0.80) 42%, rgba(12,116,73,0.30) 100%), linear-gradient(0deg, rgba(6,44,29,0.55) 0%, rgba(6,44,29,0) 45%)';

// Empile : voile dégradé > image officielle (si présente) > image de secours.
function buildBackground(slide) {
  const couches = [OVERLAY];
  if (slide.image) couches.push(`url(${slide.image})`);
  if (slide.secours) couches.push(`url(${slide.secours})`);
  return couches.join(', ');
}

export default function HeroSlider({ slides }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [active, setActive] = useState(0);

  // Données de l'API si présentes, sinon repli sur les slides internes.
  const data = slides && slides.length ? slides : SLIDES;
  const total = data.length;

  return (
    <Box
      sx={{
        position: 'relative',
        '& .swiper': { width: '100%', height: { xs: 380, md: 500 } },
        '& .swiper-slide': { overflow: 'hidden' },
        // Animation Ken Burns sur le slide actif
        '& .swiper-slide-active .kenburns': {
          animation: 'kenburns 8s ease-out forwards',
        },
        '@keyframes kenburns': {
          from: { transform: 'scale(1.05)' },
          to: { transform: 'scale(1.16)' },
        },
        // Entrée animée du contenu sur le slide actif
        '& .swiper-slide-active .reveal': {
          opacity: 1,
          transform: 'translateY(0)',
        },
        '& .reveal': {
          opacity: 0,
          transform: 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        },
        '& .reveal-1': { transitionDelay: '0.15s' },
        '& .reveal-2': { transitionDelay: '0.30s' },
        '& .reveal-3': { transitionDelay: '0.45s' },
        '& .reveal-4': { transitionDelay: '0.60s' },
        // Pagination
        '& .swiper-pagination': {
          textAlign: 'left',
          px: { xs: 3, md: 8 },
          bottom: '28px !important',
        },
        '& .swiper-pagination-bullet': {
          width: 10,
          height: 10,
          background: '#fff',
          opacity: 0.45,
          transition: 'all 0.3s ease',
          borderRadius: 6,
        },
        '& .swiper-pagination-bullet-active': {
          opacity: 1,
          width: 30,
          background: COLORS.gold,
        },
      }}
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation, A11y, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop
        keyboard={{ enabled: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(s) => setActive(s.realIndex)}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
      >
        {data.map((slide, i) => (
          <SwiperSlide key={i}>
            {/* Image de fond + Ken Burns */}
            <Box
              className="kenburns"
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: buildBackground(slide),
                backgroundSize: 'cover',
                backgroundPosition: slide.position || 'center',
                backgroundColor: COLORS.blueDark,
              }}
            />

            {/* Contenu */}
            <Box
              className="slide-content"
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: 1280,
                mx: 'auto',
                px: { xs: 3, md: 8 },
              }}
            >
              <Box sx={{ maxWidth: 640, color: '#fff' }}>
                <Chip
                  className="reveal reveal-1"
                  label={slide.categorie}
                  sx={{
                    backgroundColor: COLORS.gold,
                    color: COLORS.blueDark,
                    fontWeight: 800,
                    letterSpacing: 0.6,
                    textTransform: 'uppercase',
                    fontSize: '0.72rem',
                    mb: 2.5,
                    borderRadius: 1,
                  }}
                />
                <Typography
                  className="reveal reveal-2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.08,
                    fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' },
                    textShadow: '0 2px 20px rgba(0,0,0,0.35)',
                    mb: 2,
                  }}
                >
                  {slide.titre}
                </Typography>
                <Typography
                  className="reveal reveal-3"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.18rem' },
                    color: 'rgba(255,255,255,0.92)',
                    maxWidth: 560,
                    mb: 3.5,
                  }}
                >
                  {slide.texte}
                </Typography>
                <Box
                  className="reveal reveal-4"
                  sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
                >
                  <Button
                    component={Link}
                    href={slide.cta.href}
                    variant="contained"
                    endIcon={
                      slide.cta.icon === 'download' ? <DownloadIcon /> : <ArrowForwardIcon />
                    }
                    sx={{
                      backgroundColor: COLORS.gold,
                      color: COLORS.blueDark,
                      fontWeight: 800,
                      px: 3,
                      py: 1.2,
                      boxShadow: '0 8px 24px rgba(224,169,46,0.4)',
                      '&:hover': { backgroundColor: COLORS.goldDark, color: '#fff' },
                    }}
                  >
                    {slide.cta.label}
                  </Button>
                  {slide.cta2 && (
                    <Button
                      component={Link}
                      href={slide.cta2.href}
                      variant="outlined"
                      sx={{
                        borderColor: 'rgba(255,255,255,0.7)',
                        color: '#fff',
                        fontWeight: 700,
                        px: 3,
                        py: 1.2,
                        backdropFilter: 'blur(4px)',
                        '&:hover': {
                          borderColor: '#fff',
                          backgroundColor: 'rgba(255,255,255,0.12)',
                        },
                      }}
                    >
                      {slide.cta2.label}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flèches de navigation (glassmorphism) */}
      <Box
        sx={{
          position: 'absolute',
          zIndex: 5,
          right: { xs: 16, md: 48 },
          bottom: { xs: 20, md: 40 },
          display: { xs: 'none', sm: 'flex' },
          gap: 1.5,
        }}
      >
        {[
          { ref: prevRef, icon: <ArrowBackIosNewIcon fontSize="small" />, label: 'Précédent' },
          { ref: nextRef, icon: <ArrowForwardIosIcon fontSize="small" />, label: 'Suivant' },
        ].map((b, i) => (
          <IconButton
            key={i}
            ref={b.ref}
            aria-label={b.label}
            sx={{
              width: 52,
              height: 52,
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.45)',
              backgroundColor: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: COLORS.gold,
                borderColor: COLORS.gold,
                color: COLORS.blueDark,
              },
            }}
          >
            {b.icon}
          </IconButton>
        ))}
      </Box>

      {/* Compteur 01 / 04 */}
      <Box
        sx={{
          position: 'absolute',
          zIndex: 5,
          right: { xs: 16, md: 48 },
          top: { xs: 20, md: 40 },
          color: '#fff',
          fontWeight: 700,
          letterSpacing: 1,
          display: { xs: 'none', sm: 'block' },
          textShadow: '0 2px 10px rgba(0,0,0,0.4)',
        }}
      >
        <Box component="span" sx={{ fontSize: '1.4rem' }}>
          {String(active + 1).padStart(2, '0')}
        </Box>
        <Box component="span" sx={{ opacity: 0.6 }}>
          {' '}
          / {String(total).padStart(2, '0')}
        </Box>
      </Box>

      {/* Filet tricolore */}
      <Box sx={{ height: 4, background: TRICOLOR, position: 'relative', zIndex: 5 }} />
    </Box>
  );
}
