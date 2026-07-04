'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Drawer,
  TextField,
  Stack,
  MenuItem,
  Divider,
  Avatar,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';
import { INFOS_MINISTERE } from '@/config';
import { COLORS } from '@/theme';

const RESEAUX = [
  { key: 'facebook', icon: <FacebookIcon fontSize="small" />, color: '#1877F2', label: 'Facebook' },
  { key: 'twitter', icon: <XIcon fontSize="small" />, color: '#000000', label: 'X' },
  { key: 'youtube', icon: <YouTubeIcon fontSize="small" />, color: '#FF0000', label: 'YouTube' },
];

// Élément de contact (icône + libellé + valeur).
function ContactItem({ icon, label, value, href }) {
  return (
    <Box
      component={href ? 'a' : 'div'}
      href={href}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Box sx={{ color: COLORS.blue, display: 'flex' }}>{icon}</Box>
      <Box>
        {label && (
          <Typography variant="caption" sx={{ color: COLORS.muted, display: 'block', lineHeight: 1 }}>
            {label}
          </Typography>
        )}
        <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.ink }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export default function UtilityBar({ contact = INFOS_MINISTERE }) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderBottom: `1px solid ${COLORS.border}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        px: { xs: 2, md: 4 },
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
      }}
    >
      {/* GAUCHE : coordonnées */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
        <ContactItem
          icon={<PhoneIcon fontSize="small" />}
          value={contact.telephone}
          href={`tel:${(contact.telephone || '').replace(/\s/g, '')}`}
        />
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
        <ContactItem
          icon={<EmailIcon fontSize="small" />}
          value={contact.email}
          href={`mailto:${contact.email}`}
        />
      </Box>

      {/* DROITE : réseaux sociaux + écrire au ministre */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {RESEAUX.map((r) => (
            <IconButton
              key={r.label}
              component="a"
              href={contact[r.key] || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={r.label}
              size="small"
              sx={{
                color: '#fff',
                backgroundColor: r.color,
                width: 30,
                height: 30,
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: r.color,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 14px ${r.color}66`,
                },
              }}
            >
              {r.icon}
            </IconButton>
          ))}
        </Box>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        <Button
          component="a"
          href={process.env.NEXT_PUBLIC_INTRANET_URL || 'http://localhost:3001'}
          variant="outlined"
          startIcon={<LoginIcon />}
          sx={{
            borderColor: COLORS.green,
            color: COLORS.greenDark,
            fontWeight: 700,
            px: 2,
            display: { xs: 'none', sm: 'inline-flex' },
            '&:hover': {
              backgroundColor: COLORS.green,
              borderColor: COLORS.green,
              color: '#fff',
            },
          }}
        >
          Intranet
        </Button>

        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: COLORS.blue,
            fontWeight: 700,
            px: 2.5,
            boxShadow: 'none',
            '&:hover': { backgroundColor: COLORS.blueHover },
          }}
        >
          Écrire au ministre
        </Button>
      </Box>

      {/* Tiroir : formulaire « Écrire au ministre » */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ zIndex: 1500 }}
        slotProps={{
          paper: {
            sx: {
              width: { xs: '100%', sm: 460 },
              borderTopLeftRadius: { sm: 16 },
              borderBottomLeftRadius: { sm: 16 },
            },
          },
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${COLORS.blue} 0%, #0a5ca8 100%)`,
            color: '#fff',
            px: 3,
            py: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.18)' }}>
            <MailOutlineIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Écrire au ministre
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.85 }}>
              Renseignez vos coordonnées et votre message
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff' }} aria-label="Fermer">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            // Branchement backend à venir (POST /api/messages/).
            setOpen(false);
          }}
          sx={{ p: 3, overflowY: 'auto' }}
        >
          <Typography variant="overline" sx={{ color: COLORS.muted, fontWeight: 700 }}>
            Vos informations
          </Typography>
          <Stack spacing={2} sx={{ mt: 1, mb: 3 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="Prénom" fullWidth required size="small" />
              <TextField label="Nom" fullWidth required size="small" />
            </Stack>
            <TextField label="Adresse e-mail" type="email" fullWidth required size="small" />
            <TextField label="Téléphone" type="tel" fullWidth size="small" />
          </Stack>

          <Typography variant="overline" sx={{ color: COLORS.muted, fontWeight: 700 }}>
            Votre message
          </Typography>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Objet" select fullWidth required size="small" defaultValue="">
              <MenuItem value="">Choisir un objet…</MenuItem>
              <MenuItem value="demande">Demande d&apos;information</MenuItem>
              <MenuItem value="doleance">Doléance / Réclamation</MenuItem>
              <MenuItem value="audience">Demande d&apos;audience</MenuItem>
              <MenuItem value="partenariat">Proposition de partenariat</MenuItem>
              <MenuItem value="autre">Autre</MenuItem>
            </TextField>
            <TextField label="Votre message" multiline rows={5} fullWidth required />
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth
              sx={{
                backgroundColor: COLORS.blue,
                fontWeight: 700,
                py: 1.2,
                '&:hover': { backgroundColor: COLORS.blueHover },
              }}
            >
              Envoyer le message
            </Button>
            <Typography variant="caption" sx={{ color: COLORS.muted, textAlign: 'center' }}>
              Vos données ne seront utilisées que pour traiter votre demande.
            </Typography>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
