import { Box, Container, Typography } from '@mui/material';
import PageHero from '@/components/PageHero';
import { getCabinet } from '@/lib/api';
import { TRICOLOR } from '@/theme';

// ⚠️ Composant serveur : couleurs LITTÉRALES (le CSS construit à partir des
// constantes du thème peut être supprimé du rendu serveur).
const C = {
  blue: '#0C7449',
  blueDark: '#002B55',
  green: '#00B16C',
  greenDark: '#0A5C3A',
  orange: '#FB9344',
  ink: '#37474F',
  muted: '#90A4AE',
  bg: '#EEF1F5',
  border: '#DCE3EC',
};
const GOLD = '#E0A92E';

export const metadata = {
  title: 'Cabinet du ministre — Ministère des Finances du Niger',
  description: "Composition du cabinet du Ministre de l'Économie et des Finances de la République du Niger.",
};

// Photos de remplacement (en attendant les vraies photos des membres via l'admin).
// ⚠️ Démo : on réutilise les visuels disponibles dans public/.
const PHOTOS_DEMO = ['/drrafa1.jpg', '/drrafa2.jpg', '/DrRafa.jpeg'];

// Repli local (si l'API est indisponible). ⚠️ Noms fictifs.
const CABINET_FALLBACK = [
  { nom: 'M. Abdoulaye Issoufou', fonction: 'Directeur de Cabinet', photo: null },
  { nom: 'Mme Hadiza Saïdou', fonction: 'Directrice Adjointe de Cabinet', photo: null },
  { nom: 'M. Ibrahim Maïga', fonction: 'Chef de Cabinet', photo: null },
  { nom: 'Mme Fatouma Oumarou', fonction: 'Secrétaire Particulière du Ministre', photo: null },
  { nom: 'M. Salifou Garba', fonction: 'Conseiller Technique — Finances Publiques', photo: null },
  { nom: 'M. Moussa Adamou', fonction: 'Conseiller Technique — Fiscalité et Douanes', photo: null },
  { nom: 'Mme Rakiatou Hassane', fonction: 'Conseillère en Communication', photo: null },
  { nom: 'M. Ali Mahamadou', fonction: 'Conseiller Juridique', photo: null },
];

// Accent de couleur selon la nature de la fonction.
function accentDe(fonction = '') {
  const f = fonction.toLowerCase();
  if (f.includes('cabinet')) return { c: C.blue, label: 'Direction de Cabinet' };
  if (f.includes('secrét')) return { c: C.orange, label: 'Secrétariat particulier' };
  if (f.includes('communication')) return { c: GOLD, label: 'Communication' };
  if (f.includes('juridique')) return { c: C.greenDark, label: 'Affaires juridiques' };
  if (f.includes('conseil')) return { c: C.green, label: 'Conseillers techniques' };
  return { c: C.blue, label: 'Cabinet' };
}

// Initiales pour le repli sans photo.
function initiales(nom = '') {
  return nom
    .replace(/^(M\.|Mme|Mlle|Dr)\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((mot) => mot[0])
    .join('')
    .toUpperCase();
}

export default async function Page() {
  const data = (await getCabinet()) || CABINET_FALLBACK;
  const membres = data.map((m, i) => ({ ...m, photo: m.photo || PHOTOS_DEMO[i % PHOTOS_DEMO.length] }));

  const [vedette, ...autres] = membres;

  return (
    <>
      <PageHero
        surtitre="Le Ministère"
        titre="Cabinet du ministre"
        sousTitre="Les femmes et les hommes qui entourent le Ministre dans la conduite de sa mission."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Cabinet du ministre' },
        ]}
      />

      <Box sx={{ backgroundColor: C.bg, py: { xs: 5, md: 7 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg" disableGutters>
          {/* Intro */}
          <Box sx={{ maxWidth: 760, mb: { xs: 4, md: 6 } }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
              <Box sx={{ width: 34, height: 4, borderRadius: 2, background: TRICOLOR }} />
              <Typography
                sx={{ color: GOLD, fontWeight: 800, letterSpacing: '0.14em', fontSize: '0.72rem' }}
              >
                ÉQUIPE RAPPROCHÉE
              </Typography>
            </Box>
            <Typography
              component="h2"
              sx={{ color: C.blue, fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.9rem' }, lineHeight: 1.2 }}
            >
              Le Cabinet du Ministre
            </Typography>
            <Typography sx={{ color: C.ink, mt: 1.5, fontSize: { xs: '0.95rem', md: '1.02rem' }, lineHeight: 1.7 }}>
              Le cabinet assiste le Ministre dans l'exercice de ses attributions : impulsion des
              réformes, coordination des directions et services, communication institutionnelle et
              conseil. Il réunit des cadres expérimentés au service des finances publiques de la
              République du Niger.
            </Typography>
          </Box>

          {/* Membre vedette — Directeur de Cabinet */}
          {vedette && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
                backgroundColor: '#fff',
                border: `1px solid ${C.border}`,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 18px 40px rgba(0,0,0,0.10)',
                mb: { xs: 4, md: 6 },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  minHeight: { xs: 320, md: '100%' },
                  aspectRatio: { xs: '4 / 4', md: 'auto' },
                  backgroundImage: `url(${vedette.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
              />
              <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography sx={{ color: GOLD, fontWeight: 800, letterSpacing: '0.1em', fontSize: '0.74rem', mb: 1 }}>
                  {accentDe(vedette.fonction).label.toUpperCase()}
                </Typography>
                <Typography sx={{ color: C.blue, fontWeight: 800, fontSize: { xs: '1.45rem', md: '1.85rem' }, lineHeight: 1.15 }}>
                  {vedette.nom}
                </Typography>
                <Typography sx={{ color: C.ink, fontWeight: 600, fontSize: { xs: '1rem', md: '1.1rem' }, mt: 0.8 }}>
                  {vedette.fonction}
                </Typography>
                <Box sx={{ width: 60, height: 4, borderRadius: 2, background: TRICOLOR, my: 2.2 }} />
                <Typography sx={{ color: C.muted, fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 560 }}>
                  Premier collaborateur du Ministre, il coordonne l'action de l'ensemble du cabinet et
                  veille à la bonne exécution des orientations du Ministère de l'Économie et des Finances.
                </Typography>
              </Box>
            </Box>
          )}

          {/* Autres membres */}
          <Typography
            component="h3"
            sx={{ color: C.blue, fontWeight: 800, fontSize: { xs: '1.05rem', md: '1.25rem' }, mb: 2.5 }}
          >
            Conseillers &amp; collaborateurs
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
              gap: { xs: 2, md: 3 },
            }}
          >
            {autres.map((m, i) => {
              const accent = accentDe(m.fonction);
              return (
                <Box
                  key={i}
                  sx={{
                    backgroundColor: '#fff',
                    border: `1px solid ${C.border}`,
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 8px 22px rgba(0,0,0,0.07)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 18px 34px rgba(0,0,0,0.14)' },
                    '&:hover .cab-img': { transform: 'scale(1.06)' },
                  }}
                >
                  <Box sx={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', backgroundColor: C.blueDark }}>
                    {m.photo ? (
                      <Box
                        className="cab-img"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${m.photo})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center top',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
                          color: 'rgba(255,255,255,0.85)',
                          fontWeight: 800,
                          fontSize: '1.6rem',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {initiales(m.nom)}
                      </Box>
                    )}

                    {/* Étiquette de catégorie */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        px: 1.1,
                        py: 0.4,
                        borderRadius: 999,
                        backgroundColor: 'rgba(255,255,255,0.92)',
                        color: accent.c,
                        fontWeight: 700,
                        fontSize: '0.62rem',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(2px)',
                      }}
                    >
                      {accent.label}
                    </Box>

                    {/* Filet tricolore */}
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: TRICOLOR }} />
                  </Box>

                  <Box sx={{ p: 2, borderLeft: `4px solid ${accent.c}` }}>
                    <Typography sx={{ fontWeight: 800, color: C.blue, fontSize: '0.98rem', lineHeight: 1.25 }}>
                      {m.nom}
                    </Typography>
                    <Typography sx={{ color: C.muted, fontSize: '0.82rem', mt: 0.5, lineHeight: 1.4 }}>
                      {m.fonction}
                    </Typography>
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
