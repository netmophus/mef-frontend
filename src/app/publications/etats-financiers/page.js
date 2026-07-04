import PageHero from '@/components/PageHero';
import PublicationsList from '@/components/PublicationsList';
import { getPublications } from '@/lib/api';

export const metadata = {
  title: 'États Financiers — Ministère des Finances du Niger',
  description:
    "États financiers certifiés des entreprises publiques du Niger publiés par le Ministère de l'Économie et des Finances.",
};

// Repli local (si l'API est indisponible). ⚠️ Liens PDF en « # ».
const ENT_2020 = ['SPEN', 'SOPAMIN', 'SONIDEP', 'ORTN', 'OPVN', 'ONPPC', 'NIGER TELECOMS', 'NIGELEC', 'LONANI', 'CNUT'];
const ENT_2018 = ['SOPAMIN', 'SONIDEP', 'NIGER TELECOMS', 'NIGELEC', 'LONANI'];

const ETATS_FALLBACK = [
  ...ENT_2020.map((ent) => ({ type: '2020', titre: `État financier certifié synthétisé au 31 décembre 2020 — ${ent}` })),
  ...ENT_2018.map((ent) => ({ type: '2018', titre: `États financiers 2018 — ${ent}` })),
];

export default async function Page() {
  const data = await getPublications('etats-financiers');
  const items = data && data.length ? data : ETATS_FALLBACK;

  return (
    <>
      <PageHero
        surtitre="Publications"
        titre="États Financiers"
        sousTitre="États financiers certifiés des entreprises publiques du Niger."
        fil={[
          { label: 'Accueil', href: '/' },
          { label: 'Publications' },
          { label: 'États Financiers' },
        ]}
      />
      <PublicationsList items={items} />
    </>
  );
}
