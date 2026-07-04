import { Box, Container, Typography, IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import PageHero from '@/components/PageHero';
import { COLORS } from '@/theme';

// ⚠️ Liens PDF en '#' — déposer les DPPD dans public/dppd/<periode>/ et brancher les URL.
const INSTITUTIONS_2023_2025 = [
  'Présidence de la République du Niger (PRN)',
  'Service du Premier Ministre (PM)',
  'Ministère des Transports',
  'Ministère du Plan',
  'Ministère de la Jeunesse et du Sport',
  'Ministère de la Justice',
  "Ministère de l'Intérieur et de la Décentralisation",
  "Ministère de l'Hydraulique et de l'Assainissement",
  'Ministère des Finances',
  "Ministère de l'Enseignement Supérieur et de la Recherche",
  "Ministère de l'Équipement",
  "Ministère de l'Éducation Nationale",
  "Ministère de l'Élevage",
  'Ministère de la Défense Nationale',
  "Ministère de la Culture, du Tourisme et de l'Artisanat",
  "Ministère de l'Action Humanitaire et de la Gestion des Catastrophes",
];

const DPPD = {
  '2023-2025': INSTITUTIONS_2023_2025,
};

export function generateStaticParams() {
  return [{ periode: '2023-2025' }];
}

export async function generateMetadata({ params }) {
  const { periode } = await params;
  return { title: `DPPD ${periode} — Ministère des Finances du Niger` };
}

export default async function Page({ params }) {
  const { periode } = await params;
  const items = DPPD[periode] || [];

  return (
    <>
      <PageHero
        surtitre={`DPPD ${periode}`}
        titre={`Programmation pluriannuelle ${periode}`}
        sousTitre="Sélectionnez une institution pour consulter ou télécharger son document de programmation pluriannuelle des dépenses."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Budget', href: '/budget' },
          { label: 'DPPD', href: '/budget/dppd' },
          { label: periode },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          {items.length === 0 ? (
            <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, p: { xs: 3, md: 5 }, textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.2rem', mb: 1 }}>Documents en cours de mise en ligne</Typography>
              <Typography sx={{ color: COLORS.muted }}>Les DPPD de la période {periode} seront publiés prochainement.</Typography>
            </Box>
          ) : (
            <>
              <Typography sx={{ color: COLORS.muted, fontWeight: 600, fontSize: '0.9rem', mb: 2 }}>
                {items.length} institutions
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.5 }}>
                {items.map((nom, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      backgroundColor: '#fff',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 2,
                      p: 1.5,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 22px rgba(0,0,0,0.08)', borderColor: '#E0A92E' },
                    }}
                  >
                    <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: 1.5, backgroundColor: 'rgba(211,47,47,0.10)', color: '#d32f2f', display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 24 } }}>
                      <PictureAsPdfIcon />
                    </Box>
                    <Typography sx={{ flex: 1, fontWeight: 700, color: COLORS.ink, fontSize: '0.88rem', lineHeight: 1.35 }}>
                      {nom}
                    </Typography>
                    <IconButton component="a" href="#" target="_blank" rel="noopener noreferrer" aria-label="Consulter" size="small" sx={{ color: COLORS.blue }}>
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                    <IconButton component="a" href="#" download aria-label="Télécharger" size="small" sx={{ color: '#fff', backgroundColor: COLORS.blue, '&:hover': { backgroundColor: COLORS.blueHover } }}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </>
  );
}
