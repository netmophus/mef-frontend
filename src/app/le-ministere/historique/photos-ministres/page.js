import PageHero from '@/components/PageHero';
import MinistersGallery from '@/components/MinistersGallery';
import { getMinistresHistorique } from '@/lib/api';

export const metadata = {
  title: 'Photos des ministres — Ministère des Finances du Niger',
  description: 'Galerie des ministres successifs des Finances de la République du Niger.',
};

// Repli local (si l'API est indisponible). ⚠️ Photos officielles à téléverser.
const MINISTRES_FALLBACK = [
  { nom: 'Dr Maman Laouali ABDOU RAFA', desc: "Ministre de l'Économie et des Finances (en exercice).", image: '/DrRafa.jpeg' },
  { nom: 'M. Ahmat Jidoud', desc: 'Ministre des Finances du 07/04/2021 au 26 juillet 2023.', image: '/ministres/ahmat-jidoud.jpg', secours: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80' },
  { nom: '— À renseigner —', desc: 'Ministre des Finances · 2016 – 2021.', secours: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { nom: '— À renseigner —', desc: 'Ministre des Finances · 2011 – 2016.', secours: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
  { nom: '— À renseigner —', desc: 'Ministre des Finances · 2002 – 2011.', secours: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
  { nom: '— À renseigner —', desc: 'Ministre des Finances · 1991 – 2002.', secours: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' },
];

export default async function Page() {
  const data = await getMinistresHistorique();
  const MINISTRES = data && data.length ? data : MINISTRES_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Historique"
        titre="Photos des ministres"
        sousTitre="Les titulaires successifs du portefeuille des Finances de la République du Niger."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Historique', href: '/le-ministere/historique' },
          { label: 'Photos des ministres' },
        ]}
      />
      <MinistersGallery personnes={MINISTRES} />

    </>
  );
}
