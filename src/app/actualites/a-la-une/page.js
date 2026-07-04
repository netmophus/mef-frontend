import PageHero from '@/components/PageHero';
import NewsHighlights from '@/components/NewsHighlights';
import { getActualites } from '@/lib/api';

export const metadata = {
  title: 'Actualités à la une — Ministère des Finances du Niger',
  description: "Les actualités à la une du Ministère de l'Économie et des Finances de la République du Niger.",
};

// Étiquette courte de la mosaïque (chip) selon la rubrique.
const CATEGORIE_COURTE = {
  'Activités du Ministre': 'Activités',
  'Événements': 'Événement',
  'Audiences & Rencontres': 'Audience',
  'Communiqués': 'Communiqué',
};

export default async function Page() {
  const data = await getActualites();
  // On ne garde que les actualités « à la une », mises à la forme de NewsHighlights.
  const alaune = (data || [])
    .filter((a) => a.a_la_une)
    .map((a) => ({
      categorie: CATEGORIE_COURTE[a.rubrique] || a.rubrique,
      rubrique: a.rubrique,
      date: a.date,
      titre: a.titre,
      extrait: a.chapo,
      image: a.src,
      paragraphes: a.paragraphes,
    }));

  return (
    <>
      <PageHero
        surtitre="Actualités"
        titre="Actualités à la une"
        sousTitre="Les temps forts et l'actualité du Ministère de l'Économie et des Finances."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Actualités' },
          { label: 'À la une' },
        ]}
      />
      {/* Si l'API ne renvoie rien, NewsHighlights retombe sur ses données de démo. */}
      <NewsHighlights hideHeader articles={alaune.length ? alaune : undefined} />
    </>
  );
}
