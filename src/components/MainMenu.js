'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import menuItems from './menuConfig';
import { COLORS } from '@/theme';

export default function MainMenu({ menu = menuItems, site = {} }) {
  const pathname = usePathname();

  const nomSite = site.nom || 'MINISTÈRE DES FINANCES';
  const sousTitre = site.sousTitre || 'République du Niger';
  const logo = site.logo || '/armoiries-niger.png';

  // Sous-menu déroulant (bureau)
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLabel, setOpenLabel] = useState(null);
  // Menu mobile
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const handleOpen = (e, label) => {
    setAnchorEl(e.currentTarget);
    setOpenLabel(label);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenLabel(null);
  };

  const isActive = (item) => {
    if (item.path === '/') return pathname === '/';
    if (item.path) return pathname.startsWith(item.path);
    if (item.submenu) return item.submenu.some((s) => pathname.startsWith(s.path));
    return false;
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: COLORS.blue,
        zIndex: 1300,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 76, md: 96 }, gap: 2, overflow: 'visible' }}>
        {/* Logo + identité */}
        <Box
          component={Link}
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, md: 2 },
            textDecoration: 'none',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: { xs: 64, md: 96 },
              height: { xs: 64, md: 96 },
              borderRadius: 3,
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 22px rgba(0,0,0,0.30)',
              border: `3px solid ${COLORS.gold}`,
              flexShrink: 0,
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '&:hover': {
                transform: 'translateY(-2px) scale(1.03)',
                boxShadow: '0 12px 28px rgba(0,0,0,0.38)',
              },
            }}
          >
            <Image
              src={logo}
              alt={`Armoiries — ${nomSite}`}
              width={88}
              height={88}
              style={{ objectFit: 'contain', width: '86%', height: '86%' }}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, lineHeight: 1.15 }}>
            <Typography sx={{ fontWeight: 800, fontSize: { sm: '1.05rem', md: '1.25rem' }, letterSpacing: 0.3 }}>
              {nomSite}
            </Typography>
            <Typography sx={{ fontSize: { sm: '0.78rem', md: '0.85rem' }, color: COLORS.gold, fontWeight: 700, letterSpacing: 0.6 }}>
              {sousTitre}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Navigation bureau */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          {menu.map((item) => {
            const active = isActive(item);
            const navSx = {
              color: '#fff',
              px: 1.5,
              fontWeight: 600,
              borderRadius: 0,
              borderBottom: '3px solid',
              borderColor: active ? COLORS.gold : 'transparent',
              transition: 'all 0.2s ease',
              '&:hover': { backgroundColor: 'transparent', borderColor: COLORS.gold },
            };
            return item.submenu ? (
              <Box key={item.label}>
                <Button
                  onClick={(e) => handleOpen(e, item.label)}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={navSx}
                >
                  {item.label}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openLabel === item.label}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  slotProps={{
                    list: { sx: { py: 1 } },
                    paper: {
                      elevation: 0,
                      sx: {
                        mt: 1,
                        minWidth: 260,
                        borderRadius: 2,
                        border: `1px solid ${COLORS.border}`,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                      },
                    },
                  }}
                >
                  {item.submenu.map((sub) => (
                    <MenuItem
                      key={sub.path}
                      component={Link}
                      href={sub.path}
                      onClick={handleClose}
                      sx={{
                        py: 1.1,
                        fontSize: '0.92rem',
                        borderLeft: '3px solid transparent',
                        '&:hover': {
                          borderLeftColor: COLORS.gold,
                          backgroundColor: COLORS.bg,
                          color: COLORS.blue,
                        },
                      }}
                    >
                      {sub.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button key={item.label} component={Link} href={item.path} sx={navSx}>
                {item.label}
              </Button>
            );
          })}
        </Box>

        {/* Bouton mobile */}
        <IconButton
          onClick={() => setDrawerOpen(true)}
          aria-label="Ouvrir le menu"
          sx={{ color: '#fff', display: { xs: 'inline-flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Menu mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 290 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              backgroundColor: COLORS.blue,
              color: '#fff',
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }} aria-label="Fermer">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {menu.map((item) =>
              item.submenu ? (
                <Box key={item.label}>
                  <ListItemButton
                    onClick={() =>
                      setMobileExpanded((v) => (v === item.label ? null : item.label))
                    }
                  >
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                    {mobileExpanded === item.label ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>
                  <Collapse in={mobileExpanded === item.label} unmountOnExit>
                    <List disablePadding>
                      {item.submenu.map((sub) => (
                        <ListItemButton
                          key={sub.path}
                          component={Link}
                          href={sub.path}
                          onClick={() => setDrawerOpen(false)}
                          sx={{ pl: 4, py: 0.75 }}
                        >
                          <ListItemText
                            primary={sub.label}
                            primaryTypographyProps={{ fontSize: '0.9rem' }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                  <Divider />
                </Box>
              ) : (
                <Box key={item.label}>
                  <ListItemButton
                    component={Link}
                    href={item.path}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                  </ListItemButton>
                  <Divider />
                </Box>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
