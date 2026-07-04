import PageHero from '@/components/PageHero';
import LatestNews from '@/components/LatestNews';
import { getActualites } from '@/lib/api';

export const metadata = {
  title: 'Dernières actualités — Ministère des Finances du Niger',
  description: "Les dernières actualités du Ministère de l'Économie et des Finances de la République du Niger.",
};

// Repli local (si l'API est indisponible). ⚠️ Contenu de démonstration.
const PARAS = [
  "Cette actualité s'inscrit dans la dynamique de l'action du Ministère des Finances, au service de la transparence et du développement national.",
  "Le Ministère réaffirme sa détermination à conduire les réformes prioritaires et à renforcer la mobilisation des ressources publiques.",
];
const ACTUS_FALLBACK = [
  { id: 1, titre: 'Le Ministre des Finances signe de nouveaux accords de financement', rubrique: 'Activités du Ministre', date: '12 juin 2026', date_iso: '2026-06-12', chapo: 'Plusieurs conventions ont été paraphées avec les partenaires pour appuyer les projets prioritaires de développement du pays.', paragraphes: PARAS, src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80', a_la_une: true },
  { id: 2, titre: "Communication en Conseil des Ministres sur le budget de l'État", rubrique: 'Événements', date: '10 juin 2026', date_iso: '2026-06-10', chapo: "Le Ministre a présenté l'état d'exécution du budget et les perspectives.", paragraphes: PARAS, src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', a_la_une: false },
  { id: 3, titre: 'Audience avec la délégation du Fonds Monétaire International', rubrique: 'Audiences & Rencontres', date: '6 juin 2026', date_iso: '2026-06-06', chapo: 'Les échanges ont porté sur la coopération et les réformes en cours.', paragraphes: PARAS, src: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80', a_la_une: false },
  { id: 4, titre: "Discours d'ouverture du forum économique national", rubrique: 'Activités du Ministre', date: '2 juin 2026', date_iso: '2026-06-02', chapo: 'Le Ministre a appelé à la mobilisation de tous pour la relance.', paragraphes: PARAS, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', a_la_une: false },
];

export default async function Page() {
  const data = await getActualites();
  const articles = data && data.length ? data : ACTUS_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Actualités"
        titre="Dernières actualités"
        sousTitre="Toute l'actualité récente du Ministère de l'Économie et des Finances."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Actualités' },
          { label: 'Dernières actualités' },
        ]}
      />
      <LatestNews articles={articles} />
    </>
  );
}
