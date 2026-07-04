import { Box, Container, Typography } from '@mui/material';
import {
  getSlides, getQuickLinks, getMinistre, getAlbumMinistre,
  getEvenements, getActualites, getIndicateurs, getLiensPartenaires,
} from '@/lib/api';
import HeroSlider from '@/components/HeroSlider';
import MinisterCard from '@/components/MinisterCard';
import QuickAccess from '@/components/QuickAccess';
import AgendaBlock from '@/components/AgendaBlock';
import MinisterAlbum from '@/components/MinisterAlbum';
import ActusSlider from '@/components/ActusSlider';
import MacroIndicators from '@/components/MacroIndicators';
import ResourcesPartners from '@/components/ResourcesPartners';

// Page d'accueil :
//  - carrousel
//  - zone 2 colonnes : (gauche) panneau « Le Ministre » / (droite) album photo
//  - section « Le Ministère / Événements » en pleine largeur
//  - indicateurs macroéconomiques
//  - actualités à la une (mosaïque)
export default async function Home() {
  const [slides, quickLinks, ministre, album, evenements, actualites, indicateurs, liensPart] =
    await Promise.all([
      getSlides(),
      getQuickLinks(),
      getMinistre(),
      getAlbumMinistre(),
      getEvenements(),
      getActualites(),
      getIndicateurs(),
      getLiensPartenaires(),
    ]);

  // Agenda d'accueil : événements à venir, du plus proche au plus lointain,
  // ramenés à la forme attendue par AgendaBlock.
  const agendaEvents = evenements
    ? evenements
        .filter((e) => !e.passe)
        .sort((a, b) => (a.date_iso < b.date_iso ? -1 : 1))
        .map((e) => ({ date: e.date, tag: e.type, titre: e.titre, image: e.src }))
    : undefined;

  // 6 dernières actualités → forme attendue par ActusSlider.
  const actusCards = actualites
    ? actualites.slice(0, 6).map((a) => ({
        categorie: a.rubrique, date: a.date, titre: a.titre, secours: a.src,
      }))
    : undefined;

  return (
    <>
      <HeroSlider slides={slides} />

      {/* Accès rapides — en haut */}
      <Box sx={{ background: 'linear-gradient(180deg, #DCE7F3 0%, #EAEEF4 60%, #EEF1F5 100%)', pt: { xs: 4, md: 5 }, pb: { xs: 3, md: 4 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg" disableGutters>
          <QuickAccess liens={quickLinks} />
        </Container>
      </Box>

      {/* Zone deux colonnes */}
      <Box
        sx={{
          backgroundColor: '#EEF1F5',
          pt: { xs: 1, md: 2 },
          pb: { xs: 3, md: 4 },
          px: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 30%) minmax(0, 70%)' },
              gap: { xs: 4, md: 4 },
              alignItems: 'stretch',
            }}
          >
            {/* Colonne gauche : le Ministre */}
            <MinisterCard ministre={ministre} />

            {/* Colonne droite : album photo du Ministre */}
            <MinisterAlbum photos={album} />
          </Box>
        </Container>
      </Box>

      {/* Le Ministère / Événements — pleine largeur */}
      <Box
        sx={{
          backgroundColor: '#EEF1F5',
          pt: { xs: 1, md: 2 },
          pb: { xs: 4, md: 6 },
          px: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <AgendaBlock events={agendaEvents} />
        </Container>
      </Box>

      <ActusSlider actus={actusCards} />
      <MacroIndicators
        grands={indicateurs?.grands?.length ? indicateurs.grands : undefined}
        cles={indicateurs?.cles?.length ? indicateurs.cles : undefined}
      />
      <ResourcesPartners
        liens={liensPart?.liens?.length ? liensPart.liens : undefined}
        partenaires={liensPart?.partenaires?.length ? liensPart.partenaires : undefined}
        reforme={liensPart?.reforme || undefined}
      />
    </>
  );
}
