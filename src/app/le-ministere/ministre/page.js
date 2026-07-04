import { Box, Container, Typography, IconButton, Button, Chip, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import TranslateIcon from '@mui/icons-material/Translate';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SendIcon from '@mui/icons-material/Send';
import PageHero from '@/components/PageHero';
import { getBiographie } from '@/lib/api';

// ⚠️ Composant serveur : couleurs LITTÉRALES (le CSS construit à partir des
// constantes du thème — surtout l'or — peut être supprimé du rendu serveur).
const C = {
  blue: '#004080',
  blueDark: '#002B55',
  blueHover: '#003366',
  goldDark: '#B5841F',
  ink: '#37474F',
  muted: '#90A4AE',
  bg: '#EEF1F5',
  border: '#DCE3EC',
};

export const metadata = {
  title: 'Le Ministre — Ministère des Finances du Niger',
  description:
    "Biographie du Docteur Maman Laouali ABDOU RAFA, Ministre de l'Économie et des Finances de la République du Niger.",
};

// Correspondance clé (API) → icône Material UI (repères biographiques).
const REPERE_ICONS = {
  cake: CakeIcon,
  family: FamilyRestroomIcon,
  translate: TranslateIcon,
  school: SchoolIcon,
  work: WorkIcon,
  place: PlaceIcon,
};

// === Repli local (si l'API est indisponible) ================================
const BIO_FALLBACK = {
  nom: 'Docteur Maman Laouali ABDOU RAFA',
  fonction: "Ministre de l'Économie et des Finances",
  image: '/DrRafa.jpeg',
  reperes: [
    { icone: 'cake', texte: 'Né le 1ᵉʳ mai 1975 à Tessaoua (Maradi)' },
    { icone: 'family', texte: 'Marié, père de 7 enfants' },
    { icone: 'translate', texte: 'Haoussa · Français · Anglais · Djerma' },
  ],
  presentation: {
    accroche: "Macroéconomiste et spécialiste de la finance, Docteur en Administration des Affaires (DBA), option Finance, et doctorant en sciences économiques.",
    corps: "Haut responsable public, il totalise plus de vingt ans d'expérience dans la conception, la mise en œuvre et le pilotage des politiques économiques, financières et budgétaires : stabilité macroéconomique, soutenabilité de la dette publique, réformes des finances publiques, gouvernance économique et coopération financière internationale.",
  },
  formation: [
    { periode: '2022 – 2025', titre: 'Doctorate in Business Administration (DBA) — Finance', detail: 'Paris Panthéon-Assas / IFG — Très Bien' },
    { periode: '2001 – 2003', titre: 'DEA en sciences économiques (PTCI, 8ᵉ prom.)', detail: 'Univ. de Ouagadougou — Major, Très Bien' },
    { periode: '2000 – 2001', titre: 'Maîtrise en sciences économiques', detail: 'Univ. de Ouagadougou — Vice-major' },
    { periode: '1996 – 1999', titre: 'Licence en sciences économiques', detail: 'Univ. de Ouagadougou' },
  ],
  parcours: [
    { periode: 'Juil. 2023 – Fév. 2026', titre: 'Directeur national de la BCEAO pour le Niger', detail: 'BCEAO' },
    { periode: 'Fév. 2022 – Juin 2023', titre: 'Conseiller du Directeur national', detail: 'BCEAO' },
    { periode: 'Avr. – Oct. 2021', titre: 'Secrétaire général', detail: 'Ministère des Finances' },
    { periode: 'Janv. 2020 – Avr. 2021', titre: 'Secrétaire général adjoint', detail: 'Ministère des Finances' },
    { periode: 'Sept. 2016 – Janv. 2020', titre: 'DG des opérations financières et des réformes', detail: 'Ministère des Finances' },
    { periode: 'Sept. 2015 – Oct. 2021', titre: 'Secrétaire permanent du CISPEE/NAB', detail: 'Cabinet du Premier Ministre' },
  ],
  experience: [
    "Son expérience en banque centrale, acquise à la BCEAO de 2005 à 2023, a porté sur le suivi macroéconomique, les statistiques monétaires et de balance des paiements, les finances publiques, la stabilité financière et bancaire, et l'appui aux politiques économiques nationales.",
    "Il a bénéficié d'une formation continue approfondie (2004-2025) auprès de la BCEAO, du FMI, de la Banque mondiale, de la CEDEAO, d'AFRITAC, de l'IDEP et d'universités internationales (HEC Montréal/UCLA, OMNES Education, London School of Economics).",
    "Auteur de plusieurs travaux de recherche : microfinance, performance financière, pauvreté et politiques publiques, économie du bien-être en monopoles naturels, privatisation et endettement.",
  ],
  conseils: {
    periode: '2016 – 2021',
    liste: ['BCEAO', 'BOAD', 'BIDC', 'BIA Niger', 'BSIC Niger', 'BAGRI', 'FISAN', 'NIGELEC', 'NIGERTELECOM', 'SOMAIR', 'COMINAK', 'LONANI', 'CAIMA'],
  },
};
// =============================================================================

function Card({ children, sx }) {
  return (
    <Box sx={{ backgroundColor: '#fff', border: `1px solid ${C.border}`, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', p: { xs: 2.5, md: 3 }, ...sx }}>
      {children}
    </Box>
  );
}

function BlocTitre({ Icon, children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
      <Box sx={{ width: 36, height: 36, borderRadius: 1.5, backgroundColor: 'rgba(0,64,128,0.08)', color: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 21 } }}>
        <Icon />
      </Box>
      <Typography component="h2" sx={{ fontWeight: 800, color: C.blue, fontSize: '1.2rem' }}>{children}</Typography>
    </Box>
  );
}

function TimelineItem({ periode, titre, detail, org, last }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.75 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.5 }}>
        <Box sx={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#E0A92E', flexShrink: 0 }} />
        {!last && <Box sx={{ flex: 1, width: 2, backgroundColor: C.border, mt: 0.5 }} />}
      </Box>
      <Box sx={{ pb: last ? 0 : 2.25 }}>
        <Typography sx={{ color: C.goldDark, fontWeight: 800, fontSize: '0.76rem' }}>{periode}</Typography>
        <Typography sx={{ fontWeight: 700, color: C.ink, fontSize: '0.92rem', lineHeight: 1.3, mt: 0.25 }}>{titre}</Typography>
        {(detail || org) && <Typography sx={{ color: C.muted, fontSize: '0.82rem', mt: 0.25 }}>{detail || org}</Typography>}
      </Box>
    </Box>
  );
}

export default async function Page() {
  const bio = await getBiographie();
  const data = bio || BIO_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Le Ministère"
        titre="Le Ministre"
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Le Ministre' },
        ]}
      />

      <Box sx={{ backgroundColor: C.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '320px 1fr' }, gap: { xs: 3, md: 3.5 }, alignItems: 'start' }}>
            {/* Colonne gauche : profil sticky */}
            <Box sx={{ position: { md: 'sticky' }, top: { md: 96 }, width: '100%', maxWidth: { xs: 460, md: 'none' }, mx: { xs: 'auto', md: 0 } }}>
              <Card sx={{ p: 0, overflow: 'hidden' }}>
                <Box sx={{ height: { xs: 'auto', md: 340 }, aspectRatio: { xs: '4 / 5', md: 'auto' }, backgroundImage: `url(${data.image || BIO_FALLBACK.image})`, backgroundSize: 'cover', backgroundPosition: 'center top', backgroundColor: C.blueDark }} />
                <Box sx={{ p: 2.5 }}>
                  <Typography component="h1" sx={{ fontWeight: 800, color: C.blue, fontSize: '1.15rem', lineHeight: 1.25 }}>
                    {data.nom}
                  </Typography>
                  <Typography sx={{ color: C.goldDark, fontWeight: 700, fontSize: '0.88rem', mb: 1.5 }}>
                    {data.fonction}
                  </Typography>
                  <Divider sx={{ mb: 1.5 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    {data.reperes.map(({ icone, texte }, i) => {
                      const Icon = REPERE_ICONS[icone] || PlaceIcon;
                      return (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, color: C.ink, fontSize: '0.84rem' }}>
                        <Icon sx={{ fontSize: 18, color: C.blue, flexShrink: 0 }} />
                        {texte}
                      </Box>
                      );
                    })}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {[{ i: <FacebookIcon fontSize="small" />, c: '#1877F2' }, { i: <XIcon fontSize="small" />, c: '#000' }, { i: <EmailIcon fontSize="small" />, c: C.blue }].map((s, k) => (
                      <IconButton key={k} size="small" component="a" href="#" sx={{ color: '#fff', backgroundColor: s.c, '&:hover': { backgroundColor: s.c, transform: 'translateY(-2px)' } }}>
                        {s.i}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Card>
            </Box>

            {/* Colonne droite : contenu en cartes */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 3.5 } }}>
              <Card>
                <BlocTitre Icon={AccountBalanceIcon}>Présentation</BlocTitre>
                <Typography sx={{ fontWeight: 600, color: C.ink, fontSize: '1.02rem', borderLeft: '4px solid #E0A92E', pl: 2, mb: 2, lineHeight: 1.6 }}>
                  {data.presentation.accroche}
                </Typography>
                <Typography sx={{ color: '#455a64', lineHeight: 1.75, mb: 2.5 }}>{data.presentation.corps}</Typography>
                <Button component="a" href="/contact" variant="contained" startIcon={<SendIcon />} sx={{ backgroundColor: C.blue, fontWeight: 700, '&:hover': { backgroundColor: C.blueHover } }}>
                  Écrire au ministre
                </Button>
              </Card>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 3, md: 3.5 } }}>
                <Card>
                  <BlocTitre Icon={SchoolIcon}>Formation</BlocTitre>
                  {data.formation.map((f, i) => (
                    <TimelineItem key={i} periode={f.periode} titre={f.titre} detail={f.detail} last={i === data.formation.length - 1} />
                  ))}
                </Card>
                <Card>
                  <BlocTitre Icon={WorkIcon}>Parcours professionnel</BlocTitre>
                  {data.parcours.map((p, i) => (
                    <TimelineItem key={i} periode={p.periode} titre={p.titre} detail={p.detail} last={i === data.parcours.length - 1} />
                  ))}
                </Card>
              </Box>

              <Card>
                <BlocTitre Icon={AccountBalanceIcon}>Expérience &amp; expertise</BlocTitre>
                {data.experience.map((p, i) => (
                  <Typography key={i} sx={{ color: '#455a64', lineHeight: 1.75, mb: i === data.experience.length - 1 ? 2.5 : 1.5 }}>
                    {p}
                  </Typography>
                ))}
                <Typography sx={{ fontWeight: 800, color: C.blue, fontSize: '0.95rem', mb: 1.25 }}>
                  Conseils d&apos;administration ({data.conseils.periode})
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {data.conseils.liste.map((c) => (
                    <Chip key={c} label={c} size="small" sx={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, color: C.blue, fontWeight: 700, '&:hover': { borderColor: '#E0A92E' } }} />
                  ))}
                </Box>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
