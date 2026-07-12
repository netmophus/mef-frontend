import PageHero from '@/components/PageHero';
import YearArchive from '@/components/YearArchive';
import { getBudgetAnnees } from '@/lib/api';

export const metadata = {
  title: 'Lois de règlement — Ministère des Finances du Niger',
  description: "Collection des lois de règlement du Niger, de 1997 à nos jours.",
};

// Repli local (si l'API est indisponible). ⚠️ Comptages de démonstration.
const ANNEES_FALLBACK = [
  [2026, 0], [2025, 0], [2024, 0], [2023, 0], [2022, 0], [2021, 3], [2020, 2], [2019, 2],
  [2018, 2], [2017, 4], [2016, 2], [2015, 1], [2014, 1], [2013, 1], [2012, 1], [2011, 1],
  [2010, 1], [2009, 1], [2008, 1], [2007, 1], [2006, 1], [2005, 1], [2004, 1], [2003, 1],
  [2002, 1], [2001, 0], [2000, 1], [1999, 1], [1998, 1], [1997, 1],
].map(([annee, n]) => ({ annee, n }));

export default async function Page() {
  const data = await getBudgetAnnees('lois-de-reglement');
  const annees = data?.annees?.length ? data.annees : ANNEES_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Budget"
        titre="Lois de règlement"
        sousTitre="Lois de règlement du Niger, classées par année budgétaire, de 1997 à nos jours."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Budget', href: '/budget' },
          { label: 'Lois de règlement' },
        ]}
      />
      <YearArchive
        intro="Les différentes lois de règlement adoptées sont classées en fonction des années budgétaires auxquelles elles se rapportent. Cette collection commence à partir de 1997. Certaines lois de règlement ne sont pas encore adoptées ou sont en cours d'élaboration."
        annees={annees}
        basePath="/budget/lois-de-reglement"
        accent={{ main: '#00B16C', dark: '#0A5C3A' }}
      />
    </>
  );
}
