import React from "react";
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "@/shared/theme/theme";
import { spacing, borderRadius } from "@/shared/theme/spacing";

interface ModalAction {
  label: string;
  onPress: () => void;
  variant?: "primary" | "cancel" | "danger";
}

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: ModalAction[];
}

export function Modal({
  visible,
  onClose,
  title,
  children,
  actions,
}: ModalProps) {
  const { colors } = useTheme();

  const getActionColor = (variant: ModalAction["variant"]) => {
    switch (variant) {
      case "danger":
        return colors.error;
      case "cancel":
        return colors.textSecondary;
      default:
        return colors.primary;
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={[styles.backdrop, { backgroundColor: colors.overlay }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableOpacity activeOpacity={1}>
            <View
              style={[
                styles.content,
                { backgroundColor: colors.surface },
              ]}
            >
              {title && (
                <Text style={[styles.title, { color: colors.text }]}>
                  {title}
                </Text>
              )}
              <View style={styles.body}>{children}</View>
              {actions && actions.length > 0 && (
                <View style={styles.actions}>
                  {actions.map((action, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={action.onPress}
                      style={styles.actionButton}
                    >
                      <Text
                        style={[
                          styles.actionText,
                          { color: getActionColor(action.variant) },
                        ]}
                      >
                        {action.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  content: {
    width: "100%",
    minWidth: 280,
    maxWidth: 400,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  body: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: spacing.md,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  actionButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
