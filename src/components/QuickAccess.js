import { Box, Button, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentsIcon from '@mui/icons-material/Payments';
import PublicIcon from '@mui/icons-material/Public';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { COLORS } from '@/theme';

// Correspondance clé (API) → icône Material UI.
const ICONS = {
  computer: ComputerIcon,
  gavel: GavelIcon,
  account_balance: AccountBalanceIcon,
  receipt_long: ReceiptLongIcon,
  description: DescriptionIcon,
  payments: PaymentsIcon,
  public: PublicIcon,
  link: LinkIcon,
};

// === ACCÈS RAPIDES — repli local (si l'API est indisponible) =================
// ⚠️ URL = PLACEHOLDERS ('#'). Les vraies adresses se gèrent dans l'admin.
const OUTILS_FALLBACK = [
  { nom: 'e-SECeF', icone: 'computer', colors: ['#0a5ca8', '#002B55'], href: '#' },
  { nom: 'Marchés publics', icone: 'gavel', colors: ['#37a06a', '#1F6E42'], href: '#' },
  { nom: 'SYGMEF', icone: 'account_balance', colors: ['#ef9038', '#B85E18'], href: '#' },
  { nom: 'DGI', icone: 'receipt_long', colors: ['#caa029', '#8a6a14'], href: '#' },
];
// =============================================================================

export default function QuickAccess({ liens }) {
  const data = liens && liens.length ? liens : OUTILS_FALLBACK;

  return (
    <Box>
      <Box>
        <Typography sx={{ color: COLORS.goldDark, fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}>
          Services & outils
        </Typography>
        <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.7rem', md: '2.1rem' }, lineHeight: 1.1 }}>
          Accès rapides
        </Typography>
        <Box sx={{ display: 'block', width: 72, height: 4, background: 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)', borderRadius: 2, mt: 1, mb: 2 }} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 1.5,
          }}
        >
          {data.map(({ nom, icone, colors, href }) => {
            const Icon = ICONS[icone] || LinkIcon;
            return (
        <Button
          key={nom}
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<Icon />}
          endIcon={<OpenInNewIcon sx={{ fontSize: '14px !important', opacity: 0.75 }} />}
          sx={{
            justifyContent: 'flex-start',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.92rem',
            py: 1.4,
            px: 2,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
            boxShadow: `0 8px 20px ${colors[1]}44`,
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            '& .MuiButton-endIcon': { ml: 'auto' },
            '&:hover': {
              background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
              transform: 'translateY(-3px)',
              boxShadow: `0 14px 28px ${colors[1]}66`,
            },
          }}
        >
          {nom}
        </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
