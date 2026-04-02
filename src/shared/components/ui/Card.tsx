import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/shared/theme/theme";
import { spacing, borderRadius } from "@/shared/theme/spacing";

type CardElevation = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  elevation?: CardElevation;
  style?: ViewStyle;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const elevationStyles: Record<CardElevation, ViewStyle> = {
  none: {},
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export function Card({
  children,
  onPress,
  elevation = "sm",
  style,
  header,
  footer,
}: CardProps) {
  const { colors } = useTheme();

  const cardStyle: ViewStyle[] = [
    styles.container,
    { backgroundColor: colors.surface, borderColor: colors.borderLight },
    elevationStyles[elevation],
    ...(style ? [style] : []),
  ];

  const content = (
    <>
      {header && <View style={styles.header}>{header}</View>}
      <View style={styles.body}>{children}</View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={cardStyle}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  body: {
    padding: spacing.md,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
});
