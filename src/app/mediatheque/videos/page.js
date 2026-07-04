import { Box, Container, Typography, Chip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PageHero from '@/components/PageHero';
import { getVideos } from '@/lib/api';
import { COLORS } from '@/theme';

export const metadata = {
  title: 'Vidéos — Médiathèque — Ministère des Finances du Niger',
  description: "Vidéos du Ministère de l'Économie et des Finances de la République du Niger.",
};

// Repli local (si l'API est indisponible). ⚠️ Visuels Unsplash de démo.
const VIDEOS_FALLBACK = [
  { titre: 'Présentation de la Loi de Finances 2025', date: '12 juin 2026', duree: '4:35', secours: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80' },
  { titre: 'Conférence de presse du Ministre des Finances', date: '6 juin 2026', duree: '8:12', secours: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80' },
  { titre: "Cérémonie de signature d'accords de financement", date: '2 juin 2026', duree: '3:48', secours: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
  { titre: "Forum économique national — séance d'ouverture", date: '28 mai 2026', duree: '6:20', secours: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80' },
  { titre: 'Audience avec les partenaires techniques et financiers', date: '21 mai 2026', duree: '5:02', secours: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80' },
  { titre: 'Lancement de la campagne de mobilisation des recettes', date: '14 mai 2026', duree: '2:57', secours: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
];

export default async function Page() {
  const data = await getVideos();
  const VIDEOS = data && data.length ? data : VIDEOS_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Médiathèque"
        titre="Vidéos"
        sousTitre="Reportages, discours et temps forts en vidéo."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Médiathèque' },
          { label: 'Vidéos' },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 2.5, md: 3 } }}>
            {VIDEOS.map((v, i) => (
              <Box
                key={i}
                component="a"
                href={v.lien || '#'}
                target={v.lien && v.lien !== '#' ? '_blank' : undefined}
                rel={v.lien && v.lien !== '#' ? 'noopener noreferrer' : undefined}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  backgroundColor: '#fff',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 16px 32px rgba(0,0,0,0.12)' },
                  '&:hover .vd-img': { transform: 'scale(1.06)' },
                  '&:hover .vd-play': { backgroundColor: '#E0A92E', color: COLORS.blueDark },
                  '&:hover .vd-titre': { color: COLORS.blue },
                }}
              >
                <Box sx={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                  <Box className="vd-img" sx={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(0deg, rgba(0,28,56,0.45), rgba(0,28,56,0.05)), url(${v.secours})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: COLORS.blueDark, transition: 'transform 0.5s ease' }} />
                  <Box className="vd-play" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.94)', color: COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(0,0,0,0.35)', transition: 'all 0.25s ease', '& svg': { fontSize: 34 } }}>
                    <PlayArrowIcon />
                  </Box>
                  <Chip label={v.duree} size="small" sx={{ position: 'absolute', bottom: 10, right: 10, height: 20, backgroundColor: 'rgba(0,0,0,0.72)', color: '#fff', fontWeight: 700, fontSize: '0.66rem' }} />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography className="vd-titre" component="h3" sx={{ fontWeight: 700, color: COLORS.ink, fontSize: '0.98rem', lineHeight: 1.3, mb: 0.75, transition: 'color 0.2s ease', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {v.titre}
                  </Typography>
                  <Typography sx={{ color: COLORS.muted, fontSize: '0.78rem' }}>{v.date}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
