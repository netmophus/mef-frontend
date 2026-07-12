import { Box, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { COLORS } from '@/theme';

// ⚠️ Composant serveur : pour les dégradés/accents, on utilise des couleurs
// LITTÉRALES (le CSS bâti à partir des constantes du thème — notamment l'or —
// peut être supprimé du rendu serveur).
const GOLD = '#E0A92E';
const GOLD_DARK = '#B5841F';
const TRICOLOR = 'linear-gradient(90deg, #FB9344 0 33.33%, #ffffff 33.33% 66.66%, #00B16C 66.66% 100%)';

// Correspondance clé (API) → icône + accent + sous-titre par défaut.
const LINK_META = {
  menu_book: { Icon: MenuBookIcon, accent: '#0C7449', desc: 'Parcours & biographie' },
  groups: { Icon: GroupsIcon, accent: '#00B16C', desc: 'Membres du cabinet' },
  record_voice_over: { Icon: RecordVoiceOverIcon, accent: GOLD_DARK, desc: 'Allocutions & interventions' },
  description: { Icon: DescriptionIcon, accent: '#FB9344', desc: 'Documents officiels' },
  link: { Icon: LinkIcon, accent: '#0C7449', desc: 'En savoir plus' },
};
// Accents de repli (si l'icône n'est pas connue), dans l'ordre des liens.
const ACCENT_CYCLE = ['#0C7449', '#00B16C', GOLD_DARK, '#FB9344'];

// === LE MINISTRE — repli local (si l'API est indisponible) ===================
const MINISTRE_FALLBACK = {
  nom: 'Dr Maman Laouali ABDOU RAFA',
  fonction: "Ministre de l'Économie et des Finances",
  image: '/DrRafa.jpeg',
  etiquette: 'Le Ministre',
  liens: [
    { label: 'Biographie du Ministre', icone: 'menu_book', href: '/le-ministere/ministre' },
    { label: 'Cabinet du ministre', icone: 'groups', href: '/le-ministere/cabinet' },
    { label: 'Discours', icone: 'record_voice_over', href: '/le-ministere/discours' },
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
        boxShadow: '0 14px 34px rgba(10,92,57,0.10)',
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
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,28,56,0.95) 0%, rgba(10,92,57,0.30) 52%, rgba(10,92,57,0) 100%)' }} />
        {/* Étiquette */}
        <Box sx={{ position: 'absolute', top: 14, left: 14, display: 'inline-flex', alignItems: 'center', gap: 0.6, backgroundColor: GOLD, color: '#002B55', fontWeight: 800, fontSize: '0.62rem', letterSpacing: 0.6, textTransform: 'uppercase', px: 1.1, py: 0.45, borderRadius: 0.75, boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#002B55' }} />
          {etiquette}
        </Box>
        {/* Nom + fonction */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5, color: '#fff' }}>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.2, textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}>
            {nom}
          </Typography>
          <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '0.86rem', mt: 0.35 }}>
            {fonction}
          </Typography>
        </Box>
        {/* Filet tricolore en pied de photo */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: TRICOLOR }} />
      </Box>

      {/* Liens */}
      <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {liens.map((lien, i) => {
          const meta = LINK_META[lien.icone] || LINK_META.link;
          const Icon = meta.Icon;
          const accent = meta.accent || ACCENT_CYCLE[i % ACCENT_CYCLE.length];
          const desc = lien.desc || meta.desc;
          return (
            <Box
              key={lien.label}
              component="a"
              href={lien.href}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 1.4,
                pl: 1.75,
                pr: 1.5,
                py: 1.15,
                borderRadius: 2,
                textDecoration: 'none',
                overflow: 'hidden',
                backgroundColor: '#fff',
                border: `1px solid ${COLORS.border}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                // Barre d'accent latérale
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  backgroundColor: accent,
                  transform: 'scaleY(0.55)',
                  transformOrigin: 'center',
                  transition: 'transform 0.2s ease',
                },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 22px ${accent}22`,
                  borderColor: accent,
                },
                '&:hover::before': { transform: 'scaleY(1)' },
                '&:hover .mc-tile': { backgroundColor: accent, color: '#fff', borderColor: accent },
                '&:hover .mc-arrow': { backgroundColor: accent, color: '#fff', transform: 'translateX(2px)' },
              }}
            >
              <Box
                className="mc-tile"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.75,
                  backgroundColor: `${accent}14`,
                  color: accent,
                  border: `1px solid ${accent}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  '& svg': { fontSize: 21 },
                }}
              >
                <Icon />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: '0.94rem', lineHeight: 1.25 }}>
                  {lien.label}
                </Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: '0.72rem', fontWeight: 600, mt: 0.15 }}>
                  {desc}
                </Typography>
              </Box>
              <Box
                className="mc-arrow"
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  backgroundColor: COLORS.bg,
                  color: COLORS.muted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  '& svg': { fontSize: 16 },
                }}
              >
                <ArrowForwardIcon />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
