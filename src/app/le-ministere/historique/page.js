import { Box, Container, Typography } from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import GroupsIcon from '@mui/icons-material/Groups';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageHero from '@/components/PageHero';
import { getDenominations } from '@/lib/api';
import { COLORS } from '@/theme';

export const metadata = {
  title: 'Historique — Ministère des Finances du Niger',
  description: "Évolution historique et dénominations successives du Ministère des Finances de la République du Niger.",
};

// Repli local (si l'API est indisponible). Source : ancien site finances.gouv.ne.
const DENOMINATIONS_FALLBACK = [
  { an: '1952', nom: 'Direction Locale des Finances' },
  { an: '1958', nom: 'Ministère des Finances' },
  { an: '1965', nom: 'Ministère des Affaires Économiques et des Finances' },
  { an: '1970', nom: 'Ministère des Affaires Économiques et des Finances, des Affaires Sahariennes et Nomades' },
  { an: '1974', nom: 'Ministère des Finances' },
  { an: '1991', nom: "Ministère de l'Économie et des Finances" },
  { an: '1994', nom: 'Ministère des Finances et du Plan' },
  { an: '1996', nom: "Ministère de l'Économie, des Finances et du Plan, puis Ministère des Finances" },
  { an: '1997', nom: "Ministère de l'Économie et des Finances, puis des Réformes et de la Privatisation" },
  { an: '1999', nom: 'Ministère des Finances et des Réformes Économiques' },
  { an: '2000', nom: 'Ministère des Finances' },
  { an: '2002', nom: "Ministère de l'Économie et des Finances" },
  { an: '2011', nom: 'Ministère des Finances' },
  { an: '2015', nom: "Ministère de l'Économie et des Finances" },
  { an: '2016', nom: 'Ministère des Finances' },
  { an: 'Depuis 2023', nom: "Ministère de l'Économie et des Finances" },
];

const RUBRIQUES = [
  { titre: 'Photos des ministres', Icon: PhotoLibraryIcon, href: '/le-ministere/historique/photos-ministres' },
  { titre: "Ministres délégués & Secrétaires d'État", Icon: GroupsIcon, href: '/le-ministere/historique/ministres-delegues' },
  { titre: 'Textes portant organisation', Icon: DescriptionIcon, href: '/le-ministere/historique/textes-organisation' },
  { titre: 'Textes portant attributions', Icon: GavelIcon, href: '#' },
];

function Card({ children, sx }) {
  return (
    <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', p: { xs: 2.5, md: 3 }, ...sx }}>
      {children}
    </Box>
  );
}

function TimelineItem({ an, nom, last }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.75 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.4 }}>
        <Box sx={{ minWidth: 11, width: 11, height: 11, borderRadius: '50%', backgroundColor: '#E0A92E' }} />
        {!last && <Box sx={{ flex: 1, width: 2, backgroundColor: COLORS.border, mt: 0.5 }} />}
      </Box>
      <Box sx={{ pb: last ? 0 : 2 }}>
        <Typography sx={{ color: COLORS.goldDark, fontWeight: 800, fontSize: '0.82rem' }}>{an}</Typography>
        <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: '0.92rem', lineHeight: 1.35, mt: 0.25 }}>{nom}</Typography>
      </Box>
    </Box>
  );
}

export default async function Page() {
  const data = await getDenominations();
  const DENOMINATIONS = data && data.length ? data : DENOMINATIONS_FALLBACK;
  const moitie = Math.ceil(DENOMINATIONS.length / 2);
  const colonnes = [DENOMINATIONS.slice(0, moitie), DENOMINATIONS.slice(moitie)];

  return (
    <>
      <PageHero
        surtitre="Le Ministère"
        titre="Historique"
        sousTitre="Évolution et dénominations successives du Ministère, de 1952 à aujourd'hui."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Historique' },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 3.5 } }}>
            {/* Introduction */}
            <Card>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: 1.5, backgroundColor: 'rgba(0,64,128,0.08)', color: COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 21 } }}>
                  <HistoryEduIcon />
                </Box>
                <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.2rem' }}>Aux origines</Typography>
              </Box>
              <Typography sx={{ fontWeight: 600, color: COLORS.ink, fontSize: '1.02rem', borderLeft: '4px solid #E0A92E', pl: 2, mb: 2, lineHeight: 1.6 }}>
                Le Ministère trouve son origine en 1952 avec la <strong>Direction Locale des Finances</strong>.
              </Typography>
              <Typography sx={{ color: '#455a64', lineHeight: 1.75 }}>
                Sa mission initiale portait sur la préparation du budget, le contrôle de la comptabilité des dépenses et la
                coordination des services financiers du territoire. Au fil des réformes administratives, sa dénomination et son
                périmètre ont évolué jusqu&apos;à l&apos;actuel <strong>Ministère de l&apos;Économie et des Finances</strong>.
              </Typography>
            </Card>

            {/* Frise des dénominations */}
            <Card>
              <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.4rem', md: '1.7rem' } }}>
                Dénominations successives
              </Typography>
              <Box sx={{ width: 72, height: 4, background: 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)', borderRadius: 2, mt: 1.5, mb: 3 }} />
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 0, md: 4 } }}>
                {colonnes.map((col, ci) => (
                  <Box key={ci}>
                    {col.map((d, i) => (
                      <TimelineItem key={d.an} an={d.an} nom={d.nom} last={ci === 1 && i === col.length - 1} />
                    ))}
                  </Box>
                ))}
              </Box>
            </Card>

            {/* Aller plus loin */}
            <Box>
              <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.3rem', md: '1.5rem' }, mb: 2 }}>
                Aller plus loin
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                {RUBRIQUES.map(({ titre, Icon, href }) => (
                  <Box
                    key={titre}
                    component="a"
                    href={href}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      backgroundColor: '#fff',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 3,
                      p: 2.5,
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 30px rgba(0,0,0,0.10)' },
                      '&:hover .rub-go': { gap: '10px', color: COLORS.goldDark },
                    }}
                  >
                    <Box sx={{ width: 46, height: 46, borderRadius: 2, backgroundColor: 'rgba(0,64,128,0.08)', color: COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, '& svg': { fontSize: 26 } }}>
                      <Icon />
                    </Box>
                    <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: '0.98rem', lineHeight: 1.3, flex: 1, mb: 1.25 }}>
                      {titre}
                    </Typography>
                    <Box className="rub-go" sx={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: COLORS.blue, fontWeight: 700, fontSize: '0.82rem', transition: 'all 0.25s ease' }}>
                      Consulter <ArrowForwardIcon sx={{ fontSize: 17 }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
