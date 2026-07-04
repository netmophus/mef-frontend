import { cache } from 'react';
import { API_URL, INFOS_MINISTERE } from '@/config';
import menuItems from '@/components/menuConfig';

// Durée de cache (en secondes) des appels à l'API.
//   0  = toujours frais (les changements de l'admin apparaissent tout de suite) → dev
//   >0 = met en cache N secondes (ex. 300 en production, l'API change rarement)
// Réglable sans toucher au code via NEXT_PUBLIC_API_REVALIDATE dans .env.local.
const REVALIDATE = Number(process.env.NEXT_PUBLIC_API_REVALIDATE ?? 0);

// Options de fetch : cache temporisé si REVALIDATE > 0, sinon toujours frais.
function fetchOptions() {
  return REVALIDATE > 0 ? { next: { revalidate: REVALIDATE } } : { cache: 'no-store' };
}

// GET JSON depuis l'API, avec repli en cas d'échec (le site ne casse jamais).
async function fetchJSON(path, fallback) {
  try {
    const res = await fetch(`${API_URL}${path}`, fetchOptions());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[api] ${path} indisponible, repli :`, err.message);
    return fallback;
  }
}

// Données de repli de l'en-tête = exactement les valeurs locales d'origine.
const HEADER_FALLBACK = {
  site: {
    nom: 'MINISTÈRE DES FINANCES',
    sousTitre: 'République du Niger',
    logo: null,
  },
  contact: INFOS_MINISTERE,
  menu: menuItems,
};

// `cache` (React) mémoïse l'appel pour une même requête de rendu.
// Pour les listes/objets, le repli est `null` : le composant retombe alors sur
// ses données internes de secours.
export const getHeader = cache(() => fetchJSON('/api/header/', HEADER_FALLBACK));
export const getSlides = cache(() => fetchJSON('/api/slides/', null));
export const getQuickLinks = cache(() => fetchJSON('/api/quick-links/', null));
export const getMinistre = cache(() => fetchJSON('/api/ministre/', null));
export const getBiographie = cache(() => fetchJSON('/api/ministre/biographie/', null));
export const getCabinet = cache(() => fetchJSON('/api/cabinet/', null));
export const getDiscours = cache(() => fetchJSON('/api/discours/', null));
export const getAlbumMinistre = cache(() => fetchJSON('/api/album-ministre/', null));
export const getEvenements = cache(() => fetchJSON('/api/evenements/', null));
export const getActualites = cache(() => fetchJSON('/api/actualites/', null));
export const getIndicateurs = cache(() => fetchJSON('/api/indicateurs/', null));
export const getLiensPartenaires = cache(() => fetchJSON('/api/liens-partenaires/', null));
export const getBudgetAnnees = cache((rubrique) => fetchJSON(`/api/budget/${rubrique}/annees/`, null));
export const getBudgetDocuments = cache((rubrique, annee) => fetchJSON(`/api/budget/${rubrique}/${annee}/`, null));
export const getRevueAnnees = cache(() => fetchJSON('/api/revue-presse/annees/', null));
export const getRevueNumeros = cache((annee) => fetchJSON(`/api/revue-presse/${annee}/`, null));
export const getPhotos = cache(() => fetchJSON('/api/mediatheque/photos/', null));
export const getVideos = cache(() => fetchJSON('/api/mediatheque/videos/', null));
export const getPublications = cache((rubrique) => fetchJSON(`/api/publications/${rubrique}/`, null));
export const getDenominations = cache(() => fetchJSON('/api/historique/denominations/', null));
export const getMinistresHistorique = cache(() => fetchJSON('/api/historique/ministres/', null));
export const getMinistresDelegues = cache(() => fetchJSON('/api/historique/ministres-delegues/', null));
export const getTextesOrganisation = cache(() => fetchJSON('/api/historique/textes-organisation/', null));
