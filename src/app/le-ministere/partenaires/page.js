import { Box, Container, Typography } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PageHero from '@/components/PageHero';
import { COLORS } from '@/theme';

export const metadata = {
  title: 'Partenaires — Ministère des Finances du Niger',
  description: "Partenaires techniques et financiers du Ministère des Finances de la République du Niger.",
};

const PARTENAIRES = [
  { nom: 'Fonds Monétaire International', sigle: 'FMI', init: 'FMI', couleur: '#0a5ca8', href: 'https://www.imf.org' },
  { nom: 'Banque Mondiale', sigle: 'BM', init: 'BM', couleur: '#00B16C', href: 'https://www.banquemondiale.org' },
  { nom: 'Agence Française de Développement', sigle: 'AFD', init: 'AFD', couleur: '#caa029', href: 'https://www.afd.fr' },
  { nom: 'Banque Africaine de Développement', sigle: 'BAD', init: 'BAD', couleur: '#FB9344', href: 'https://www.afdb.org' },
  { nom: 'Banque Ouest Africaine de Développement', sigle: 'BOAD', init: 'BOAD', couleur: '#8E5FA8', href: 'https://www.boad.org' },
  { nom: "Délégation de l'Union Européenne", sigle: 'UE', init: 'UE', couleur: '#1f6fb2', href: 'https://www.eeas.europa.eu' },
];

export default function Page() {
  return (
    <>
      <PageHero
        surtitre="Le Ministère"
        titre="Partenaires"
        sousTitre="Les partenaires techniques et financiers qui accompagnent le Ministère dans sa mission."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Partenaires' },
        ]}
      />

      <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          {/* Intro */}
          <Box sx={{ backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', p: { xs: 2.5, md: 3 }, mb: { xs: 3, md: 3.5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.5 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: 1.5, backgroundColor: 'rgba(12,116,73,0.08)', color: COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 21 } }}>
                <HandshakeIcon />
              </Box>
              <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.15rem' }}>Coopération</Typography>
            </Box>
            <Typography sx={{ color: '#455a64', lineHeight: 1.75 }}>
              Dans le cadre de la mise en œuvre de ses activités, et conformément à la mission qui lui a été assignée,
              le Ministère des Finances entretient des relations de coopération avec les institutions et organismes
              suivants :
            </Typography>
          </Box>

          {/* Grille des partenaires */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {PARTENAIRES.map((p) => (
              <Box
                key={p.nom}
                component="a"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  backgroundColor: '#fff',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 3,
                  p: 3,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 16px 32px ${p.couleur}26`, borderColor: p.couleur },
                  '&:hover .pt-go': { gap: '10px' },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${p.couleur} 0%, ${p.couleur}cc 100%)`,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    mb: 2,
                    boxShadow: `0 8px 18px ${p.couleur}40`,
                  }}
                >
                  {p.init}
                </Box>
                <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: '1.05rem', lineHeight: 1.3 }}>
                  {p.nom}
                </Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: '0.82rem', fontWeight: 700, mb: 2 }}>{p.sigle}</Typography>
                <Box className="pt-go" sx={{ mt: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px', color: p.couleur, fontWeight: 700, fontSize: '0.85rem', transition: 'gap 0.25s ease' }}>
                  Visiter le site <OpenInNewIcon sx={{ fontSize: 16 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
