import { colors } from './colors';

export const typography = {
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.gold,
    letterSpacing: 1.5,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 20,
  },
  bodyMuted: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.muted,
    lineHeight: 19,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.gold,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
};

export default typography;
