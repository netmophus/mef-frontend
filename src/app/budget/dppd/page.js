import { Box, Container, Typography } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageHero from '@/components/PageHero';
import { COLORS } from '@/theme';

export const metadata = {
  title: 'DPPD — Documents de Programmation Pluriannuelle des Dépenses — Ministère des Finances du Niger',
  description: "Documents de Programmation Pluriannuelle des Dépenses (DPPD) par période et par institution.",
};

const PERIODES = [{ periode: '2023-2025', n: 16 }];
const ACCENT = '#1F8E8C';

export default function Page() {
  return (
    <>
      <PageHero
        surtitre="Budget"
        titre="Programmation pluriannuelle (DPPD)"
        sousTitre="Documents de Programmation Pluriannuelle des Dépenses, par période et par institution."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Budget', href: '/budget' },
          { label: 'DPPD' },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', p: { xs: 2.5, md: 3 }, mb: { xs: 3, md: 3.5 } }}>
            <Typography sx={{ color: '#455a64', lineHeight: 1.75 }}>
              Les <strong>Documents de Programmation Pluriannuelle des Dépenses (DPPD)</strong> présentent, pour chaque
              ministère et institution, la programmation triennale des dépenses. Sélectionnez une période.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {PERIODES.map(({ periode, n }) => (
              <Box
                key={periode}
                component="a"
                href={`/budget/dppd/${periode}`}
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
                  '&:hover .dppd-go': { gap: '10px' },
                }}
              >
                <Box sx={{ width: 52, height: 52, borderRadius: 2, backgroundColor: `${ACCENT}1A`, color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, '& svg': { fontSize: 30 } }}>
                  <LayersIcon />
                </Box>
                <Typography sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.5rem', lineHeight: 1.1 }}>DPPD {periode}</Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: '0.86rem', mt: 0.75, mb: 2 }}>{n} documents</Typography>
                <Box className="dppd-go" sx={{ mt: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px', color: ACCENT, fontWeight: 800, fontSize: '0.85rem', transition: 'gap 0.25s ease' }}>
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
