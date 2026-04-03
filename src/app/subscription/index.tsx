import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "@/shared/components/layout/ScreenWrapper";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";

export default function SubscriptionScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper padded>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("subscription.paywall.title")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t("subscription.paywall.subtitle")}
        </Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});
