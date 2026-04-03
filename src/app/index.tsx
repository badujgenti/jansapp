import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { useTheme } from "@/shared/theme/theme";

export default function SplashScreen() {
  const router = useRouter();
  const { isLoading, isAuthenticated, isOnboardingComplete } = useAuthStore();
  const { colors } = useTheme();

  useEffect(() => {
    if (isLoading) return;

    const timeout = setTimeout(() => {
      if (!isOnboardingComplete) {
        router.replace("/(onboarding)");
      } else if (!isAuthenticated) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/(tabs)/home");
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [isLoading, isAuthenticated, isOnboardingComplete, router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Text style={styles.logo}>ჯანსApp</Text>
      <ActivityIndicator
        size="large"
        color="#FFFFFF"
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  loader: {
    marginTop: 32,
  },
});
