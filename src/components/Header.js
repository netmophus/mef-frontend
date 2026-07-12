// En-tête complet du site : bandeau d'annonces + barre utilitaire + navigation.
// Les données (identité, coordonnées, menu) sont récupérées depuis l'API Django.
import AnnouncementBar from './AnnouncementBar';
import UtilityBar from './UtilityBar';
import MainMenu from './MainMenu';
import { getHeader } from '@/lib/api';

// Bandeau tricolore (drapeau du Niger) en tête de site
const TRICOLORE = 'linear-gradient(90deg, #FB9344 0 33.33%, #ffffff 33.33% 66.66%, #00B16C 66.66% 100%)';

export default async function Header() {
  const { site, contact, menu } = await getHeader();

  return (
    <>
      {/* Bandeaux hauts : défilent normalement avec la page */}
      <header>
        <div style={{ height: 5, background: TRICOLORE }} />
        <AnnouncementBar />
        <UtilityBar contact={contact} />
      </header>
      {/* Menu principal : sorti du <header> pour pouvoir rester collé en haut au scroll */}
      <MainMenu menu={menu} site={site} />
    </>
  );
}
