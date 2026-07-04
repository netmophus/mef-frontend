import PageHero from '@/components/PageHero';
import PublicationsList from '@/components/PublicationsList';
import { getPublications } from '@/lib/api';

export const metadata = {
  title: 'Publications du Ministère — Ministère des Finances du Niger',
  description:
    "Publications du Ministère de l'Économie et des Finances de la République du Niger : bulletins, arrêtés, décrets, rapports et synthèses.",
};

// Repli local (si l'API est indisponible). ⚠️ Liens PDF en « # ».
const PUBLICATIONS_FALLBACK = [
  { type: 'Bulletin', titre: 'Bulletin Statistique sur la Dette Publique - fin décembre 2025' },
  { type: 'Arrêté', titre: "Arrêté n°0148_MEF_SG_DGB du 30 avril 2026 modifiant et complétant l'arrêté n°089-MEF-SG-DGB du 25 mars 2026_Comité PEG" },
  { type: 'Document', titre: 'Document de Programmation Budgétaire et Économique Pluriannuelle 2026-2028 (Mai 2025)' },
  { type: 'Arrêté', titre: "Arrêté n°00087/MDPM/F/SG/DGB du 25 mars 2026 DDRB Comité d'élaboration du Document de Déclaration sur les Risques budgétaires" },
  { type: 'Arrêté', titre: "Arrêté n°00089 du 25 mars 2026 Comité de pilotage du Plan d'Engagement Global" },
  { type: 'Compte rendu', titre: "COMPTE RENDU D'ADJUDICATION DES OBLIGATIONS ASSIMILABLES DU TRÉSOR" },
  { type: 'Décret', titre: 'Décret n°2025-703-PRN-MEF du 28 novembre 2025, modifiant et complétant le décret n°2023-179-CNSP-MEF du 14 octobre 2023, portant organisation du MEF' },
  { type: 'Décret', titre: 'Décret n°2024-567-P-CNSP-MEF du 19 septembre 2024, modifiant et complétant le décret n°2023-179 du MEF du 14 octobre 2023, portant organisation du MEF' },
  { type: 'Synthèse', titre: "Synthèse de l'Étude de Vulnérabilité du Projet de Renforcement de l'Alimentation en Eau Potable et Assainissement et d'Amélioration de la Résilience à Zinder, Mirriah et Villages Environnants (PREPAAR-ZMVE)" },
  { type: 'Synthèse', titre: "Synthèse de l'Étude de Vulnérabilité du Projet de Connectivité et d'Intégration du Sud du Niger (PICSN)" },
  { type: 'Synthèse', titre: "Synthèse de l'Étude de Vulnérabilité du Projet d'Appui au Développement des Cultures Irriguées et à l'Intensification de la Production Animale (PACIPA)" },
  { type: 'Rapport', titre: 'Rapport Analyse de la Viabilité de la Dette_AVD_2025' },
  { type: 'Bulletin', titre: 'Bulletin statistique sur la Dette Publique fin septembre 2025' },
  { type: 'Bulletin', titre: 'Bulletin statistique annuel 2024 sur la dette publique' },
  { type: 'Plan', titre: "Plan d'Engagement Environnemental et Social (PEES) - Version corrigée - 8 mai 2025" },
];

export default async function Page() {
  const data = await getPublications('ministere');
  const items = data && data.length ? data : PUBLICATIONS_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Publications"
        titre="Publications du Ministère"
        sousTitre="Bulletins, arrêtés, décrets, rapports et synthèses publiés par le Ministère de l'Économie et des Finances."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Publications' },
          { label: 'Publications du Ministère' },
        ]}
      />
      <PublicationsList items={items} />
    </>
  );
}
