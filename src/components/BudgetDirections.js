import { Box, Container, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { COLORS } from '@/theme';

// === BUDGET & DIRECTIONS =====================================================
const BLOCS = [
  {
    titre: 'Budget',
    Icon: AccountBalanceWalletIcon,
    colors: ['#0a5ca8', '#002B55'],
    liens: [
      { label: 'Lois de finances', href: '/budget/lois-de-finances' },
      { label: 'Lois de règlement', href: '/budget/lois-de-reglement' },
      { label: "Rapports d'exécution", href: '/budget/rapports-execution' },
      { label: 'Réglementations budgétaires', href: '/budget/reglementations' },
      { label: 'Réformes budgétaires', href: '/budget/reformes-budgetaires' },
    ],
  },
  {
    titre: 'Directions & Services',
    Icon: AccountTreeIcon,
    colors: ['#37a06a', '#1F6E42'],
    liens: [
      { label: 'Administration Centrale', href: '/directions/administration-centrale' },
      { label: 'Les services techniques déconcentrés', href: '/directions/services-deconcentres' },
      { label: 'Les services décentralisés', href: '/directions/services-decentralises' },
      { label: 'Les programmes et les projets publics', href: '/directions/programmes-projets' },
      { label: 'Responsables du Ministère', href: '/le-ministere/responsables' },
    ],
  },
];
// =============================================================================

function Bloc({ titre, Icon, colors, liens }) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        color: '#fff',
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        boxShadow: `0 14px 32px ${colors[1]}44`,
      }}
    >
      {/* Icône filigrane */}
      <Icon
        sx={{
          position: 'absolute',
          right: -26,
          top: -26,
          fontSize: 190,
          color: 'rgba(255,255,255,0.10)',
        }}
      />

      {/* En-tête */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1.5, px: 3, pt: 3, pb: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': { fontSize: 28 },
          }}
        >
          <Icon />
        </Box>
        <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.4rem' }}>
          {titre}
        </Typography>
      </Box>

      {/* Liens */}
      <Box sx={{ position: 'relative', px: 1.5, pb: 1.5 }}>
        {liens.map((l) => (
          <Box
            key={l.label}
            component="a"
            href={l.href}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              px: 1.5,
              py: 1.5,
              borderRadius: 2,
              textDecoration: 'none',
              color: '#fff',
              transition: 'background-color 0.2s ease, padding-left 0.2s ease',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)', pl: 2.5 },
              '&:hover .bd-chevron': { color: '#E0A92E', transform: 'translateX(3px)' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#E0A92E', flexShrink: 0 }} />
              <Typography sx={{ fontWeight: 600, fontSize: '0.98rem' }}>{l.label}</Typography>
            </Box>
            <ChevronRightIcon className="bd-chevron" sx={{ color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s ease' }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function BudgetDirections() {
  return (
    <Box sx={{ backgroundColor: COLORS.bg, pt: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg" disableGutters>
        {/* En-tête de section */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography sx={{ color: COLORS.goldDark, fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}>
            Le Ministère
          </Typography>
          <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.7rem', md: '2.1rem' }, lineHeight: 1.1 }}>
            {'Budget & Organisation'}
          </Typography>
          <Box sx={{ display: 'block', width: 72, height: 4, background: 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)', borderRadius: 2, mt: 1.5 }} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {BLOCS.map((b) => (
            <Bloc key={b.titre} {...b} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
