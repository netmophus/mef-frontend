import { Box, Container, Typography } from '@mui/material';
import { COLORS } from '@/theme';

// Galerie de portraits réutilisable.
// personnes = [{ nom, desc, image?, secours? }]
function img(m) {
  const c = [];
  if (m.image) c.push(`url(${m.image})`);
  if (m.secours) c.push(`url(${m.secours})`);
  return c.join(', ');
}

export default function MinistersGallery({ personnes = [] }) {
  return (
    <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {personnes.map((m, i) => (
            <Box
              key={i}
              sx={{
                backgroundColor: '#fff',
                border: `1px solid ${COLORS.border}`,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 22px rgba(0,0,0,0.07)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 16px 32px rgba(0,0,0,0.12)' },
                '&:hover .mg-img': { transform: 'scale(1.05)' },
              }}
            >
              <Box sx={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', backgroundColor: COLORS.blueDark }}>
                <Box
                  className="mg-img"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: img(m),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FB9344 0 33.33%, #ffffff 33.33% 66.66%, #00B16C 66.66% 100%)' }} />
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '0.98rem', lineHeight: 1.25 }}>
                  {m.nom}
                </Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: '0.82rem', mt: 0.5, lineHeight: 1.4 }}>
                  {m.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
