import PageHero from '@/components/PageHero';
import YearArchive from '@/components/YearArchive';
import { getBudgetAnnees } from '@/lib/api';

export const metadata = {
  title: 'Lois de finances — Ministère des Finances du Niger',
  description: "Collection des lois de finances et lois de finances rectificatives du Niger, de 1980 à nos jours.",
};

// Repli local (si l'API est indisponible). ⚠️ Comptages de démonstration.
const ANNEES_FALLBACK = [
  [2027, 1], [2026, 15], [2025, 16], [2024, 12], [2023, 23], [2022, 22], [2021, 22],
  [2020, 23], [2019, 24], [2018, 9], [2017, 6], [2016, 9], [2015, 4], [2014, 3], [2013, 3],
  [2012, 8], [2011, 4], [2010, 5], [2009, 3], [2008, 8], [2007, 3], [2006, 3], [2005, 6],
  [2004, 6], [2003, 4], [2002, 2], [2001, 2], [2000, 1], [1999, 2], [1998, 0], [1997, 1],
  [1996, 1], [1995, 2], [1994, 0], [1993, 1], [1992, 0], [1991, 1], [1990, 1], [1989, 1],
  [1988, 2], [1987, 2], [1986, 2], [1985, 1], [1984, 2], [1983, 1], [1982, 2], [1981, 1], [1980, 2],
].map(([annee, n]) => ({ annee, n }));

export default async function Page() {
  const data = await getBudgetAnnees('lois-de-finances');
  const annees = data?.annees?.length ? data.annees : ANNEES_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Budget"
        titre="Lois de finances"
        sousTitre="Lois de finances et lois rectificatives du Niger, de 1980 à nos jours."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Budget', href: '/budget' },
          { label: 'Lois de finances' },
        ]}
      />
      <YearArchive
        intro="Cette rubrique réunit une collection de lois de finances ainsi que les différentes lois rectificatives intervenues de 1980 à nos jours. Sélectionnez une année pour consulter les textes correspondants."
        annees={annees}
        basePath="/budget/lois-de-finances"
      />
    </>
  );
}
