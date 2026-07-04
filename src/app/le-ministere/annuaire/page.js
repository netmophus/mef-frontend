import PageHero from '@/components/PageHero';
import AnnuaireDirectory from '@/components/AnnuaireDirectory';

export const metadata = {
  title: 'Annuaire — Ministère des Finances du Niger',
  description: "Annuaire des services, directions et cellules du Ministère des Finances de la République du Niger.",
};

export default function Page() {
  return (
    <>
      <PageHero
        surtitre="Le Ministère"
        titre="Annuaire"
        sousTitre="Coordonnées des services, directions et cellules du Ministère des Finances."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Annuaire' },
        ]}
      />
      <AnnuaireDirectory />
    </>
  );
}
