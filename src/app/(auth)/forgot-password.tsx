import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenWrapper } from "@/shared/components/layout/ScreenWrapper";
import { Button } from "@/shared/components/ui/Button";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper scrollable padded>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("auth.forgotPasswordTitle")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t("auth.forgotPasswordSubtitle")}
        </Text>

        <Button
          title={t("auth.resetPassword")}
          onPress={() => {}}
          fullWidth
        />
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
});
