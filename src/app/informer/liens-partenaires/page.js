import { Box, Container, Typography } from '@mui/material';
import PageHero from '@/components/PageHero';
import ResourcesPartners from '@/components/ResourcesPartners';
import { getLiensPartenaires } from '@/lib/api';

const C = { blue: '#004080', ink: '#37474F', bg: '#EEF1F5' };
const GOLD = '#E0A92E';
const TRICOLOR = 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)';

export const metadata = {
  title: 'Liens & Partenaires — Ministère des Finances du Niger',
  description: "Liens utiles et partenaires techniques et financiers du Ministère de l'Économie et des Finances de la République du Niger.",
};

export default async function Page() {
  const data = await getLiensPartenaires();
  // Repli interne de ResourcesPartners si l'API est indisponible.
  const liens = data?.liens?.length ? data.liens : undefined;
  const partenaires = data?.partenaires?.length ? data.partenaires : undefined;
  const reforme = data?.reforme || undefined;

  return (
    <>
      <PageHero
        surtitre="S'informer"
        titre="Liens & Partenaires"
        sousTitre="Les institutions de la République et les partenaires techniques et financiers du Ministère."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: "S'informer" },
          { label: 'Liens & Partenaires' },
        ]}
      />

      <Box sx={{ backgroundColor: C.bg, pt: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg" disableGutters>
          <Box sx={{ maxWidth: 760 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
              <Box sx={{ width: 34, height: 4, borderRadius: 2, background: TRICOLOR }} />
              <Typography sx={{ color: GOLD, fontWeight: 800, letterSpacing: '0.14em', fontSize: '0.72rem' }}>
                RESSOURCES
              </Typography>
            </Box>
            <Typography sx={{ color: C.ink, fontSize: { xs: '0.95rem', md: '1.02rem' }, lineHeight: 1.7 }}>
              Retrouvez les liens vers les principales institutions de la République du Niger ainsi
              que les partenaires techniques et financiers qui accompagnent le Ministère dans la
              conduite des réformes et le financement du développement.
            </Typography>
          </Box>
        </Container>
      </Box>

      <ResourcesPartners liens={liens} partenaires={partenaires} reforme={reforme} hideHeader />
    </>
  );
}
