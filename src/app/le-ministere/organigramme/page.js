import { Box, Container, Typography, Button } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DownloadIcon from '@mui/icons-material/Download';
import PageHero from '@/components/PageHero';
import { COLORS } from '@/theme';

export const metadata = {
  title: 'Organigramme — Ministère des Finances du Niger',
  description: "Organigramme du Ministère de l'Économie et des Finances de la République du Niger (2023-2024).",
};

const IMG = '/organigramme.jpg';
const PDF = '/ORGANIGRAMME-VF-2023-2024.pdf';

export default function Page() {
  return (
    <>
      <PageHero
        surtitre="Le Ministère"
        titre="Organigramme"
        sousTitre="Organisation du Ministère de l'Économie et des Finances (Décret n°2023-179 du 14 octobre 2023)."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Organigramme' },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: '#fff',
              border: `1px solid ${COLORS.border}`,
              borderRadius: 3,
              boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Barre d'actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', px: { xs: 2, md: 3 }, py: 2, borderBottom: `1px solid ${COLORS.border}` }}>
              <Box sx={{ width: 42, height: 42, borderRadius: 1.5, backgroundColor: 'rgba(12,116,73,0.08)', color: COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 24 } }}>
                <AccountTreeIcon />
              </Box>
              <Box sx={{ flex: 1, minWidth: 180 }}>
                <Typography sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.05rem', lineHeight: 1.2 }}>
                  Organigramme 2023-2024
                </Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: '0.8rem' }}>Document officiel · cliquez sur l&apos;image pour agrandir</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button component="a" href={IMG} target="_blank" rel="noopener noreferrer" variant="outlined" startIcon={<ZoomInIcon />} sx={{ borderColor: COLORS.blue, color: COLORS.blue, fontWeight: 700, '&:hover': { backgroundColor: COLORS.blue, color: '#fff', borderColor: COLORS.blue } }}>
                  Agrandir
                </Button>
                <Button component="a" href={PDF} download variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: COLORS.blue, fontWeight: 700, boxShadow: 'none', '&:hover': { backgroundColor: COLORS.blueHover } }}>
                  Télécharger
                </Button>
              </Box>
            </Box>

            {/* Image de l'organigramme (cliquable pour agrandir) */}
            <Box component="a" href={IMG} target="_blank" rel="noopener noreferrer" sx={{ display: 'block', backgroundColor: '#f1f4f8', cursor: 'zoom-in' }}>
              <Box
                component="img"
                src={IMG}
                alt="Organigramme du Ministère de l'Économie et des Finances (2023-2024)"
                sx={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </Box>
          </Box>

          <Typography sx={{ color: COLORS.muted, fontSize: '0.82rem', mt: 2, textAlign: 'center' }}>
            Cliquez sur l&apos;organigramme (ou « Agrandir ») pour l&apos;ouvrir en grand, ou « Télécharger » pour le PDF officiel.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
