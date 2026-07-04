import { Box, Container, Typography, Button } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CollectionsIcon from '@mui/icons-material/Collections';
import PersonIcon from '@mui/icons-material/Person';
import PageHero from '@/components/PageHero';
import PhotoGallery from '@/components/PhotoGallery';
import { ALBUM_MINISTRE } from '@/data/albumMinistre';
import { getMinistre, getAlbumMinistre } from '@/lib/api';

// ⚠️ Composant serveur : on utilise des couleurs LITTÉRALES (le CSS construit
// à partir des constantes du thème peut être supprimé du rendu serveur).
const C = {
  blue: '#004080',
  blueDark: '#002B55',
  bg: '#EEF1F5',
  ink: '#37474F',
};
const GOLD = '#E0A92E';
const TRICOLOR = 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)';

export const metadata = {
  title: 'Album photo du Ministre — Ministère des Finances du Niger',
  description:
    "Album photo du Ministre de l'Économie et des Finances de la République du Niger : portraits, activités, audiences et cérémonies officielles.",
};

// Repli identité (si l'API /api/ministre/ est indisponible).
const MINISTRE_FALLBACK = {
  nom: 'Docteur Maman Laouali ABDOU RAFA',
  fonction: "Ministre de l'Économie et des Finances",
  image: '/DrRafa.jpeg',
  etiquette: 'Le Ministre',
};

export default async function Page() {
  const [m0, album0] = await Promise.all([getMinistre(), getAlbumMinistre()]);
  const m = m0 || MINISTRE_FALLBACK;
  const portrait = m.image || MINISTRE_FALLBACK.image;

  // Repli sur les données de démo si l'API est vide/indisponible.
  const album = album0 && album0.length ? album0 : ALBUM_MINISTRE;
  const nbPhotos = album.length;
  const nbThemes = new Set(album.map((p) => p.categorie)).size;

  return (
    <>
      <PageHero
        surtitre="Le Ministère"
        titre="Album photo du Ministre"
        sousTitre="Les temps forts de l'action du Ministre en images. Cliquez sur une photo pour la parcourir en plein écran."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Album photo du Ministre' },
        ]}
      />

      <Box sx={{ backgroundColor: C.bg, py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg" disableGutters>
          {/* ===== Bandeau d'identité du Ministre =====
              backgroundColor solide = filet de sécurité si le dégradé est
              retiré du CSS serveur → le texte blanc reste toujours lisible. */}
          <Box
            sx={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
              backgroundColor: C.blueDark,
              background: `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 44px rgba(0,0,0,0.16)',
              mb: { xs: 4, md: 6 },
            }}
          >
            {/* Filigrane décoratif */}
            <PhotoCameraIcon
              sx={{
                position: 'absolute',
                right: -20,
                bottom: -24,
                fontSize: 220,
                color: 'rgba(255,255,255,0.05)',
                pointerEvents: 'none',
                display: { xs: 'none', md: 'block' },
              }}
            />

            {/* Portrait */}
            <Box
              sx={{
                position: 'relative',
                minHeight: { xs: 300, md: 320 },
                backgroundColor: C.blueDark,
                backgroundImage: `url(${portrait})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            >
              <Box sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 5, background: TRICOLOR, display: { xs: 'none', md: 'block' } }} />
              <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: TRICOLOR, display: { xs: 'block', md: 'none' } }} />
            </Box>

            {/* Identité */}
            <Box sx={{ position: 'relative', p: { xs: 3, md: 5 }, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography sx={{ color: GOLD, fontWeight: 800, letterSpacing: '0.16em', fontSize: '0.72rem', mb: 1 }}>
                {(m.etiquette || 'LE MINISTRE').toUpperCase()} · ALBUM OFFICIEL
              </Typography>
              <Typography component="h2" sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1.12 }}>
                {m.nom}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500, fontSize: { xs: '0.95rem', md: '1.05rem' }, mt: 0.8 }}>
                {m.fonction}
              </Typography>

              <Box sx={{ width: 64, height: 4, borderRadius: 2, background: TRICOLOR, my: 2.4 }} />

              <Typography sx={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 560 }}>
                Album officiel rassemblant les temps forts de l'action du Ministre : portraits,
                activités, audiences avec les partenaires et cérémonies officielles.
              </Typography>

              {/* Stats + bouton */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 2, md: 3 }, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#fff' }}>
                  <CollectionsIcon sx={{ color: GOLD, fontSize: 22 }} />
                  <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem' }}>
                    {nbPhotos} <Box component="span" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>photos</Box>
                  </Typography>
                </Box>
                <Box sx={{ width: 1, height: 26, backgroundColor: 'rgba(255,255,255,0.25)', display: { xs: 'none', sm: 'block' } }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#fff' }}>
                  <PhotoCameraIcon sx={{ color: GOLD, fontSize: 22 }} />
                  <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem' }}>
                    {nbThemes} <Box component="span" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>thèmes</Box>
                  </Typography>
                </Box>
                <Button
                  component="a"
                  href="/le-ministere/ministre"
                  variant="contained"
                  startIcon={<PersonIcon />}
                  sx={{
                    ml: { sm: 'auto' },
                    backgroundColor: GOLD,
                    color: C.blueDark,
                    fontWeight: 700,
                    '&:hover': { backgroundColor: '#C8961F' },
                  }}
                >
                  Biographie du Ministre
                </Button>
              </Box>
            </Box>
          </Box>

          {/* ===== Galerie ===== */}
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, mb: { xs: 2.5, md: 3 } }}>
            <Box sx={{ width: 34, height: 4, borderRadius: 2, background: TRICOLOR }} />
            <Typography sx={{ color: GOLD, fontWeight: 800, letterSpacing: '0.14em', fontSize: '0.72rem' }}>
              LES PHOTOS DE L'ALBUM
            </Typography>
          </Box>

          <PhotoGallery photos={album} />
        </Container>
      </Box>
    </>
  );
}
