// Structure du menu principal du Ministère des Finances.
// Les chemins (path) sont définitifs côté routage ; les pages correspondantes
// seront créées au fur et à mesure (parties suivantes du site).
const menuItems = [
  { label: 'Accueil', path: '/' },
  {
    label: 'Le Ministère',
    submenu: [
      { label: 'Le Ministre', path: '/le-ministere/ministre' },
      { label: 'Album photo du Ministre', path: '/le-ministere/album-photo' },
      { label: 'Événements', path: '/le-ministere/evenements' },
      { label: 'Historique', path: '/le-ministere/historique' },
      { label: 'Organigramme', path: '/le-ministere/organigramme' },
      { label: 'Partenaires', path: '/le-ministere/partenaires' },
      { label: 'Annuaire', path: '/le-ministere/annuaire' },
    ],
  },
  {
    label: 'Budget',
    submenu: [
      { label: 'Lois de finances', path: '/budget/lois-de-finances' },
      { label: 'Lois de règlement', path: '/budget/lois-de-reglement' },
      { label: "Rapports d'exécution", path: '/budget/rapports-execution' },
      { label: 'Réformes budgétaires', path: '/budget/reformes-budgetaires' },
      {
        label: 'Rapports Annuels de Performance',
        path: '/budget/rapports-performance',
      },
      { label: 'Programmation pluriannuelle (DPPD)', path: '/budget/dppd' },
    ],
  },
  {
    label: 'Économie nigérienne',
    submenu: [
      { label: 'Indicateurs macroéconomiques', path: '/economie/indicateurs' },
    ],
  },
  {
    label: 'Actualités',
    submenu: [
      { label: 'Dernières actualités', path: '/actualites/dernieres' },
      { label: 'Actualités à la une', path: '/actualites/a-la-une' },
      { label: 'Revue de presse', path: '/actualites/revue-de-presse' },
    ],
  },
  {
    label: 'Médiathèque',
    submenu: [
      { label: 'Photos', path: '/mediatheque/photos' },
      { label: 'Vidéos', path: '/mediatheque/videos' },
    ],
  },
  {
    label: 'Publications',
    submenu: [
      { label: 'Publications du Ministère', path: '/publications/ministere' },
      { label: 'Autres publications', path: '/publications/autres' },
      { label: 'États Financiers', path: '/publications/etats-financiers' },
    ],
  },
  {
    label: "S'informer",
    submenu: [
      { label: 'Liens & Partenaires', path: '/informer/liens-partenaires' },
    ],
  },
];

export default menuItems;
