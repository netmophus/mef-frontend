import PageHero from '@/components/PageHero';
import YearArchive from '@/components/YearArchive';

export const metadata = {
  title: "Rapports d'exécution du budget — Ministère des Finances du Niger",
  description: "Rapports trimestriels d'exécution du Budget Général de l'État, publiés par la Direction Générale du Budget.",
};

const ANNEES = [
  [2026, 3], [2025, 4], [2024, 5], [2023, 4], [2022, 6], [2021, 4], [2020, 4],
  [2019, 4], [2018, 4], [2017, 4], [2016, 3], [2015, 3], [2014, 2],
].map(([annee, n]) => ({ annee, n }));

export default function Page() {
  return (
    <>
      <PageHero
        surtitre="Budget"
        titre="Rapports d'exécution du budget général de l'État"
        sousTitre="Rapports provisoires d'exécution du Budget Général de l'État, regroupés par année."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Budget', href: '/budget' },
          { label: "Rapports d'exécution" },
        ]}
      />
      <YearArchive
        intro="Les rapports d'exécution sont publiés trimestriellement par la Direction Générale du Budget (DGB). Ils sont regroupés par année. Il s'agit des rapports provisoires sur l'exécution du Budget Général de l'État."
        annees={ANNEES}
        basePath="/budget/rapports-execution"
        accent={{ main: '#E07B2C', dark: '#B85E18' }}
      />
    </>
  );
}
