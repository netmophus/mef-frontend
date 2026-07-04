import { Box, Container, Typography, IconButton, Chip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import PageHero from '@/components/PageHero';
import { getBudgetDocuments } from '@/lib/api';

const C = {
  blue: '#004080',
  blueHover: '#003366',
  ink: '#37474F',
  muted: '#90A4AE',
  bg: '#EEF1F5',
  border: '#DCE3EC',
};

export async function generateMetadata({ params }) {
  const { annee } = await params;
  return { title: `Lois de finances ${annee} — Ministère des Finances du Niger` };
}

export default async function Page({ params }) {
  const { annee } = await params;
  const data = await getBudgetDocuments('lois-de-finances', annee);
  const documents = data?.documents || [];

  return (
    <>
      <PageHero
        surtitre="Budget"
        titre={`Lois de finances ${annee}`}
        sousTitre="Textes de loi de finances et lois rectificatives de l'année. Cliquez pour consulter ou télécharger."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Budget', href: '/budget' },
          { label: 'Lois de finances', href: '/budget/lois-de-finances' },
          { label: annee },
        ]}
      />

      <Box sx={{ backgroundColor: C.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="md">
          {documents.length === 0 ? (
            <Box sx={{ backgroundColor: '#fff', border: `1px solid ${C.border}`, borderRadius: 3, p: { xs: 3, md: 5 }, textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 800, color: C.blue, fontSize: '1.2rem', mb: 1 }}>
                Documents en cours de mise en ligne
              </Typography>
              <Typography sx={{ color: C.muted }}>
                Les textes de loi de finances {annee} seront publiés prochainement.
              </Typography>
            </Box>
          ) : (
            <>
              <Typography sx={{ color: C.muted, fontWeight: 600, fontSize: '0.9rem', mb: 2 }}>
                {documents.length} document{documents.length > 1 ? 's' : ''}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {documents.map((doc, i) => {
                  const href = doc.pdf || '#';
                  return (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.75,
                        backgroundColor: '#fff',
                        border: `1px solid ${C.border}`,
                        borderRadius: 2.5,
                        p: { xs: 1.75, md: 2 },
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 26px rgba(0,0,0,0.09)', borderColor: '#E0A92E' },
                      }}
                    >
                      <Box sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: 1.5, backgroundColor: 'rgba(211,47,47,0.10)', color: '#d32f2f', display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 26 } }}>
                        <PictureAsPdfIcon />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 700, color: C.ink, fontSize: '0.95rem', lineHeight: 1.35 }}>
                          {doc.titre}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                          {doc.type && (
                            <Chip label={doc.type} size="small" sx={{ height: 20, fontWeight: 700, fontSize: '0.66rem', backgroundColor: 'rgba(0,64,128,0.08)', color: C.blue }} />
                          )}
                          {doc.date && <Typography sx={{ color: C.muted, fontSize: '0.78rem' }}>{doc.date}</Typography>}
                        </Box>
                      </Box>
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
