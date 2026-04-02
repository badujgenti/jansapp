import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/shared/theme/theme";
import { spacing, borderRadius } from "@/shared/theme/spacing";

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "აირჩიეთ...",
  disabled = false,
}: FormSelectProps<T>) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedOption = options.find((o) => o.value === value);

        return (
          <View style={styles.container}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              {label}
            </Text>
            <TouchableOpacity
              onPress={() => !disabled && setModalVisible(true)}
              style={[
                styles.selector,
                {
                  borderColor: error ? colors.error : colors.border,
                  backgroundColor: colors.surface,
                },
                disabled && { opacity: 0.5 },
              ]}
            >
              <Text
                style={[
                  styles.selectorText,
                  {
                    color: selectedOption ? colors.text : colors.textDisabled,
                  },
                ]}
              >
                {selectedOption?.label ?? placeholder}
              </Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            {error?.message && (
              <Text style={[styles.error, { color: colors.error }]}>
                {error.message}
              </Text>
            )}
            <Modal
              visible={modalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                style={[styles.backdrop, { backgroundColor: colors.overlay }]}
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
              >
                <View
                  style={[
                    styles.modalContent,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <Text style={[styles.modalTitle, { color: colors.text }]}>
                    {label}
                  </Text>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          onChange(item.value);
                          setModalVisible(false);
                        }}
                        style={[
                          styles.option,
                          item.value === value && {
                            backgroundColor: colors.primaryLight,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            {
                              color:
                                item.value === value
                                  ? colors.primary
                                  : colors.text,
                            },
                          ]}
                        >
                          {item.label}
                        </Text>
                        {item.value === value && (
                          <MaterialCommunityIcons
                            name="check"
                            size={20}
                            color={colors.primary}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 12,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  selectorText: {
    fontSize: 16,
    flex: 1,
  },
  error: {
    fontSize: 12,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    maxHeight: "50%",
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    paddingBottom: spacing.xl,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    padding: spacing.md,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  optionText: {
    fontSize: 16,
  },
});
