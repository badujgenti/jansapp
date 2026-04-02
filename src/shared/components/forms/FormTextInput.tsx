import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { TextInput as PaperTextInput } from "react-native-paper";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";

interface FormTextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  leftIcon?: string;
  disabled?: boolean;
  multiline?: boolean;
  maxLength?: number;
}

export function FormTextInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  leftIcon,
  disabled = false,
  multiline = false,
  maxLength,
}: FormTextInputProps<T>) {
  const { colors } = useTheme();
  const [secureVisible, setSecureVisible] = React.useState(!secureTextEntry);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <PaperTextInput
            label={label}
            value={value as string}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry && !secureVisible}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            disabled={disabled}
            multiline={multiline}
            maxLength={maxLength}
            error={!!error}
            mode="outlined"
            outlineColor={colors.border}
            activeOutlineColor={error ? colors.error : colors.primary}
            textColor={colors.text}
            style={{ backgroundColor: colors.surface }}
            left={leftIcon ? <PaperTextInput.Icon icon={leftIcon} /> : undefined}
            right={
              secureTextEntry ? (
                <PaperTextInput.Icon
                  icon={secureVisible ? "eye-off" : "eye"}
                  onPress={() => setSecureVisible((v) => !v)}
                />
              ) : undefined
            }
          />
          {error?.message && (
            <Text style={[styles.error, { color: colors.error }]}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  error: {
    fontSize: 12,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
