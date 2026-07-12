'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Box, Container, Typography, Chip, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Link from 'next/link';
import { COLORS } from '@/theme';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// === 6 DERNIÈRES ACTUALITÉS (démo) ===========================================
const ACTUS = [
  { categorie: 'Activités', date: '12 juin 2026', titre: 'Le Ministre signe de nouveaux accords de financement', secours: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
  { categorie: 'Conseil', date: '10 juin 2026', titre: "Communication en Conseil des Ministres sur le budget de l'État", secours: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80' },
  { categorie: 'Audience', date: '6 juin 2026', titre: 'Audience avec la délégation du Fonds Monétaire International', secours: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80' },
  { categorie: 'Activités', date: '2 juin 2026', titre: "Discours d'ouverture du forum économique national", secours: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80' },
  { categorie: 'Conseil', date: '28 mai 2026', titre: 'Adoption du projet de loi de finances 2026', secours: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
  { categorie: 'Audience', date: '21 mai 2026', titre: 'Rencontre avec les acteurs du secteur privé national', secours: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80' },
];
// =============================================================================

export default function ActusSlider({ actus }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Données de l'API si fournies (forme { categorie, date, titre, secours }),
  // sinon repli sur les actualités de démo.
  const source = actus && actus.length ? actus : ACTUS;

  return (
    <Box
      sx={{
        backgroundColor: COLORS.bg,
        pt: { xs: 4, md: 5 },
        pb: { xs: 1, md: 1.5 },
        px: { xs: 2, md: 3 },
        '& .swiper-pagination-bullet': { backgroundColor: COLORS.muted, opacity: 0.5 },
        '& .swiper-pagination-bullet-active': { backgroundColor: '#E0A92E', opacity: 1 },
      }}
    >
      <Container maxWidth="lg">
        {/* En-tête + flèches */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Box>
            <Typography sx={{ color: COLORS.goldDark, fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}>
              Actualités
            </Typography>
            <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.7rem', md: '2.1rem' }, lineHeight: 1.1 }}>
              Dernières actualités
            </Typography>
            <Box sx={{ width: 72, height: 4, background: 'linear-gradient(90deg, #FB9344 0 33.33%, #ffffff 33.33% 66.66%, #00B16C 66.66% 100%)', borderRadius: 2, mt: 1.5 }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[{ ref: prevRef, icon: <ArrowBackIosNewIcon fontSize="small" />, label: 'Précédent' }, { ref: nextRef, icon: <ArrowForwardIosIcon fontSize="small" />, label: 'Suivant' }].map((b, i) => (
              <IconButton key={i} ref={b.ref} aria-label={b.label} sx={{ width: 46, height: 46, border: `1px solid ${COLORS.border}`, backgroundColor: '#fff', color: COLORS.blue, transition: 'all 0.2s ease', '&:hover': { backgroundColor: COLORS.blue, color: '#fff', borderColor: COLORS.blue } }}>
                {b.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, slidesPerGroup: 2 },
            900: { slidesPerView: 3, slidesPerGroup: 3 },
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          style={{ paddingBottom: 36 }}
        >
          {source.map((a, i) => (
            <SwiperSlide key={i} style={{ height: 'auto' }}>
              <Box
                component={Link}
                href="/actualites/dernieres"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  textDecoration: 'none',
                  backgroundColor: '#fff',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 16px 32px rgba(0,0,0,0.12)' },
                  '&:hover .as-img': { transform: 'scale(1.06)' },
                  '&:hover .as-titre': { color: COLORS.blue },
                  '&:hover .as-go': { gap: '10px' },
                }}
              >
                <Box sx={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                  <Box className="as-img" sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${a.secours})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: COLORS.blueDark, transition: 'transform 0.5s ease' }} />
                  <Chip label={a.categorie} size="small" sx={{ position: 'absolute', top: 12, left: 12, backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.66rem', borderRadius: 0.75 }} />
                </Box>
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: COLORS.muted, fontSize: '0.76rem', fontWeight: 600, mb: 0.75 }}>
                    <CalendarTodayIcon sx={{ fontSize: 13 }} /> {a.date}
                  </Box>
                  <Typography className="as-titre" component="h3" sx={{ fontWeight: 700, color: COLORS.ink, fontSize: '1rem', lineHeight: 1.3, mb: 1.5, transition: 'color 0.2s ease', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {a.titre}
                  </Typography>
                  <Box className="as-go" sx={{ mt: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px', color: COLORS.goldDark, fontWeight: 700, fontSize: '0.82rem', transition: 'gap 0.25s ease' }}>
                    Lire la suite <ArrowForwardIcon sx={{ fontSize: 17 }} />
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}
