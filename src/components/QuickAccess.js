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
// Services & démembrements du Ministère (URLs officielles). Gérable dans l'admin.
// ⚠️ e-SECeF / SYGMEF restent en '#' (applications internes, pas d'URL publique).
const OUTILS_FALLBACK = [
  { nom: 'e-SECeF', icone: 'computer', colors: ['#0a5ca8', '#002B55'], href: '#' },
  { nom: 'Marchés publics', icone: 'gavel', colors: ['#37a06a', '#0A5C3A'], href: 'https://www.marchespublics.ne/' },
  { nom: 'Impôts (DGI)', icone: 'receipt_long', colors: ['#caa029', '#8a6a14'], href: 'https://www.impots.gouv.ne/' },
  { nom: 'Douanes (DGD)', icone: 'public', colors: ['#ef9038', '#C4611E'], href: 'http://www.douanes.gouv.ne/' },
  { nom: 'Trésor (DGTCP)', icone: 'account_balance', colors: ['#0a5ca8', '#002B55'], href: 'https://tresor.ne/' },
  { nom: 'SYGMEF', icone: 'description', colors: ['#2f8f7a', '#1f6e5e'], href: '#' },
  { nom: 'Cour des comptes', icone: 'gavel', colors: ['#4b6cb7', '#2a3f7a'], href: 'https://www.courdescomptes.ne/' },
  { nom: 'MDE', icone: 'payments', colors: ['#b98a2e', '#7a5a14'], href: 'https://mde.ne/' },
  { nom: 'Finance inclusive (SNFI)', icone: 'payments', colors: ['#37a06a', '#0A5C3A'], href: 'http://www.se-snfi.ne/' },
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
        <Box sx={{ display: 'block', width: 72, height: 4, background: 'linear-gradient(90deg, #FB9344 0 33.33%, #ffffff 33.33% 66.66%, #00B16C 66.66% 100%)', borderRadius: 2, mt: 1, mb: 2 }} />
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
