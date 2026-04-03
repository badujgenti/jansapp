import { Stack } from "expo-router";
import { useTheme } from "@/shared/theme/theme";

export default function SubscriptionLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
