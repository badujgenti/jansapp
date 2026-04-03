import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "@/shared/components/layout/ScreenWrapper";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper scrollable>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>
          {t("common.appName")}
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>
          მთავარი
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
  greeting: {
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
});
