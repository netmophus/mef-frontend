import { Box, Container, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PageHero from '@/components/PageHero';
import { getEvenements } from '@/lib/api';

// ⚠️ Composant serveur : couleurs LITTÉRALES (le CSS construit à partir des
// constantes du thème peut être supprimé du rendu serveur).
const C = {
  blue: '#004080',
  blueDark: '#002B55',
  green: '#2E8B57',
  greenDark: '#1F6E42',
  orange: '#E07B2C',
  ink: '#37474F',
  muted: '#90A4AE',
  bg: '#EEF1F5',
  border: '#DCE3EC',
};
const GOLD = '#E0A92E';
const GOLD_DARK = '#B5841F';
const TRICOLOR = 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)';

export const metadata = {
  title: 'Événements — Ministère des Finances du Niger',
  description: "Agenda et événements du Ministère de l'Économie et des Finances de la République du Niger.",
};

// Couleur d'accent selon le type d'événement.
function typeColor(t = '') {
  switch (t) {
    case 'Conférence': return C.blue;
    case 'Atelier': return C.green;
    case 'Réunion': return GOLD_DARK;
    case 'Cérémonie': return C.orange;
    case 'Mission': return C.blueDark;
    default: return C.muted;
  }
}

// Repli local (si l'API est indisponible). ⚠️ Données fictives.
const EVENTS_FALLBACK = [
  { titre: 'Conférence budgétaire annuelle 2026', type: 'Conférence', date: '15 juillet 2026', date_iso: '2026-07-15', jour: 15, mois: 'Juillet', annee: 2026, heure: '09h00 – 17h00', lieu: 'Palais des Congrès, Niamey', description: "Présentation des grandes orientations du budget de l'État et concertation avec les partenaires économiques et sociaux.", src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', lien: '', a_la_une: true, passe: false },
  { titre: 'Atelier de validation du DPPD 2027-2029', type: 'Atelier', date: '2 juillet 2026', date_iso: '2026-07-02', jour: 2, mois: 'Juillet', annee: 2026, heure: '08h30', lieu: 'Ministère des Finances, Niamey', description: 'Travaux techniques de validation du Document de Programmation Pluriannuelle des Dépenses.', src: null, lien: '', a_la_une: false, passe: false },
  { titre: 'Forum national sur la mobilisation des recettes', type: 'Conférence', date: '20 mai 2026', date_iso: '2026-05-20', jour: 20, mois: 'Mai', annee: 2026, heure: '09h00', lieu: 'Hôtel Radisson Blu, Niamey', description: "Échanges sur les leviers d'élargissement de l'assiette fiscale et la modernisation des régies financières.", src: null, lien: '', a_la_une: false, passe: true },
  { titre: 'Atelier sur la dématérialisation (e-SECeF)', type: 'Atelier', date: '18 avril 2026', date_iso: '2026-04-18', jour: 18, mois: 'Avril', annee: 2026, heure: '08h00', lieu: 'Direction Générale du Budget', description: 'Formation des gestionnaires de crédits à la chaîne dématérialisée de la dépense publique.', src: null, lien: '', a_la_une: false, passe: true },
];

// Bloc date coloré (jour / mois / année).
function DateBlock({ e, color, large }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        width: large ? { xs: 78, md: 96 } : { xs: 66, md: 80 },
        backgroundColor: color,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: large ? 2 : 1.5,
      }}
    >
      <Typography sx={{ fontWeight: 800, fontSize: large ? { xs: '1.9rem', md: '2.4rem' } : { xs: '1.5rem', md: '1.85rem' }, lineHeight: 1 }}>
        {e.jour}
      </Typography>
      <Typography sx={{ fontWeight: 700, fontSize: '0.64rem', letterSpacing: '0.08em', textTransform: 'uppercase', mt: 0.4 }}>
        {e.mois}
      </Typography>
      <Typography sx={{ fontSize: '0.64rem', opacity: 0.85 }}>{e.annee}</Typography>
    </Box>
  );
}

// Ligne d'infos (lieu + heure).
function MetaLigne({ e }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, md: 2 }, mt: 0.75 }}>
      {e.lieu && (
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: C.muted, fontSize: '0.82rem' }}>
          <PlaceIcon sx={{ fontSize: 16 }} /> {e.lieu}
        </Box>
      )}
      {e.heure && (
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: C.muted, fontSize: '0.82rem' }}>
          <ScheduleIcon sx={{ fontSize: 16 }} /> {e.heure}
        </Box>
      )}
    </Box>
  );
}

// Carte événement (horizontale).
function EventCard({ e }) {
  const color = typeColor(e.type);
  const lienActif = e.lien && e.lien !== '#';
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#fff',
        border: `1px solid ${C.border}`,
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
        opacity: e.passe ? 0.72 : 1,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 16px 30px rgba(0,0,0,0.12)' },
      }}
    >
      <DateBlock e={e} color={color} />
      <Box sx={{ p: { xs: 2, md: 2.5 }, flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'inline-block', px: 1.1, py: 0.3, borderRadius: 999, backgroundColor: `${color}1A`, color, fontWeight: 800, fontSize: '0.64rem', letterSpacing: '0.04em', textTransform: 'uppercase', mb: 0.75 }}>
          {e.type}
        </Box>
        <Typography component="h3" sx={{ fontWeight: 800, color: C.blue, fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.3 }}>
          {e.titre}
        </Typography>
        <MetaLigne e={e} />
        {e.description && (
          <Typography sx={{ color: '#455a64', fontSize: '0.9rem', lineHeight: 1.6, mt: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {e.description}
          </Typography>
        )}
        {lienActif && (
          <Button component="a" href={e.lien} target="_blank" rel="noopener noreferrer" endIcon={<ArrowForwardIcon />} sx={{ mt: 1.25, px: 0, color: C.blue, fontWeight: 700, '&:hover': { backgroundColor: 'transparent', color: C.blueDark } }}>
            En savoir plus
          </Button>
        )}
      </Box>
    </Box>
  );
}

function SectionTitre({ children }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, mb: { xs: 2, md: 2.5 }, mt: { xs: 4, md: 5 } }}>
      <Box sx={{ width: 34, height: 4, borderRadius: 2, background: TRICOLOR }} />
      <Typography component="h2" sx={{ color: C.blue, fontWeight: 800, fontSize: { xs: '1.1rem', md: '1.3rem' } }}>
        {children}
      </Typography>
    </Box>
  );
}

export default async function Page() {
  const data = await getEvenements();
  const events = data && data.length ? data : EVENTS_FALLBACK;

  const featured = events.find((e) => e.a_la_une && !e.passe) || events.find((e) => e.a_la_une) || null;
  const reste = featured ? events.filter((e) => e !== featured) : events;
  const aVenir = reste.filter((e) => !e.passe).sort((a, b) => (a.date_iso < b.date_iso ? -1 : 1));
  const passes = reste.filter((e) => e.passe).sort((a, b) => (a.date_iso > b.date_iso ? -1 : 1));

  const featColor = featured ? typeColor(featured.type) : C.blue;

  return (
    <>
      <PageHero
        surtitre="Le Ministère"
        titre="Événements"
        sousTitre="L'agenda du Ministère : conférences, ateliers, missions et cérémonies officielles."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Événements' },
        ]}
      />

      <Box sx={{ backgroundColor: C.bg, py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg" disableGutters>
          {/* Événement à la une */}
          {featured && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
                backgroundColor: '#fff',
                border: `1px solid ${C.border}`,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 20px 44px rgba(0,0,0,0.12)',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  minHeight: { xs: 220, md: 340 },
                  backgroundColor: C.blueDark,
                  backgroundImage: featured.src ? `url(${featured.src})` : `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                  <DateBlock e={featured} color={featColor} large />
                </Box>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: TRICOLOR }} />
              </Box>
              <Box sx={{ p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography sx={{ color: GOLD_DARK, fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.7rem' }}>
                    À LA UNE
                  </Typography>
                  <Box sx={{ display: 'inline-block', px: 1.1, py: 0.3, borderRadius: 999, backgroundColor: `${featColor}1A`, color: featColor, fontWeight: 800, fontSize: '0.64rem', textTransform: 'uppercase' }}>
                    {featured.type}
                  </Box>
                </Box>
                <Typography component="h2" sx={{ fontWeight: 800, color: C.blue, fontSize: { xs: '1.4rem', md: '1.7rem' }, lineHeight: 1.18 }}>
                  {featured.titre}
                </Typography>
                <MetaLigne e={featured} />
                <Typography sx={{ color: '#455a64', fontSize: '0.95rem', lineHeight: 1.7, mt: 1.5 }}>
                  {featured.description}
                </Typography>
                {featured.lien && featured.lien !== '#' && (
                  <Button component="a" href={featured.lien} target="_blank" rel="noopener noreferrer" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ alignSelf: 'flex-start', mt: 2.5, backgroundColor: C.blue, fontWeight: 700, '&:hover': { backgroundColor: C.blueDark } }}>
                    En savoir plus
                  </Button>
                )}
              </Box>
            </Box>
          )}

          {/* À venir */}
          {aVenir.length > 0 && (
            <>
              <SectionTitre>À venir</SectionTitre>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 2, md: 2.5 } }}>
                {aVenir.map((e, i) => <EventCard key={i} e={e} />)}
              </Box>
            </>
          )}

          {/* Passés */}
          {passes.length > 0 && (
            <>
              <SectionTitre>Événements passés</SectionTitre>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 2, md: 2.5 } }}>
                {passes.map((e, i) => <EventCard key={i} e={e} />)}
              </Box>
            </>
          )}

          {/* Aucun événement */}
          {!featured && aVenir.length === 0 && passes.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8, color: C.muted }}>
              <EventBusyIcon sx={{ fontSize: 56, mb: 1 }} />
              <Typography sx={{ fontWeight: 700 }}>Aucun événement programmé pour le moment.</Typography>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
