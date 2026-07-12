import { Box, Container, Typography, IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import PageHero from '@/components/PageHero';
import { getBudgetDocuments } from '@/lib/api';

const C = {
  blue: '#0C7449',
  blueHover: '#0A5C3A',
  ink: '#37474F',
  muted: '#90A4AE',
  bg: '#EEF1F5',
  border: '#DCE3EC',
};

export async function generateMetadata({ params }) {
  const { annee } = await params;
  return { title: `RAP ${annee} — Ministère des Finances du Niger` };
}

export default async function Page({ params }) {
  const { annee } = await params;
  const data = await getBudgetDocuments('rapports-performance', annee);
  const items = data?.documents || [];

  return (
    <>
      <PageHero
        surtitre={`RAP ${annee}`}
        titre={`Rapports Annuels de Performance ${annee}`}
        sousTitre="Sélectionnez une institution pour consulter ou télécharger son rapport annuel de performance."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Budget', href: '/budget' },
          { label: 'RAP', href: '/budget/rapports-performance' },
          { label: annee },
        ]}
      />

      <Box sx={{ backgroundColor: C.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          {items.length === 0 ? (
            <Box sx={{ backgroundColor: '#fff', border: `1px solid ${C.border}`, borderRadius: 3, p: { xs: 3, md: 5 }, textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 800, color: C.blue, fontSize: '1.2rem', mb: 1 }}>Rapports en cours de mise en ligne</Typography>
              <Typography sx={{ color: C.muted }}>Les rapports annuels de performance {annee} seront publiés prochainement.</Typography>
            </Box>
          ) : (
            <>
              <Typography sx={{ color: C.muted, fontWeight: 600, fontSize: '0.9rem', mb: 2 }}>
                {items.length} institution{items.length > 1 ? 's' : ''}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.5 }}>
                {items.map((doc, i) => {
                  const href = doc.pdf || '#';
                  return (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        backgroundColor: '#fff',
                        border: `1px solid ${C.border}`,
                        borderRadius: 2,
                        p: 1.5,
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 22px rgba(0,0,0,0.08)', borderColor: '#E0A92E' },
                      }}
                    >
                      <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: 1.5, backgroundColor: 'rgba(211,47,47,0.10)', color: '#d32f2f', display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 24 } }}>
                        <PictureAsPdfIcon />
                      </Box>
                      <Typography sx={{ flex: 1, fontWeight: 700, color: C.ink, fontSize: '0.88rem', lineHeight: 1.35 }}>
                        {doc.titre}
                      </Typography>
                      <IconButton component="a" href={href} target="_blank" rel="noopener noreferrer" aria-label="Consulter" size="small" sx={{ color: C.blue }}>
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                      <IconButton component="a" href={href} download aria-label="Télécharger" size="small" sx={{ color: '#fff', backgroundColor: C.blue, '&:hover': { backgroundColor: C.blueHover } }}>
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </>
  );
}
