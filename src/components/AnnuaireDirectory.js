'use client';

import { useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { COLORS } from '@/theme';

const ADR = 'Avenue des Ministères';
const BP389 = '389 – Niamey (Niger)';
const FAX = '(227) 20735983';

// === ANNUAIRE (source : ancien site finances.gouv.ne) ========================
const SERVICES = [
  { nom: 'Ministère des Finances', adresse: ADR, tel: '(227) 20722110 / 20203181', fax: FAX, bp: BP389, email: 'finances@finances.gov.ne', web: 'https://www.finances.gouv.ne' },
  { nom: 'Cabinet du Ministre des Finances', adresse: ADR, tel: '(227) 20722374 / 20724888 / 20722550', fax: FAX, bp: BP389, email: 'cab@finances.gov.ne' },
  { nom: 'Cabinet du Ministre Délégué au Budget', adresse: ADR, tel: '(227) 20722374 / 20724888 / 20722550', fax: FAX, bp: BP389, email: 'mdb@finances.gov.ne' },
  { nom: 'Secrétariat Général (SG)', adresse: ADR, tel: '(227) 20722037 / 20722550', fax: FAX, bp: BP389, email: 'sg@finances.gov.ne' },
  { nom: 'Secrétariat Général Adjoint (SGA)', adresse: ADR, tel: '(227) 20735296', fax: FAX, bp: BP389, email: 'sga@finances.gov.ne' },
  { nom: 'Inspection Générale des Finances (IGF)', tel: '(227) 20735737', bp: 'Niamey (Niger)', email: 'igf@finances.gov.ne' },
  { nom: 'Inspection Générale des Services (IGS)', tel: '(227) 20371215', bp: BP389, email: 'igs@finances.gov.ne' },
  { nom: 'Direction Générale du Budget (DGB)', adresse: ADR, tel: '(227) 20723494 / 20722742', bp: BP389, email: 'dgb@finances.gov.ne' },
  { nom: 'Direction Générale des Douanes (DGD)', tel: '(227) 20723280 / 20723349', bp: BP389, email: 'dgd@finances.gov.ne' },
  { nom: 'Direction Générale des Impôts (DGI)', adresse: 'Place Charles de Gaulle', tel: '(227) 20722366 / 67', fax: '(227) 20722730', bp: '217 – Niamey (Niger)', email: 'dgi@finances.gov.ne', web: 'http://www.impots.gov.ne' },
  { nom: 'Direction Générale du Trésor et de la Comptabilité Publique (DGT/CP)', tel: '(227) 20735755 / 20734829', fax: '(227) 20723754', bp: BP389, email: 'dgtcp@finances.gov.ne' },
  { nom: 'Direction Générale des Opérations Financières et des Réformes (DGOF/R)', adresse: ADR, tel: '(227) 20722847', bp: BP389, email: 'dgofr@finances.gov.ne' },
  { nom: 'Direction Générale du Contrôle des Marchés Publics et des Engagements Financiers (DGCMP/EF)', tel: '(227) 20736779', bp: BP389, email: 'dgcmpef@finances.gov.ne', web: 'http://www.marchespublics.ne' },
  { nom: 'Direction Générale des Moyens Généraux (DGMG)', adresse: ADR, bp: BP389, email: 'dgmg@finances.gov.ne' },
  { nom: "Direction Générale du Patrimoine de l'État (DGPE)", adresse: ADR, tel: '(227) 20739446', bp: BP389, email: 'dgpe@finances.gov.ne' },
  { nom: "Direction de l'Informatique Financière (DIF)", adresse: ADR, tel: '(227) 20722250', bp: '12240 – Niamey (Niger)', email: 'dif@finances.gov.ne' },
  { nom: 'Direction des Ressources Financières et du Matériel (DRFM)', adresse: ADR, tel: '(227) 20722110 / 20203682', bp: BP389, email: 'drfm@finances.gov.ne' },
  { nom: 'Direction des Archives, de la Communication, de la Documentation et des Relations Publiques (DACD/RP)', adresse: ADR, tel: '(227) 20203970', bp: BP389, email: 'dacdrp@finances.gov.ne' },
  { nom: 'Direction des Études et de la Programmation (DEP)', adresse: ADR, tel: '(227) 20722842', bp: BP389, email: 'dep@finances.gov.ne' },
  { nom: 'Direction de la Législation (DL)', adresse: ADR, tel: '(227) 20722839', bp: BP389, email: 'dl@finances.gov.ne' },
  { nom: 'Direction des Marchés Publics et de Délégation de Service Public (DMP/DSP)', adresse: ADR, bp: BP389, email: 'dmpdsp@finances.gov.ne' },
  { nom: 'Direction de la Statistique (DStat)', adresse: ADR, tel: '(227) 20722334', bp: BP389, email: 'dstat@finances.gov.ne' },
  { nom: "Cellule de Traitement de l'Information Financière (CENTIF)", adresse: ADR, tel: '(227) 20725975', bp: BP389, email: 'centif@finances.gov.ne' },
  { nom: 'Agence de Régulation du Secteur de la Microfinance (ARSM)', tel: '(227) 20350493', bp: BP389, email: 'arsm@finances.gov.ne', web: 'https://www.arsm.ne' },
  { nom: 'Cellule Union Européenne (CUE)', adresse: '265, avenue du Gouverneur Jules Brévié', tel: '+227 20 72 21 27', fax: '+227 20 72 35 20', bp: '13 854 – Niamey (Niger)', email: 'cue@finances.gov.ne' },
  { nom: 'Cellule Suivi Intégration UEMOA/CEDEAO (CSI)', adresse: ADR, tel: '(227) 20723245', bp: BP389, email: 'csi@finances.gov.ne' },
  { nom: 'Comité National de Politique Économique (CNPE)', adresse: ADR, tel: '(227) 20723245', bp: BP389, email: 'cnpe@finances.gov.ne' },
];
// =============================================================================

function Ligne({ Icon, children, href }) {
  if (!children) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, fontSize: '0.83rem', color: COLORS.ink }}>
      <Icon sx={{ fontSize: 16, color: COLORS.blue, mt: '2px', flexShrink: 0 }} />
      {href ? (
        <Box component="a" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" sx={{ color: COLORS.blue, textDecoration: 'none', wordBreak: 'break-word', '&:hover': { textDecoration: 'underline' } }}>
          {children}
        </Box>
      ) : (
        <Box component="span" sx={{ wordBreak: 'break-word' }}>{children}</Box>
      )}
    </Box>
  );
}

export default function AnnuaireDirectory() {
  const [q, setQ] = useState('');
  const filtre = q.trim().toLowerCase();
  const liste = filtre ? SERVICES.filter((s) => s.nom.toLowerCase().includes(filtre) || (s.email || '').toLowerCase().includes(filtre)) : SERVICES;

  return (
    <Box sx={{ backgroundColor: COLORS.bg, py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        {/* Recherche */}
        <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <TextField
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un service, une direction…"
            size="small"
            sx={{ backgroundColor: '#fff', borderRadius: 1, width: { xs: '100%', sm: 380 } }}
            slotProps={{ input: { startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: COLORS.muted }} /></InputAdornment>) } }}
          />
          <Typography sx={{ color: COLORS.muted, fontSize: '0.85rem', fontWeight: 600 }}>
            {liste.length} service{liste.length > 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Grille des fiches */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          {liste.map((s) => (
            <Box
              key={s.nom}
              sx={{
                backgroundColor: '#fff',
                border: `1px solid ${COLORS.border}`,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 14px 28px rgba(0,0,0,0.10)' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, px: 2, py: 1.5, borderBottom: `1px solid ${COLORS.border}`, backgroundColor: 'rgba(0,64,128,0.04)' }}>
                <ApartmentIcon sx={{ fontSize: 20, color: COLORS.blue, mt: '2px', flexShrink: 0 }} />
                <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: '0.92rem', lineHeight: 1.3 }}>
                  {s.nom}
                </Typography>
              </Box>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 0.9 }}>
                <Ligne Icon={LocationOnIcon}>{s.adresse}</Ligne>
                <Ligne Icon={PhoneIcon}>{s.tel}</Ligne>
                <Ligne Icon={PrintIcon}>{s.fax}</Ligne>
                <Ligne Icon={MarkunreadMailboxIcon}>{s.bp ? `BP ${s.bp}` : null}</Ligne>
                <Ligne Icon={EmailIcon} href={s.email ? `mailto:${s.email}` : undefined}>{s.email}</Ligne>
                <Ligne Icon={LanguageIcon} href={s.web}>{s.web ? s.web.replace(/^https?:\/\//, '') : null}</Ligne>
              </Box>
            </Box>
          ))}
        </Box>

        {liste.length === 0 && (
          <Typography sx={{ textAlign: 'center', color: COLORS.muted, mt: 4 }}>Aucun service ne correspond à « {q} ».</Typography>
        )}
      </Container>
    </Box>
  );
}
