import { Box, Container, Typography } from '@mui/material';
import PageHero from '@/components/PageHero';
import MacroIndicators from '@/components/MacroIndicators';
import { getIndicateurs } from '@/lib/api';

const C = { blue: '#0C7449', ink: '#37474F', bg: '#EEF1F5' };
const GOLD = '#E0A92E';
const TRICOLOR = 'linear-gradient(90deg, #FB9344 0 33.33%, #ffffff 33.33% 66.66%, #00B16C 66.66% 100%)';

export const metadata = {
  title: 'Indicateurs macroéconomiques — Ministère des Finances du Niger',
  description: "Principaux indicateurs macroéconomiques de l'économie nigérienne : PIB, croissance, inflation, dette publique.",
};

export default async function Page() {
  const data = await getIndicateurs();
  // Repli : si l'API est indisponible, MacroIndicators utilise ses données démo internes.
  const grands = data?.grands?.length ? data.grands : undefined;
  const cles = data?.cles?.length ? data.cles : undefined;

  return (
    <>
      <PageHero
        surtitre="Économie nigérienne"
        titre="Indicateurs macroéconomiques"
        sousTitre="Les principaux agrégats de l'économie nigérienne : production, croissance, prix et finances publiques."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Économie nigérienne' },
          { label: 'Indicateurs macroéconomiques' },
        ]}
      />

      <Box sx={{ backgroundColor: C.bg, pt: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg" disableGutters>
          <Box sx={{ maxWidth: 760 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
              <Box sx={{ width: 34, height: 4, borderRadius: 2, background: TRICOLOR }} />
              <Typography sx={{ color: GOLD, fontWeight: 800, letterSpacing: '0.14em', fontSize: '0.72rem' }}>
                EN CHIFFRES
              </Typography>
            </Box>
            <Typography sx={{ color: C.ink, fontSize: { xs: '0.95rem', md: '1.02rem' }, lineHeight: 1.7 }}>
              Le Ministère de l'Économie et des Finances suit en continu les grands indicateurs de
              l'activité économique nationale. Ces chiffres reflètent la trajectoire de croissance,
              la maîtrise de l'inflation et la soutenabilité des finances publiques du Niger.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Cartes + jauges animées (repli interne si pas de données API) */}
      <MacroIndicators grands={grands} cles={cles} hideHeader />
    </>
  );
}
