import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "@/shared/theme/theme";
import { spacing, borderRadius } from "@/shared/theme/spacing";

type BadgeVariant = "filled" | "outlined";
type BadgeColor = "primary" | "secondary" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
}

export function Badge({
  label,
  variant = "filled",
  color = "primary",
}: BadgeProps) {
  const { colors } = useTheme();

  const colorMap: Record<BadgeColor, { bg: string; text: string; border: string }> = {
    primary: { bg: colors.primaryLight, text: colors.primary, border: colors.primary },
    secondary: { bg: colors.secondaryLight, text: colors.secondary, border: colors.secondary },
    success: { bg: colors.successBackground, text: colors.success, border: colors.success },
    warning: { bg: colors.warningBackground, text: colors.warning, border: colors.warning },
    error: { bg: colors.errorBackground, text: colors.error, border: colors.error },
    info: { bg: colors.infoBackground, text: colors.info, border: colors.info },
  };

  const scheme = colorMap[color];

  const containerStyle: ViewStyle =
    variant === "filled"
      ? { backgroundColor: scheme.bg }
      : { backgroundColor: "transparent", borderWidth: 1, borderColor: scheme.border };

  const textStyle: TextStyle = { color: scheme.text };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
});
