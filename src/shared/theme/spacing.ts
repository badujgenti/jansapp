const BASE = 4;

export const spacing = {
  xs: BASE,       // 4
  sm: BASE * 2,   // 8
  md: BASE * 4,   // 16
  lg: BASE * 6,   // 24
  xl: BASE * 8,   // 32
  xxl: BASE * 12, // 48
} as const;

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
