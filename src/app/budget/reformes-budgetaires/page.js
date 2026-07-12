import { Box, Container, Typography, Button, Chip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PageHero from '@/components/PageHero';
import { COLORS } from '@/theme';

export const metadata = {
  title: 'Réformes budgétaires — Ministère des Finances du Niger',
  description: "Documents relatifs aux réformes budgétaires et au lancement du Budget Programme au Niger.",
};

// ⚠️ Liens en '#' — déposer les fichiers dans public/reformes/ et brancher les URL.
const DOCS = [
  { titre: 'Discours du Ministre des Finances — Lancement du Budget Programme au Niger', type: 'Discours', kind: 'pdf', href: '#' },
  { titre: "Discours du Représentant de l'UEMOA — Lancement du Budget Programme au Niger", type: 'Discours', kind: 'pdf', href: '#' },
  { titre: 'Thématique 1 — La réforme budgétaire et ses principales innovations', type: 'Présentation', kind: 'pdf', href: '#' },
  { titre: "Thématique 2 — État de mise en œuvre de la réforme budgétaire et perspectives", type: 'Présentation', kind: 'pdf', href: '#' },
  { titre: 'Logo final de la réforme (Lancement officiel du Budget Programme)', type: 'Image', kind: 'image', href: '#' },
  { titre: 'Arrêté n°093 du 13 mars 2017 — DPPD MF', type: 'Arrêté', kind: 'pdf', href: '#' },
];

export default function Page() {
  return (
    <>
      <PageHero
        surtitre="Budget"
        titre="Réformes budgétaires"
        sousTitre="Documents relatifs aux réformes budgétaires et au lancement du Budget Programme au Niger."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Budget', href: '/budget' },
          { label: 'Réformes budgétaires' },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', p: { xs: 2.5, md: 3 }, mb: { xs: 3, md: 3.5 } }}>
            <Typography sx={{ color: '#455a64', lineHeight: 1.75 }}>
              Cette rubrique réunit les documents relatifs aux <strong>réformes budgétaires</strong>, notamment le
              <strong> lancement officiel du Budget Programme</strong> au Niger : discours, présentations thématiques et textes.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {DOCS.map((d, i) => {
              const isImg = d.kind === 'image';
              return (
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
                  <Box sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: 2, backgroundColor: isImg ? 'rgba(12,116,73,0.10)' : 'rgba(211,47,47,0.10)', color: isImg ? COLORS.blue : '#d32f2f', display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 28 } }}>
                    {isImg ? <ImageIcon /> : <PictureAsPdfIcon />}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 220 }}>
                    <Chip label={d.type} size="small" sx={{ height: 20, mb: 0.75, backgroundColor: 'rgba(224,169,46,0.16)', color: COLORS.goldDark, fontWeight: 800, fontSize: '0.64rem', borderRadius: 0.75 }} />
                    <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: '0.92rem', lineHeight: 1.4 }}>{d.titre}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                    <Button component="a" href={d.href} target="_blank" rel="noopener noreferrer" variant="outlined" startIcon={<OpenInNewIcon />} sx={{ borderColor: COLORS.blue, color: COLORS.blue, fontWeight: 700, '&:hover': { backgroundColor: COLORS.blue, color: '#fff', borderColor: COLORS.blue } }}>
                      Consulter
                    </Button>
                    <Button component="a" href={d.href} download variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: COLORS.blue, fontWeight: 700, boxShadow: 'none', '&:hover': { backgroundColor: COLORS.blueHover } }}>
                      Télécharger
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </>
  );
}
