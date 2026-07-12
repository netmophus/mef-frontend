import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { COLORS } from '@/theme';

// Bandeau d'en-tête réutilisable pour les pages internes.
// fil = [{ label, href? }] — le dernier élément (sans href) est la page courante.
export default function PageHero({ surtitre, titre, sousTitre, fil = [] }) {
  return (
    <Box
      sx={{
        position: 'relative',
        color: '#fff',
        background: 'linear-gradient(120deg, #0A5C3A 0%, #0C7449 65%, #084C30 100%)',
        px: { xs: 2, md: 3 },
        pt: { xs: 4, md: 6 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Fil d'Ariane */}
        {fil.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0.75, mb: 1.5, fontSize: '0.82rem' }}>
            {fil.map((f, i) => (
              <Box key={i} component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                {f.href ? (
                  <Link href={f.href} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                    {f.label}
                  </Link>
                ) : (
                  <Box component="span" sx={{ color: '#E0A92E', fontWeight: 700 }}>{f.label}</Box>
                )}
                {i < fil.length - 1 && <Box component="span" sx={{ color: 'rgba(255,255,255,0.4)' }}>/</Box>}
              </Box>
            ))}
          </Box>
        )}

        {surtitre && (
          <Typography sx={{ color: '#E0A92E', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}>
            {surtitre}
          </Typography>
        )}
        <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.1 }}>
          {titre}
        </Typography>
        {sousTitre && (
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', mt: 1, maxWidth: 720, fontSize: '1rem' }}>
            {sousTitre}
          </Typography>
        )}
        <Box sx={{ width: 80, height: 4, background: 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)', borderRadius: 2, mt: 2 }} />
      </Container>
    </Box>
  );
}
