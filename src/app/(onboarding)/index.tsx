import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "@/shared/components/layout/ScreenWrapper";
import { Button } from "@/shared/components/ui/Button";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";
import { useAuthStore } from "@/features/auth/stores/auth.store";

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const setOnboardingComplete = useAuthStore((s) => s.setOnboardingComplete);

  const handleGetStarted = () => {
    setOnboardingComplete();
    router.replace("/(auth)/login");
  };

  return (
    <ScreenWrapper padded>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.logo, { color: colors.primary }]}>
            ჯანსApp
          </Text>
          <Text style={[styles.welcome, { color: colors.text }]}>
            {t("onboarding.welcome")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t("auth.registerSubtitle")}
          </Text>
        </View>

        <View style={styles.bottom}>
          <Button
            title={t("onboarding.getStarted")}
            onPress={handleGetStarted}
            fullWidth
            size="lg"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: spacing.lg,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 24,
  },
  bottom: {
    paddingBottom: spacing.xl,
  },
});
