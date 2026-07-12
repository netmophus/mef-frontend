'use client';

import { Box, Container, Typography, IconButton, TextField, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { COLORS } from '@/theme';
import { INFOS_MINISTERE } from '@/config';

const LIENS_MINISTERE = [
  { label: 'Le Ministre', href: '/le-ministere/ministre' },
  { label: 'Historique', href: '/le-ministere/historique' },
  { label: 'Organigramme', href: '/le-ministere/organigramme' },
  { label: 'Partenaires', href: '/le-ministere/partenaires' },
  { label: 'Annuaire', href: '/le-ministere/annuaire' },
];

const LIENS_BUDGET = [
  { label: 'Lois de finances', href: '/budget/lois-de-finances' },
  { label: "Rapports d'exécution", href: '/budget/rapports-execution' },
  { label: 'Directives UEMOA', href: '/budget/directives-uemoa' },
  { label: 'Rapports de performance', href: '/budget/rapports-performance' },
  { label: 'Archives', href: '/archives' },
];

const RESEAUX = [
  { key: 'facebook', icon: <FacebookIcon fontSize="small" />, label: 'Facebook' },
  { key: 'twitter', icon: <XIcon fontSize="small" />, label: 'X' },
  { key: 'youtube', icon: <YouTubeIcon fontSize="small" />, label: 'YouTube' },
];

function LinkColonne({ titre, liens }) {
  return (
    <Box>
      <Typography component="div" sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 2, color: '#fff' }}>
        {titre}
        <Box sx={{ width: 32, height: 3, backgroundColor: '#E0A92E', borderRadius: 2, mt: 1 }} />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {liens.map((l) => (
          <Box
            key={l.label}
            component={Link}
            href={l.href}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'rgba(255,255,255,0.78)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'color 0.2s ease, transform 0.2s ease',
              '&:hover': { color: '#E0A92E', transform: 'translateX(4px)' },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 16, color: '#E0A92E' }} />
            {l.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        color: '#fff',
        background: 'linear-gradient(135deg, #0A5C3A 0%, #0C7449 55%, #063D26 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.7fr 1fr 1fr 1.5fr' },
            gap: { xs: 4, md: 5 },
          }}
        >
          {/* Identité */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 84,
                  height: 84,
                  borderRadius: 2.5,
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
                }}
              >
                <Image
                  src="/armoiries-niger.png"
                  alt="Armoiries de la République du Niger"
                  width={76}
                  height={76}
                  style={{ objectFit: 'contain', width: '84%', height: '84%' }}
                />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2 }}>
                  MINISTÈRE DES FINANCES
                </Typography>
                <Typography sx={{ fontSize: '0.82rem', color: '#E0A92E', fontWeight: 700 }}>
                  République du Niger
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.88rem', lineHeight: 1.6, mb: 2.5 }}>
              Au service de la transparence et du développement, le Ministère pilote la politique
              budgétaire, fiscale et financière de l&apos;État.
            </Typography>
            {/* Réseaux sociaux */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {RESEAUX.map((r) => (
                <IconButton
                  key={r.label}
                  component="a"
                  href={INFOS_MINISTERE[r.key] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.label}
                  size="small"
                  sx={{
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.25)',
                    transition: 'all 0.2s ease',
                    '&:hover': { backgroundColor: '#E0A92E', borderColor: '#E0A92E', color: '#002B55' },
                  }}
                >
                  {r.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Colonnes de liens */}
          <LinkColonne titre="Le Ministère" liens={LIENS_MINISTERE} />
          <LinkColonne titre="Budget" liens={LIENS_BUDGET} />

          {/* Contact + newsletter */}
          <Box>
            <Typography component="div" sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 2 }}>
              Contact
              <Box sx={{ width: 32, height: 3, backgroundColor: '#E0A92E', borderRadius: 2, mt: 1 }} />
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.82)', fontSize: '0.88rem' }}>
                <PhoneIcon sx={{ fontSize: 18, color: '#E0A92E' }} />
                {INFOS_MINISTERE.telephone}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.82)', fontSize: '0.88rem' }}>
                <EmailIcon sx={{ fontSize: 18, color: '#E0A92E' }} />
                {INFOS_MINISTERE.email}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, color: 'rgba(255,255,255,0.82)', fontSize: '0.88rem' }}>
                <LocationOnIcon sx={{ fontSize: 18, color: '#E0A92E', mt: 0.2 }} />
                {INFOS_MINISTERE.adresse}
              </Box>
            </Box>

            <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 1 }}>Newsletter</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', mb: 1.5 }}>
              Recevez l&apos;actualité du Ministère.
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                // Branchement backend à venir.
              }}
              sx={{ display: 'flex', gap: 1 }}
            >
              <TextField
                type="email"
                required
                placeholder="Votre e-mail"
                size="small"
                fullWidth
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  input: { color: '#fff', fontSize: '0.85rem' },
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                  '& input::placeholder': { color: 'rgba(255,255,255,0.5)', opacity: 1 },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                aria-label="S'inscrire"
                sx={{
                  minWidth: 48,
                  backgroundColor: '#E0A92E',
                  color: '#002B55',
                  '&:hover': { backgroundColor: '#caa029' },
                }}
              >
                <SendIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Barre du bas */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <Container
          maxWidth="lg"
          sx={{
            py: 2.5,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>
            © 2026 Ministère des Finances — République du Niger. Tous droits réservés.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            {[
              { label: 'Mentions légales', href: '/mentions-legales' },
              { label: 'Plan du site', href: '/plan-du-site' },
              { label: 'Contact', href: '/contact' },
            ].map((l) => (
              <Box
                key={l.label}
                component={Link}
                href={l.href}
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  '&:hover': { color: '#E0A92E' },
                }}
              >
                {l.label}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
