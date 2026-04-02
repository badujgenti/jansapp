import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@/shared/theme/theme";
import { spacing, borderRadius } from "@/shared/theme/spacing";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const sizeStyles: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { height: 36, paddingHorizontal: spacing.md, fontSize: 13 },
  md: { height: 44, paddingHorizontal: spacing.lg, fontSize: 14 },
  lg: { height: 52, paddingHorizontal: spacing.xl, fontSize: 16 },
};

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
}: ButtonProps) {
  const { colors } = useTheme();

  const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
    primary: {
      container: { backgroundColor: colors.primary },
      text: { color: colors.textOnPrimary },
    },
    secondary: {
      container: { backgroundColor: colors.secondary },
      text: { color: colors.textOnSecondary },
    },
    outline: {
      container: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: colors.primary },
      text: { color: colors.primary },
    },
    ghost: {
      container: { backgroundColor: "transparent" },
      text: { color: colors.primary },
    },
    danger: {
      container: { backgroundColor: colors.error },
      text: { color: colors.textOnPrimary },
    },
  };

  const sizeStyle = sizeStyles[size];
  const variantStyle = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.container,
        variantStyle.container,
        {
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal,
        },
        fullWidth && styles.fullWidth,
        isDisabled && { opacity: 0.5 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text.color} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              variantStyle.text,
              { fontSize: sizeStyle.fontSize },
              icon ? { marginLeft: spacing.sm } : undefined,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.md,
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
