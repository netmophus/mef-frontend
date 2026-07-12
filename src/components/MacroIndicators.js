'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import { COLORS } from '@/theme';

// Correspondance clé (API) → icône Material UI.
const ICON_MAP = {
  paid: PaidIcon,
  trending_up: TrendingUpIcon,
  show_chart: ShowChartIcon,
  request_quote: RequestQuoteIcon,
  account_balance: AccountBalanceIcon,
  savings: SavingsIcon,
};

// === INDICATEURS (données de démo, repli) ====================================
// ⚠️ Chiffres fournis à titre indicatif — servis par l'API /api/indicateurs/.
const GRANDS = [
  { label: 'PIB Nominal', value: 23170, decimals: 0, suffix: '', unite: 'Milliards FCFA', icone: 'paid', couleurs: ['#0C7449', '#095C39'] },
  { label: 'Croissance du PIB', value: 5, decimals: 0, suffix: '%', unite: 'Estimation', icone: 'trending_up', couleurs: ['#37a06a', '#1F6E42'] },
  { label: 'Inflation', value: 1.4, decimals: 1, suffix: '%', unite: 'Mars 2026', icone: 'show_chart', couleurs: ['#caa029', '#8a6314'] },
  { label: 'Besoins de financement', value: 6075.2, decimals: 1, suffix: '', unite: 'Milliards FCFA', icone: 'request_quote', couleurs: ['#ef9038', '#B85E18'] },
];

const CLES = [
  { label: 'Taux de croissance', value: 8.1, max: 10, color: COLORS.green, note: '2025' },
  { label: "Taux d'inflation", value: 1.1, max: 10, color: COLORS.gold, note: '2025' },
  { label: 'Déficit budgétaire', value: 2.7, max: 10, color: COLORS.orange, note: 'en % du PIB · 2025' },
  { label: "Taux d'endettement", value: 52.8, max: 100, color: '#6FB3E0', note: 'en % du PIB · 2025' },
];
// =============================================================================

function formatFr(n, decimals) {
  return n.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Compteur animé (0 → valeur) déclenché par `play`.
function CountUp({ value, decimals = 0, play, duration = 1600 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!play) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value, duration]);
  return <>{formatFr(val, decimals)}</>;
}

// Jauge circulaire animée.
function Gauge({ value, max, color, play }) {
  const size = 132;
  const stroke = 11;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = play ? circ * (1 - pct) : circ;

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: COLORS.ink, lineHeight: 1 }}>
          <CountUp value={value} decimals={1} play={play} />
          <Box component="span" sx={{ fontSize: '0.9rem', ml: 0.25 }}>%</Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default function MacroIndicators({ grands = GRANDS, cles = CLES, hideHeader = false }) {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor: COLORS.bg,
        pt: { xs: 1, md: 1.5 },
        pb: { xs: 4, md: 5 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        {/* En-tête de section */}
        {!hideHeader && (
          <Box sx={{ color: COLORS.ink, mb: { xs: 3, md: 4 } }}>
            <Typography sx={{ color: COLORS.goldDark, fontWeight: 800, letterSpacing: 1.5, fontSize: '0.8rem', textTransform: 'uppercase', mb: 0.5 }}>
              Économie nigérienne
            </Typography>
            <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.blue, fontSize: { xs: '1.7rem', md: '2.1rem' }, lineHeight: 1.1 }}>
              Indicateurs macroéconomiques
            </Typography>
            <Box sx={{ width: 72, height: 4, background: 'linear-gradient(90deg, #E07B2C 0 33.33%, #ffffff 33.33% 66.66%, #2E8B57 66.66% 100%)', borderRadius: 2, mt: 1.5 }} />
          </Box>
        )}

        {/* Grands indicateurs — cartes colorées */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 2, md: 2.5 } }}>
          {grands.map(({ label, value, decimals, suffix, unite, icone, couleurs }) => {
            const Icon = ICON_MAP[icone] || PaidIcon;
            const c = couleurs || ['#0C7449', '#095C39'];
            return (
            <Box
              key={label}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                p: 2.5,
                borderRadius: 3,
                color: '#fff',
                background: `linear-gradient(135deg, ${c[0]} 0%, ${c[1]} 100%)`,
                boxShadow: `0 12px 26px ${c[1]}40`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 18px 34px ${c[1]}5c` },
                '&:hover .mi-wm': { transform: 'scale(1.12) rotate(-6deg)' },
              }}
            >
              <Icon className="mi-wm" sx={{ position: 'absolute', right: -14, bottom: -14, fontSize: 110, color: 'rgba(255,255,255,0.14)', transition: 'transform 0.4s ease' }} />
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ width: 44, height: 44, borderRadius: 1.5, backgroundColor: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, '& svg': { fontSize: 25 } }}>
                  <Icon />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.6rem', md: '1.9rem' }, lineHeight: 1.05 }}>
                  <CountUp value={value} decimals={decimals} play={play} />
                  {suffix && <Box component="span" sx={{ fontSize: '1.2rem', ml: 0.25 }}>{suffix}</Box>}
                </Typography>
                {unite && <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '0.72rem', mt: 0.25 }}>{unite}</Typography>}
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mt: 1 }}>{label}</Typography>
              </Box>
            </Box>
            );
          })}
        </Box>

        {/* Indicateurs clés — jauges */}
        <Box sx={{ mt: { xs: 2.5, md: 3 }, backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', p: { xs: 2.5, md: 3 } }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', mb: 2.5, color: COLORS.blue }}>
            Indicateurs clés <Box component="span" sx={{ color: COLORS.goldDark }}>2025</Box>
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, justifyItems: 'center' }}>
            {cles.map(({ label, value, max, color, note }) => (
              <Box key={label} sx={{ textAlign: 'center' }}>
                <Gauge value={value} max={max} color={color} play={play} />
                <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', mt: 1.5, color: COLORS.ink }}>{label}</Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: '0.76rem' }}>{note}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
