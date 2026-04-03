import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "@/shared/components/layout/ScreenWrapper";
import { Button } from "@/shared/components/ui/Button";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";

export default function NotFoundScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ScreenWrapper padded>
      <View style={styles.container}>
        <Text style={[styles.logo, { color: colors.primary }]}>ჯანსApp</Text>
        <Text style={[styles.code, { color: colors.textDisabled }]}>404</Text>
        <Text style={[styles.title, { color: colors.text }]}>
          გვერდი ვერ მოიძებნა
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          სამწუხაროდ, მოთხოვნილი გვერდი არ არსებობს.
        </Text>
        <Button
          title="მთავარ გვერდზე დაბრუნება"
          onPress={() => router.replace("/")}
          variant="outline"
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  logo: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  code: {
    fontSize: 64,
    fontWeight: "700",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
});
