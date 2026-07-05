'use client';

import { Box, Typography, Chip, Button, IconButton, Divider, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { COLORS, TRICOLOR } from '@/theme';

// Lecteur d'article UNIQUE (panneau latéral), réutilisé par toutes les listes
// d'actualités. Gère : image réduite (non pleine largeur), vidéo en option,
// contenu structuré en parties (sections) ou paragraphes, bouton de fermeture
// moderne. Tolère les variantes de champs (rubrique/categorie, chapo/extrait…).

const estVideoFichier = (u) => /\.(mp4|webm|ogg)$/i.test(u || '');

function embedVideo(url) {
  // YouTube (watch, youtu.be, shorts, embed) → URL d'intégration.
  const yt = (url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  // Vimeo
  const vi = (url || '').match(/vimeo\.com\/(\d+)/);
  if (vi) return `https://player.vimeo.com/video/${vi[1]}`;
  return url;
}

const OMBRE = '0 12px 28px rgba(0,40,80,0.14)';

function Media({ video, image, titre }) {
  if (video) {
    if (estVideoFichier(video)) {
      return (
        <Box component="video" src={video} controls
          sx={{ width: '100%', maxHeight: 440, display: 'block', borderRadius: 3, mb: 3, backgroundColor: '#000', boxShadow: OMBRE }} />
      );
    }
    return (
      <Box sx={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 3, overflow: 'hidden', mb: 3, boxShadow: OMBRE }}>
        <Box component="iframe" src={embedVideo(video)} title={titre || 'Vidéo'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
      </Box>
    );
  }
  if (image) {
    return (
      <Box sx={{ position: 'relative', height: { xs: 180, md: 240 }, borderRadius: 3, overflow: 'hidden', mb: 3, boxShadow: OMBRE }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: COLORS.blueDark }} />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: TRICOLOR }} />
      </Box>
    );
  }
  return null;
}

const CORPS = { color: '#455a64', fontSize: '1rem', lineHeight: 1.85, mb: 2, textAlign: 'justify' };

export default function ArticleReader({ article, onClose }) {
  const ouvert = Boolean(article);
  const a = article || {};
  const rubrique = a.rubrique || a.categorie;
  const lead = a.chapo || a.extrait;
  const image = a.src || a.image || null;
  const video = a.video || a.video_url || null;
  const sections = Array.isArray(a.sections) && a.sections.length ? a.sections : null;
  const paragraphes = a.paragraphes && a.paragraphes.length ? a.paragraphes : [];

  return (
    <Drawer
      anchor="right"
      open={ouvert}
      onClose={onClose}
      sx={{ zIndex: 1500 }}
      slotProps={{ paper: { sx: { width: { xs: '100%', md: '80%' }, maxWidth: 1080 } } }}
    >
      {article && (
        <Box>
          {/* Barre supérieure (rubrique + fermer) */}
          <Box sx={{ position: 'sticky', top: 0, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: { xs: 2, md: 3 }, py: 1.25, backgroundColor: '#fff', borderBottom: `1px solid ${COLORS.border}` }}>
            {rubrique
              ? <Chip label={rubrique} size="small" sx={{ backgroundColor: '#E0A92E', color: COLORS.blueDark, fontWeight: 800 }} />
              : <span />}
            <IconButton onClick={onClose} aria-label="Fermer" sx={{ color: COLORS.blue }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Contenu — colonne de lecture confortable (image jamais pleine largeur) */}
          <Box sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 3, md: 4 }, maxWidth: 820, mx: 'auto' }}>
            {a.date && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, color: COLORS.muted, mb: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>{a.date}</Typography>
              </Box>
            )}
            <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1.18, mb: 2 }}>
              {a.titre}
            </Typography>

            {lead && (
              <Typography sx={{ fontSize: '1.08rem', fontWeight: 600, color: COLORS.ink, borderLeft: '4px solid #E0A92E', pl: 2, mb: 3 }}>
                {lead}
              </Typography>
            )}

            <Media video={video} image={image} titre={a.titre} />

            {/* Corps : parties (sections) sinon paragraphes */}
            {sections
              ? sections.map((s, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  {s.titre && (
                    <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '1.2rem', mt: 1.5, mb: 1 }}>
                      {s.titre}
                    </Typography>
                  )}
                  {(s.paragraphes && s.paragraphes.length ? s.paragraphes : (s.texte ? [s.texte] : [])).map((p, j) => (
                    <Typography key={j} sx={CORPS}>{p}</Typography>
                  ))}
                </Box>
              ))
              : paragraphes.map((p, i) => <Typography key={i} sx={CORPS}>{p}</Typography>)}

            {paragraphes.length === 0 && !sections && (
              <Typography sx={{ color: COLORS.muted, fontStyle: 'italic' }}>
                L'article complet sera fourni par l'administration.
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={onClose} variant="contained" startIcon={<CloseIcon />}
                sx={{ backgroundColor: COLORS.blue, fontWeight: 700, borderRadius: 999, px: 4, py: 1,
                  boxShadow: '0 8px 20px rgba(0,64,128,0.25)', '&:hover': { backgroundColor: COLORS.blueDark } }}>
                Fermer l'article
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
