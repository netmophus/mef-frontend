import PageHero from '@/components/PageHero';
import PublicationsList from '@/components/PublicationsList';
import { getPublications } from '@/lib/api';

export const metadata = {
  title: 'Autres publications — Ministère des Finances du Niger',
  description:
    "Autres publications du Ministère de l'Économie et des Finances de la République du Niger : études, projets, textes réglementaires, communiqués et documents du FMI.",
};

// Repli local (si l'API est indisponible). ⚠️ Liens PDF en « # ».
const PUBLICATIONS_FALLBACK = [
  { type: 'Plan', titre: "Plan d'Engagement Environnemental et Social (PEES) - 04 février 2026" },
  { type: 'Plan', titre: 'Environmental and Social Commitment Plan (ESCP) - 04 February 2026' },
  { type: 'Communiqué', titre: 'Communication du Ministre Délégué au Budget au Conseil Consultatif de la Refondation sur la situation économique et financière — Décembre 2025' },
  { type: 'Étude', titre: "Mission d'évaluation virtuelle du projet d'aménagement et bitumage de la route Doutchi-Kurdula – frontière du Nigeria, 20-22 septembre 2021" },
  { type: 'Étude', titre: "Étude d'impact environnemental et social du projet d'aménagement et de bitumage de la route Dogondoutchi – Bagaroua (140,475 km) - Rapport définitif" },
  { type: 'Rapport', titre: 'Rapport provisoire de faisabilité économique : Doutchi - Dogonkiria - Bagaroua' },
  { type: 'Rapport', titre: 'Rapport économique - Annexe TRE : Doutchi - Bagaroua' },
  { type: 'Projet', titre: "Projet de renforcement de la résilience des communautés rurales à l'insécurité alimentaire et nutritionnelle au Niger (PRECIS) - Rapport de conception détaillée" },
  { type: 'Projet', titre: 'Programme de gestion du secteur public pour la résilience et la prestation de services (P174822)' },
  { type: 'Projet', titre: "Projet d'approfondissement du secteur financier et d'inclusion financière au Niger (PASFIF – Niger)" },
  { type: 'Étude', titre: "Études de faisabilité économique, études d'impacts environnemental et social, études techniques détaillées avec production du dossier d'appel d'offres (DAO) pour les travaux de réhabilitation de la route Tahoua-Tamaya (205 km)" },
  { type: 'Projet', titre: "Niger, Projet d'Amélioration de l'Accès des Femmes et des Filles aux Services de Santé et de Nutrition dans les Zones Prioritaires - LAFIA-IYALI (Phase 1) (P171767)" },
  { type: 'Projet', titre: 'Projet Intégré de Développement Urbain et de Résilience Multisectorielle au Niger (PIDUREM)' },
  { type: 'Projet', titre: "Projet Régional d'Appui au Pastoralisme au Sahel – Phase II (PRAPS 2) - Document de Pré PAD" },
  { type: 'Projet', titre: "Projet Intégré de Désenclavement des Zones de Production Transfrontalières Hamdara-Wacha-Dungass-Frontière Nigeria - Rapport d'Évaluation du Projet" },
  { type: 'Communiqué', titre: "Recrutement d'un/une (01) Responsable de Sécurité du Système d'Information (RSSI) et d'un (01) Auditeur Senior" },
  { type: 'Décret', titre: "Décret n°2023-179_PCNSP_MEF du 14 octobre 2023 portant organisation du Ministère de l'Économie et des Finances" },
  { type: 'Rapport', titre: 'Rapport du Marché Nigérien des Assurances au titre de 2022' },
  { type: 'Communiqué', titre: "Centre Professionnel de Formation à l'Assurance (CPFA) : Communiqué" },
  { type: 'FMI', titre: "Le conseil d'administration du FMI achève la deuxième revue de l'accord au titre de la facilité élargie de crédit (FEC) en faveur du Niger" },
  { type: 'Communiqué', titre: 'SNFI : Appel à candidatures' },
  { type: 'Document', titre: 'Système de gestion environnementale et sociale du FDIF (Fonds de Développement de la Finance Inclusive)' },
  { type: 'Arrêté', titre: 'Arrêté n°0074-MF-SG-DGB du 15-02-2022 portant organisation de la DGB et fixant les attributions des responsables' },
  { type: 'Arrêté', titre: "Arrêté n°0368_MF_SG_DGEP_PE du 29 juin 2022 déterminant la liste des Établissements Publics, des Sociétés d'État et des Sociétés d'Économie Mixte" },
  { type: 'Décret', titre: 'Décret n°2022-459_PRN_MF du 02 juin 2022 modifiant et complétant le décret n°327-PRN-MF du 13 mai 2021 portant organisation du Ministère des Finances' },
  { type: 'FMI', titre: 'FMI - Perspectives économiques régionales - Afrique subsaharienne : Un nouveau choc et une faible marge de manœuvre - Présentation du 10 juin 2022' },
  { type: 'FMI', titre: 'FMI - Perspectives économiques régionales - Afrique subsaharienne : Un nouveau choc et une faible marge de manœuvre' },
  { type: 'FMI', titre: 'Communiqué de presse mission FMI - mai 2022' },
  { type: 'Arrêté', titre: 'Arrêté N°000145/MF/SG/DGT/CP du 28 mars 2022 portant organisation de la Direction Générale du Trésor et de la Comptabilité Publique et fixant les attributions des responsables' },
  { type: 'Communiqué', titre: 'Communiqué relatif au recrutement des Cadres Supérieurs, gestionnaires et comptables à la CICA-Ré' },
  { type: 'Document', titre: 'Document de Programmation Budgétaire et Économique Pluriannuelle (DPBEP 2022-2024)' },
  { type: 'Communiqué', titre: "Communiqué relatif à la fermeture de l'accès au rond justice venant du siège de la banque BSIC" },
  { type: 'Loi', titre: 'Loi N° 2019-56 portant organisation de la concurrence au Niger' },
  { type: 'Loi', titre: 'Loi n° 2019-50 déterminant les infractions et leurs sanctions en matière de protection des consommateurs' },
  { type: 'Loi', titre: "Ordonnance N° 2020-02 du 27 janvier 2020 déterminant la liste des autres agents publics assujettis à l'obligation de déclaration de biens" },
  { type: 'Plan', titre: "Plan Prévisionnel de Passation des Marchés Publics du Ministère des Finances au titre de l'année 2020" },
  { type: 'Document', titre: 'Liste des contribuables à jour dans leurs obligations' },
  { type: 'Communiqué', titre: "Les résultats du concours international d'entrée au CPFA (Centre Professionnel de Formation en Assurance) du Niger" },
  { type: 'Rapport', titre: "Rapport d'évaluation de la campagne agricole d'hivernage 2018 et perspectives alimentaires 2018/2019" },
  { type: 'Document', titre: "Document-cadre de politique et de stratégie régionale d'inclusion financière dans l'UEMOA" },
  { type: 'FMI', titre: "Perspectives économiques régionales : Afrique subsaharienne, Un changement de cap s'impose (FMI 2016)" },
  { type: 'Document', titre: "Recueil des textes fondamentaux de la réglementation des marchés publics et des délégations de service public & les directives de l'UEMOA" },
];

export default async function Page() {
  const data = await getPublications('autres');
  const items = data && data.length ? data : PUBLICATIONS_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Publications"
        titre="Autres publications"
        sousTitre="Études, projets, textes réglementaires, communiqués et documents de référence."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Publications' },
          { label: 'Autres publications' },
        ]}
      />
      <PublicationsList items={items} />
    </>
  );
}
