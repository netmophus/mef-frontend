import PageHero from '@/components/PageHero';
import MinistersGallery from '@/components/MinistersGallery';
import { getMinistresDelegues } from '@/lib/api';

export const metadata = {
  title: "Ministres délégués & Secrétaires d'État — Ministère des Finances du Niger",
  description: "Galerie des ministres délégués et secrétaires d'État auprès du Ministère des Finances.",
};

// Repli local (si l'API est indisponible). ⚠️ Contenu de démonstration.
const PERSONNES_FALLBACK = [
  { nom: '— À renseigner —', desc: 'Ministre délégué au Budget · période à renseigner.', secours: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { nom: '— À renseigner —', desc: "Secrétaire d'État au Budget · période à renseigner.", secours: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
  { nom: '— À renseigner —', desc: "Secrétaire d'État aux Finances · période à renseigner.", secours: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80' },
  { nom: '— À renseigner —', desc: 'Ministre délégué · période à renseigner.', secours: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
];

export default async function Page() {
  const data = await getMinistresDelegues();
  const PERSONNES = data && data.length ? data : PERSONNES_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Historique"
        titre="Ministres délégués & Secrétaires d'État"
        sousTitre="Les ministres délégués et secrétaires d'État ayant servi auprès du Ministère des Finances."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Le Ministère', href: '/le-ministere' },
          { label: 'Historique', href: '/le-ministere/historique' },
          { label: "Ministres délégués & SE" },
        ]}
      />
      <MinistersGallery personnes={PERSONNES} />
    </>
  );
}
