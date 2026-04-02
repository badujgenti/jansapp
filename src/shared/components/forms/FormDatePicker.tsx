import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/shared/theme/theme";
import { spacing, borderRadius } from "@/shared/theme/spacing";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
}

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "აირჩიეთ თარიღი",
  minimumDate,
  maximumDate,
  disabled = false,
}: FormDatePickerProps<T>) {
  const { colors } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const dateValue = value ? new Date(value as string) : undefined;

        const handleChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
          if (Platform.OS === "android") {
            setShowPicker(false);
          }
          if (selectedDate) {
            onChange(selectedDate.toISOString());
          }
        };

        return (
          <View style={styles.container}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              {label}
            </Text>
            <TouchableOpacity
              onPress={() => !disabled && setShowPicker(true)}
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
                  { color: dateValue ? colors.text : colors.textDisabled },
                ]}
              >
                {dateValue ? formatDate(dateValue) : placeholder}
              </Text>
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            {error?.message && (
              <Text style={[styles.error, { color: colors.error }]}>
                {error.message}
              </Text>
            )}
            {showPicker && (
              <DateTimePicker
                value={dateValue ?? new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
              />
            )}
            {showPicker && Platform.OS === "ios" && (
              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                style={styles.doneButton}
              >
                <Text style={[styles.doneText, { color: colors.primary }]}>
                  მზადაა
                </Text>
              </TouchableOpacity>
            )}
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
  doneButton: {
    alignSelf: "flex-end",
    padding: spacing.sm,
  },
  doneText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
