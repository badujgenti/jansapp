import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput as PaperTextInput, HelperText } from "react-native-paper";
import { useTheme } from "@/shared/theme/theme";
import { spacing } from "@/shared/theme/spacing";

interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  leftIcon?: string;
  rightIcon?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
}

export function TextInput({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  leftIcon,
  rightIcon,
  disabled = false,
  multiline = false,
  numberOfLines,
  maxLength,
}: TextInputProps) {
  const { colors } = useTheme();
  const [secureVisible, setSecureVisible] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      <PaperTextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !secureVisible}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        disabled={disabled}
        multiline={multiline}
        numberOfLines={numberOfLines}
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
          ) : rightIcon ? (
            <PaperTextInput.Icon icon={rightIcon} />
          ) : undefined
        }
      />
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: 12,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
