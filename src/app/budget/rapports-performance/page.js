import { Box, Container, Typography } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageHero from '@/components/PageHero';
import { COLORS } from '@/theme';
import { getBudgetAnnees } from '@/lib/api';

export const metadata = {
  title: 'Rapports Annuels de Performance (RAP) — Ministère des Finances du Niger',
  description: "Rapports Annuels de Performance par institution et par année (Budget Programme).",
};

// Repli local (si l'API est indisponible).
const ANNEES_FALLBACK = [{ annee: 2025 }, { annee: 2023 }, { annee: 2021 }];
const ACCENT = '#7A5BA6';

export default async function Page() {
  const data = await getBudgetAnnees('rapports-performance');
  const annees = data?.annees?.length ? data.annees : ANNEES_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Budget"
        titre="Rapports Annuels de Performance (RAP)"
        sousTitre="Les rapports annuels de performance, par institution et par année, dans le cadre du Budget Programme."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Budget', href: '/budget' },
          { label: 'Rapports Annuels de Performance' },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', p: { xs: 2.5, md: 3 }, mb: { xs: 3, md: 3.5 } }}>
            <Typography sx={{ color: '#455a64', lineHeight: 1.75 }}>
              Les <strong>Rapports Annuels de Performance (RAP)</strong> rendent compte, pour chaque institution et
              ministère, des résultats obtenus au regard des objectifs du Budget Programme. Sélectionnez une année.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {annees.map(({ annee, n }) => (
              <Box
                key={annee}
                component="a"
                href={`/budget/rapports-performance/${annee}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  backgroundColor: '#fff',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 3,
                  p: 3,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 16px 32px ${ACCENT}26`, borderColor: ACCENT },
                  '&:hover .rap-go': { gap: '10px' },
                }}
              >
                <Box sx={{ width: 52, height: 52, borderRadius: 2, backgroundColor: `${ACCENT}1A`, color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, '& svg': { fontSize: 30 } }}>
                  <AssessmentIcon />
                </Box>
                <Typography sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.8rem', lineHeight: 1 }}>{annee}</Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: '0.86rem', mt: 0.75, mb: 2 }}>
                  {n ? `${n} institution${n > 1 ? 's' : ''}` : 'Rapports par institution'}
                </Typography>
                <Box className="rap-go" sx={{ mt: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px', color: ACCENT, fontWeight: 800, fontSize: '0.85rem', transition: 'gap 0.25s ease' }}>
                  Consulter <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
