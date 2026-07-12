'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { COLORS, TRICOLOR } from '@/theme';

// Galerie photo moderne (album) en grille uniforme + lightbox plein écran.
// Photos regroupées par onglets de catégorie (sans onglet « Toutes »).
// Navigation clavier (← → Échap) et au clic dans la lightbox.
// `photos` : [{ titre, src, categorie, date }]
export default function PhotoGallery({ photos = [] }) {
  // Onglets = catégories présentes, dans leur ordre d'apparition.
  const categories = useMemo(() => {
    const vues = [];
    photos.forEach((p) => {
      if (p.categorie && !vues.includes(p.categorie)) vues.push(p.categorie);
    });
    return vues;
  }, [photos]);

  const [onglet, setOnglet] = useState(categories[0] || '');
  const liste = useMemo(
    () => photos.filter((p) => p.categorie === onglet),
    [photos, onglet],
  );

  // Index de la photo ouverte dans la lightbox (null = fermée).
  const [ouvert, setOuvert] = useState(null);
  const fermer = useCallback(() => setOuvert(null), []);
  const aller = useCallback(
    (dir) => setOuvert((i) => (i === null ? i : (i + dir + liste.length) % liste.length)),
    [liste.length],
  );

  // Change d'onglet : on referme la lightbox pour éviter un index hors-groupe.
  const choisirOnglet = useCallback((c) => {
    setOuvert(null);
    setOnglet(c);
  }, []);

  // Navigation clavier quand la lightbox est ouverte.
  useEffect(() => {
    if (ouvert === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') fermer();
      else if (e.key === 'ArrowRight') aller(1);
      else if (e.key === 'ArrowLeft') aller(-1);
    };
    window.addEventListener('keydown', onKey);
    // Bloque le défilement de la page derrière la lightbox.
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [ouvert, fermer, aller]);

  const photoActive = ouvert !== null ? liste[ouvert] : null;

  return (
    <>
      {/* Onglets de catégorie */}
      {categories.length > 1 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: { xs: 3, md: 4 } }}>
          {categories.map((c) => {
            const actif = c === onglet;
            return (
              <Box
                key={c}
                component="button"
                onClick={() => choisirOnglet(c)}
                sx={{
                  cursor: 'pointer',
                  font: 'inherit',
                  px: 2,
                  py: 0.8,
                  borderRadius: '999px',
                  border: `1px solid ${actif ? COLORS.blue : COLORS.border}`,
                  backgroundColor: actif ? COLORS.blue : '#fff',
                  color: actif ? '#fff' : COLORS.ink,
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: COLORS.blue, color: actif ? '#fff' : COLORS.blue },
                }}
              >
                {c}
              </Box>
            );
          })}
        </Box>
      )}

      {/* Grille uniforme — toutes les photos au même format (album). */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 1.2, md: 2 },
        }}
      >
        {liste.map((p, i) => {
          return (
            <Box
              key={`${p.src}-${i}`}
              component="button"
              onClick={() => setOuvert(i)}
              aria-label={`Agrandir : ${p.titre}`}
              sx={{
                cursor: 'zoom-in',
                p: 0,
                border: 'none',
                position: 'relative',
                display: 'block',
                width: '100%',
                aspectRatio: '4 / 3',
                borderRadius: { xs: 2, md: 2.5 },
                overflow: 'hidden',
                backgroundColor: COLORS.blueDark,
                boxShadow: '0 6px 18px rgba(0,0,0,0.10)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 30px rgba(0,0,0,0.16)' },
                '&:hover .pg-img': { transform: 'scale(1.08)' },
                '&:hover .pg-date': { opacity: 1, transform: 'translateY(0)' },
                '&:hover .pg-zoom': { opacity: 1, transform: 'translateY(0)' },
              }}
            >
              <Box
                className="pg-img"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${p.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  transition: 'transform 0.5s ease',
                }}
              />

              {/* Étiquette de catégorie (toujours visible) */}
              {p.categorie && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    px: 1.1,
                    py: 0.35,
                    borderRadius: 999,
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    color: COLORS.blue,
                    fontWeight: 800,
                    fontSize: '0.6rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  {p.categorie}
                </Box>
              )}

              {/* Loupe au survol */}
              <Box
                className="pg-zoom"
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  color: COLORS.blue,
                  opacity: 0,
                  transform: 'translateY(-6px)',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                }}
              >
                <ZoomInIcon fontSize="small" />
              </Box>

              {/* Légende (titre toujours visible, date au survol) */}
              <Box
                className="pg-cap"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  p: { xs: 1.2, md: 1.5 },
                  background:
                    'linear-gradient(0deg, rgba(0,28,56,0.92) 0%, rgba(0,28,56,0.45) 38%, rgba(0,0,0,0) 70%)',
                  textAlign: 'left',
                }}
              >
                {p.date && (
                  <Typography
                    className="pg-date"
                    sx={{
                      color: '#FFD479',
                      fontWeight: 700,
                      fontSize: '0.66rem',
                      letterSpacing: '0.03em',
                      mb: 0.3,
                      opacity: 0,
                      transform: 'translateY(4px)',
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                    }}
                  >
                    {p.date}
                  </Typography>
                )}
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: { xs: '0.76rem', md: '0.85rem' },
                    lineHeight: 1.25,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {p.titre}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Lightbox */}
      {photoActive && (
        <Box
          onClick={fermer}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1300,
            backgroundColor: 'rgba(3, 16, 30, 0.92)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, md: 5 },
          }}
        >
          {/* Fermer */}
          <IconButton
            onClick={fermer}
            aria-label="Fermer"
            sx={{
              position: 'absolute',
              top: { xs: 12, md: 24 },
              right: { xs: 12, md: 24 },
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.12)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Précédent */}
          {liste.length > 1 && (
            <IconButton
              onClick={(e) => { e.stopPropagation(); aller(-1); }}
              aria-label="Photo précédente"
              sx={{
                position: 'absolute',
                left: { xs: 6, md: 24 },
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.12)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          {/* Image + légende (le clic dessus ne ferme pas) */}
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{ maxWidth: 1100, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Box
              component="img"
              src={photoActive.src}
              alt={photoActive.titre}
              sx={{
                maxWidth: '100%',
                maxHeight: { xs: '70vh', md: '78vh' },
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              }}
            />
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Box sx={{ width: 56, height: 4, borderRadius: 2, background: TRICOLOR, mx: 'auto', mb: 1.2 }} />
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
                {photoActive.titre}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', mt: 0.5 }}>
                {photoActive.categorie ? `${photoActive.categorie} · ` : ''}
                {photoActive.date ? `${photoActive.date} · ` : ''}
                {ouvert + 1} / {liste.length}
              </Typography>
            </Box>
          </Box>

          {/* Suivant */}
          {liste.length > 1 && (
            <IconButton
              onClick={(e) => { e.stopPropagation(); aller(1); }}
              aria-label="Photo suivante"
              sx={{
                position: 'absolute',
                right: { xs: 6, md: 24 },
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.12)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </Box>
      )}
    </>
  );
}
