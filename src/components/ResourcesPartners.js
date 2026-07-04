import { Box, Container, Typography, Button, Chip } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { COLORS } from '@/theme';

// === LIENS, PARTENAIRES & RÉFORME (démo) =====================================
// ⚠️ URL en '#'. Logos partenaires à déposer dans public/partenaires/.
const LIENS_UTILES = [
  { label: 'Présidence de la République', href: '#' },
  { label: 'Primature', href: '#' },
  { label: 'Assemblée Nationale', href: '#' },
  { label: 'Cour des Comptes', href: '#' },
  { label: 'BCEAO', href: '#' },
  { label: 'ARMP', href: '#' },
  { label: "Inspection Générale d'État", href: '#' },
];

const PARTENAIRES = [
  { nom: 'FMI', sigle: 'Fonds Monétaire Int.', init: 'FMI' },
  { nom: 'Banque Mondiale', sigle: 'Groupe BM', init: 'BM' },
  { nom: 'BAD', sigle: 'Banque Africaine de Dév.', init: 'BAD' },
  { nom: 'UEMOA', sigle: 'Union économique', init: 'UE' },
  { nom: 'Union Européenne', sigle: 'Commission UE', init: 'UE' },
  { nom: 'PNUD', sigle: 'Nations Unies', init: 'UN' },
  { nom: 'BOAD', sigle: 'Banque Ouest-Africaine', init: 'BO' },
  { nom: 'BCEAO', sigle: 'Banque Centrale', init: 'BC' },
];

const CHARTE = ['#0a5ca8', '#2E8B57', '#caa029', '#E07B2C'];
const REFORME_IMG = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80';

// Carte « Réforme » — valeurs par défaut (repli si l'API ne fournit rien).
const REFORME_DEFAUT = {
  etiquette: 'Réforme',
  titre: 'Réforme des finances publiques',
  texte: "Modernisation de la gestion publique : transparence budgétaire, dématérialisation et conformité aux directives de l'UEMOA (programme PEFA).",
  bouton_label: 'En savoir plus',
  bouton_href: '/budget/reformes-budgetaires',
  src: REFORME_IMG,
};
// =============================================================================

export default function ResourcesPartners({ liens, partenaires, reforme, hideHeader = false }) {
  // Données de l'API si fournies, sinon repli sur les données de démo.
  const LIENS = liens && liens.length ? liens : LIENS_UTILES;
  const PARTS = partenaires && partenaires.length ? partenaires : PARTENAIRES;
  const R = reforme ? { ...REFORME_DEFAUT, ...reforme } : REFORME_DEFAUT;

  const lienScroll = LIENS.length > 5;
  const liensList = lienScroll ? [...LIENS, ...LIENS] : LIENS;
  const partTrack = [...PARTS, ...PARTS];

  return (
    <Box sx={{ backgroundColor: COLORS.bg, pt: 0, pb: { xs: 5, md: 7 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg" disableGutters>
        {/* En-tête de section */}
        {!hideHeader && (
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography sx={{ color: COLORS.goldDark, fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}>
              S&apos;informer
            </Typography>
            <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.7rem', md: '2.1rem' }, lineHeight: 1.1 }}>
              Liens &amp; Partenaires
            </Typography>
            <Box sx={{ width: 72, height: 4, background: 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)', borderRadius: 2, mt: 1.5 }} />
          </Box>
        )}

        {/* Réforme (vedette) + Liens utiles */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.35fr 1fr' }, gap: { xs: 2.5, md: 3 } }}>
          {/* Réforme des finances publiques — carte vedette */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 3,
              overflow: 'hidden',
              minHeight: { xs: 260, md: 300 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: { xs: 3, md: 4 },
              color: '#fff',
              boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              '&:hover .rf-img': { transform: 'scale(1.06)' },
            }}
          >
            <Box
              className="rf-img"
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${R.src || REFORME_IMG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: COLORS.blueDark,
                transition: 'transform 0.6s ease',
              }}
            />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,28,56,0.94) 0%, rgba(0,43,85,0.55) 55%, rgba(0,64,128,0.2) 100%)' }} />
            <Box sx={{ position: 'relative' }}>
              <Chip
                label={R.etiquette}
                size="small"
                sx={{ backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', borderRadius: 1, mb: 1.5 }}
              />
              <Typography component="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.45rem', md: '1.85rem' }, lineHeight: 1.15, mb: 1.25, textShadow: '0 2px 14px rgba(0,0,0,0.4)' }}>
                {R.titre}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.55, maxWidth: 520, mb: 2.5 }}>
                {R.texte}
              </Typography>
              <Button
                component="a"
                href={R.bouton_href}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800, px: 3, '&:hover': { backgroundColor: '#caa029' } }}
              >
                {R.bouton_label}
              </Button>
            </Box>
          </Box>

          {/* Liens utiles — carte épurée */}
          <Box
            sx={{
              borderRadius: 3,
              border: `1px solid ${COLORS.border}`,
              backgroundColor: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2.5, py: 2, borderBottom: `1px solid ${COLORS.border}` }}>
              <PublicIcon sx={{ color: COLORS.blue }} />
              <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.1rem' }}>
                Liens utiles
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'relative',
                height: 5 * 52,
                overflow: 'hidden',
                ...(lienScroll && {
                  '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: 26, background: 'linear-gradient(0deg,#fff,rgba(255,255,255,0))', zIndex: 2, pointerEvents: 'none' },
                  '&:hover .lu-track': { animationPlayState: 'paused' },
                }),
              }}
            >
              <Box
                className="lu-track"
                sx={{
                  ...(lienScroll && {
                    animation: `luScroll ${LIENS.length * 4}s linear infinite`,
                    '@keyframes luScroll': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-50%)' } },
                  }),
                }}
              >
                {liensList.map((l, i) => {
                  const c = CHARTE[i % CHARTE.length];
                  return (
                    <Box
                      key={i}
                      component="a"
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 2.5,
                        height: 52,
                        textDecoration: 'none',
                        color: COLORS.ink,
                        borderBottom: `1px solid ${COLORS.border}`,
                        transition: 'background-color 0.2s ease, padding-left 0.2s ease',
                        '&:hover': { backgroundColor: COLORS.bg, pl: 3 },
                        '&:hover .lu-chev': { color: c, transform: 'translateX(3px)' },
                      }}
                    >
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: c, flexShrink: 0 }} />
                      <Typography sx={{ fontWeight: 600, fontSize: '0.92rem', flex: 1 }}>{l.label}</Typography>
                      <ChevronRightIcon className="lu-chev" sx={{ fontSize: 18, color: COLORS.muted, transition: 'all 0.2s ease' }} />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Partenaires — mur de logos (sweep) */}
        <Box sx={{ mt: { xs: 2.5, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <HandshakeIcon sx={{ color: COLORS.blue }} />
            <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.1rem' }}>
              Partenaires
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
              border: `1px solid ${COLORS.border}`,
              backgroundColor: '#fff',
              py: 2,
              '&::before, &::after': { content: '""', position: 'absolute', top: 0, bottom: 0, width: 48, zIndex: 2, pointerEvents: 'none' },
              '&::before': { left: 0, background: 'linear-gradient(90deg,#fff,rgba(255,255,255,0))' },
              '&::after': { right: 0, background: 'linear-gradient(270deg,#fff,rgba(255,255,255,0))' },
              '&:hover .pt-track': { animationPlayState: 'paused' },
            }}
          >
            <Box
              className="pt-track"
              sx={{
                display: 'inline-flex',
                gap: 2,
                px: 2,
                animation: `ptSweep ${PARTS.length * 4}s linear infinite`,
                '@keyframes ptSweep': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
              }}
            >
              {partTrack.map((p, i) => {
                const c = CHARTE[i % CHARTE.length];
                return (
                  <Box
                    key={i}
                    component="a"
                    href={p.href || '#'}
                    title={p.sigle}
                    sx={{
                      flexShrink: 0,
                      width: 230,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      textDecoration: 'none',
                      border: `1px solid ${COLORS.border}`,
                      backgroundColor: '#fff',
                      transition: 'all 0.2s ease',
                      '&:hover': { borderColor: c, boxShadow: `0 8px 18px ${c}33`, transform: 'translateY(-3px)' },
                    }}
                  >
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: `linear-gradient(135deg, ${c} 0%, ${c}cc 100%)`,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                      }}
                    >
                      {p.init}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: '0.95rem', lineHeight: 1.1 }}>
                        {p.nom}
                      </Typography>
                      <Typography sx={{ color: COLORS.muted, fontSize: '0.7rem' }}>{p.sigle}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
