import { Box, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { COLORS } from '@/theme';

// Correspondance clé (API) → icône Material UI.
const ICONS = {
  menu_book: MenuBookIcon,
  groups: GroupsIcon,
  record_voice_over: RecordVoiceOverIcon,
  description: DescriptionIcon,
  link: LinkIcon,
};

// === LE MINISTRE — repli local (si l'API est indisponible) ===================
const MINISTRE_FALLBACK = {
  nom: 'Dr Maman Laouali ABDOU RAFA',
  fonction: "Ministre de l'Économie et des Finances",
  image: '/DrRafa.jpeg',
  etiquette: 'Le Ministre',
  liens: [
    { label: 'Biographie du Ministre', icone: 'menu_book', href: '/le-ministere/ministre' },
    { label: 'Cabinet du ministre', icone: 'groups', href: '#' },
    { label: 'Discours', icone: 'record_voice_over', href: '#' },
  ],
};
// =============================================================================

export default function MinisterCard({ ministre }) {
  const data = ministre || MINISTRE_FALLBACK;
  const nom = data.nom || MINISTRE_FALLBACK.nom;
  const fonction = data.fonction || MINISTRE_FALLBACK.fonction;
  const image = data.image || MINISTRE_FALLBACK.image;
  const etiquette = data.etiquette || MINISTRE_FALLBACK.etiquette;
  const liens = data.liens && data.liens.length ? data.liens : MINISTRE_FALLBACK.liens;

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: `1px solid ${COLORS.border}`,
        backgroundColor: '#fff',
        boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        maxWidth: { xs: 460, md: 'none' },
        mx: { xs: 'auto', md: 0 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Photo + nom incrusté — ratio portrait fixe en une-colonne, remplissage en md+ */}
      <Box sx={{ position: 'relative', flex: { md: 1 }, aspectRatio: { xs: '4 / 5', md: 'auto' }, minHeight: { md: 300 } }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundColor: COLORS.blueDark,
          }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,28,56,0.94) 0%, rgba(0,40,80,0.25) 55%, rgba(0,40,80,0) 100%)' }} />
        {/* Étiquette */}
        <Box sx={{ position: 'absolute', top: 14, left: 14, backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800, fontSize: '0.62rem', letterSpacing: 0.5, textTransform: 'uppercase', px: 1, py: 0.4, borderRadius: 0.75 }}>
          {etiquette}
        </Box>
        {/* Nom + fonction */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5, color: '#fff' }}>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: '1.2rem', lineHeight: 1.2, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            {nom}
          </Typography>
          <Typography sx={{ color: '#E0A92E', fontWeight: 700, fontSize: '0.85rem', mt: 0.25 }}>
            {fonction}
          </Typography>
        </Box>
      </Box>

      {/* Liens */}
      <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {liens.map(({ label, icone, href }) => {
          const Icon = ICONS[icone] || LinkIcon;
          return (
          <Box
            key={label}
            component="a"
            href={href}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 1.5,
              py: 1.1,
              borderRadius: 2,
              textDecoration: 'none',
              color: COLORS.ink,
              backgroundColor: COLORS.bg,
              transition: 'all 0.2s ease',
              '&:hover': { backgroundColor: 'rgba(0,64,128,0.08)', pl: 2 },
              '&:hover .ml-chevron': { color: '#E0A92E', transform: 'translateX(3px)' },
            }}
          >
            <Box sx={{ width: 34, height: 34, borderRadius: 1.5, backgroundColor: '#fff', color: COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${COLORS.border}`, '& svg': { fontSize: 20 } }}>
              <Icon />
            </Box>
            <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: '0.92rem', flex: 1 }}>{label}</Typography>
            <ChevronRightIcon className="ml-chevron" sx={{ color: COLORS.muted, transition: 'all 0.2s ease' }} />
          </Box>
          );
        })}
      </Box>
    </Box>
  );
}
