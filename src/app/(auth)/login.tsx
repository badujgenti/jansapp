import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "@/shared/components/layout/ScreenWrapper";
import { Button } from "@/shared/components/ui/Button";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleTempLogin = () => {
    setUser({
      id: "1",
      email: "test@jansapp.ge",
      fullName: "ტესტ მომხმარებელი",
    });
    router.replace("/(tabs)/home");
  };

  return (
    <ScreenWrapper scrollable padded>
      <View style={styles.container}>
        <Text style={[styles.logo, { color: colors.primary }]}>ჯანსApp</Text>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("auth.loginTitle")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t("auth.loginSubtitle")}
        </Text>

        <View style={styles.form}>
          <Button
            title={t("auth.login")}
            onPress={handleTempLogin}
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={{ color: colors.textSecondary }}>
            {t("auth.noAccount")}{" "}
          </Text>
          <Link href="/(auth)/register">
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              {t("auth.register")}
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
  logo: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: spacing.xl,
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
