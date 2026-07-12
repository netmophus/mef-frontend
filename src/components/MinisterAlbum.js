'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { GALERIE_PHOTOS } from '@/data/galeriePhotos';
import { COLORS } from '@/theme';

// Page dédiée : Le Ministère › Album photo du Ministre.
const GALERIE_HREF = '/le-ministere/album-photo';

// === ALBUM PHOTO DU MINISTRE (accueil) =======================================
// L'album est le reflet de la galerie : même source de photos.
// On n'en montre qu'un APERÇU (les plus récentes) — la galerie complète
// /mediatheque/photos porte l'intégralité, même s'il y a 100 photos.
const APERCU = 6;
// =============================================================================

export default function MinisterAlbum({ photos }) {
  // Données de l'API si fournies, sinon repli sur la galerie de démo.
  const source = photos && photos.length ? photos : GALERIE_PHOTOS;
  const PHOTOS = source.slice(0, APERCU);
  const N = PHOTOS.length;

  const [index, setIndex] = useState(0);
  const go = (dir) => setIndex((i) => (i + dir + N) % N);

  return (
    <Box sx={{ height: { xs: 'auto', md: '100%' }, display: 'flex', flexDirection: 'column' }}>
      {/* En-tête + flèches */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography sx={{ color: COLORS.goldDark, fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}>
            Le Ministère
          </Typography>
          <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.6rem', md: '2rem' }, lineHeight: 1.1 }}>
            Album photo du Ministre
          </Typography>
          <Box sx={{ width: 72, height: 4, background: 'linear-gradient(90deg, #FB9344 0 33.33%, #ffffff 33.33% 66.66%, #00B16C 66.66% 100%)', borderRadius: 2, mt: 1.5 }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[{ dir: -1, icon: <ArrowBackIosNewIcon fontSize="small" />, label: 'Précédent' }, { dir: 1, icon: <ArrowForwardIosIcon fontSize="small" />, label: 'Suivant' }].map((b) => (
            <IconButton key={b.label} onClick={() => go(b.dir)} aria-label={b.label} sx={{ width: 42, height: 42, border: `1px solid ${COLORS.border}`, backgroundColor: '#fff', color: COLORS.blue, '&:hover': { backgroundColor: COLORS.blue, color: '#fff', borderColor: COLORS.blue } }}>
              {b.icon}
            </IconButton>
          ))}
        </Box>
      </Box>

      {/* Photo principale (cliquable → galerie) — remplit la carte Ministre en md+ */}
      <Box
        component={Link}
        href={GALERIE_HREF}
        aria-label="Voir l'album photo du Ministre"
        sx={{
          display: 'block',
          flex: { md: 1 },
          minHeight: 0,
          height: { xs: 320, sm: 380, md: 'auto' },
          position: 'relative',
          borderRadius: 2.5,
          overflow: 'hidden',
          border: `1px solid ${COLORS.border}`,
          boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
          backgroundColor: COLORS.blueDark,
        }}
      >
        {/* Piste : N photos côte à côte, déplacée par translateX */}
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: `${N * 100}%`,
            transform: `translateX(-${(index * 100) / N}%)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {PHOTOS.map((p, i) => (
            <Box key={i} sx={{ width: `${100 / N}%`, height: '100%', position: 'relative' }}>
              <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.src})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,28,56,0.85) 0%, rgba(10,92,57,0.1) 45%, rgba(10,92,57,0) 100%)' }} />
              <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 0.6, backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800, fontSize: '0.62rem', letterSpacing: 0.5, textTransform: 'uppercase', px: 1, py: 0.4, borderRadius: 0.75 }}>
                <PhotoLibraryIcon sx={{ fontSize: 13 }} /> Album
              </Box>
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5 }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                  {p.titre}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  );
}
