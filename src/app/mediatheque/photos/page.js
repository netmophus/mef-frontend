import { Box, Container, Typography } from '@mui/material';
import PageHero from '@/components/PageHero';
import { GALERIE_PHOTOS } from '@/data/galeriePhotos';
import { getPhotos } from '@/lib/api';
import { COLORS } from '@/theme';

export const metadata = {
  title: 'Photos — Médiathèque — Ministère des Finances du Niger',
  description: 'Galerie photo du Ministère de l\'Économie et des Finances de la République du Niger.',
};

export default async function Page() {
  const data = await getPhotos();
  const PHOTOS = data && data.length ? data : GALERIE_PHOTOS;

  return (
    <>
      <PageHero
        surtitre="Médiathèque"
        titre="Photos"
        sousTitre="Les temps forts du Ministère en images. Cliquez sur une photo pour l'agrandir."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Médiathèque' },
          { label: 'Photos' },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: { xs: 1.5, md: 2 } }}>
            {PHOTOS.map((p, i) => (
              <Box
                key={i}
                component="a"
                href={p.src}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  position: 'relative',
                  display: 'block',
                  borderRadius: 2.5,
                  overflow: 'hidden',
                  aspectRatio: '4 / 3',
                  cursor: 'zoom-in',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                  '&:hover .ph-img': { transform: 'scale(1.08)' },
                  '&:hover .ph-cap': { opacity: 1 },
                }}
              >
                <Box className="ph-img" sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: COLORS.blueDark, transition: 'transform 0.5s ease' }} />
                <Box className="ph-cap" sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', p: 1.5, background: 'linear-gradient(0deg, rgba(0,28,56,0.85), rgba(0,0,0,0) 60%)', opacity: 0, transition: 'opacity 0.25s ease' }}>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem', lineHeight: 1.3 }}>{p.titre}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
