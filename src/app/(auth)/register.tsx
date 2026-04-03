import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "@/shared/components/layout/ScreenWrapper";
import { Button } from "@/shared/components/ui/Button";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper scrollable padded>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("auth.registerTitle")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t("auth.registerSubtitle")}
        </Text>

        <View style={styles.form}>
          <Button
            title={t("auth.register")}
            onPress={() => {}}
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={{ color: colors.textSecondary }}>
            {t("auth.hasAccount")}{" "}
          </Text>
          <Link href="/(auth)/login">
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              {t("auth.login")}
            </Text>
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: spacing.xxl,
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
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
