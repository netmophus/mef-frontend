import { Box, Container, Typography, Button, Chip } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PageHero from '@/components/PageHero';
import { getDiscours } from '@/lib/api';

// ⚠️ Composant serveur : couleurs LITTÉRALES (le CSS construit à partir des
// constantes du thème — surtout l'or — peut être supprimé du rendu serveur).
const C = {
  blue: '#004080',
  bg: '#EEF1F5',
  border: '#DCE3EC',
  gold: '#E0A92E',
  goldDark: '#B5841F',
};

export const metadata = {
  title: 'Discours — Ministère des Finances du Niger',
  description: "Discours et communications du Ministre de l'Économie et des Finances de la République du Niger.",
};

// Repli local (si l'API est indisponible).
const DISCOURS_FALLBACK = [
  { titre: 'Présentation de la Loi de Finances 2026', date: '15 janvier 2026', extrait: "Le Ministre a présenté les grandes orientations budgétaires de l'État pour l'exercice 2026, axées sur l'investissement productif et la soutenabilité de la dette.", pdf: '#' },
  { titre: 'Allocution à la clôture du Forum économique national', date: '20 novembre 2025', extrait: "Bilan des travaux du Forum et perspectives de relance de l'économie nationale en partenariat avec le secteur privé.", pdf: '#' },
  { titre: 'Discours sur les réformes des finances publiques', date: '10 septembre 2025', extrait: "Point d'étape sur la modernisation de la chaîne de la dépense et la dématérialisation des procédures (e-SECeF, DGI en ligne).", pdf: '#' },
  { titre: "Communication sur l'exécution budgétaire du 1er semestre", date: '5 juillet 2025', extrait: "Présentation des résultats d'exécution du budget de l'État au premier semestre 2025 et des mesures de pilotage retenues.", pdf: '#' },
];

export default async function Page() {
  const data = (await getDiscours()) || DISCOURS_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Le Ministère"
        titre="Discours"
        sousTitre="Les discours et communications officielles du Ministre."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Discours' },
        ]}
      />

      <Box sx={{ backgroundColor: C.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 2.5 } }}>
            {data.map((d, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: '#fff',
                  border: `1px solid ${C.border}`,
                  borderLeft: `4px solid ${C.gold}`,
                  borderRadius: 3,
                  boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
                  p: { xs: 2.5, md: 3 },
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                  '&:hover': { boxShadow: '0 16px 32px rgba(0,0,0,0.12)', transform: 'translateY(-2px)' },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Chip
                      icon={<CalendarTodayIcon sx={{ fontSize: '14px !important' }} />}
                      label={d.date}
                      size="small"
                      sx={{ backgroundColor: C.bg, color: C.goldDark, fontWeight: 700, mb: 1 }}
                    />
                    <Typography component="h2" sx={{ fontWeight: 800, color: C.blue, fontSize: '1.1rem', lineHeight: 1.3 }}>
                      {d.titre}
                    </Typography>
                    {d.extrait && (
                      <Typography sx={{ color: '#455a64', fontSize: '0.92rem', lineHeight: 1.7, mt: 1 }}>
                        {d.extrait}
                      </Typography>
                    )}
                  </Box>
                </Box>
                {d.pdf && (
                  <Button
                    component="a"
                    href={d.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<PictureAsPdfIcon />}
                    sx={{
                      mt: 2,
                      borderColor: C.blue,
                      color: C.blue,
                      fontWeight: 700,
                      '&:hover': { backgroundColor: C.blue, borderColor: C.blue, color: '#fff' },
                    }}
                  >
                    Lire le discours (PDF)
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
