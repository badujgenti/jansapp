import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ViewStyle, DimensionValue } from "react-native";
import { useTheme } from "@/shared/theme/theme";
import { borderRadius } from "@/shared/theme/spacing";

type SkeletonVariant = "text" | "circle" | "rectangle";

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: DimensionValue;
  height?: number;
  style?: ViewStyle;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  style,
}: SkeletonProps) {
  const { colors } = useTheme();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const variantStyles: Record<SkeletonVariant, ViewStyle> = {
    text: {
      width: width ?? "100%",
      height: height ?? 16,
      borderRadius: borderRadius.xs,
    },
    circle: {
      width: width ?? 48,
      height: height ?? 48,
      borderRadius: borderRadius.full,
    },
    rectangle: {
      width: width ?? "100%",
      height: height ?? 100,
      borderRadius: borderRadius.md,
    },
  };

  return (
    <Animated.View
      style={[
        { backgroundColor: colors.skeleton, opacity },
        variantStyles[variant],
        style,
      ]}
    />
  );
}

interface SkeletonGroupProps {
  count?: number;
  variant?: SkeletonVariant;
  gap?: number;
  style?: ViewStyle;
}

export function SkeletonGroup({
  count = 3,
  variant = "text",
  gap = 8,
  style,
}: SkeletonGroupProps) {
  return (
    <View style={[{ gap }, style]}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant={variant} />
      ))}
    </View>
  );
}
