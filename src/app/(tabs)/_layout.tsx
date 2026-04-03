import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/shared/theme/theme";

type TabIconName = keyof typeof MaterialCommunityIcons.glyphMap;

const TAB_ICONS: Record<string, { focused: TabIconName; unfocused: TabIconName }> = {
  home: { focused: "home", unfocused: "home-outline" },
  workouts: { focused: "dumbbell", unfocused: "dumbbell" },
  progress: { focused: "chart-line", unfocused: "chart-line-variant" },
  profile: { focused: "account", unfocused: "account-outline" },
};

export default function TabsLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const getTabIcon = (routeName: string, focused: boolean, color: string) => {
    const icons = TAB_ICONS[routeName] ?? TAB_ICONS.home;
    return (
      <MaterialCommunityIcons
        name={focused ? icons.focused : icons.unfocused}
        size={24}
        color={color}
      />
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "მთავარი",
          tabBarIcon: ({ focused, color }) => getTabIcon("home", focused, color),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "ვარჯიშები",
          tabBarIcon: ({ focused, color }) => getTabIcon("workouts", focused, color),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "პროგრესი",
          tabBarIcon: ({ focused, color }) => getTabIcon("progress", focused, color),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "პროფილი",
          tabBarIcon: ({ focused, color }) => getTabIcon("profile", focused, color),
        }}
      />
    </Tabs>
  );
}
