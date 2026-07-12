import { Box, Container, Typography, Button, Chip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PageHero from '@/components/PageHero';
import { getTextesOrganisation } from '@/lib/api';
import { COLORS } from '@/theme';

export const metadata = {
  title: "Textes portant organisation — Ministère des Finances du Niger",
  description: "Décrets portant organisation du Ministère des Finances de la République du Niger (1992 à nos jours).",
};

// Repli local (si l'API est indisponible). ⚠️ Liens PDF en « # ».
const DOCS_FALLBACK = [
  { titre: "Décret n°2023-179/PCNSP/MEF du 14 octobre 2023 portant organisation du Ministère de l'Économie et des Finances", annee: '2023', href: '#' },
  { titre: "Décret n°2023-191/PRN/MF du 23 février 2023 modifiant et complétant le décret n°2021-327/PRN/MF du 13 mai 2021, portant organisation du Ministère des Finances (modifié par le décret n°2022-459/PRN/MF du 02 juin 2022)", annee: '2023', href: '#' },
  { titre: "Décret n°2023-191/PRN/MF du 23 février 2023 modifiant et complétant le décret n°2021-327/PRN/MF du 13 mai 2021, portant organisation du MF", annee: '2023', href: '#' },
  { titre: "Décret n°2022-459/PRN/MF du 02 juin 2022 modifiant et complétant le décret n°327/PRN/MF du 13 mai 2021 portant organisation du Ministère des Finances", annee: '2022', href: '#' },
  { titre: "Décret n°2021-327/PRN/MF du 13 mai 2021 portant organisation du Ministère des Finances", annee: '2021', href: '#' },
  { titre: "Décret n°2019-598/PRN/MF du 18 octobre 2019 modifiant et complétant le décret n°2018-497/PRN/MF du 20 juillet 2018, portant organisation du Ministère des Finances", annee: '2019', href: '#' },
  { titre: "Décret n°2018-497/PRN/MF du 20 juillet 2018 portant organisation du Ministère des Finances", annee: '2018', href: '#' },
];

export default async function Page() {
  const data = await getTextesOrganisation();
  const DOCS = data && data.length ? data : DOCS_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Historique"
        titre="Textes portant organisation"
        sousTitre="Décrets retraçant l'évolution organisationnelle du Ministère, de 1992 à nos jours."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Historique', href: '/le-ministere/historique' },
          { label: 'Textes portant organisation' },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          {/* Intro + NB */}
          <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', p: { xs: 2.5, md: 3 }, mb: { xs: 3, md: 3.5 } }}>
            <Typography sx={{ color: '#455a64', lineHeight: 1.75, mb: 2 }}>
              Les différents textes recensés retracent l&apos;évolution organisationnelle du Ministère des Finances.
              Ils permettent de comprendre les changements intervenus dans son organisation institutionnelle de
              <strong> 1992 à nos jours</strong>.
            </Typography>
            <Box
              component="a"
              href="#"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                textDecoration: 'none',
                backgroundColor: 'rgba(12,116,73,0.06)',
                color: COLORS.blue,
                fontWeight: 700,
                fontSize: '0.88rem',
                transition: 'background-color 0.2s ease',
                '&:hover': { backgroundColor: 'rgba(12,116,73,0.12)' },
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 18 }} />
              Consulter les textes précédents portant organisation du Ministère
            </Box>
          </Box>

          {/* Liste des décrets */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {DOCS.map((d, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  gap: 2,
                  flexWrap: 'wrap',
                  backgroundColor: '#fff',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 2.5,
                  p: { xs: 2, md: 2.25 },
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 26px rgba(0,0,0,0.10)', borderColor: '#E0A92E' },
                }}
              >
                {/* Icône PDF */}
                <Box sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: 2, backgroundColor: 'rgba(211,47,47,0.10)', color: '#d32f2f', display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 28 } }}>
                  <PictureAsPdfIcon />
                </Box>

                {/* Titre + année */}
                <Box sx={{ flex: 1, minWidth: 220 }}>
                  <Chip label={`PDF · ${d.annee}`} size="small" sx={{ height: 20, mb: 0.75, backgroundColor: 'rgba(224,169,46,0.16)', color: COLORS.goldDark, fontWeight: 800, fontSize: '0.64rem', borderRadius: 0.75 }} />
                  <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: '0.92rem', lineHeight: 1.4 }}>
                    {d.titre}
                  </Typography>
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                  <Button
                    component="a"
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<OpenInNewIcon />}
                    sx={{ borderColor: COLORS.blue, color: COLORS.blue, fontWeight: 700, '&:hover': { backgroundColor: COLORS.blue, color: '#fff', borderColor: COLORS.blue } }}
                  >
                    Consulter
                  </Button>
                  <Button
                    component="a"
                    href={d.href}
                    download
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{ backgroundColor: COLORS.blue, fontWeight: 700, boxShadow: 'none', '&:hover': { backgroundColor: COLORS.blueHover } }}
                  >
                    Télécharger
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
