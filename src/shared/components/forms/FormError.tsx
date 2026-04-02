import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/shared/theme/theme";
import { spacing, borderRadius } from "@/shared/theme/spacing";

interface FormErrorProps {
  message: string | undefined;
}

export function FormError({ message }: FormErrorProps) {
  const { colors } = useTheme();

  if (!message) return null;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.errorBackground },
      ]}
    >
      <MaterialCommunityIcons
        name="alert-circle-outline"
        size={18}
        color={colors.error}
      />
      <Text style={[styles.text, { color: colors.error }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  text: {
    fontSize: 13,
    flex: 1,
  },
});
