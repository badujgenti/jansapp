import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { create } from "zustand";
import { useTheme } from "@/shared/theme/theme";
import { spacing, borderRadius } from "@/shared/theme/spacing";
import { Colors } from "@/shared/theme/colors";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastState {
  toasts: ToastMessage[];
  show: (type: ToastType, message: string, duration?: number) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (type, message, duration = 3000) => {
    const id = Date.now().toString();
    set((state) => ({ toasts: [...state.toasts, { id, type, message, duration }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, duration);
  },
  dismiss: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

export function useToast() {
  const show = useToastStore((s) => s.show);
  return {
    success: (message: string) => show("success", message),
    error: (message: string) => show("error", message),
    warning: (message: string) => show("warning", message),
    info: (message: string) => show("info", message),
  };
}

function getToastColors(type: ToastType, colors: Colors) {
  const map: Record<ToastType, { bg: string; text: string }> = {
    success: { bg: colors.successBackground, text: colors.success },
    error: { bg: colors.errorBackground, text: colors.error },
    warning: { bg: colors.warningBackground, text: colors.warning },
    info: { bg: colors.infoBackground, text: colors.info },
  };
  return map[type];
}

function ToastItem({ toast }: { toast: ToastMessage }) {
  const { colors } = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const toastColors = getToastColors(toast.type, colors);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay((toast.duration ?? 3000) - 400),
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [opacity, toast.duration]);

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: toastColors.bg, opacity },
      ]}
    >
      <Text style={[styles.toastText, { color: toastColors.text }]}>
        {toast.message}
      </Text>
    </Animated.View>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: spacing.md,
    right: spacing.md,
    zIndex: 9999,
    gap: spacing.sm,
  },
  toast: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
  },
  toastText: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
});
