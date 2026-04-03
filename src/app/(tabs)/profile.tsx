import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "@/shared/components/layout/ScreenWrapper";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper scrollable>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("profile.title")}
        </Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
});
