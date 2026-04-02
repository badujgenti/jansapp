const palette = {
  blue: {
    50: "#E3F2FD",
    100: "#BBDEFB",
    200: "#90CAF9",
    500: "#1A73E8",
    600: "#1565C0",
    700: "#0D47A1",
  },
  teal: {
    50: "#E0F7FA",
    100: "#B2DFDB",
    200: "#80CBC4",
    500: "#00BFA5",
    600: "#00897B",
    700: "#00695C",
  },
  red: {
    50: "#FFEBEE",
    100: "#FFCDD2",
    500: "#FF6B6B",
    600: "#E53935",
    700: "#C62828",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    850: "#303030",
    900: "#212121",
    950: "#121212",
  },
} as const;

export const lightColors = {
  primary: palette.blue[500],
  primaryLight: palette.blue[100],
  primaryDark: palette.blue[700],

  secondary: palette.teal[500],
  secondaryLight: palette.teal[100],
  secondaryDark: palette.teal[700],

  accent: palette.red[500],
  accentLight: palette.red[100],
  accentDark: palette.red[700],

  background: palette.neutral[0],
  backgroundSecondary: palette.neutral[50],
  surface: palette.neutral[0],
  surfaceVariant: palette.neutral[100],

  text: palette.neutral[900],
  textSecondary: palette.neutral[600],
  textDisabled: palette.neutral[400],
  textOnPrimary: palette.neutral[0],
  textOnSecondary: palette.neutral[0],

  border: palette.neutral[300],
  borderLight: palette.neutral[200],
  divider: palette.neutral[200],

  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
  info: "#2196F3",

  successBackground: "#E8F5E9",
  warningBackground: "#FFF3E0",
  errorBackground: "#FFEBEE",
  infoBackground: "#E3F2FD",

  overlay: "rgba(0, 0, 0, 0.5)",
  skeleton: palette.neutral[200],
  ripple: "rgba(0, 0, 0, 0.12)",
} as const;

export const darkColors = {
  primary: palette.blue[200],
  primaryLight: palette.blue[700],
  primaryDark: palette.blue[50],

  secondary: palette.teal[200],
  secondaryLight: palette.teal[700],
  secondaryDark: palette.teal[50],

  accent: palette.red[500],
  accentLight: palette.red[700],
  accentDark: palette.red[100],

  background: palette.neutral[950],
  backgroundSecondary: palette.neutral[900],
  surface: palette.neutral[850],
  surfaceVariant: palette.neutral[800],

  text: palette.neutral[50],
  textSecondary: palette.neutral[400],
  textDisabled: palette.neutral[600],
  textOnPrimary: palette.neutral[900],
  textOnSecondary: palette.neutral[900],

  border: palette.neutral[700],
  borderLight: palette.neutral[800],
  divider: palette.neutral[800],

  success: "#66BB6A",
  warning: "#FFA726",
  error: "#EF5350",
  info: "#42A5F5",

  successBackground: "#1B5E20",
  warningBackground: "#E65100",
  errorBackground: "#B71C1C",
  infoBackground: "#0D47A1",

  overlay: "rgba(0, 0, 0, 0.7)",
  skeleton: palette.neutral[700],
  ripple: "rgba(255, 255, 255, 0.12)",
} as const;

export type Colors = {
  [K in keyof typeof lightColors]: string;
};
