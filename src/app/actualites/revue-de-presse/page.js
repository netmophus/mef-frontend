import PageHero from '@/components/PageHero';
import YearArchive from '@/components/YearArchive';
import { getRevueAnnees } from '@/lib/api';

export const metadata = {
  title: 'Revue de presse — Ministère des Finances du Niger',
  description:
    "Revue de presse du Ministère de l'Économie et des Finances de la République du Niger : parutions et articles consacrés à l'économie et aux finances publiques.",
};

// Repli local (si l'API est indisponible). ⚠️ Comptages de démonstration.
const ANNEES_FALLBACK = [
  [2025, 15], [2024, 47], [2023, 48], [2022, 47], [2021, 48],
  [2020, 47], [2019, 52], [2018, 53], [2017, 52], [2016, 43],
].map(([annee, n]) => ({ annee, n }));

export default async function Page() {
  const data = await getRevueAnnees();
  const annees = data?.annees?.length ? data.annees : ANNEES_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Actualités"
        titre="Revue de presse"
        sousTitre="Les parutions et articles de presse consacrés à l'économie et aux finances publiques du Niger."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Actualités' },
          { label: 'Revue de presse' },
        ]}
      />
      <YearArchive
        intro="La revue de presse rassemble, numéro après numéro, les principales parutions de presse consacrées à l'économie et aux finances publiques du Niger. Sélectionnez une année pour consulter et télécharger les numéros correspondants."
        annees={annees}
        basePath="/actualites/revue-de-presse"
      />
    </>
  );
}
